(function () {

  document.getElementById('fullscreenToggle').addEventListener("click",(e) => {
    e.target.classList.toggle("enterFullScreen");
    e.target.classList.toggle("exitFullScreen");

    toggleFullScreen();

  });


  function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

})();
