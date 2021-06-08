const playerWindow = document.getElementById("playerWindow");
const pseudoPlayerWindow = document.getElementById("pseudoPlayerWindow");
const playerPane = document.getElementById('playerPane');

const height = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minimized-player-height'));


playerPane.addEventListener('scroll', function(e) {
  playerWindow.style.height = `${((pseudoPlayerWindow.offsetHeight - height) * this.scrollTop / (this.scrollHeight - this.offsetHeight) + height).toFixed(0)}px`;
  if ([0,1].includes((this.scrollTop / (this.scrollHeight - this.offsetHeight)).toFixed(2))) {
    playerPane.classList.remove("active");
  }
});


document.getElementById("playerWindow").addEventListener("touchstart", function(e){
  playerPane.classList.add("active");
});
