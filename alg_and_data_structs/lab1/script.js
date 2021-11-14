(function () {

  var nodes = 2

  const generator = {
    1: generateOne,
    2: generateTwo,
    3: generateThree,
    4: generateFour,
    5: generateFive,
  }

  const inputIndicator = document.getElementById("inputIndicator");
  document.getElementById("input").oninput = (e) => {
    inputIndicator.innerText = e.srcElement.value
    console.log(e.srcElement.value);
    nodes = parseInt(e.srcElement.value);
  }

  const select = document.getElementById("select");
  document.getElementById("button").addEventListener("click", ()=>{
    console.log(select.value);

    let graph = generator[select.value](nodes);

    displayMatrix(graph);

    console.log(`check: ${cycleCheck(graph)}`);

  })

  function createEmptyMatrix(size) {
    return new Array(size).fill().map(i => (new Array(size).fill(0)));
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomBool(){
    return !!getRandom(0,1);
  }

  function displayMatrix(matrix) {
    matrix = matrix.join("\n").replaceAll(","," ");
    //console.log(`https://graphonline.ru/?matrix=${encodeURI(matrix)}&separator=space`);

    document.body.querySelector(".visualize").src = `https://graphonline.ru/?matrix=${encodeURI(matrix)}&separator=space`;

    document.querySelector(".display").innerHTML = matrix;
  }

  function cycleCheck(matrix) {
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
          //console.log(all);
          //console.log(visited);
          //console.log(unVisited);
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

  }

  function generateOne(size) {
    let matrix = createEmptyMatrix(size)
    let max = 0;
    for (let i = 1; i < size; i++) {
      max++;
      for (let j = 0; j < max; j++) {
        let random = getRandom(1,9)
        matrix[i][j] = random;
        matrix[j][i] = random;
      }
    }
    return matrix;
  }

  function generateTwo(size){
    let matrix = createEmptyMatrix(size);

    let cells = (size) * ((size-1)/2);

    let sidesAmount = getRandom(0,cells)
    let sides = new Array(sidesAmount).fill(1)

    for (let i = 0; i < sides.length; i++) {
      sides[i] = getRandom(1,9);
    }

    for (let i = 0; i < (cells - sidesAmount); i++) {
      let index = getRandom(0,(sides.length - 1))
      sides.splice(index,0,0);
    }

    let usedSides = [];
    let max = 0;
    let l = 0;
    for (let i = 1; i < size; i++) {
      max++;
      for (let j = 0; j < max; j++) {
        if (getRandomBool()) {
          matrix[i][j] = sides[l]
          if (sides != 0) usedSides.push({x:i,y:j,value:sides[l]});
        } else {
          matrix[j][i] = sides[l]
          if (sides != 0) usedSides.push({x:j,y:i,value:sides[l]});
        }
        l++;
      }
    }

    while (cycleCheck(matrix)) {
      let remove = getRandom(0,usedSides.length);
      console.log(`rem:${remove}; max:${usedSides.length}`);

      matrix[(usedSides[remove].x)][(usedSides[remove].y)] = 0;
      usedSides.splice(remove, 1);

    }

    return matrix;
  }

  function generateThree(size) {
    let matrix = createEmptyMatrix(size)

    let cells = (size) * ((size-1)/2);

    let sidesAmount = getRandom(0,(cells - 1));
    let sides = new Array(sidesAmount).fill(1)

    for (let i = 0; i < (cells - sidesAmount); i++) {
      let index = getRandom(0,(sides.length - 1))
      sides.splice(index,0,0);
    }

    let max = 0;
    let l = 0;
    for (let i = 1; i < size; i++) {
      max++;
      for (let j = 0; j < max; j++) {
        matrix[i][j] = sides[l]
        matrix[j][i] = sides[l]
        l++;
      }
    }

    return matrix;
  }

  function generateFour(size) {

    let matrix = createEmptyMatrix(size);

    let cells = (size) * ((size-1)/2);

    let sidesAmount = getRandom(1,cells)
    let sides = new Array(sidesAmount).fill(1)

    for (let i = 0; i < sides.length; i++) {
      sides[i] = getRandom(1,9);
    }

    for (let i = 0; i < (cells - sidesAmount); i++) {
      let index = getRandom(0,(sides.length - 1))
      sides.splice(index,0,0);
    }

    let usedSides = [];
    let max = 0;
    let l = 0;
    for (let i = 1; i < size; i++) {
      max++;
      for (let j = 0; j < max; j++) {
        if (getRandomBool()) {
          matrix[i][j] = sides[l]
          if (sides[l]!=0) usedSides.push({x:i,y:j});
        } else {
          matrix[j][i] = sides[l]
          if (sides[l]!=0) usedSides.push({x:j,y:i});
        }
        l++;
      }
    }

    console.log(usedSides);

    if (!cycleCheck(matrix)) {
      if (size > 1) {
        let index = getRandom(0,(usedSides.length - 1));
        matrix[(usedSides[index].y)][(usedSides[index].x)] = 1
      } else {
        matrix[0][0] = getRandom(1,9);
      }
    }

    return matrix;

  }

  function generateFive(size) {
    let matrix = createEmptyMatrix(size);

    let p1size = getRandom(1, (size-1));
    let p2size = size - p1size;

    console.log(`${p1size}:${p2size}`);

    p2size = Array.from({length: p2size}, (_, i) => i+p1size);

    p1size = Array.from({length: p1size}, (_, i) => i);

    console.log(`${p1size}:${p2size}`);

    for (let i = 0; i < p1size.length; i++) {
      for (let j = 0; j < p2size.length; j++) {
        if (getRandomBool()) {
          matrix[(p1size[i])][(p2size[j])] = 1;
          matrix[(p2size[j])][(p1size[i])] = 1;
        }
      }
    }

    return matrix;
  }

})();
