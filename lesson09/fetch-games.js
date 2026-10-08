

import fetchObj from './my-fetch.js'

const apiKey = process.env.RAWG_API_KEY

fetchObj(`https://api.rawg.io/api/games?key=${apiKey}&page_size=30&page=1`) // Promise<Response> 
    .then(processGamesApiResponse)


fetchObj(`https://api.rawg.io/api/games?key=${apiKey}&page_size=30&page=1`) // Promise<Response> 
    .then(processGamesApiResponse)


function processGamesApiResponse(obj) {
    console.log(`Response has ${obj.results.length} games`)
    console.log(obj.results.map(game => { return { id: game.id, name: game.name } }))
}
    
