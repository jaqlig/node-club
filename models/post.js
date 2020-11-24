const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema (
    {
        title: { type: String },
        message: { type: String, required: true },
        timestamp: { type: JSON, required: true },
        author: { type: JSON, required: true }
    }
);

module.exports = mongoose.model('Post', PostSchema);