let INTERVIEW = require('./interview.model');


exports.INTERVIEW_ADD = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.company_content || !BODY_DATA.student_content || !BODY_DATA.description) {
            throw new Error("PLESE ENTER ALL THE FIELDS !!")
        }

        let INTERVIEW_DATA = await INTERVIEW.create(BODY_DATA);

        res.status(201).json({
            message: "INTERVIEW SHEDULED !",
            INTERVIEW_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.INTERVIEW_FETCH = async function (req, res, next) {

    try {

        let INTERVIEW_DATA = await INTERVIEW.find().populate(['company_content', 'student_content']);

        res.status(201).json({
            message: "ALL SCHEDULED INTERVIEWS FETCHED SUCESSFULLY !",
            INTERVIEW_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.INTERVIEW_UPDATE = async function (req, res, next) {

    try {

        let STATUS_DATA = ['Pending', 'Reject', 'Done'];

        let UPDATE_ID = req.params.update_id;
        let UPDATE_DATA = req.body;

        if (UPDATE_DATA.status && !STATUS_DATA.includes(UPDATE_DATA.status)) {
            throw new Error("PLESE ENTER VALID STATUS STATUS !!!")
        }

        let UPDATE_INTERVIEW = await INTERVIEW.findByIdAndUpdate(UPDATE_ID, UPDATE_DATA, { new: true });

        res.status(201).json({
            message: "SHEDULED INTERVIEW UPDATED SUCESSFULLY !",
            UPDATE_INTERVIEW
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.INTERVIEW_DELETE = async function (req, res, next) {

    try {

        let DELETE_ID = req.params.delete_id;

        let FIND_DELETE_ID_DB = await INTERVIEW.findById(DELETE_ID);

        if (!FIND_DELETE_ID_DB) {
            throw new Error("NO INTERVIEW FOUND FOR DELATION OR ALREADY DELETED !!")
        }

        let DELETE_INTERVIEW = await INTERVIEW.findByIdAndDelete(DELETE_ID);

        res.status(201).json({
            message: "SCEDULED INTERVIEW DELETED SUCESSFULLY !",
            DELETE_INTERVIEW
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

