class layoutView extends HTMLElement {
    static template = (async function () {
        let html = await ((await fetch("/elements/layoutView/element.html")).text());
        return document.createRange().createContextualFragment(html);
    })();
    static showAnimationName = "appearing-grow";
    static hideAnimationName = "disappearing-shrink"
    static scrollStopFramesThreshold = 25;

    constructor() {
        super();
        this.load();
    }
    async load(){
        const fragment = (await layoutView.template).cloneNode(true);
        this.#scrollElement = fragment.querySelector(".view");


        let unchangedFrames = 0;
        let lastY = this.#scrollElement.scrollTop;
        const f = ()=>{
            this.setAttribute("scrolling","")
            console.log(1);
            onNextFrame();
        }
        const onNextFrame = ()=>{
            if (lastY === this.#scrollElement.scrollTop) {
                unchangedFrames++;
            } else {
                unchangedFrames = 0;
            }
            lastY = this.#scrollElement.scrollTop;
            if (unchangedFrames <= layoutView.scrollStopFramesThreshold) {
                requestAnimationFrame(onNextFrame);
            } else {
                this.removeAttribute("scrolling");
                this.#scrollElement.addEventListener("scroll",f,{passive: true, once:true})
            }
        }
        this.#scrollElement.addEventListener("scroll",f,{passive: true, once:true})


        this.#shadow = this.attachShadow({mode:'open'});
        this.#shadow.append(fragment);
    }
    #shadow;
    #scrollElement;

    connectedCallback(){
        this.#isShown = this.hasAttribute("active");
        let parent = this.parentElement;
        while (parent!== null && !(parent instanceof layoutContainer)){
            parent = parent.parentElement;
        }
        this.#container = parent;

        let name = this.getAttribute("name");
        if (name !== null) {this.#container.registerView(name,this)}
    }
    #isShown = false;
    #container;

    hide(){
        return new Promise((resolve) => {
            if (!this.#isShown) {
                resolve();
            } else {
                const f = (e)=>{if (e.animationName == layoutView.hideAnimationName) {
                    this.removeEventListener("animationend",f);
                    this.classList.remove(layoutView.hideAnimationName);
                }}
                this.#isShown = false;
                this.addEventListener("animationend",f);
                this.classList.add(layoutView.hideAnimationName);
                this.removeAttribute("active");
            }
        });
    }

    show(){
        return new Promise((resolve) => {
            if (this.#isShown){
                resolve();
            } else {
                const f = (e)=>{ if (e.animationName == layoutView.showAnimationName) {
                    this.removeEventListener("animationend",f);
                    this.classList.remove(layoutView.showAnimationName);
                    resolve();
                }}
                this.#isShown = true;
                this.addEventListener("animationend",f)
                this.classList.add(layoutView.showAnimationName);
                this.setAttribute("active","");
            }
        })
    }
}

customElements.define("layout-view",layoutView);