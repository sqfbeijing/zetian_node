import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let goods = Schema({
	name: {
		type: String,
		trim: true
	},
	id: Number,
	creater_id: Number, // 创建人（管理员的id）
	created_time: String, //iso
	serial_number: {
		type: String,
		trim: true
	}, //手动输入的商品编号
	unit: {
		type: String,
		trim: true
	}, // 单位
	price: {
		type: Number,
		min: 0
	},
	category_name: String,
	putaway_time: {
		type: String,
		trim: true
	}, //iso 上架时间
	store: [String], // 所属店铺, 每一项是个字符串（店铺名称）
	warehouse: [String], // 所属库房, 每一项是个字符串（库房名称）
	sold_count: {
		type: Number,
		default: 0
	},
	inventory: {
		type: Number,
		default: 0
	}, // 库存
	tags: Array, // 标签， 名称， string类型
	image_url: String, // 唯一的图片标示url
	description: {
		type: String,
		default: "暂无描述"
	}
});

let Goods = mongoose.model("Goods", goods);

export default Goods;

