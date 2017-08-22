import GoodsModel from "../../models/v1/goods.js"
import GoodsDetailModel from "../../models/v1/goods_detail.js"
import GoodsTagModel from "../../models/v1/goods_tag.js"
import Util from "../../tools/util.js"
import path from "path"
import formidable from "formidable"
import fs from "fs"

class Goods extends Util {
	constructor() {
		super();
		this.addGoods = this.addGoods.bind(this);
		this.getGoodsTags = this.getGoodsTags.bind(this);
		this.uploadUniqueImage = this.uploadUniqueImage.bind(this);
		this.uploadDetailImage = this.uploadDetailImage.bind(this);
		this.addDetail = this.addDetail.bind(this);
		this.getDetail = this.getDetail.bind(this);
	}

	async getGoodsTags(req, res, next) {
		try {
			let t1 = await GoodsTagModel.find({}, {
				"created_time": 1,
				"name": 1,
				"id": 1,
				"_id": 0
			});
			res.send({
				status: 1,
				message: '查询商品标签成功',
				data: t1
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "GET_Goods_Tag_FAIL",
				message: '查询商品标签失败'
			});
		}
	}

	async addGoods(req, res, next) {
		let {
			name,
			serial_number,
			unit,
			price,
			category_name,
			putaway_time, // 上架日期
			store,
			warehouse,
			sold_count = 0,
			inventory = 0, // 库存
			tags = [],
			image_url,
			description = ""
		} = req.body;
		
		description = description.trim();
		if (!description) {description = "暂无描述";}
		try {
			if (name === undefined || serial_number === undefined || unit === undefined || price === undefined || category_name === undefined || putaway_time === undefined || store === undefined || warehouse === undefined || image_url === undefined) {
				throw new Error('商品信息不完整，添加失败');
			}
		} catch (err) {
			console.log(err.message, err);
			res.send({
				status: 0,
				type: 'ERROR_PARAM',
				message: err.message
			})
			return
		}

		try {
			name = name.trim();
			let g1 = await GoodsModel.findOne({
				name
			});
			if (g1) {
				console.log("已存在的商品名称");
				res.send({
					status: 0,
					type: "EXISTED_NAME",
					message: '已存在的商品名称'
				})
				return;
			} else {
				let id = await this.getId("goods_id");
				let creater_id = req.session.admin.id;
				let obj = {
					name,
					id,
					creater_id,
					created_time: new Date().toISOString(),
					serial_number,
					unit,
					price,
					category_name,
					putaway_time,
					store,
					warehouse,
					sold_count,
					inventory,
					tags,
					image_url,
					description
				}
				await GoodsModel.create(obj);
				res.send({
					status: 1,
					message: '添加商品成功'
				})
			}
		} catch (e) {
			console.log('添加商品失败', e);
			res.send({
				status: 0,
				type: "ADD_GOODS_FAIL",
				message: '添加商品失败'
			})
		}
	}

	async uploadUniqueImage(req, res, next) { //上传单一的图片
		let self = this;
		try {
			let form = new formidable.IncomingForm();
			let dir = path.join(__dirname, "../../public/images/goods/unique");
			form.uploadDir = dir;
			form.parse(req, async function(err, fields, files) {
				if (err) {
					res.send({
						status: 0,
						type: 'FORM_DATA_ERROR',
						message: '表单信息错误'
					})
					return;
				}
				//拿到扩展名
				let extname = path.extname(files.avatar.name);
				//存放到服务器的旧的路径
				let temppath = files.avatar.path;
				//存放到服务器的新的路径
				let str = self.MD5(files.avatar.name + Math.random());
				let newpath = path.join(__dirname, "../../public/images/goods/unique", str + extname).replace(/\\/g, '/');
				// 返回给前端的路径
				// let avatar_url = path.join(self.getServerStaticPath(), newpath.slice(newpath.indexOf('/images')));
				let avatar_url = self.getServerStaticPath() + newpath.slice(newpath.indexOf('/images'));
				//改名
				await self.rename(temppath, newpath);

				res.send({
					status: 1,
					message: '上传图片成功',
					avatar_url: avatar_url
				});
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "UPLOAD_IMAGE_FAIL",
				message: '上传图片失败'
			});
		}
	}

