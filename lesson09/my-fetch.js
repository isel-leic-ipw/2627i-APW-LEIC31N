const FILE_NAME = "cache.json"
import fs from "fs/promises"
import fsClassic from "fs"

const cache = 
    fsClassic.existsSync(FILE_NAME) ? 
        await fs.readFile(FILE_NAME)
            .then(buffer => JSON.parse(buffer.toString()))
        : { }

const pendingRequestsCache = { }


export default function(resource, options) { // return Promise<object> 
    let resourcePromise = getResourceFromCache(resource)
    if(resourcePromise === undefined) {
        resourcePromise = getResource()
    }    
    return resourcePromise


    function writeCacheToFile(obj) {
        return fs.writeFile(FILE_NAME, JSON.stringify(cache))
            .then(_ => obj)
    }


    function getResourceFromCache() {
        if(cache[resource] != undefined) {
            return Promise.resolve(cache[resource])
        }

        if(pendingRequestsCache[resource] != undefined) {
            return pendingRequestsCache[resource]
        }
    }

    function getResource() {
        console.log(`Fetching resource from network: ${resource}`)
        const resourcePromise = fetch(resource, options)
            .then(rsp => rsp.json())
            .then(putResourceInCacheAndRemoveFromPendingRequests)
            .then(writeCacheToFile)
        pendingRequestsCache[resource] = resourcePromise
        return resourcePromise
    }


    function putResourceInCacheAndRemoveFromPendingRequests(obj) {
        cache[resource] = obj
        delete pendingRequestsCache[resource]
        return obj
    }
}


