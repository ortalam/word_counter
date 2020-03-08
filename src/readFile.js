const fs = require('fs');
const es = require('event-stream');
const countUniqueWords = require('./countUniqueWords');

class ReadFile{
    constructor(filePath) {
        this.filePath = filePath;
    }

    readFromFile () {
        let uniqueWords = new countUniqueWords('');
        return new Promise((resolve, reject) => {
            fs.createReadStream(this.filePath)
                .pipe(es.split())
                .pipe(es.mapSync( function(text) {
                        if (text){
                            uniqueWords.setText(text);
                            uniqueWords.convertTextToDict();
                        }
                    })
                        .on('error', function(err) {
                            reject('Error while reading file.', err);
                        })
                        .on('end', async function() {
                            //todo: fix complexity
                            console.log('end file!!');
                            resolve(uniqueWords);
                        }),
                );
        })
    };
}


module.exports  = ReadFile;



