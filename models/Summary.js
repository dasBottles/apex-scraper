const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeyCapSchema = new Schema({
    body: String
});

const Summary = mongoose.model('Summary', KeyCapSchema);

module.exports = Summary;