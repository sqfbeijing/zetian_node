import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let goods_detail = Schema({
	id: Number,
	goods_id: Number,
	creater_id: Number, // 创建人（管理员的id）
	created_time: String, //iso
	last_modify_person_id: Number,// 最近修改的人的id
	last_modify_time: String, //iso 最近一次修改时间
	content: String // html字符串
});

let Goods_detail = mongoose.model("Goods_detail", goods_detail);

export default Goods_detail;