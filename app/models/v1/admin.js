import mongoose from 'mongoose'
import path from 'path'
import Util from "../../tools/util.js"

let default_avatar_url = "http://outiwl5gi.bkt.clouddn.com/images/admin/avatar/default/default1.png";

let Schema = mongoose.Schema;
let adminSchema = Schema({
	username: String,
	password: String,
	id: Number,
	created_time: String, //iso
	is_super: Boolean, // 是否超级管理员
	avatar_url: {type: String, default: default_avatar_url}
});

let Admin = mongoose.model("Admin", adminSchema);

export default Admin;

