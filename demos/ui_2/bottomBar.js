
const bottomBarButtons = document.getElementById("bottomNav").getElementsByTagName("a");

for (let button of bottomBarButtons) {

  button.addEventListener("click",(e) => {

    //console.log(window.location.hash);

    if (!button.classList.contains("active")) {
      for (let iButtons of bottomBarButtons) {
        iButtons.classList.remove("active");
      }
      button.classList.add("active");
    }

  });
}
