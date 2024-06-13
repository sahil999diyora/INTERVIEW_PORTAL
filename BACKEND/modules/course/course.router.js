var express = require('express');
var router = express.Router();
let COURSE_CONTROLLER = require('./course.controller');
let ADMIN_MIDDLEWARE = require('../admin/admin.middleware');


router.post('/add', ADMIN_MIDDLEWARE.ADMIN_SECURE, COURSE_CONTROLLER.COURSE_ADD);

router.get('/', ADMIN_MIDDLEWARE.ADMIN_SECURE, COURSE_CONTROLLER.COURSE_FETCH);

router.put('/:update_id', ADMIN_MIDDLEWARE.ADMIN_SECURE, COURSE_CONTROLLER.COURSE_UPDATE);

router.delete('/:delete_id', ADMIN_MIDDLEWARE.ADMIN_SECURE, COURSE_CONTROLLER.COURSE_DELETE);

module.exports = router;