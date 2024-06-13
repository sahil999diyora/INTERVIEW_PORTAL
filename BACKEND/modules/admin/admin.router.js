var express = require('express');
var router = express.Router();
let ADMIN_CONTROLLER = require('./admin.controller');

router.post('/signup', ADMIN_CONTROLLER.ADMIN_SIGNUP);

router.post('/login', ADMIN_CONTROLLER.ADMIN_LOGIN);

router.get('/', ADMIN_CONTROLLER.ADMIN_FETCH);

router.put('/:admin_update_id', ADMIN_CONTROLLER.ADMIN_UPDATE);

router.delete('/:admin_delete_id', ADMIN_CONTROLLER.ADMIN_DELETE);

module.exports = router;