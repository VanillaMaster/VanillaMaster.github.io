class lazyScript extends HTMLElement {
    constructor() {
        super();
    }
    static scripts = new Map();
    connectedCallback(){
        let src = this.getAttribute("src");
        let isVanishing = this.hasAttribute("vanishing");
        
        if (lazyScript.scripts.has(src)) {
            this.script = lazyScript.scripts.get();
            console.log(`script "${src}" exist`);
            return;
        }
        this.#script = document.createElement("script");
        this.#script.src = src;

        lazyScript.scripts.set(src,this.#script);        

        if (this.hasAttribute("defer")) {
            document.addEventListener("DOMContentLoaded",()=>{
                this.#load(isVanishing);
            },{once:true})
        } else {
            this.#load(isVanishing);
        }
    }
    #script = null;

    #load(shouldDelete){
        let head = document.querySelector("head");

        head.append(this.#script);

        console.log(`script "${this.#script.src}" was added`);
        if (shouldDelete) {
            this.#delete();
        }
    }

    #delete(){
        this.parentNode.removeChild(this)
    }

}

customElements.define("lazy-script",lazyScript);