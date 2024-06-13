const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const INTERVIEW_SCHEMA = new Schema({
    company_content: {
        type: mongoose.Types.ObjectId,
        ref: 'company',
        required: true
    },
    student_content: {
        type: mongoose.Types.ObjectId,
        ref: 'student',
        required: true
    },
    follow_update: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Reject', 'Done'],
        default: 'Pending',
        required: true
    },
    description: {
        type: String,
        required: true
    }
})


const INTERVIEW_MODEL = mongoose.model('interview', INTERVIEW_SCHEMA);
module.exports = INTERVIEW_MODEL;