const playerWindow = document.getElementById("playerWindow");
const pseudoPlayerWindow = document.getElementById("pseudoPlayerWindow");

const height = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--minimized-player-height'));

console.log(height);

document.getElementById('playerPane').addEventListener('scroll', function(e) {
  playerWindow.style.height = `${((pseudoPlayerWindow.offsetHeight - height) * this.scrollTop / (this.scrollHeight - this.offsetHeight) + height).toFixed(0)}px`;
});
