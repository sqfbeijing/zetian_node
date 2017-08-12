import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let warehouse = Schema({
	name: String,
	id: Number,
	created_time: String //iso
});

let Warehouse = mongoose.model("Warehouse", warehouse);

export default Warehouse;