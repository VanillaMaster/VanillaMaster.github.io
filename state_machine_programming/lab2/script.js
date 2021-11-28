export {programm,tm,_};

const _ = undefined;
// palindrome
var programm = {
  "q1":{
    0:{move:1,write:_,state:"q2"},
    1:{move:1,write:_,state:"q3"},
    [_]:{move:0,write:_,state:"Y"},
  },
  "q2":{
    0:{move:1,write:0,state:"q2"},
    1:{move:1,write:1,state:"q2"},
    [_]:{move:-1,write:_,state:"q4"},
  },
  "q3":{
    0:{move:1,write:0,state:"q3"},
    1:{move:1,write:1,state:"q3"},
    [_]:{move:-1,write:_,state:"q5"},
  },
  "q4":{
    0:{move:-1,write:_,state:"q6"},
    1:{move:0,write:_,state:"N"},
    [_]:{move:0,write:_,state:"Y"},
  },
  "q5":{
    0:{move:0,write:_,state:"N"},
    1:{move:-1,write:_,state:"q6"},
    [_]:{move:0,write:_,state:"Y"},
  },
  "q6":{
    0:{move:-1,write:0,state:"q6"},
    1:{move:-1,write:1,state:"q6"},
    [_]:{move:1,write:_,state:"q1"},
  },
};


function tm(p,m,cS,eS,i) {
  for (let a = p[cS][m[i]]; !eS.includes(cS); a = p[cS]?.[m[i]]) { m[i] = a.write; i+= a.move; cS = a.state; } return cS;
}
