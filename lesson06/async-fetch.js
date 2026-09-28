const CHUCK_NORRIS_RANDOM_JOKE_URL = "https://api.chucknorris.io/jokes/random"

// fetch(CHUCK_NORRIS_RANDOM_JOKE_URL) // Promise<Response>
//     .then(response => response.json()) // Promise<Object>
//     .then(createProcessResponse(1))



// fetch(CHUCK_NORRIS_RANDOM_JOKE_URL) // Promise<Response>
//     .then(response => response.json()) // Promise<Object>
//     .then(createProcessResponse(2))

fetchJokes(5000)

console.log("END")


function fetchJokes(numJokes) {
    for (let i = 1; i <= numJokes; i++) {
        fetch(CHUCK_NORRIS_RANDOM_JOKE_URL)
        .then(response => response.json()) // Promise<Object>
        .then(createProcessResponse(i))
        .catch(error => console.error(error))
    }
}


function createProcessResponse(logNumber) {
    return function processResponse(data) {
        console.log(logNumber)
        console.log(data.value)
    }
}




