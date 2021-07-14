(function () {

  const style = getComputedStyle(document.body);

  const appHeaderDeltaHeight = parseInt(style.getPropertyValue('--app-header-max-height')) - parseInt(style.getPropertyValue('--app-header-min-height'));

  const views = document.getElementsByClassName("view");

  for (let view of views) {

    let title = view.querySelector(".title");

    let viewStyle = getComputedStyle(view)

    const maxScale = parseFloat(viewStyle.getPropertyValue('--header-title-max-scale'));
    const deltaScale = maxScale - 1;

    if (title) {

      view.addEventListener("scroll",(e) => {
        if (view.scrollTop <= appHeaderDeltaHeight) {
          title.style.transform = `scale(${maxScale-(deltaScale*(view.scrollTop/appHeaderDeltaHeight))})`
        } else {
          title.style.transform = `scale(${1})`
        }
      },{passive: true});

    }

  }

})();
