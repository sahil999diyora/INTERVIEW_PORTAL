let STUDENT = require('./student.model');

exports.STUDENT_ADD = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.student_name || !BODY_DATA.contact || !BODY_DATA.course_content || !BODY_DATA.branch || !BODY_DATA.experience || !BODY_DATA.description) {
            throw new Error("PLESE ENTER ALL THE FIELDS !!")
        }

        let STUDENT_DATA = await STUDENT.create(BODY_DATA);

        res.status(201).json({
            message: "STUDENT ADDED SUCESSFULLY !",
            STUDENT_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.STUDENT_FETCH = async function (req, res, next) {

    try {

        if (req.query.Search) {

            let SEARCH_DATA = await STUDENT.find({
                student_name: { $regex: req.query.Search, $options: "i" },
            });

            res.status(201).json({
                message: "SEARCHING SUCESSFULLY !",
                SEARCH_DATA
            })
        }
        else {

            let STUDENT_DATA = await STUDENT.find().populate('course_content');

            res.status(201).json({
                message: "ALL STUDENTS FETCHED SUCESSFULLY !",
                STUDENT_DATA
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.STUDENT_UPDATE = async function (req, res, next) {

    try {

        let STATUS_DATA = ['Pending', 'Reject', 'Done'];

        let UPDATE_ID = req.params.update_id;
        let UPDATE_DATA = req.body;

        if (UPDATE_DATA.job_status && !STATUS_DATA.includes(UPDATE_DATA.job_status)) {
            throw new Error("PLESE ENTER VALID JOB STATUS !!!")
        }

        let UPDATE_STUDENT = await STUDENT.findByIdAndUpdate(UPDATE_ID, UPDATE_DATA, { new: true });

        res.status(201).json({
            message: "STUDENT UPDATED SUCESSFULLY !",
            UPDATE_STUDENT
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.STUDENT_DELETE = async function (req, res, next) {

    try {

        let DELETE_ID = req.params.delete_id;

        let FIND_DELETE_ID_DB = await STUDENT.findById(DELETE_ID);

        if (!FIND_DELETE_ID_DB) {
            throw new Error("NO STUDENT FOUND FOR DELATION OR ALREADY DELETED !!")
        }

        let DELETE_STUDENT = await STUDENT.findByIdAndDelete(DELETE_ID);

        res.status(201).json({
            message: "STUDENT DELETED SUCESSFULLY !",
            DELETE_STUDENT
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}