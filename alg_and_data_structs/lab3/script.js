
const processors = {
  1:getArtPoints,
  2:getBridges,
}

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

  //let data = getDiameterWidth(matrix);
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

function getAdjacency(matrix) {
  let adjacency = [];
  for (let i = 0; i < matrix.length; i++) {
    let out = [];
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] != 0) {
        out.push(j);
      }
    }
    adjacency.push(out)
  }
  return adjacency;
}

function getArtPoints(matrix) {
  let adjacency = getAdjacency(matrix);
  let all = Array.from({length: matrix.length}, (_, i) => i);

  //=====
  let result = [];
  let visited = new Array(matrix.length).fill(false);
  let disc = new Array(matrix.length).fill(0);
  let low = new Array(matrix.length).fill(0);
  let parent = new Array(matrix.length).fill(null);
  let time = 0;

  visited.forEach((item, i) => {
    if (!item) {
      findArtPoints(i);
      console.log(result);
      console.log(visited);
      console.log(low);
      console.log(disc);
    }
  });


  //findArtPoints(0);

  function findArtPoints(node) {
    visited[node] = true;
    low[node] = time + 1;
    disc[node] = time + 1;
    time++;
    let child = 0;
    console.log(node);
    //console.log(adjacency);
    adjacency[node].forEach((item, i) => {
      if (!visited[item]) {
        child++;
        parent[item] = node;
        findArtPoints(item);
        low[node] = Math.min(low[node],low[item]);
        if (parent[node] == null && child > 1) {
          result.push(node);
        }
        if (parent[node] != null && low[item] >= disc[node]) {
          result.push(node)
        }
      } else if (item != parent[node]) {
        low[node] = Math.min(low[node],disc[item]);
      }
    });

  }

  return result;

}

function getBridges(matrix) {
  let adjacency = getAdjacency(matrix);
  let all = Array.from({length: matrix.length}, (_, i) => i);

  //=====
  let result = [];
  let visited = new Array(matrix.length).fill(false);
  let disc = new Array(matrix.length).fill(0);
  let low = new Array(matrix.length).fill(0);
  let parent = new Array(matrix.length).fill(null);
  let time = 0;

  visited.forEach((item, i) => {
    if (!item) {
      findBridges(i);
      console.log(result);
      console.log(visited);
      console.log(low);
      console.log(disc);
    }
  });


  //findArtPoints(0);

  function findBridges(node) {
    visited[node] = true;
    low[node] = time + 1;
    disc[node] = time + 1;
    time++;
    console.log(node);
    adjacency[node].forEach((item, i) => {
      if (!visited[item]) {
        parent[item] = node;
        findBridges(item);
        low[node] = Math.min(low[node],low[item]);
        if (low[item] > disc[node]) {
          result.push({start:node,end:item});
        }
      } else if (item != parent[node]) {
        low[node] = Math.min(low[node],disc[item]);
      }
    });

  }

  let answer = "";
  result.forEach((item, i) => {
    answer+=`${item.start}:${item.end}; `
  });


  return answer;

}
