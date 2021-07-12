(function () {

  document.getElementById('fullscreenToggle').addEventListener("click",(e) => {
    e.target.classList.toggle("enterFullScreen");
    e.target.classList.toggle("exitFullScreen");

    toggleFullScreen();

  });

  const drawer = document.getElementById("bottomDrawer");
  document.getElementById("drawerCheck").addEventListener('change', function() {
    if (this.checked) {
      drawer.classList.add("active")
    } else {
      drawer.classList.remove("active")
    }
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
