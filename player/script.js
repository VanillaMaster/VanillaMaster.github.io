const playerWindow = document.getElementById("playerWindow");
const pseudoPlayerWindow = document.getElementById("pseudoPlayerWindow");
const playerContant = document.getElementById('playerContant');
const dockbar = document.getElementById('dockbar');

const playerContainer = document.getElementById("playerContainer");

const height = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minimized-player-height'));
const dockbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bottom-dock-bar-height'));

var isMinified = true;
var isMaximized = false;

document.getElementById("body").addEventListener('scroll', function(e) {
  let percent = (this.scrollTop / (this.scrollHeight - this.offsetHeight)).toFixed(4);
  playerWindow.style.height = `${((pseudoPlayerWindow.offsetHeight - height) * percent + height).toFixed(2)}px`;
  playerContant.style.opacity = percent;
  dockbar.style.bottom = `${(-percent*dockbarHeight).toFixed(2)}px`


  if (isMinified){
    if(percent != 0){
      isMinified = false;
      console.log(`a:${percent}`);
      playerContainer.classList.add("uncollapsed");
    }
  } else {
    if (percent == 0) {
      isMinified = true;
      console.log(`b:${percent}`);
      playerContainer.classList.remove("uncollapsed");
    }
  }

  if (isMaximized){
    if(percent != 1){
      isMaximized = false;
      console.log(`c:${percent}`);
      playerContainer.classList.add("uncollapsed");
    }
  } else {
    if (percent == 1) {
      isMaximized = true;
      console.log(`d:${percent}`);
      playerContainer.classList.remove("uncollapsed");
    }
  }

});


playerWindow.addEventListener("touchend",() => {
  playerContainer.classList.add("untouched")
});
playerWindow.addEventListener("touchstart",() => {
  playerContainer.classList.remove("untouched")
});

document.body.ontouchstart = (e) => {console.log(e.target);}
