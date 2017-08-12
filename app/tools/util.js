import crypto from 'crypto';
import Ids from '../models/ids.js'
import fs from "fs"

export default class Util {
	constructor() {
		this.idList = [
			'admin_id',
			"goods_id",
			"goods_category_id",
			"goods_detail_id",
			"goods_tag_id",
			"store_id",
			"warehouse_id"
		];
	}

	/**
	 * md5
	 * @param  {String} text 需要加密的str
	 * @return {String} 加密完的str
	 */
	MD5(text) {
		if (!text) throw new Error("need a param!");
		return crypto.createHash('md5').update(text).digest('hex');
	}

	//获取id列表
	async getId(type) {
		if (!this.idList.includes(type)) {
			console.log('id类型错误');
			throw new Error('id类型错误');
			return
		}
		try {
			const idData = await Ids.findOne();
			idData[type]++;
			await idData.save();
			return idData[type]
		} catch (err) {
			console.log('获取ID数据失败');
			throw new Error(err)
		}
	}
	async rename(oldname, newname) { // 重命名 | 移动文件
		try {
			fs.renameSync(oldname, newname);
		} catch (e) {
			throw new Error("rename失败");
		}
	}
	async removeFile(path) { //从硬盘删除某个文件
		try {
			fs.unlinkSync(path);
		} catch (e) {
			console.log("removeFile失败");
		}
	}
	getServerStaticPath() { // 静态资源文件的绝对根路径
		console.log("process.env.NODE_ENV", process.env.NODE_ENV);
		if (process.env.NODE_ENV === "production") {
			return "http://47.93.227.194:8000/static";
		} else {
			return "http://127.0.0.1:8000/static";
		}
	}
}