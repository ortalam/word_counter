const UniqueWords = require('../uniqueWords');
const Reader = require('./reader');

class ReadText extends Reader{
    constructor(text) {
        super();
        this.text = text;
    }

    async read(){
        let uniqueWords = new UniqueWords(this.text);
        uniqueWords.convertTextToDict();
        return uniqueWords;
    }

}

module.exports = ReadText;
