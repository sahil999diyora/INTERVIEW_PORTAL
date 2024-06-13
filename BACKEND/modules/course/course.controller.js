let COURSE = require('./course.model');


exports.COURSE_ADD = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.course_name) {
            throw new Error("PLESE ENTER THE COURSE NAME !")
        }

        let COURSE_DATA = await COURSE.create(BODY_DATA);

        res.status(201).json({
            message: "COURSE ADD SUCESSFULLY !",
            COURSE_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.COURSE_FETCH = async function (req, res, next) {

    try {

        if (req.query.Search) {

            let SEARCH_DATA = await COURSE.find({
                course_name: { $regex: req.query.Search, $options: "i" },
            });

            res.status(201).json({
                message: "SEARCHING SUCESSFULLY !",
                SEARCH_DATA
            })
        }
        else {

            let COURSE_DATA = await COURSE.find();

            res.status(201).json({
                message: "ALL COURSES FETCHED SUCESSFULLY !",
                COURSE_DATA
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.COURSE_UPDATE = async function (req, res, next) {

    try {

        let UPDATE_ID = req.params.update_id;
        let UPDATE_DATA = req.body;

        if (!UPDATE_DATA.course_name) {
            throw new Error("PLESE ENTER COURSE NAME TO UPDATE");
        }

        let UPDATE_COURSE = await COURSE.findByIdAndUpdate(UPDATE_ID, UPDATE_DATA, { new: true });

        res.status(201).json({
            message: "COURSE UPDATED SUCESSFULLY !",
            UPDATE_COURSE
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.COURSE_DELETE = async function (req, res, next) {

    try {

        let DELETE_ID = req.params.delete_id;

        let FIND_DELETE_ID_DB = await COURSE.findById(DELETE_ID);

        if (!FIND_DELETE_ID_DB) {
            throw new Error("NO COURSE FOUND FOR DELATION OR ALREADY DELETED !!")
        }

        let DELETE_COURSE = await COURSE.findByIdAndDelete(DELETE_ID);

        res.status(201).json({
            message: "COURSE DELETED SUCESSFULLY !",
            DELETE_COURSE
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}