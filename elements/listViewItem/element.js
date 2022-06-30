class ListViewItem extends HTMLElement {
    constructor() {
        super();
        this.load();
    }
    load(){
        const fragment = ListViewItem.template.cloneNode(true)

        let iconHolder = fragment.querySelector(".left");
        iconHolder.addEventListener("pointerleave",(e)=>{
            console.log(1);
        })

        this.#shadow = this.attachShadow({mode:'open'});
        this.#shadow.append(fragment);
    }
    #shadow;

    connectedCallback(){
        this.#isSelected = this.hasAttribute("selected")
        this.addEventListener("contextmenu",(e)=>{
            //console.log(e.isTrusted);
            if (e.isTrusted === false) {
                if (this.#isSelected){
                    this.removeAttribute("selected");
                    this.#isSelected = false;
                } else {
                    this.setAttribute("selected","");
                    this.#isSelected = true;
                }
            }
        })
    }
    #isSelected = false;

}

(async function () {
    let html = await ((await fetch("/elements/listViewItem/element.html")).text());
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
