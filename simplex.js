/**
 * @typedef {{
 *  func: {
 *      type: ("min" | "max"),
 *      coeficient: Array<number>   
 *  },
 *  limits: Array<{
 *      coeficient: Array<number>,
 *      type: (">=" | "=" | "<="),
 *      value: number
 *  }>
 * }} simplexInputData
 */

/**@param {simplexInputData} options */
/*export default*/ function simplex(options){

    if (options.func.type == "min") {
        
        options.func.type = "max";
        for (let i = 0; i < options.func.coeficient.length; i++) {
            options.func.coeficient[i]*= -1;
        }
        
    }
    let eqAmount = 0;
    options.limits.forEach(limit=>{
        if (limit.type == ">=") {
            limit.type = "<=";
            limit.value*= -1;
            for (let i = 0; i < limit.coeficient.length; i++) {
                limit.coeficient[i]*= -1;
            }
        }

        if (limit.type == "=") {
            eqAmount++;
        }
    })

    //additional variables
    
    const additionalVarAmount = options.limits.length - eqAmount;
    options.func.coeficient.push( ...(new Array(additionalVarAmount).fill(0)) );
    options.limits.forEach((limit,i)=>{
        const segment = new Array(additionalVarAmount).fill(0);
        segment[i] = 1;
        limit.coeficient.push(...segment);
    });

    console.log(options);
    /**@type {simplexInputData & {func:{value:number}}} */
    const data = structuredClone(options);
    for (let i = 0; i < data.func.coeficient.length; i++) {
        data.func.coeficient[i]*= -1;
    }
    data.func.value = 0;

    for (let _i = 0; _i < 10_000; _i ++) {

        const {index: minIndexColumn, val:minValueColumn} = data.func.coeficient.reduce((accum,val,index)=>{if (accum.val > val) {accum.index = index,accum.val = val}; return accum},{index:-1,val: Infinity});

        if (minValueColumn >= 0) {
            const coeficients = [
                ...(data.limits.map(val=>val.coeficient)),
                data.func.coeficient
            ]
            const values = [
                ...(data.limits.map(val=>val.value)),
                data.func.value
            ]
            const length = Math.max( ...(coeficients.map(coeficient=>coeficient.length)) );
            const baseIndexes = [];
            for (let i = 0; i < length; i++) {
                const nonZeroElements = coeficients.reduce((accum,value,index)=>{if (value[i] != 0) {accum.val++;accum.lastIndex = index} return accum},{val:0,lastIndex:-1});
                if (nonZeroElements.val == 1) baseIndexes.push({column:i,row:nonZeroElements.lastIndex});
            }
            const varValuse = {};
            baseIndexes.forEach(index=>{
                const val = values[index.row] / coeficients[index.row][index.column];
                varValuse[`x${index.column}`] = val;
            })
            console.log("result:",varValuse,data.func.value);
            break;
        }
    
        const resolveColumn = [];
    
        data.limits.forEach((limit,i)=>{
            resolveColumn.push(limit.value / limit.coeficient[minIndexColumn]);
        })
    
        const minIndexRow = (resolveColumn.reduce((accum,val,i)=>{if (accum.val > val && val > 0) {accum.val = val;accum.index = i};return accum;},{index:-1,val: Infinity})).index;
    
        const coeficient = data.limits[minIndexRow].coeficient[minIndexColumn];

        const func = (source)=>{
            const row = source.coeficient;
            const coef = row[minIndexColumn] / coeficient;
            substractArray(row,data.limits[minIndexRow].coeficient,coef);
            source.value -= ((data.limits[minIndexRow].value) * coef);
        }
    
        for (let i = 0; i < data.limits.length; i++) {
            if (i != minIndexRow)
            func(data.limits[i]);
        }
        func(data.func);
        
        console.log(data);
    }


}

function substractArray(minuend,subtrahend,coeficient) {
    const substractRow = subtrahend.map(elem=>elem*coeficient);
    for (let i = 0; i < minuend.length; i++) {
        minuend[i] -= substractRow[i];
    }
}


simplex({
    func:{
        coeficient: [3,4],
        type: "max"
    },
    limits:[
        {
            type: "<=",
            coeficient: [4,1],
            value: 8
        },
        {
            type: ">=",
            coeficient: [1,-1],
            value: -3
        }
    ]
});

simplex({
    func:{
        coeficient: [2,3],
        type: "max"
    },
    limits:[
        {
            type: "<=",
            coeficient: [1,3],
            value: 18
        },
        {
            type: "<=",
            coeficient: [2,1],
            value: 16
        },
        {
            type: "<=",
            coeficient: [0,1],
            value: 5
        },
        {
            type: "<=",
            coeficient: [3,0],
            value: 21
        }
    ]
});

