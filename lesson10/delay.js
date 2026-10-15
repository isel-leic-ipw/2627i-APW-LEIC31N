export function delay(obj, ms) {
    //return new Promise(resolve => setTimeout(resolve, ms))
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(obj)
        }, ms)
    } )
}