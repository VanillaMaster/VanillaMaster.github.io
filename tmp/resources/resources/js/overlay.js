(function() {

const processAddedHash ={
  show: showOverlay
}
const processRemovedHash ={
  show: hideOverlay
}

  //============================================================================

  function showOverlay(value) {
    document.getElementById("overlay").classList.add("active");
    document.getElementById("overlayWindow").contentWindow.location.replace(value);
  }

  function hideOverlay() {
    document.getElementById("overlay").classList.remove("active");
    document.getElementById("overlayWindow").contentWindow.location.replace("about:blank");
  }

  //============================================================================

  document.getElementById("overlayWindow").onload = function(){
    this.style.width = `${document.getElementById('overlayWindow').contentWindow.document.body.offsetWidth}px`
  }

  document.querySelector(".overlayCloseButton").addEventListener("click", function(){
    history.back();
  })


  let elems = document.getElementsByClassName("subPage");
  for (let elem of elems) {
    elem.addEventListener("click", function(){
      event.preventDefault();

      addHashArgument("show",this.getAttribute("href"));

    })
  }


  function addHashArgument(argument,value) {

    if (!location.hash) {
      location.hash+=`${argument}=${value}`
    } else {
      location.hash+=`&${argument}=${value}`
    }

  }


  window.onhashchange = function(e) {

    const oldParams = (e.oldURL.split("#")[1] || "").split("&");
    const newParams = (e.newURL.split("#")[1] || "").split("&");

    let addedArguments = [];
    let removedArguments = []

    newParams.forEach((item, i) => {
      if (!oldParams.includes(item)) {
        addedArguments.push(item)
      }
    });

    oldParams.forEach((item, i) => {
      if (!newParams.includes(item)) {
        removedArguments.push(item)
      }
    });


    addedArguments.forEach((item, i) => {
      if (item.split("=")[0] in processAddedHash) {
        processAddedHash[item.split("=")[0]]((item.split("=")[1] || null));
      }
    });

    removedArguments.forEach((item, i) => {
      if (item.split("=")[0] in processRemovedHash) {
        processRemovedHash[item.split("=")[0]]((item.split("=")[1] || null));
      }
    });
  }

})();
