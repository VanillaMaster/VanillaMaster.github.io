import {processors} from "./script.js";

(function () {
  const input = document.getElementById('data_input');
  input.addEventListener("input",(e)=>{
    input.style.width = "";
    input.style.height = "";

    input.style.width = `${input.scrollWidth}px`;
    input.style.height = `${input.scrollHeight}px`;
  });

  const button = document.getElementById('button');
  const out = document.getElementById("output");
  const select = document.getElementById("select");
  button.addEventListener("click",(e)=>{
    let matrix = parseMatrix(input.value);
    displayMatrix(matrix);

    let data = processors[select.value](matrix);
    out.innerText = data;
  });

  function parseMatrix(data) {
    let matrix = data.split("\n");

    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = matrix[i].split(" ");
      for (let j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = parseInt(matrix[i][j]);
      }
    }

    return matrix
  }

  const visualize = document.body.querySelector(".visualize");
  function displayMatrix(matrix) {
    matrix = matrix.join("\n").replaceAll(","," ");
    visualize.src = `https://graphonline.ru/?matrix=${encodeURI(matrix)}&separator=space`;
  }
})();
