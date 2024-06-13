let COMPANY = require('./company.model');


exports.COMPANY_ADD = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.company_name || !BODY_DATA.contact || !BODY_DATA.url || !BODY_DATA.address || !BODY_DATA.area || !BODY_DATA.city || !BODY_DATA.description) {
            throw new Error("PLESE ENTER ALL THE FIELDS !!")
        }

        let COMPANY_DATA = await COMPANY.create(BODY_DATA);

        res.status(201).json({
            message: "COMPANY ADDED SUCESSFULLY !",
            COMPANY_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.COMPANY_FETCH = async function (req, res, next) {

    try {

        if (req.query.Search) {

            let SEARCH_DATA = await COMPANY.find({
                company_name: { $regex: req.query.Search, $options: "i" },
            });

            res.status(201).json({
                message: "SEARCHING SUCESSFULLY !",
                SEARCH_DATA
            })
        }
        else {

            let COMPANY_DATA = await COMPANY.find();

            res.status(201).json({
                message: "ALL COMPANIES FETCHED SUCESSFULLY !",
                COMPANY_DATA
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.COMPANY_UPDATE = async function (req, res, next) {

    try {

        let UPDATE_ID = req.params.update_id;
        let UPDATE_DATA = req.body;

        // if (!UPDATE_DATA.company_name || !UPDATE_DATA.contact || !UPDATE_DATA.url || !UPDATE_DATA.address || !UPDATE_DATA.area || !UPDATE_DATA.city || !UPDATE_DATA.description) {
        //     throw new Error("PLESE FILL ALL THE FIELDS TO UPDATE");
        // }

        let UPDATE_COMPANY = await COMPANY.findByIdAndUpdate(UPDATE_ID, UPDATE_DATA, { new: true });

        res.status(201).json({
            message: "COMPANY UPDATED SUCESSFULLY !",
            UPDATE_COMPANY
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.COMPANY_DELETE = async function (req, res, next) {

    try {

        let DELETE_ID = req.params.delete_id;

        let FIND_DELETE_ID_DB = await COMPANY.findById(DELETE_ID);

        if (!FIND_DELETE_ID_DB) {
            throw new Error("NO COMPANY FOUND FOR DELATION OR ALREADY DELETED !!")
        }

        let DELETE_COMPANY = await COMPANY.findByIdAndDelete(DELETE_ID);

        res.status(201).json({
            message: "COMPANY DELETED SUCESSFULLY !",
            DELETE_COMPANY
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}