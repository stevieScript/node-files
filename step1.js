const fs = require('fs')
const process = require('process')

function cat(path){
    fs.readFile(path, 'utf8', (err, data) =>{
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log('Reading file...')
    })
}

cat(process.argv[2])