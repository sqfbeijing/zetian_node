import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let store = Schema({
	name: String,
	id: Number,
	created_time: String //iso
});

let Store = mongoose.model("Store", store);

export default Store;