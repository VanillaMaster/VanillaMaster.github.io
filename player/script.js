const playerWindow = document.getElementById("playerWindow");
const pseudoPlayerWindow = document.getElementById("pseudoPlayerWindow");
const playerContant = document.getElementById('playerContant');
const dockbar = document.getElementById('dockbar');

const height = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minimized-player-height'));
const dockbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bottom-dock-bar-height'));


document.getElementsByTagName('body')[0].addEventListener('scroll', function(e) {
  let percent = (this.scrollTop / (this.scrollHeight - this.offsetHeight)).toFixed(2);
  playerWindow.style.height = `${((pseudoPlayerWindow.offsetHeight - height) * percent + height).toFixed(0)}px`;
  playerContant.style.opacity = percent;
  dockbar.style.bottom = `${(-percent*dockbarHeight).toFixed(2)}px`
});
