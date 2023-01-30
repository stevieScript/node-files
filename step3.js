import { writeFile, readFile } from 'fs'
import { exit, argv } from 'process'
import { get } from 'axios'


function handleOutput(text, out){
    if (out){
        writeFile(out, text, 'utf8', err =>{
            if (err){
                console.error(`Couldn't write ${out}: ${err}`)
                exit(1)
            }
        })
    } 
    console.log(text)
}


function cat(path, out){
    readFile(path, 'utf8', (err, data) =>{
        if (err) {
            console.error(path, err)
            exit(1)
        }
        handleOutput(data, out)
    })
}

async function webCat(url, out){
    try{
        let resp = await get(url)
        handleOutput(resp.data, out)
    } catch(err){
        console.error(`Error fetching ${url}: ${err}`)
        exit(1)
    }
}

let path
let out

if (argv[2] === '--out'){
    out = argv[3]
    path = argv[4]
} else {
    path = argv[2]
}

if (path.slice(0, 4) === 'http'){
    webCat(path, out)
} else {
    cat(path, out)
}