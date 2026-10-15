const FILE_NAME = "cache.json"
import fs from "fs/promises"
import fsClassic from "fs"

const cache = 
    fsClassic.existsSync(FILE_NAME) ? 
        await fs.readFile(FILE_NAME)
            .then(buffer => JSON.parse(buffer.toString()))
        : { }

const pendingRequestsCache = { }


export default async function(resource, options) { // return Promise<object> 
    let resourcePromise = await getResourceFromCache(resource)
    if(resourcePromise === undefined) {
        resourcePromise = getResource()
    }    
    return resourcePromise


    async function writeCacheToFile(obj) {
        await fs.writeFile(FILE_NAME, JSON.stringify(cache))
        return obj
    }


    async function getResourceFromCache() {
        if(cache[resource] != undefined) {
            return cache[resource]
        }

        if(pendingRequestsCache[resource] != undefined) {
            return pendingRequestsCache[resource]
        }
        return undefined
    }

    async function getResource() {
        console.log(`Fetching resource from network: ${resource}`)
        const rsp = await fetch(resource, options)
        const resourcePromise = rsp.json()
        pendingRequestsCache[resource] = resourcePromise
        const obj = await resourcePromise
        putResourceInCacheAndRemoveFromPendingRequests(obj)
        await writeCacheToFile(obj)
        return resourcePromise
    }


    function putResourceInCacheAndRemoveFromPendingRequests(obj) {
        cache[resource] = obj
        delete pendingRequestsCache[resource]
        return obj
    }
}


