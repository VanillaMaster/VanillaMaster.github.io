import {programm,tm} from "./script.js";
(function () {
  for (let [key, value] of Object.entries(programm)) {
    let row = document.createElement("tbody");
    let inner = "";
    let isFirst = true;
    for (let [iKey, iValue] of Object.entries(value)){
      if (isFirst) { inner+= `<tr><td rowspan="${Object.keys(iValue).length}">${key}</td>`; isFirst = false; }
      inner+=`<td>${(iKey == "undefined") ? "_" : iKey}</td>
      <td>${(iValue.write == _) ? "_" : iValue.write}</td>
      <td>${(iValue.move == 0) ? " " : ((iValue.move > 0) ? "&rarr;" : "&larr;")}</td>
      <td>${iValue.state}</td></tr>`;
    }
    row.innerHTML = inner;
    document.getElementById("table").appendChild(row);
  }

  const output = document.getElementById("output");
  const input = document.getElementById("input");
  const button = document.getElementById("button");
  button.addEventListener("click",(e)=>{
    let memory = input.value.split("");
    console.log(memory);
    output.innerText = tm(programm,memory,"q1",["N","Y"],0);
  });
})();
