// Module 1: for basic arithmetic operations


function addAllNumbers(...args) {
    let sum = 0
    for(let i = 0; i < args.length; ++i) {
        if(Number.isInteger(args[i])) {
            sum += args[i]
        }
    }        
    return sum
}


function add(a, b) {
    if(!Number.isInteger(a) || !Number.isInteger(b)) {
         return NaN
    }
    return a + b;
}

// Module 2: for basic object operations

function addAllObject(obj) {
    let sum = 0
    for(let key in obj) {
        if(Number.isInteger(obj[key])) {
            sum += obj[key]
        }
    }
    return sum
}


// Some application that uses the arithmetic library functions  
console.log(addAll(1, 2, 3, 4))  // 10
console.log(add(5, 7))          // 12
console.log(add(5, '7'))        // NaN
console.log(addAll({a: 1, b: 2, c: 3, d: 4, e: "SLB", f: { }}))  // 10


