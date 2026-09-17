
function filter(a, predicate) {
    let ret = []
    // for (let index = 0; index < array.length; index++) {
    //     if(predicate(a[index], index, a)) {
    //         ret.push(a[index])
    //     }
    // }

    for (let e of a) {
        if(predicate(e)) {
            ret.push(e)
        }
    }

    return ret
}


function filterWithReduce(a, predicate) {
    return a.reduce((prevAcc, currElem) => {
        if(predicate(currElem)) {
            prevAcc.push(currElem)
        }
        return prevAcc
    }, [])
}

function mapWithReduce(a, projection) {
    return a.reduce((prevAcc, currElem) => {
        prevAcc.push(projection(currElem))
        return prevAcc
    }, [])
}


function map(a, prejection) {
    let ret = []
    for (let index = 0; index < array.length; index++) {
        ret.push(prejection(a[index]))
    }
    return ret

}


function repeat(amount, task) {
    for(let i = 0; i < amount; ++i) {
        task(i+1)
    }    
} 

function filter(a, predicate) {
    let result = []
    repeat(a.length, testCurrentValue)
    return result

    function testCurrentValue(position) {
        let currValue = a[position-1]
        if(predicate(currValue, position-1, a)) {
            result.push(currValue)
        }
    }
}

function map(a, projection) {
    let ret = []
    repeat(a.length, pos => ret.push(projection(a[pos-1])))
    return ret
}


//Don't Repeat Yourself (DRY)


let a = [1,2,3,4,10, 12, 15, 7, 9.4, 14, 9.5, 12]

let positiveGrades = filter(a, e => e >= 9.5)
let negativeGrades = filter(a, function(e) { return e < 9.5 })

for(let i = 0; i < a.length; ++i) {
    console.log(a[i])
}


let sum = a.reduce((prev, curr) => prev + curr, 0)

let newObj = a.reduce((prev, curr, idx) => { prev['p'+idx] = curr; return prev }, { })
console.log(newObj)


function filterWithReduce(a, predicate) {
    return a.reduce((prev, curr) => { 
        if(predicate(curr)) {
            prev.push(curr) 
        }
        return prev
    }, [])
}


let res = []
for(let i = 0; i < a.length; ++i) {
    if(a[i] >= 9,5) {
        res[res.length] = a[i] // res.push(a[i])       
    }
}

// console.log("PositiveGrades")
// let positiveGrades = a.filter(e => e >= 9.5)
// console.log(positiveGrades)


// console.log("Even numbers")
// let evenNumbers = filter(a, e => e % 2 == 0)

//console.log(evenNumbers)



// console.log("Square Numbers")
// let squareNumbers = map(a, e => e*e)
//console.log(squareNumbers)



let aObj = [ {a: 1}, {a: 2}, {b: 3}]

let aObjFiltered = filter(aObj, e => e.a != undefined )





aObjFiltered[0].a = 55
console.log(aObj[0].a)

let doubles = map(a, e => e * 2)

let aStr = ["Sport", "Lisboa", "e", "Benfica"]
let aaa = map(aStr, e => e.length)


const students = [
    { number: 40001 },
    { number: 40002 },
    { number: 45001 },
    { number: 42000 }
]


// let res1 = map(filter(students, s => s.number > 40000 && s.number < 45000), s => s.number)
let res2 = students.filter(s => s.number > 40000 && s.number < 45000)
                    .map(s => s.number)


