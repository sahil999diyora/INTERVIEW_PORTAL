let ADMIN = require('./admin.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.ADMIN_SIGNUP = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.email || !BODY_DATA.password || !BODY_DATA.confirm_password) {
            throw new Error("PLESE ENETER ALL THE FIELDS");

        }
        if (BODY_DATA.password != BODY_DATA.confirm_password) {
            throw new Error("PAASOWRD AND CONFIRM PASSWORD NOT SAME");
        }

        BODY_DATA.password = await bcrypt.hash(BODY_DATA.password, 10)

        let SIGNUP_DATA = await ADMIN.create(BODY_DATA);

        res.status(201).json({
            message: "SIGN UP SUCESSFULLY !",
            SIGNUP_DATA
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.ADMIN_LOGIN = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        if (!BODY_DATA.email && !BODY_DATA.password) {
            throw new Error("PLESE ENETER ALL THE FIELDS");
        }

        if (!BODY_DATA.email) {
            throw new Error("PLESE ENETER E MAIL !");
        }

        if (!BODY_DATA.password) {
            throw new Error("PLESE ENETER PASSWORD !");
        }

        let CHEAK_USER = await ADMIN.findOne({ email: BODY_DATA.email });

        if (!CHEAK_USER) {
            throw new Error("INVALID EMAIL ADDRESS PLESE CHECK !");
        }

        let CHEAK_PASSWORD = await bcrypt.compare(BODY_DATA.password, CHEAK_USER.password)

        if (!CHEAK_PASSWORD) {
            throw new Error("PASSWORD IS WRONG OR INVALID !");
        }

        let TOKEN = await jwt.sign({ ADMIN_KEY: CHEAK_USER._id }, 'ADMIN')

        res.status(201).json({
            message: "LOG IN SUCESSFULLY !",
            BODY_DATA,
            TOKEN
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.ADMIN_FETCH = async function (req, res, next) {

    try {

        let ALL_ADMIN = await ADMIN.find();

        res.status(201).json({
            message: "ALL ADMINS FETCH SUCESSFULLY !",
            ALL_ADMIN
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.ADMIN_UPDATE = async function (req, res, next) {

    try {

        let UPDATE_ID = req.params.admin_update_id;
        let UPDATE_DATA = req.body;

        if (!UPDATE_DATA.email || !UPDATE_DATA.password || !UPDATE_DATA.confirm_password) {
            throw new Error("PLESE ENETER ALL THE FIELDS FOR UPDATION !!");
        }

        if (UPDATE_DATA.password != UPDATE_DATA.confirm_password) {
            throw new Error("PAASOWRD AND CONFIRM PASSWORD NOT SAME");
        }

        UPDATE_DATA.password = await bcrypt.hash(UPDATE_DATA.password, 10)

        let UPDATE_ADMIN = await ADMIN.findByIdAndUpdate(UPDATE_ID, UPDATE_DATA, { new: true });

        res.status(201).json({
            message: "ADMIN UPDATE SUCESSFULLY !",
            UPDATE_ADMIN
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

exports.ADMIN_DELETE = async function (req, res, next) {

    try {

        let DELETE_ID = req.params.admin_delete_id;
        let DELETE_ADMIN = await ADMIN.findByIdAndDelete(DELETE_ID);

        res.status(201).json({
            message: "ADMIN DELETE SUCESSFULLY !",
            DELETE_ADMIN
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}