var express = require('express');
var router = express.Router();
let INTERVIEW_CONTROLLER = require('./interview.controller');
let ADMIN_MIDDLEWARE = require('../admin/admin.middleware');

router.post('/add', ADMIN_MIDDLEWARE.ADMIN_SECURE, INTERVIEW_CONTROLLER.INTERVIEW_ADD);

router.get('/', ADMIN_MIDDLEWARE.ADMIN_SECURE, INTERVIEW_CONTROLLER.INTERVIEW_FETCH);

router.put('/:update_id', ADMIN_MIDDLEWARE.ADMIN_SECURE, INTERVIEW_CONTROLLER.INTERVIEW_UPDATE);

router.delete('/:delete_id', ADMIN_MIDDLEWARE.ADMIN_SECURE, INTERVIEW_CONTROLLER.INTERVIEW_DELETE);

module.exports = router;