
const processors = {
  1:cycleCheckDepth,
  2:getDiameterWidth,
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

function exclude(searchFrom, searchIn) {
  let answer = [];
  for (let i = 0; i < searchFrom.length; i++) {
    if (!searchIn.includes(searchFrom[i])){
      answer.push(searchFrom[i]);
    }
  }
  return answer;
}

function contains(array2D,item){
  for (let i = 0; i < array2D.length; i++) {
    if(array2D[i].includes(item)){
      return true;
    }
  }
  return false;
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

function cycleCheckDepth(matrix) {
  let adjacency = getAdjacency(matrix);
  let all = Array.from({length: matrix.length}, (_, i) => i);

  let a = dfs([all[0]],[all[0]],adjacency);
  return a;

  function dfs(path,visited,adjacency) {

    let neighbors = adjacency[(path[path.length-1])]

    for (let i = 0; i < neighbors.length; i++) {
      if (path.includes(neighbors[i])){
        return true;
      }
    }

    neighbors = exclude(neighbors,visited);

    if (neighbors.length > 0) {

      path.push(neighbors[0]);
      if ( !(visited.includes(neighbors[0])) ) visited.push(neighbors[0]);

      return dfs(path,visited,adjacency);

    } else {
      path.pop();
      if (path.length <=0) {
        let all = Array.from({length: adjacency.length}, (_, i) => i);
        let unVisited = exclude(all,visited);
        if (unVisited.length > 0) {
          if ( !(visited.includes(unVisited[0])) ) visited.push(unVisited[0]);
          return dfs([unVisited[0]],visited,adjacency)
        } else {
          return false;
        }
      }
      return dfs(path,visited,adjacency);
    }

  }

}

function getDiameterWidth(matrix) {
  let adjacency = getAdjacency(matrix);
  let all = Array.from({length: matrix.length}, (_, i) => i);

  let distanceMatrix = new Array(matrix.length).fill().map(i => (new Array(matrix.length).fill(NaN)));

  console.log(distanceMatrix);

  for (let i = 0; i < all.length; i++) {

    console.log(i);

    let distances = new Array(matrix.length).fill(Infinity);
    distances[i] = 0;
    let qeue = []
    let current = all[i];

    let check = true;
    do {

      let neighbors = adjacency[current];
      for (let j = 0; j < neighbors.length; j++) {
        if (!qeue.includes(neighbors[j]) && distances[neighbors[j]] == Infinity){
          qeue.push(neighbors[j]);
          distances[neighbors[j]] = distances[current] + matrix[current][(neighbors[j])]
        } else {
          let distance = distances[current] + matrix[current][(neighbors[j])]
          if (distances[(neighbors[j])] > distance) {
            distances[(neighbors[j])] = distance;
          }
        }
      }

      if (qeue.length > 0){
        let shortest = {distance:Infinity};
        for (let j = 0; j < qeue.length; j++) {
          if (shortest.distance > distances[qeue[j]]) {
            shortest = {index:j,distance:distances[qeue[j]]};
          }
        }
        current = qeue[shortest.index];
        qeue.splice(shortest.index, 1);
      } else {
        check = false;
      }

    } while (check);

    distanceMatrix[i] = distances;

  }
  console.log(distanceMatrix);
  let max = 0;
  for (let i = 0; i < distanceMatrix.length; i++) {
    for (let j = 0; j < distanceMatrix[i].length; j++) {
      distanceMatrix[i][j]
      if (distanceMatrix[i][j] > max && distanceMatrix[i][j] != Infinity) {
        max = distanceMatrix[i][j];
      }
    }
  }
  return max;
}
