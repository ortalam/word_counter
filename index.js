const wordCounterDb = require('./src/lib/wordCounterDb');
const ReaderFactory = require('./src/lib/reader');
const args = require('yargs').argv;

const printCountUniqueWordsAndUpdateDb = async (uniqueWords) => {
    printCountUniqueWords(uniqueWords);
    await wordCounterDb.findAndUpdateOrInsert(uniqueWords.getUniqueWords());
};

const getCountWordInstancesOption = async (word) => {
    let count = await wordCounterDb.getWordInstances(word);
    console.log(count);
    process.exit();
};

const printCountUniqueWords = (uniqueWords) => {
    let uniqueWordsCounter = uniqueWords.countUniqueWordsInstances();
    console.log(uniqueWordsCounter);
};


const handleOperation = (args) => {
    switch (args.operation) {
        case 'count_words':
            let readerFactory = new ReaderFactory();
            let reader = readerFactory.createReader(args);
            reader.read()
                .then(async uniqueWords => {
                    await printCountUniqueWordsAndUpdateDb(uniqueWords);
                    process.exit();
                })
                .catch(reason => console.log(reason.message));
            break;
        case 'word_lookup':
            getCountWordInstancesOption(args.word);
            break;

    }
};

handleOperation(args);

