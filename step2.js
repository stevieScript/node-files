import { readFile } from 'fs'
import { exit, argv } from 'process'
import { get } from 'axios'

function cat(path){
    readFile(path, 'utf8', (err, data) =>{
        if (err) {
            console.error(`Error reading ${path}: ${err}`)
            exit(1)
        }
        console.log(data)
    })
}

async function webCat(url){
    try{
        let resp = await get(url)
        console.log(resp.data)
    } catch(err){
        console.error(`Error fetching ${url}: ${err}`)
        exit(1)
    }
}

let path = argv[2]

if (path.slice(0, 4) === 'http'){
    webCat(path)
} else {
    cat(path)
}