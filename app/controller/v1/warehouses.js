import WarehouseModel from "../../models/v1/warehouse.js"
import Util from "../../tools/util.js"
import path from "path"
import formidable from "formidable"
import fs from "fs"

class Warehouse extends Util {
	constructor() {
		super();
		this.getWarehouses = this.getWarehouses.bind(this);
	}

	async getWarehouses(req, res, next) {
		try {
			let r1 = await WarehouseModel.find({}, {
				"created_time": 1,
				"name": 1,
				"id": 1,
				"_id": 0
			});
			res.send({
				status: 1,
				message: '查询库房成功',
				data: r1
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "GET_WAREHOUSE_FAIL",
				message: '查询库房失败'
			});
		}
	}
}

export default new Warehouse()