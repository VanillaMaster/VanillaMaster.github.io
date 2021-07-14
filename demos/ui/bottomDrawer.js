let app = document.getElementById("app");
let style = getComputedStyle(app);
let drawerMinHeight = parseFloat(style.getPropertyValue('--app-bottom-drawer-min-height'));
let bottomBarHeight = parseFloat(style.getPropertyValue('--app-bottom-bar-height'));

const appContainer = document.getElementById("appContainer");
const scrollHeight = appContainer.clientHeight - (bottomBarHeight + drawerMinHeight)

const bottomBar = document.getElementById("bottomNav");

console.log(scrollHeight);

appContainer.addEventListener("scroll",(e) => {
  bottomBar.style.transform = `translateY(${appContainer.scrollTop / scrollHeight * 100}%)`
}, {passive: true});
