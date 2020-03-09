const fetch = require('node-fetch');
const UniqueWords = require('./countUniqueWords');
const Reader = require('./reader');

class ReadUrl extends Reader{
    constructor(url) {
        super();
        this.url = url;
    }

    async read(){
        const response = await fetch(this.url);
        let text = await response.text();
        let uniqueWords = new UniqueWords(text);
        uniqueWords.convertTextToDict();
        return uniqueWords;
    }
}

module.exports = ReadUrl;
