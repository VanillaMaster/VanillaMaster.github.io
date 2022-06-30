//native OnePlus touch sound
const click_sound = new Audio("https://vanillamaster.github.io/ui/Effect_Tick.ogg")

class ContainerRipple extends HTMLElement {
    constructor() {
        super();
        this.load();
    }
    load(){
        const fragment = ContainerRipple.template.cloneNode(true)

        let container = fragment.querySelector(".container");

        this.addEventListener("pointerdown",(e)=>{
            const ripple = document.createElement("div");

            ripple.classList.add("effect-ripple");

            ripple.style.setProperty("--x",`${e.layerX}px`);
            ripple.style.setProperty("--y",`${e.layerY}px`);

            const f = (e)=>{container.removeChild(ripple);}
            ripple.addEventListener("transitionend",f);
            ripple.addEventListener("transitioncancel",f)

            container.append(ripple);

            this.addEventListener("contextmenu",this.onContextMenu);
            this.addEventListener("pointerup",this.onPointerUp);
            
            this.addEventListener("pointerleave",(e)=>{
                ripple.setAttribute("disappearing","");
                this.removeEventListener("pointerup",this.onPointerUp);
                this.removeEventListener("contextmenu",this.onContextMenu);
            },{once:true});
        });

        this.addEventListener("gotpointercapture",(e)=>{
            this.releasePointerCapture(e.pointerId);
        })
        
        //fix for mouse
        this.addEventListener("mouseup",(e)=>{
            this.dispatchEvent(new Event("pointerleave"))
        })

        this.#shadow = this.attachShadow({mode:'open'});
        this.#shadow.append(fragment);
    }
    #shadow;

    onPointerUp(e){
        click_sound.currentTime = 0;
        click_sound.play();
        const event = new Event("click");
        for (const elem of this.children) {
            elem.dispatchEvent(event)
        }
        this.removeEventListener("contextmenu",this.onContextMenu);
    }

    onContextMenu(e){
        e.preventDefault();
        this.removeEventListener("pointerup",this.onPointerUp);
        const event = new Event("contextmenu");
        for (const elem of this.children) {
            elem.dispatchEvent(event)
        }
    }
}

const done = new Promise(async (resolve,reject)=>{
    let html = await ((await fetch("/elements/containerRipple/element.html")).text());
    Object.defineProperty(ContainerRipple,"template",{
        value: document.createRange().createContextualFragment(html),
        enumerable: false,
        configurable: false,
        writable: false,
    });
    resolve();
})
const name = "container-ripple";
export {ContainerRipple as default,done,name};