var express = require('express');
var router = express.Router();
import authorize from "../../../tools/authorize.js"
import Stores from "../../../controller/v1/stores.js"

router.get('/', Stores.getStores); 

export default router;


