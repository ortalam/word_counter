const ReadFile = require('./readFile');
const ReadUrl = require('./readUrl');
const ReadText = require('./readText');

class readerFactory{
    createReader(args){
        let reader;

        if (args.text){
            reader = new ReadText(args.text);
        }else if (args.file){
            reader = new ReadFile(args.file);
        }else if(args.url){
            reader = new ReadUrl(args.url);
        }

        return reader;
    }
}

module.exports = readerFactory;
