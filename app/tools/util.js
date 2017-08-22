import crypto from 'crypto';
import Ids from '../models/ids.js'
import fs from "fs"
import qiniu from "qiniu"
import path from "path"
const ACCESSKEY = "ckDaJM9hItXlHfZbki-0i3-Pjm84bO0MnL7SIaDl";
const SECRETKEY = "wlorZQA7KieY0y3JFh2i0mogLFDJMnH5iTOXKSbX";

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
		this.uploadQiniu = this.uploadQiniu.bind(this);
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

	async uploadQiniu(localfile_path) {
		console.log("10:4612");
		console.log(localfile_path);
		console.log(__dirname);
		console.log(path.join(__dirname, "../public/index001.png"));
		console.log(path.join(__dirname, "./index001.png"));
		// localfile_path = path.join(__dirname, "../public/index001.png");

		try {
			// mac 
			var mac = new qiniu.auth.digest.Mac(ACCESSKEY, SECRETKEY);
			//上传凭证
			var options = {
				// scope: bucket
				scope: "zetian"
			};
			var putPolicy = new qiniu.rs.PutPolicy(options);
			var uploadToken = putPolicy.uploadToken(mac);
			// 配置
			var config = new qiniu.conf.Config();
			// 空间对应的机房 华南
			config.zone = qiniu.zone.Zone_z2;
			// 文件
			var formUploader = new qiniu.form_up.FormUploader(config);
			var putExtra = new qiniu.form_up.PutExtra();
			var key = 'abc.png'; // 存储到七牛的文件名
			// 文件上传
			localfile_path = '/Users/shaoqianfei/Desktop/node/zetian_node/app/public/images/admin/avatar/upload/e9a5a225daab93fe20d35105333591a7.png';
			formUploader.putFile(uploadToken, key, localfile_path, putExtra, function(respErr,
			// formUploader.putFile(uploadToken, key, "./index001.png", putExtra, function(respErr,
			// formUploader.putFile(uploadToken, key, "./public/index001.png", putExtra, function(respErr,
				respBody, respInfo) {
				if (respErr) {
					throw respErr;
				}
				if (respInfo.statusCode == 200) {
					console.log(respBody);
				} else {
					console.log(respInfo.statusCode);
					console.log(respBody);
				}
			});
		} catch (e) {
			console.log("上传到七牛异常", e.message);
		}
	}
}