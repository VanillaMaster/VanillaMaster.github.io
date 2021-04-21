const fs = require('fs');
let f =fs.readFileSync("./input.txt","utf-8");

//=====================
const endOfLine = '\r\n'
//=====================



const data = f.split(endOfLine);
const n = data[0] || 0;

let adjacency = [];

for (var i = 1; i < data.length; i++) {
  let tmpData = data[i].split(' ');
  let out = [];
  for (var j = 0; j < tmpData.length; j++) {
    if (tmpData[j] == 1) {
      out.push(j);
    }
  }
  adjacency.push(out)
}


function calc() {

  let path = [];
  let used = [];
  path.push(0);
  used.push(0);

  let check = true;

  while (check) {
    let avaleble = exclude(adjacency[path[path.length-1]],used);
    let tmp = path.slice(0,path.length-2);
    console.log(`path: ${path}`);
    console.log(tmp);
    if (haveSame(adjacency[path[path.length-1]],tmp) && path.length>=3) {
      console.log(haveSame(adjacency[path[path.length-1]],tmp));
      return path;
    }
    if (path[path.length-1] == 10 && false) {
      console.log(adjacency[path[path.length-1]]);
      console.log(path.splice(0,path.length-1));
      console.log(haveSame(adjacency[path[path.length-1]],path.splice().splice(-1,1)));
      //let result = false
      adjacency[path[path.length-1]].forEach((item, i) => {
        if (path.splice().splice(-1,1).includes(item)){
          console.log(true);
        }
      });
      //return result;
    }
    if (avaleble.length>0) {
      path.push(avaleble[0]);
      used.push(avaleble[0]);
    } else {
      path.pop();
      if (path.length <= 0) {
        check = false;
      }
    }
  }

  console.log("end");
  return false;

}

function haveSame(searchFrom, searchIn) {
  let result = false
  searchFrom.forEach((item, i) => {
    if (searchIn.includes(item)){
      result = item;
    }
  });
  return result;
}

function exclude(searchFrom, searchIn) {
  let answer = [];
  searchFrom.forEach((item, i) => {
    if (!searchIn.includes(item)){
      answer.push(item);
    }
  });
  return answer;
}


let result = calc();
console.log("=== result ===");
console.log(result);
