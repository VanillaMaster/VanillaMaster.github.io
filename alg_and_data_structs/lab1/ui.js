import {generator} from "./script.js";
(function () {

  //import {generator} from "./script.js";

  const inputIndicator = document.getElementById("inputIndicator");
  document.getElementById("input").oninput = (e) => {
    inputIndicator.innerText = e.srcElement.value
    nodes = parseInt(e.srcElement.value);
  }

  const select = document.getElementById("select");
  document.getElementById("button").addEventListener("click", ()=>{
    let graph = generator[select.value](nodes);
    displayMatrix(graph);
  })
})();
