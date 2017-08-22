import Goods_categoryModel from "../../models/v1/goods_category.js"
import GoodsModel from "../../models/v1/goods.js"
import Util from "../../tools/util.js"
import path from "path"
import fs from "fs"

class Goods_category extends Util {
	constructor() {
		super();
		this.add_category = this.add_category.bind(this);
		this.count = this.count.bind(this);
		this.getCategories = this.getCategories.bind(this);
	}

	async add_category(req, res, next) { // 添加一个分类
		let self = this;
		let category_name = req.body.category_name;
		try {
			if (!category_name) {
				throw new Error('分类名有误');
			}
		} catch (err) {
			console.log(err.message, err);
			res.send({
				status: 0,
				type: 'ERROR_PARAM',
				message: err.message
			})
			return;
		}
		try {
			category_name = category_name.trim();
			let category1 = await Goods_categoryModel.findOne({
				category_name
			});
			if (category1) {
				console.log("已经存在的分类名");
				res.send({
					status: 0,
					type: "EXISTED_NAME",
					message: '已存在的分类名'
				});
				return;
			} else {
				let id = await self.getId("goods_category_id");
				let created_time = new Date().toISOString();
				let obj = {
					category_name,
					id,
					created_time
				}
				await Goods_categoryModel.create(obj);
				res.send({
					status: 1,
					message: '添加分类成功',
					data: {
						category_name,
						id,
						created_time
					}
				});
				return;
			}
		} catch (e) {
			console.log('添加分类失败', e);
			res.send({
				status: 0,
				type: "ADD_CATEGORY_FAIL",
				message: '添加分类失败'
			})
		}
	}

	async count(req, res, next) { // 查询分类的数量
		try {
			const count = await Goods_categoryModel.count({});
			res.send({
				status: 1,
				message: '查询分类数量成功',
				data: count
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "GET_GOODS_CATEGORIES_COUNT_FAIL",
				message: '查询分类数量失败'
			});
		}
	}

	async getCategories(req, res, next) { // 获取所有的商品分类
		try {
			let categories = await Goods_categoryModel.find({}, {
				"category_name": 1,
				"created_time": 1,
				"id": 1,
				"_id": 0
			});
			res.send({
				status: 1,
				message: '查询分类成功',
				data: categories
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "GET_GOODS_CATEGORIES_FAIL",
				message: '查询分类失败'
			});
		}
	}

	async deleteCategory(req, res, next) { // 删除商品分类 以及 分类下的所有商品
		let category_name = req.params.category_name;
		try {
			let t1 = await Goods_categoryModel.remove({
				category_name
			});
			let t2 = await GoodsModel.remove({
				category_name
			});
			res.send({
				status: 1,
				message: '删除分类成功',
				data: {
					categories: t1,
					goods: t2
				}
			});
		} catch (e) {
			console.log("删除分类及其分类下的商品失败", e.message);
			res.send({
				status: 0,
				type: "DELETE_GOODS_CATEGORIES_FAIL",
				message: '删除分类及其分类下的商品失败'
			});
		}


	}
}

export default new Goods_category()