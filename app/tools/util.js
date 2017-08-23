import crypto from 'crypto';
import Ids from '../models/ids.js'
import fs from "fs"
import qiniu from "qiniu"
import path from "path"
import {
	QINIU_INFO,
	ID_LIST,
	SERVER_STATIC_PATH_PRODUCTION,
	SERVER_STATIC_PATH_DEV
} from "./../init_data/config_data.js"

const ACCESSKEY = QINIU_INFO.ACCESSKEY;
const SECRETKEY = QINIU_INFO.SECRETKEY;
const BUCKET = QINIU_INFO.BUCKET;
const IMAGE_PREFIX = QINIU_INFO.IMAGE_PREFIX;

export default class Util {
	constructor() {
		this.idList = ID_LIST;
		this.qiniu = this.qiniu.bind(this);
		this.getUploadToken = this.getUploadToken.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
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
			return SERVER_STATIC_PATH_PRODUCTION;
		} else {
			return SERVER_STATIC_PATH_DEV;
		}
	}

	/**
	 * 存储图片到七牛，并返回外链
	 * @param {String} localFile 服务器中本地图片的根路径
	 * @param {String} key 七牛中的文件名（含路径）
	 * @param {Boolean} isRemainImageInServer 是否保留服务器上的图片
	 * @return {String} 图片外链
	 */
	async qiniu(localFile, key, isRemainImageInServer) {
		let self = this;
		try {
			let outside_link = await self.uploadFile(self.getUploadToken(), key, localFile);
			if (!isRemainImageInServer) { // 删除
				fs.unlinkSync(localFile);
			}
			return outside_link;
		} catch (e) {
			throw new Error(e.message);
		}
	}

	//获取上传凭证
	getUploadToken() {
		var mac = new qiniu.auth.digest.Mac(ACCESSKEY, SECRETKEY);
		var options = {
			scope: BUCKET
		};
		var putPolicy = new qiniu.rs.PutPolicy(options);
		var uploadToken = putPolicy.uploadToken(mac);

		return uploadToken;
	}

	/**
	 * 函数的作用
	 * @param uptoken 上传文件的token
	 * @param {String} key 七牛中的文件名（含路径）
	 * @param {String} localFile 服务器中本地图片的根路径
	 * @return {Promise} 图片外链
	 */
	uploadFile(uptoken, key, localFile) {
		return new Promise((resolve, reject) => {
			// 配置
			var config = new qiniu.conf.Config();
			// 空间对应的机房 华南
			config.zone = qiniu.zone.Zone_z2;
			// 文件
			var formUploader = new qiniu.form_up.FormUploader(config);
			var putExtra = new qiniu.form_up.PutExtra();
			// 文件上传
			formUploader.putFile(uptoken, key, localFile, putExtra, function(respErr,
				respBody, respInfo) {
				if (respErr) {
					reject(respErr);
					return;
				}
				if (respInfo.statusCode == 200) {
					// 删除
					resolve(IMAGE_PREFIX + respBody.key);
				} else {
					console.log(respInfo.statusCode);
					console.log(respBody);
					reject(respBody);
				}
			});
		});
	}
}