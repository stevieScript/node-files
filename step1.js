import { readFile } from 'fs'
import { exit, argv } from 'process'

function cat(path){
    readFile(path, 'utf8', (err, data) =>{
        if (err) {
            console.error(err)
            exit(1)
        }
        console.log(data)
    })
}

cat(argv[2])