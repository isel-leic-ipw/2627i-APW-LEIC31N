

import fetchObj from './my-fetch.js'
import { delay } from './delay.js'

const apiKey = process.env.RAWG_API_KEY

async function fetchGamesPage(page) {
    const gamesPage1 = await fetchObj(`https://api.rawg.io/api/games?key=${apiKey}&page_size=30&page=1`) // Promise<Response> 
    processGamesApiResponse(gamesPage1)
}


const gamesPage1Promise = fetchObj(`https://api.rawg.io/api/games?key=${apiKey}&page_size=30&page=1`) // Promise<Response> 
                          .then((obj) => delay(obj, 3000) )           
const anotherGamesPage1Promise = fetchObj(`https://api.rawg.io/api/games?key=${apiKey}&page_size=30&page=1`) // Promise<Response> 
const delay2 = delay(3000)

const gamesPage1 = await gamesPage1Promise
const gamesPage2 = await anotherGamesPage1Promise
// processGamesApiResponse(gamesPage1)
// processGamesApiResponse(await anotherGamesPage1Promise)


const pages = await Promise.all([gamesPage1Promise, anotherGamesPage1Promise, delay2])
processBothGamesPages(...pages)


function processBothGamesPages(page1, page2) {
        processGamesApiResponse(page1)
        processGamesApiResponse(page2)
}

function processGamesApiResponse(obj) {
    console.log(`Response has ${obj.results.length} games`)
    console.log(obj.results.map(game => { return { id: game.id, name: game.name } }))
}
    
