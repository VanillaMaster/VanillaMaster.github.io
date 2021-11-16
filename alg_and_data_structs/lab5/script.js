
const processors = {
  1:pushRelable,
}

console.log(`0 10 13 0 0 0
0 0 3 0 0 0
0 0 0 6 0 7
0 0 0 0 10 0
0 0 0 0 0 5
0 0 0 0 0 0`);

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
const sinkInput = document.getElementById("sinkInput");
const sourceInput = document.getElementById("sourceInput");
button.addEventListener("click",(e)=>{
  let matrix = parseMatrix(input.value);
  displayMatrix(matrix);

  let data = processors[select.value](matrix,parseInt(sourceInput.value),parseInt(sinkInput.value));
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

function pushRelable(matrix,source,sink) {

  let adjacency = getAdjacency(matrix);

  for (let i = 0; i < adjacency.length; i++) {
    adjacency[i]
    let edges = [];
    adjacency[i].forEach((item, j) => {
      edges.push({to:item,maxCapacity:matrix[i][item],curentCapacity:0})
    });
    adjacency[i] = edges;
  }

  let G = Array.from({length: matrix.length}, (_, i) => ({edges:adjacency[i],backEdges:[],height:0,exces:0,index:i}));

  init(G,source);

  let nodes;
  do {
    nodes = getNodes(G,source,sink);
    nodes.forEach((node, i) => {
      let edges = findEdges(G,node);
      let backEdges = findBackEdges(G,node);
      if (Math.max(edges.length,backEdges.length) > 0) {
        //push
        push(G,node,edges,backEdges);
      } else {
        //relable
        relable(G,node)
      }
    });
  } while (nodes.length > 0);


  console.log(G);

  let maxOut = 0;
  G[source].edges.forEach((edge, i) => {
    maxOut+= edge.maxCapacity;
  });

  let result = [(maxOut - G[source].exces),G[sink].exces]

  return `${result[0]}/${result[1]}`;

  function init(graph,source) {
    graph[source].height = graph.length;
    graph[source].edges.forEach((edge, i) => {
      edge.curentCapacity = edge.maxCapacity;// edge
      graph[edge.to].exces = edge.maxCapacity;// exces
      graph[edge.to].backEdges.push({to:graph[source].index,maxCapacity:edge.maxCapacity,})
    });

  }

  function getNodes(graph,source,sink) {
    let nodes = [];
    graph.forEach((node, i) => {
      if (i!= source && i!= sink) {
        if (node.exces > 0) { nodes.push(node); }
      }
    });
    return nodes;
  }

  function findEdges(graph,node) {
    let edges = [];
    node.edges.forEach((edge, i) => {
      if (node.height > graph[edge.to].height) {
        if (edge.maxCapacity > edge.curentCapacity) {
          edges.push(edge);
        }
      }
    });
    return edges;
  }

  function findBackEdges(graph,node) {
    let edges = [];
    node.backEdges.forEach((edge, i) => {
      if (node.height > graph[edge.to].height) {
        edges.push(edge)
      }
    });
    return edges;
  }

  function relable(graph,node) {
    let heights = [];
    node.edges.forEach((edge, i) => {
      if (edge.maxCapacity > edge.curentCapacity) {
        heights.push(graph[edge.to].height);
      }
    });
    node.backEdges.forEach((edge, i) => {
      heights.push(graph[edge.to].height);
    });
    node.height = Math.min(...heights) + 1;
  }

  function push(graph,node,edges,backEdges) {

    edges.forEach((edge, i) => {
      let flow = Math.min(node.exces,(edge.maxCapacity - edge.curentCapacity))
      node.exces-= flow;
      graph[edge.to].exces+= flow;
      edge.curentCapacity+= flow;
      let index = NaN;
      for (let j = 0; j < graph[edge.to].backEdges.length; j++) {
        if (graph[edge.to].backEdges[j].to == node.index) { index = j; }
      }
      if (isNaN(index)) {
        //add backEdge;
        graph[edge.to].backEdges.push({to:node.index,maxCapacity:edge.curentCapacity,})
      } else {
        graph[edge.to].backEdges[index].maxCapacity = flow;
      }
    });

    backEdges.forEach((edge, i) => {
      let flow = Math.min(node.exces,edge.maxCapacity)
      node.exces-= flow;
      graph[edge.to].exces+= flow;
      edge.maxCapacity-= flow;
      for (let j = 0; j < graph[edge.to].edges.length; j++) {
        if (graph[edge.to].edges[j].to == node.index){
          graph[edge.to].edges[j].curentCapacity-= flow;
          break;
        }
      }
    });

  }

}
