const fs = require('fs');
const es = require('event-stream');
const countUniqueWords = require('./countUniqueWords');
const Reader = require('./reader');

class ReadFile extends Reader {
    constructor(filePath) {
        super();
        this.filePath = filePath;
    }

    read () {
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
                            resolve(uniqueWords);
                        }),
                );
        })
    };
}


module.exports  = ReadFile;



