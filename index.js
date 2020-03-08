const wordCounterDb = require('./src/wordCounterDb');
const UniqueWords = require('./src/countUniqueWords');
const ReadFile = require('./src/readFile');
const ReadUrl = require('./src/readUrl');


const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mainMenuOptions = `Please select one of the following commands: 
 1. Count unique word instances in a text
 2. Specific word lookup
 `;

const textMenuOptions = `Please select one of the following:
1. Enter text
2. Enter file path
3. Enter Url
`;

rl.question(mainMenuOptions, function (option) {
    switch (option) {
        case '1':
            rl.question(textMenuOptions, countUniqueWordsMenu);
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

const countUniqueWordsMenu = async (textOption) => {
    switch (textOption) {
        case '1':
            readTextOption();
            break;
        case '2':
            readFileOption();
            break;
        case '3':
            readUrlOption();
            break;
    }
};

const readTextOption = () => {
    rl.question(`Please enter text \n`, async function (text) {
        let uniqueWords = convertTextToUniqueWordsInstance(text);
        await printCountUniqueWordsAndUpdateDb(uniqueWords);
        rl.close();
    });
};

const readFileOption = () => {
    rl.question(`Please enter file path \n`, async function (filePath) {
        let readFile = new ReadFile(filePath);
        readFile.readFromFile().then(async uniqueWords => {
            await printCountUniqueWordsAndUpdateDb(uniqueWords);
            rl.close();
        })
            .catch(reason => console.log(reason.message))
    });
};

const readUrlOption = () => {
    rl.question(`Please enter URL \n`, async function (url) {
        let readUrl = new ReadUrl(url);
        readUrl.fetchTextFromUrl()
            .then(async text => {
                let uniqueWords = convertTextToUniqueWordsInstance(text);
                await printCountUniqueWordsAndUpdateDb(uniqueWords);
                rl.close();
            })
            .catch(reason => console.log(reason.message))
    });
};

const convertTextToUniqueWordsInstance = (text) => {
    let uniqueWords = new UniqueWords(text);
    uniqueWords.convertTextToDict();
    return uniqueWords;
};

const printCountUniqueWordsAndUpdateDb = async (uniqueWords) => {
    printCountUniqueWords(uniqueWords);
    await countUniqueWordsAndUpdateDb(uniqueWords.getUniqueWords());
};


const printCountUniqueWords = (uniqueWords) => {
    let uniqueWordsCounter = uniqueWords.countUniqueWordsInstances();
    console.log(uniqueWordsCounter);
};

const countUniqueWordsAndUpdateDb = async (uniqueWordsDict) => {
    return await wordCounterDb.findAndUpdateOrInsert(uniqueWordsDict);
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

