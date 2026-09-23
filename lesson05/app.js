import { addAll as addAllNumbers, add } from './module1.mjs'
import { addAll as addAllObject } from './module2.mjs'


// Some application that uses the arithmetic library functions  
console.log(addAllNumbers(1, 2, 3, 4))  // 10
console.log(add(5, 7))          // 12
console.log(add(5, '7'))        // NaN
console.log(addAllObject({a: 1, b: 2, c: 3, d: 4, e: "SLB", f: { }}))  // 10
