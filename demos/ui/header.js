(function () {

  const style = getComputedStyle(document.body);

  const appHeaderDeltaHeight = parseInt(style.getPropertyValue('--app-header-max-height')) - parseInt(style.getPropertyValue('--app-header-min-height'));

  // 80 to 35
  const titleFontDetaSize = 80-35;


  const views = document.getElementsByClassName("app_view");

  for (let view of views) {

    let title = view.querySelector(".title");

    if (title) {

      view.addEventListener("scroll",(e) => {
        if (view.scrollTop <= appHeaderDeltaHeight) {
          let fontSize = 80 - (titleFontDetaSize / 100 * Math.trunc((view.scrollTop/appHeaderDeltaHeight)*100));
          title.style.fontSize = `${fontSize}px`
        } else {
          title.style.fontSize = `${35}px`
        }
      },{passive: true});

    }

  }

})();
