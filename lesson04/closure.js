let f

function outerFunction(i) {
    let b = 10

    return f = function innerFunction() {
        return i++ + b
    }
}




let ret = outerFunction(5)

console.log(f())
console.log(ret())
// console.log(ret())


let ret1 = outerFunction(1)
console.log(ret1())
console.log(f())
