const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const COMPANY_SCHEMA = new Schema({

    company_name: {
        type: String,
        unique: true,
        required: true
    },
    contact: {
        type: String,
        unique: true,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})


const COMPANY_MODEL = mongoose.model('company', COMPANY_SCHEMA);
module.exports = COMPANY_MODEL;