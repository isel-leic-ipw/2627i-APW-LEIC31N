// Module 2: for basic object operations


let a = {}

export function addAll(obj) {
    console.log("AddAll from module2")
    let sum = 0
    for(let key in obj) {
        if(Number.isInteger(obj[key])) {
            sum += obj[key]
        }
    }
    return sum
}
