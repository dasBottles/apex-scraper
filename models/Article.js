const mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 makeDate = require('../public/js/makeDate');

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: Schema.Types.ObjectId,
        ref: 'Summary'
    },
    img: {
        type: String
    },

    summary: {
        type: String
    }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;