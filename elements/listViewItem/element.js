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

(async function () {
    let html = await ((await fetch("/elements/ListViewItem/element.html")).text());
    return document.createRange().createContextualFragment(html);
})().then((template)=>{

    Object.defineProperty(ListViewItem,"template",{
        value: template,
        enumerable: false,
        configurable: false,
        writable: false,
    });

    customElements.define("list-view-item",ListViewItem);
});