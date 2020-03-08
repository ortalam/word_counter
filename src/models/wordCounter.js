const mongoose = require('mongoose');

const wordCounterSchema = new mongoose.Schema({
    word: {
        type: String,
        unique : true,
        required: true,
        index: true
    },
    count: {
        type: Number,
        required: true
    }
}, { collection : 'word_counter' });


mongoose.model('word_counter', wordCounterSchema);
