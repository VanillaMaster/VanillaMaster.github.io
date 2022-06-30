class ListViewItem extends HTMLElement {
    constructor() {
        super();
        this.load();
    }
    load(){
        const fragment = ListViewItem.template.cloneNode(true)

        //click on icon to toggle selection (click insted of press on body)
        let iconHolder = fragment.querySelector(".left");
        const onPointerUp = (e)=>{this.toggleSelection();}
        iconHolder.addEventListener("pointerdown",(e)=>{
            iconHolder.addEventListener("pointerup",onPointerUp,{once:true})

            iconHolder.addEventListener("pointerleave",(e)=>{
                iconHolder.removeEventListener("pointerup",onPointerUp)
            },{once:true})

            //e.stopPropagation();
        })
        iconHolder.addEventListener("gotpointercapture",(e)=>{
            iconHolder.releasePointerCapture(e.pointerId);
        })
        iconHolder.addEventListener("contextmenu",(e)=>{
            e.stopPropagation();
        });



        this.#shadow = this.attachShadow({mode:'open'});
        this.#shadow.append(fragment);
    }
    #shadow;

    connectedCallback(){
        this.#isSelected = this.hasAttribute("selected")
        this.addEventListener("contextmenu",(e)=>{
            //console.log(e.isTrusted);
            if (e.isTrusted === false) {
                this.toggleSelection();
            }
        })
    }
    toggleSelection(){
        if (this.#isSelected){
            this.removeAttribute("selected");
            this.#isSelected = false;
        } else {
            this.setAttribute("selected","");
            this.#isSelected = true;
        }
    }
    #isSelected = false;

}

const done = new Promise(async (resolve,reject)=>{
    let html = await ((await fetch("/elements/listViewItem/element.html")).text());
    Object.defineProperty(ListViewItem,"template",{
        value: document.createRange().createContextualFragment(html),
        enumerable: false,
        configurable: false,
        writable: false,
    });
    resolve();
})
const name = "list-view-item";
export {ListViewItem as default,done,name};