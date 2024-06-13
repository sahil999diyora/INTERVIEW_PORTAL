var express = require('express');
var router = express.Router();
let COMPANY_CONTROLLER = require('./company.controller');
let ADMIN_MIDDLEWARE = require('../admin/admin.middleware');

router.post('/add', ADMIN_MIDDLEWARE.ADMIN_SECURE, COMPANY_CONTROLLER.COMPANY_ADD);

router.get('/', ADMIN_MIDDLEWARE.ADMIN_SECURE, COMPANY_CONTROLLER.COMPANY_FETCH);

router.put('/:update_id', ADMIN_MIDDLEWARE.ADMIN_SECURE, COMPANY_CONTROLLER.COMPANY_UPDATE);

router.delete('/:delete_id', ADMIN_MIDDLEWARE.ADMIN_SECURE, COMPANY_CONTROLLER.COMPANY_DELETE);

module.exports = router;