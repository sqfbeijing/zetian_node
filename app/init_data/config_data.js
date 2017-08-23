export const QINIU_INFO = {
	ACCESSKEY: "ckDaJM9hItXlHfZbki-0i3-Pjm84bO0MnL7SIaDl",
	SECRETKEY: "wlorZQA7KieY0y3JFh2i0mogLFDJMnH5iTOXKSbX",
	BUCKET: "zetian",
	IMAGE_PREFIX: "http://outiwl5gi.bkt.clouddn.com/"
};

export const ID_LIST = [
	'admin_id',
	"goods_id",
	"goods_category_id",
	"goods_detail_id",
	"goods_tag_id",
	"store_id",
	"warehouse_id"
];

export const INIT_IDS = {
	admin_id: 0,
	goods_id: 0,
	goods_category_id: 0,
	goods_detail_id: 0,
	goods_tag_id: 0,
	store_id: 0,
	warehouse_id: 0
};

export const INIT_SUPER_ADMIN_COUNT = {
	username: 'admin001',
	password: "37af06275df16526d0b089345ad5fdd0",
	created_time: "2017-07-06T06:39:13.933Z", //iso
	avatar_url: "http://outiwl5gi.bkt.clouddn.com/images/admin/avatar/default/default1.png",
	is_super: true // 是否超级管理员
};

export const GOODS_TAGS = ["新品", "精品", "热销商品"];
export const STORE_NAMES = ["一环路西段423号"];
export const WAREHOUSES = ["主仓库", "次仓库", "特价仓库"];

export const SERVER_STATIC_PATH_PRODUCTION = "http://47.93.227.194:8000/static";
export const SERVER_STATIC_PATH_DEV = "http://127.0.0.1:8000/static";

export const UPLOAD_ADMIN_AVATAR_SIZE_LIMIT = 100 * 1024; //byte
export const UPLOAD_GOODS_UNIQUE_LIMIT = 500 * 1024; //byte
export const UPLOAD_GOODS_DETAIL_LIMIT = 500 * 1024; //byte