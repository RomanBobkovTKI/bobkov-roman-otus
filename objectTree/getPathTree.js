const [, , path, opts, _depth] = process.argv;
const fs = require('fs');

let fileCount = 0;
let dirCount = 0;

function getPathTree(name, depth) {

    const currentFiles = fs.readdirSync(name, { withFileTypes: true })
    currentFiles.map((element, index) => {
        if(index != currentFiles.length-1) {
            console.log('├'+'-'.repeat(depth) + element.name)
        } else if (index == currentFiles.length-1) {
            console.log('└'+'-'.repeat(depth) + element.name)
        }

        if(element.isDirectory()) {
            dirCount +=1;
            getPathTree(`${name}/${element.name}`, newDepth=depth + 1)
        } else {
            fileCount +=1;
        }
    })

}

getPathTree(path, 1)
console.log(`${dirCount} directories, ${fileCount} files`)