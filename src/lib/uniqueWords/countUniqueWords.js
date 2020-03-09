class UniqueWords{
    constructor(text) {
        this.text = text;
        this.uniqueWords = new Map();
    }

    setText(text){
        this.text = text;
    }

     countUniqueWordsInstances(){
        return this.uniqueWords.size;
    };

     convertTextToDict(){
        const letters = /^[A-Za-z]$/;
        let length = this.text.length;
        let word = '';
        for (let i = 0; i <= length; i++){
            const char = this.text.charAt(i).toLowerCase();
            if (i < length && char !== ' '){
                if(char.match(letters)) {
                    word += char;
                }
            }
            else if (word){
                this.insertWordToDict(word);
                word = '';
            }
        }
    };

    insertWordToDict(word) {
        let count = 1;
        if (this.uniqueWords.has(word)){
            count = this.uniqueWords.get(word) + 1;
        }
        this.uniqueWords.set(word, count);
    };

    getUniqueWords(){
        return this.uniqueWords;
    }
}


module.exports  = UniqueWords;

