import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
	admin_id: Number,
	goods_id: Number,
	goods_category_id: Number,
	goods_detail_id: Number,
	goods_tag_id: Number,
	store_id: Number,
	warehouse_id: Number
});

const Ids = mongoose.model('Ids', idsSchema);

export default Ids