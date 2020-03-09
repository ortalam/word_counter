//abstract class
class Reader{

    read(){
        throw new Error('read must be implemented')
    }

}

module.exports = Reader;
