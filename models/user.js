const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        account_type: { type: Number } // 0: user, 1: full member, 2: admin
    }
);

module.exports = mongoose.model('User', UserSchema);