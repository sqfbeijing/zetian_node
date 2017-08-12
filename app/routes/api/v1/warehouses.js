var express = require('express');
var router = express.Router();
import authorize from "../../../tools/authorize.js"
import Warehouses from "../../../controller/v1/warehouses.js"

router.get('/', Warehouses.getWarehouses); 

export default router;


