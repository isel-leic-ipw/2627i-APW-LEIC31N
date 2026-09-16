
let obj = {
    name: "Palhinha",
    number: 36
 }

let obj1 = obj

obj1.age = 31

console.log(obj1)

delete obj1.age


console.log(obj.age)
console.log(obj.birthPlace)




let name = "Arkturkoglu"

name = 123

let name1 = "Tomás Araújo"




let s1 = {
    name: "Arkturkoglu",
    number: 1234,
    address: {
        street: "Avenida a, Nº 3",
        postalCode: "1000-000",
        locality: "Lisboa"
    }
}

s1.name = "António Silva"

console.log(s1.address.locality)

delete s1.name

console.log(s1.name)
//console.log(s1.Name.length)

var s2 = {
    name: "Bah",
    number: null,
    address: {
        street: "Avenida b, Nº 4",
        postalCode: "1000-000",
        locality: "Lisboa"
    }
}

// console.log("---------------------")

// console.log(s1.name)
// console.log(s1.number)
// console.log(s1.address.street)

// console.log(s2.name)
// console.log(s2.number)


// s1.Name = 34567
// s1.address = "Benfica"
// s1.age = 25

// delete s2.name

let propName = "Name"

console.log(s1.Name)      // Using dot notation
console.log(s1[propName])   // Subscript notation



let o = { 
    firstName: "Afonso",
    d : "O Maior", 
    e : 20, 
    g: { 
        a: "SLB", 
        b: 10, 
        " nome $ esquisito": 123 } 
}

let funnyName = ' nome $ esquisito' 

console.log(o.g.funnyName)
console.log(o.g[funnyName])

// let cebolas = 'a'

// let b = o.g[cebolas]

// o.a = 10
// o.b = "slb"
// o.f = function() {}
// console.log(o.g[' nome $ esquisito'])

// console.log(o)

// delete o.b

// console.log(o)

// // Using dot notation
// console.log(o.a)
// // Using subscript notation
// console.log(o['a'])

// let a = 10

// console.log(o[a])


// let propName = getPropName()
// o[propName]
// o.propName

// // o[' a$very&strange()name"for*an identifier'] = 0
// // console.log(o)







