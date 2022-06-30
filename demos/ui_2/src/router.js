class Router{

    static init(){
        window.history.replaceState({depth:0},window.location.href);
    }

    constructor(){
        window.addEventListener("popstate",(e)=>{this.#processState(e)})
    }

    registerLayout(layout,path){
        this.#layouts.set(path,layout);
        if (this.#activeLayout !== null) {return}
        if (layout.hasAttribute("active")){this.#activeLayout = path;}
    }
    #layouts = new Map();
    #activeLayout = null;

    get activeLayout(){
        return this.#layouts.get(this.#activeLayout);
    }

    goto(path){
        if (path === this.#activeLayout){return}
        if (!(this.#layouts.has(path))) {if (!this.loadLayout(path)) {return}}
        
        let prevLayout = this.#layouts.get(this.#activeLayout);
        let nextLayout = this.#layouts.get(path);

        window.history.pushState({depth: (++this.#depth)},"",path)

        prevLayout.hide(true);
        nextLayout.show(true);

        this.#activeLayout = path;
    }
    #depth = 0

    loadLayout(path){

        return false;
    }

    goback(){
        window.history.back();
    }

    #processState(e){
        //console.log(e);
        //console.log(e.state.depth > this.#depth);

        let prevLayout = this.#layouts.get(this.#activeLayout);
        let nextLayout = this.#layouts.get(e.currentTarget.location.pathname);

        if (e.state.depth > this.#depth) {
            //forward
            prevLayout.hide(true);
            nextLayout.show(true);
        } else {
            //backward
            prevLayout.hide(false);
            nextLayout.show(false);
        }
        this.#activeLayout = e.currentTarget.location.pathname;
        this.#depth = e.state.depth;
    }
}

Router.init();

Object.defineProperty(window,"router",{
    value: new Router(),
    writable: false,
    enumerable: false,
    configurable: false
})