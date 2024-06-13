var express = require('express');
var router = express.Router();
let STUDENT_CONTROLLER = require('./student.controller');
let ADMIN_MIDDLEWARE = require('../admin/admin.middleware');

router.post('/add', ADMIN_MIDDLEWARE.ADMIN_SECURE, STUDENT_CONTROLLER.STUDENT_ADD);

router.get('/', ADMIN_MIDDLEWARE.ADMIN_SECURE, STUDENT_CONTROLLER.STUDENT_FETCH);

router.put('/:update_id', ADMIN_MIDDLEWARE.ADMIN_SECURE, STUDENT_CONTROLLER.STUDENT_UPDATE);

router.delete('/:delete_id', ADMIN_MIDDLEWARE.ADMIN_SECURE, STUDENT_CONTROLLER.STUDENT_DELETE);

module.exports = router;