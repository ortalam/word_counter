## Word Counter

cd `word_counter`

### Installation
`npm install`

### Start
#### for count word instances:
`node index.js --operation=count_words --text="this is a test"`

`node index.js --operation=count_words --file=pathfile/test.txt`

`node index.js --operation=count_words --url=https://test.com`
 
#### for the word lookup:
`node index.js --operation=word_lookup --word=test`


### Assumptions:

- I've removed special characters like ' for example- don't => dont

