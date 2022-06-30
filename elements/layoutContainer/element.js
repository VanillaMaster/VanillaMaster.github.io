class LayoutContainer extends HTMLElement {
    constructor() {
        super();
        this.load();
    }
    load(){
        const fragment = LayoutContainer.template.cloneNode(true);
        this.#shadow = this.attachShadow({mode:'open'});
        this.#shadow.append(fragment);
    }
    #shadow;

    connectedCallback(){
        this.#isShown = this.hasAttribute("active");
    
        const path = this.getAttribute("path")
        try {if (path) {window.router.registerLayout(this,path)}}
        catch (e) {console.error("router error (on: \"registerLayout\")")}

    }
    #isShown = false;

    registerView(name,view){
        this.#layoutViews.set(name,view);
    }
    #layoutViews = new Map();

    getViewByName(name){
        return this.#layoutViews.get(name);
    }

    showView(name){
        let targetView = this.#layoutViews.get(name);
        this.#layoutViews.forEach((view)=>{
            if (view!==targetView) {view.hide()}
        });
        targetView.show();
    }

    hide(opt){
        if (!this.#isShown) {return;}
        let className = opt ? "disappearing-grow": "disappearing-shrink";
        const f = (e)=>{
            if (e.animationName == className) {
                this.removeEventListener("animationend",f);
                this.classList.remove(className);
            }
        }
        this.#isShown = false;
        this.addEventListener("animationend",f);
        this.classList.add(className);
        this.removeAttribute("active");
    }

    show(opt){
        if (this.#isShown) {return;}
        let className = opt ? "appearing-grow": "appearing-shrink";
        const f = (e)=>{
            if (e.animationName == className) {
                this.removeEventListener("animationend",f);
                this.classList.remove(className);
            }
        };
        this.#isShown = true;
        this.addEventListener("animationend",f)
        this.classList.add(className);
        this.setAttribute("active","");
    }

}

const done = new Promise(async (resolve,reject)=>{
    let html = await ((await fetch("/elements/layoutContainer/element.html")).text());
    Object.defineProperty(LayoutContainer,"template",{
        value: document.createRange().createContextualFragment(html),
        enumerable: false,
        configurable: false,
        writable: false,
    });
    resolve();
})
const name = "layout-container";
export {LayoutContainer as default,done,name};