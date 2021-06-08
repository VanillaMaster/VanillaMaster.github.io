const playerWindow = document.getElementById("playerWindow");
const pseudoPlayerWindow = document.getElementById("pseudoPlayerWindow");
const playerPane = document.getElementById('playerPane');

const height = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minimized-player-height'));


playerPane.addEventListener('scroll', function(e) {
  let percent = (this.scrollTop / (this.scrollHeight - this.offsetHeight)).toFixed(2);
  playerWindow.style.height = `${((pseudoPlayerWindow.offsetHeight - height) * percent + height).toFixed(0)}px`;

});


document.getElementById("playerWindow").addEventListener("touchstart", function(e){
  playerPane.classList.add("active");
});
document.getElementById("playerWindow").addEventListener("touchend", function(e){
  playerPane.classList.remove("active");
  playerPane.scroll({top: playerPane.scrollTop, behavior: 'smooth'});
});
