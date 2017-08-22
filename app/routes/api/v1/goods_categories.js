var express = require('express');
var router = express.Router();
import authorize from "../../../tools/authorize.js"
import Goods_categories from "../../../controller/v1/goods_categories.js"

router.post('/', authorize.admin, Goods_categories.add_category);
router.get('/count', Goods_categories.count);
router.get('/', Goods_categories.getCategories);
router.post('/:category_name/delete', authorize.superAdmin, Goods_categories.deleteCategory);

export default router;



