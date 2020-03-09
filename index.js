const wordCounterDb = require('./src/wordCounterDb');
const ReaderFactory = require('./src/modules/reader/readerFactory');

const menu = require('./src/menu');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question(menu.getMainMenuOptions() , function (option) {
    switch (option) {
        case '1':
            rl.question(menu.getTextMenuOptions(), readerOption);
            break;
        case '2':
            getCountWordInstancesOption();
            break;
        default:
            console.log('Please enter valid option: 1 or 2');
            rl.close();
            break;
    }
});

const readerOption = async (textOption) => {
    let textToDisplay = menu.getTextBySelectedOption(textOption);

    rl.question(`${textToDisplay} \n`, async function (textSource) {
        let readerFactory = new ReaderFactory();
        let reader = readerFactory.createReader(textOption, textSource);
        reader.read()
            .then(async uniqueWords => {
                await printCountUniqueWordsAndUpdateDb(uniqueWords);
                rl.close();
            })
            .catch(reason => console.log(reason.message))
    });
};


const printCountUniqueWordsAndUpdateDb = async (uniqueWords) => {
    printCountUniqueWords(uniqueWords);
    await wordCounterDb.findAndUpdateOrInsert(uniqueWords.getUniqueWords());
};


const printCountUniqueWords = (uniqueWords) => {
    let uniqueWordsCounter = uniqueWords.countUniqueWordsInstances();
    console.log(uniqueWordsCounter);
};

const getCountWordInstancesOption = () => {
    rl.question("Please enter word \n", async function (word) {
        let count = await wordCounterDb.getWordInstances(word);
        console.log(count);
        rl.close();
    });
};


rl.on("close", function () {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

