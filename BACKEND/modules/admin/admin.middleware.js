var jwt = require('jsonwebtoken');
var ADMIN = require('../admin/admin.model');

exports.ADMIN_SECURE = async function (req, res, next) {

    try {

        let TOKEN = req.headers.authorization;

        if (!TOKEN) {
            throw new Error("PLESE ATTECH THE TOKEN FIRST !!")
        }

        let CHEAK_TOKEN = await jwt.verify(TOKEN, 'ADMIN');

        let CHEAK_VALID_ADMIN = await ADMIN.findById(CHEAK_TOKEN.ADMIN_KEY);

        if (!CHEAK_VALID_ADMIN) {
            throw new Error("NO VALID ADMIN FOUND FOR THIS TOKEN !!")
        }

        next();

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

}