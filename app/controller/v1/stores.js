import StoreModel from "../../models/v1/store.js"
import Util from "../../tools/util.js"
import path from "path"
import formidable from "formidable"
import fs from "fs"

class Store extends Util {
	constructor() {
		super();
		this.getStores = this.getStores.bind(this);
	}

	async getStores(req, res, next) {
		try {
			let r1 = await StoreModel.find({}, {
				"created_time": 1,
				"name": 1,
				"id": 1,
				"_id": 0
			});
			res.send({
				status: 1,
				message: '查询店铺成功',
				data: r1
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "GET_STORES_FAIL",
				message: '查询店铺失败'
			});
		}
	}
}

export default new Store()