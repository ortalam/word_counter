class Menu{
    getMainMenuOptions() {
        return `Please select one of the following commands: 
 1. Count unique word instances in a text
 2. Specific word lookup
 `;
    }

    getTextMenuOptions(){
        return `Please select one of the following:
1. Enter text
2. Enter file path
3. Enter Url
`;
    }

    getTextBySelectedOption(option){
        let textToDisplay = '';
        switch (option) {
            case '1':
                textToDisplay = 'Please enter text';
                break;
            case '2':
                textToDisplay = 'Please enter file path';
                break;
            case '3':
                textToDisplay = 'Please enter URL';
                break;
        }
        return textToDisplay;
    }
}

module.exports  = new Menu();

