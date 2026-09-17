let a = [1,2,3,4,10, 12, 15, 7, 9.4, 14, 9.5, 12]
a.p = "SLB"


console.log("Using for...of loop:")
for(const e of a) {
    console.log(e)
}

console.log("Using for...in loop:")

for(const e in a) {
    console.log(e)
}

