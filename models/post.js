const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema (
    {
        title: { type: String },
        message: { type: String, required: true },
        timestamp: { type: String, required: true },
        author: { type: String, required: true }
    }
);

module.exports = mongoose.model('Post', PostSchema);