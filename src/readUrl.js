const fetch = require('node-fetch');

class ReadUrl {
    constructor(url) {
        this.url = url;
    }

    async fetchTextFromUrl(){
        const response = await fetch(this.url);
        return await response.text();
    }

}

module.exports = ReadUrl;
