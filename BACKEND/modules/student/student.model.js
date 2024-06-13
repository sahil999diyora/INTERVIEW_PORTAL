const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const STUDENT_SCHEMA = new Schema({
    student_name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    course_content: {
        type: mongoose.Types.ObjectId,
        ref: 'course',
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    job_status: {
        type: String,
        enum: ['Pending', 'Reject', 'Done'],
        default: 'Pending',
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})


const STUDENT_MODEL = mongoose.model('student', STUDENT_SCHEMA);
module.exports = STUDENT_MODEL;