// Module 1: for basic arithmetic operations
let a = 123

export function addAll(...args) {
    console.log("AddAll from module1")
    let sum = 0
    for(let i = 0; i < args.length; ++i) {
        if(Number.isInteger(args[i])) {
            sum += args[i]
        }
    }        
    return sum
}


export function add(a, b) {
    if(!Number.isInteger(a) || !Number.isInteger(b)) {
         return NaN
    }
    return a + b;
}
