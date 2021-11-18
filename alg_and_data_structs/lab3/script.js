const processors = {
  1:getArtPoints,
  2:getBridges,
}

export {processors};

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

  let result = [];
  let visited = new Array(matrix.length).fill(false);
  let disc = new Array(matrix.length).fill(0);
  let low = new Array(matrix.length).fill(0);
  let parent = new Array(matrix.length).fill(null);
  let time = 0;

  visited.forEach((item, i) => {
    if (!item) {
      findArtPoints(i);
    }
  });

  function findArtPoints(node) {
    visited[node] = true;
    low[node] = time + 1;
    disc[node] = time + 1;
    time++;
    let child = 0;
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

  let result = [];
  let visited = new Array(matrix.length).fill(false);
  let disc = new Array(matrix.length).fill(0);
  let low = new Array(matrix.length).fill(0);
  let parent = new Array(matrix.length).fill(null);
  let time = 0;

  visited.forEach((item, i) => {
    if (!item) {
      findBridges(i);
    }
  });

  function findBridges(node) {
    visited[node] = true;
    low[node] = time + 1;
    disc[node] = time + 1;
    time++;
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
