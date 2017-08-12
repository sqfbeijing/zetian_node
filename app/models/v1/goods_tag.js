import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let tag = Schema({
	name: String,
	id: Number,
	created_time: String //iso
});

let Tag = mongoose.model("Tag", tag);

export default Tag;	