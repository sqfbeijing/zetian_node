var express = require('express');
var router = express.Router();
import authorize from "../../../tools/authorize.js"
import Admin from "../../../controller/v1/admin.js"

router.post('/signup',authorize.superAdmin, Admin.signup);
router.post('/signin', Admin.signin);
// router.post('/signout', authorize.admin, Admin.signout);
router.post('/signout', Admin.signout);
router.get('/count', authorize.admin, Admin.count);
router.get('/accounts', authorize.admin, Admin.accounts);
router.get('/accounts/:id', authorize.admin, Admin.account);
router.post('/avatar/update', authorize.admin, Admin.upload_avatar);

export default router;


