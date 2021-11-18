(function () {

  const generator = {
    1: generateOne,
    2: generateTwo,
    3: generateThree,
    4: generateFour,
    5: generateFive,
  }
  
  export {generator}

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

  //min-size = 2;
  function generateFive(size) {
    let matrix = createEmptyMatrix(size);

    let p1size = getRandom(1, Math.trunc(size/2)); //small one
    let p2size = size - p1size; //large one

    let p1 = Array.from({length: p1size}, (_, i) => i);
    let p2 = Array.from({length: p2size}, (_, i) => i+p1size);

    let chainSize = getRandom(2,(p1size*2));
    let chainP1 = [];
    let chainP2 = [];

    let tmpP1 = p1;
    let tmpP2 = p2;

    let last = null;
    let curent;
    for (let i = 0; i < chainSize; i++) {
      if (i%2 == 0) {
        curent = tmpP1.splice(getRandom(0,(tmpP1.length-1)),1)[0];
        chainP1.push(curent)
      } else {
        curent = tmpP2.splice(getRandom(0,(tmpP2.length-1)),1)[0];
        chainP2.push(curent)
      }
      if (last != null) {
        matrix[last][curent] = 1;
        matrix[curent][last] = 1;
      }
      last = curent;
    }

    p1.forEach((node1, i) => {
      let node = chainP2[getRandom(0,(chainP2.length-1))];
      matrix[node1][node] = 1;
      matrix[node][node1] = 1;
      p2.forEach((node2, j) => {
        if (getRandomBool()) {
          matrix[node1][node2] = 1;
          matrix[node2][node1] = 1;
        }
      });
    });

    p2.forEach((node2, i) => {
      let node = chainP1[getRandom(0,(chainP1.length-1))];
      matrix[node2][node] = 1;
      matrix[node][node2] = 1;
      p1.forEach((node1, j) => {
        if (getRandomBool()) {
          matrix[node1][node2] = 1;
          matrix[node2][node1] = 1;
        }
      });
    });
    return matrix;
  }

})();