	async uploadDetailImage(req, res, next) { //上传商品图文中的图片 每次只可传一张
		let self = this;
		try {
			let form = new formidable.IncomingForm();
			let dir = path.join(__dirname, "../../public/images/goods/detail");
			form.uploadDir = dir;
			form.parse(req, async function(err, fields, files) {
				if (err) {
					res.send({
						status: 0,
						type: "FORM_DATA_ERROR",
						message: '表单信息错误'
					});
					return;
				}
				//拿到扩展名
				let extname = path.extname(files.detail_image.name);
				// console.log(extname);
				//存放到服务器的旧的路径
				let temppath = files.detail_image.path;
				// console.log(temppath);
				//存放到服务器的新的路径
				let str = self.MD5(files.detail_image.name + Math.random());
				let newpath = path.join(__dirname, "../../public/images/goods/detail", str + extname).replace(/\\/g, '/');
				// 返回给前端的路径
				let detail_image_url = self.getServerStaticPath() + newpath.slice(newpath.indexOf('/images'));
				//改名
				await self.rename(temppath, newpath);
				res.send({

					status: 1,
					message: '上传图片成功',
					detail_image_url: detail_image_url
				});
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "UPLOAD_IMAGE_FAIL",
				message: '上传图片失败'
			});
		}
	}


	async deleteGoods(req, res, next) { //删除商品 超级管理员
		try {
			let id = req.params.id;
			let t1 = await GoodsModel.remove({
				id
			});
			res.send({
				status: 1,
				message: '删除商品成功',
				data: t1
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "DELETE_GOODS_FAIL",
				message: '删除商品失败'
			});
		}
	}

	async updateGoods(req, res, next) { //修改商品 
		try {
			let id = req.params.id;
			let newData = req.body;
			let t1 = await GoodsModel.update({
				id
			}, newData);

			res.send({
				status: 1,
				message: '修改商品成功',
				data: t1
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "UPDATE_GOODS_FAIL",
				message: '修改商品失败'
			});
		}
	}

	async saleGoods(req, res, next) {
		try {
			let id = req.params.id;
			let salecount = req.body.salecount;

			if (!salecount || salecount <= 0) {
				res.send({
					status: 0,
					message: '出售数据有误',
					type: "SALE_COUNT_ERROR"
				});
				return;
			}
			salecount = Number(salecount);
			let t1 = await GoodsModel.findOne({
				id
			});
			if (salecount > t1.inventory) {
				res.send({
					status: 0,
					message: '出售数量超过库存量，出售失败',
					type: "SALE_COUNT_ERROR"
				});
				return;
			}
			t1.sold_count += salecount;
			t1.inventory -= salecount;
			await t1.save();

			res.send({
				status: 1,
				message: '出售商品成功',
				data: t1.inventory // 新的库存
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "SALE_GOODS_FAIL",
				message: '出售商品失败'
			});
		}
	}

	async getTotalGoodsCount(req, res, next) { // 获取符合条件的商品的数量
		try {
			let queryObj = {};
			if (req.query.name) { // 按商品名称模糊查询
				let reg = new RegExp(req.query.name, 'i'); //不区分大小写
				queryObj.name = reg;
			} else if (req.query.category_name) { // 按分类名称查询
				queryObj.category_name = req.query.category_name;
			}

			let t1 = await GoodsModel.find(queryObj);
			let count = t1.length;
			res.send({
				status: 1,
				message: '查询商品数量成功',
				data: count
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "GET_COUNT_FAIL",
				message: '查询商品数量失败'
			});
		}

	}

	async getGoodsInfo(req, res, next) { // 单个商品信息
		try {
			let id = req.params.id;

			const t1 = await GoodsModel.findOne({
				id
			}, {
				"_id": 0,
				"__v": 0
			});
			res.send({
				status: 1,
				message: '查询商品信息成功',
				data: t1
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "GET_GOODS_FAIL",
				message: '查询商品信息失败'
			});
		}
	}

