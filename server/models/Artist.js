const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistSchema = new Schema({
    displayname: [{
        type: String,
    }],
    key: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    culture: {
        type: String,
    }
});

module.exports = artistSchema;