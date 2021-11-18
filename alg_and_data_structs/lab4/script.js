const processors = {
  1:khun,
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

function checkBipart(matrix) {

  let adjacency = getAdjacency(matrix);

  let visited = new Array(matrix.length).fill(NaN);

  for (let i = 0; i < visited.length; i++) {
    let item = visited[i]
    if (isNaN(item)) {
      if (dfs([i])) {
        return false;
      }
    }
  }
  return true;

  function dfs(path) {
    let curent = path[(path.length - 1)];
    if (path.length>1) {
      visited[curent] = !(visited[path[path.length - 2]])
    } else {
      visited[curent] = true;
    }
    let neighbors = adjacency[curent];

    let unVisitedNeighbors = [];
    for (let i = 0; i < neighbors.length; i++) {
      let item = neighbors[i];
      if (isNaN(visited[item])) {
        unVisitedNeighbors.push(item);
      } else {
        if (visited[curent] == visited[item]) {
          return true;
        }
      }
    }

    if (unVisitedNeighbors.length > 0) {
      path.push(unVisitedNeighbors[0]);
      return dfs(path)
    } else if (path.length>1) {
      path.pop();
      return dfs(path);
    } else {
      return false;
    }
  }
}

function khun(matrix) {

  let adjacency = getAdjacency(matrix);

  let G = {nodes:Array.from({length: matrix.length}, (_, i) => ({index:i,neighbors:adjacency[i],isExposed:true,})),matching:[]};

  let check = true;
  while (check) {
    check = improveMatching(G);
  }

  let result = "";
  G.matching.forEach((edge, i) => {
    result+= `(${edge.start}:${edge.end});`
  });

  return result;

  function improveMatching(graph) {
    let exposed = getExposed(graph);
    for (let i = 0; i < exposed.length; i++) {
      let path = findAugPath(graph,exposed[i]);
      if (path) {
        path.forEach((item, i) => {
          for (let j = (graph.matching.length - 1); j >= 0; j--) {
            let edge = graph.matching[j];
            if (edge.start == item || edge.end == item) {
              graph.nodes[edge.start].isExposed = true;
              graph.nodes[edge.end].isExposed = true;
              graph.matching.splice(j,1);
            }
          }
        });

        for (let j = 0; j < path.length; j+=2) {
          graph.matching.push({start:path[j],end:path[j+1]});
          graph.nodes[(path[j])].isExposed = false;
          graph.nodes[(path[j+1])].isExposed = false;
        }
        return true;
      }
    }
    return false;
  }

  function getExposed(graph) {
    let result = [];
    graph.nodes.forEach((node, i) => {
      if (node.isExposed)
        result.push(node);
    });
    return result;
  }

  function findAugPath(graph,node) {
    let parents = new Array(graph.nodes.length).fill(NaN);
    parents[node.index] = null;
    let qeue = [node];
    while (qeue.length>0) {
      let curent = qeue.shift();
      let neighbors = curent.neighbors;
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        if (isNaN(parents[neighbor])) {
          if (graph.nodes[neighbor].isExposed) {
            parents[neighbor] = curent.index;
            let path = [neighbor];
            while ((parents[path[path.length-1]]) != null) {
              path.push(parents[path[path.length-1]]);
            }
            return path;
          } else {
            for (let i = 0; i < graph.matching.length; i++) {
              let edge = graph.matching[i];
              if (edge.start == neighbor || edge.end == neighbor) {
                let secondNode;
                if (edge.start != neighbor) {
                  secondNode = edge.start;
                } else {
                  secondNode = edge.end;
                }
                parents[neighbor] = curent.index;
                parents[secondNode] = neighbor;
                qeue.push(graph.nodes[secondNode]);
                break;
              }
            }
          }
        }
      }
    }
    return null;
  }
}
