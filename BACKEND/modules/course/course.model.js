const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const COURSE_SCHEMA = new Schema({
    course_name: {
        type: String,
        unique: true,
        required: true
    }
})


const COURSE_MODEL = mongoose.model('course', COURSE_SCHEMA);
module.exports = COURSE_MODEL;