	async getGoodsInfoMultiple(req, res, next) { // 多个商品信息
		try {
			const {
				limit = 20, page = 1
			} = req.query;
			let skip = limit * (page - 1);
			let queryObj = {};
			if (req.query.name) { // 按商品名称模糊查询
				let reg = new RegExp(req.query.name, 'i'); //不区分大小写
				queryObj.name = reg;
			} else if (req.query.category_name) { // 按分类名称查询
				queryObj.category_name = req.query.category_name;
			}

			let t1 = await GoodsModel.find(queryObj, {
				"_id": 0,
				"__v": 0
			}).limit(Number(limit)).sort({
				id: -1
			}).skip(skip);
			res.send({
				status: 1,
				message: '查询商品信息成功',
				data: t1
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "GET_GOODS_FAIL",
				message: '查询商品信息失败'
			});
		}
	}


	async addDetail(req, res, next) { // 创建图文
		try {
			let g1 = await GoodsModel.findOne({
				id: req.params.id
			});
			if (!g1) {
				console.log("不存在对应的商品");
				res.send({
					status: 0,
					type: "NO_THIS_GOODS",
					message: '不存在对应的商品'
				})
				return;
			}

			let g2 = await GoodsDetailModel.findOne({
				goods_id: req.params.id
			});
			if (g2) {
				console.log("已存在的商品图文");
				res.send({
					status: 0,
					type: "EXISTED_GOODS_DETAIL",
					message: '已存在的商品图文'
				})
				return;
			}

			//创建
			try {
				let obj = {};

				let id = await this.getId("goods_detail_id");
				obj.id = id;
				obj.goods_id = req.params.id;
				obj.creater_id = req.session.admin.id;
				obj.created_time = new Date().toISOString();
				obj.last_modify_person_id = req.session.admin.id;
				obj.last_modify_time = new Date().toISOString();
				obj.content = req.body.content ? req.body.content : "";

				await GoodsDetailModel.create(obj);
				res.send({
					status: 1,
					message: '添加商品图文成功',
					data: obj
				})
			} catch (e) {
				console.log("添加商品图文失败", e.message);
				res.send({
					status: 0,
					message: '添加商品图文失败',
					type: "ADD_GOODS_DETAIL_FAIL"
				})
			}
		} catch (e) {
			console.log("添加商品图文失败", e.message);
			res.send({
				status: 0,
				message: '添加商品图文失败',
				type: "ADD_GOODS_DETAIL_FAIL"
			})
		}
	}

	async updateDetail(req, res, next) { // 更新图文
		try {
			if (typeof req.body.content === "undefined") {
				console.log("缺少图文信息参数");
				res.send({
					status: 0,
					type: "NO_DETAIL_PARAMATER",
					message: '缺少图文信息参数'
				})
				return;
			}

			let g1 = await GoodsModel.findOne({
				id: req.params.id
			});
			if (!g1) {
				console.log("不存在对应的商品");
				res.send({
					status: 0,
					type: "NO_THIS_GOODS",
					message: '不存在对应的商品'
				})
				return;
			}

			let g2 = await GoodsDetailModel.findOne({
				goods_id: req.params.id
			});
			if (!g2) {
				console.log("不存在此商品的图文");
				res.send({
					status: 0,
					type: "NO_GOODS_DETAIL",
					message: '不存在此商品的图文'
				})
				return;
			}

			//更新
			g2.content = req.body.content;
			g2.last_modify_person_id = req.session.admin.id;
			g2.last_modify_time = new Date().toISOString();
			await g2.save();
			delete g2.__v;
			delete g2._id;
			res.send({
				status: 1,
				message: '更新商品图文成功',
				data: g2
			})
		} catch (e) {
			console.log("更新商品图文失败", e.message);
			res.send({
				status: 0,
				message: '更新商品图文失败',
				type: "UPDATE_GOODS_DETAIL_FAIL"
			})
		}
	}

	async getDetail(req, res, next) { // 查找某个商品的图文信息
		try {
			let goods_id = req.params.id;

			const t1 = await GoodsDetailModel.findOne({
				goods_id
			}, {
				"_id": 0,
				"__v": 0
			});

			if (!t1) {
				res.send({
					status: 0,
					message: '暂未查询到相关图文',
					type: "FIND_NO_DETAIL"
				});
				return;
			}
			res.send({
				status: 1,
				message: '查询商品图文成功',
				data: t1
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "GET_GOODS_DETAIL_FAIL",
				message: '查询商品图文失败'
			});
		}
	}
}

export default new Goods()