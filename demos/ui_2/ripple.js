(function () {

  const buttons = document.getElementsByClassName('ripple');
  //const tooltip = document.getElementById("tooltip");

  var toolTipTimer = null;

  for (let button of buttons) {

    //====== ripple effect ======
    var timer = null;
    button.addEventListener("touchstart",() => {
      button.dataset.animation = "false";
      button.offsetHeight;
      button.dataset.animation = "true";

      clearTimeout(timer);
      timer = setTimeout(() => {
        button.dataset.animation = "false";
      },150);
    });

    //====== custom context menu ======
    /*
    button.addEventListener('contextmenu',(e) =>{
      e.preventDefault();
      clearTimeout(toolTipTimer);
      tooltip.innerText = button.title || "undefined";
      tooltip.style.top = `${e.pageY - 60}px`;
      tooltip.style.left = `${e.pageX}px`;
      tooltip.style.display = "block";
      toolTipTimer = setTimeout(() => {
        tooltip.style.display = null;
      },1500);
    });
    */
  }

})();
