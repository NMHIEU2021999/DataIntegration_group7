const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const booksSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    author_name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    num_page: {
        type: String,
        required: true,
    },
    cover_type: {
        type: String,
        required: true,
    },
    release_year: {
        type: String,
        required: true,
    },
}, { collection: 'newshop' });

booksSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('newshop', booksSchema);
