const ReadFile = require('./readFile');
const ReadUrl = require('./readUrl');
const ReadText = require('./readText');

class readerFactory{
    createReader(type, textSource){
        let reader;

        switch (type) {
            case '1':
                reader = new ReadText(textSource);
                break;
            case '2':
                reader = new ReadFile(textSource);
                break;
            case '3':
                reader = new ReadUrl(textSource);
                break;
        }

        return reader;
    }
}

module.exports = readerFactory;
