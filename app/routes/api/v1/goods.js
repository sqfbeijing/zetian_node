var express = require('express');
var router = express.Router();
import authorize from "../../../tools/authorize.js"
import Goods from "../../../controller/v1/goods.js"

router.get('/tags', Goods.getGoodsTags);
router.post('/image/unique', authorize.admin, Goods.uploadUniqueImage); //上传唯一图片
router.post('/add', authorize.admin, Goods.addGoods);
router.post('/:id/delete', authorize.superAdmin, Goods.deleteGoods);
router.post('/:id/update', authorize.admin, Goods.updateGoods);
router.post('/:id/sale', authorize.admin, Goods.saleGoods);
router.get('/count', Goods.getTotalGoodsCount);
router.get('/:id/info', Goods.getGoodsInfo);
router.get('/', Goods.getGoodsInfoMultiple);
router.post('/detail/photo', authorize.admin, Goods.uploadDetailImage); //上传详情图片
router.post('/:id/detail/add', authorize.admin, Goods.addDetail);
router.post('/:id/detail/update', authorize.admin, Goods.updateDetail); 
router.get('/:id/detail/info', Goods.getDetail); 

export default router;

