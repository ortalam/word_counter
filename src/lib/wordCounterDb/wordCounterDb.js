require('../../models/wordCounter');
const mongoUri = 'mongodb+srv://admin:pass@cluster0-dn91y.mongodb.net/lemonade?retryWrites=true&w=majority';
const mongoose = require('mongoose');

class WordCounterDb{
    constructor() {
        this.init();
    }

    init(){
        this.wordCounter = mongoose.model('word_counter');
        mongoose.connect(mongoUri,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

    }

    async findAndUpdateOrInsert(dict){
        let operations = [];
        for (let [word, count] of dict) {
            operations.push(
                { updateOne : {
                        "filter" : { "word" : word },
                        "update" : {$inc: { count: count } } ,
                        "upsert" : true
                    }}
            );
        }
        try{
            await this.wordCounter.bulkWrite(operations, { "ordered": false });
        }catch (e) {
            console.log(e);
        }
    }

    async findWordInDb(word){
        try {
            return await this.wordCounter.findOne({word});
        }catch (e) {
            console.log(e);
        }
    }

    async getWordInstances(word){
        word = word.toLowerCase();
        const wordCounterObj = await this.findWordInDb(word);
        return wordCounterObj ? wordCounterObj.count : 0;
    };

}


module.exports  = new WordCounterDb();
