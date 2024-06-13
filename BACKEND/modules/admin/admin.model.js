const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ADMIN_SCHEMA = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const ADMIN_MODEL = mongoose.model('admin', ADMIN_SCHEMA);
module.exports = ADMIN_MODEL;