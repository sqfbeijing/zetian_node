import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let goods_category = Schema({
	category_name: String,
	id: Number,
	created_time: String //iso
});

let GoodsCategory = mongoose.model("goods_category", goods_category);

export default GoodsCategory;

