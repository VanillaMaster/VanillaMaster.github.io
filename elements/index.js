const dependencies = [
    "/elements/containerRipple/element.js",
    "/elements/layoutContainer/element.js",
    "/elements/layoutView/element.js",
    "/elements/listViewItem/element.js"
];

let modules = [];
dependencies.forEach((dependency)=>{
    modules.push(import(dependency))
});
modules = await Promise.all(modules);
let done = [];
modules.forEach((module_)=>{done.push(module_.done);})
await Promise.all(done);
modules.forEach((module_)=>{
    customElements.define(module_.name,module_.default);
})
console.log(modules);

document.body.style.display = null;
