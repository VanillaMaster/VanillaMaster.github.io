import {generator} from "./script.js";
(function () {
  var nodes = 2;

  const inputIndicator = document.getElementById("inputIndicator");
  document.getElementById("input").oninput = (e) => {
    inputIndicator.innerText = e.srcElement.value
    nodes = parseInt(e.srcElement.value);
  };

  const select = document.getElementById("select");
  document.getElementById("button").addEventListener("click", ()=>{
    let graph = generator[select.value](nodes);
    displayMatrix(graph);
  });

  function displayMatrix(matrix) {
    matrix = matrix.join("\n").replaceAll(","," ");
    document.body.querySelector(".visualize").src = `https://graphonline.ru/?matrix=${encodeURI(matrix)}&separator=space`;
    document.querySelector(".display").innerHTML = matrix;
  }
  
})();
