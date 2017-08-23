import AdminModel from "../models/v1/admin.js"
import SessionModel from "../models/v1/session.js"
import GoodsModel from "../models/v1/goods.js"
import GoodsCategoryModel from "../models/v1/goods_category.js"
import GoodsDetailModel from "../models/v1/goods_detail.js"
import GoodsTagModel from "../models/v1/goods_tag.js"
import StoreModel from "../models/v1/store.js"
import WarehouseModel from "../models/v1/warehouse.js"
import IdsModel from "../models/ids.js"
import db from "../mongodb/db.js"
import mongoose from "mongoose"
import Util from "../tools/util.js"
import {
	INIT_IDS,
	INIT_SUPER_ADMIN_COUNT,
	GOODS_TAGS,
	STORE_NAMES,
	WAREHOUSES
} from "./config_data.js"

let util = new Util();


//存储初始数据到数据库
class initData {
	constructor() {
		console.log("初始化数据库中...");
		if (process.env.NODE_ENV_TAG === "init") { // 是否重置数据库
			this.init();
		} else {
			return;
		}
	}

	async init() {
		await this.clearAll();
		await this.initIds();
		await this.initAdmin();
		await this.initGoods_tag();
		await this.initStores();
		await this.initWarehouses();
	}

	async clearAll() {
		try {
			//删除session
			await SessionModel.remove({});
			//删除 所有的表
			await AdminModel.remove({});
			await GoodsModel.remove({});
			await GoodsCategoryModel.remove({});
			await GoodsDetailModel.remove({});
			await GoodsTagModel.remove({});
			await StoreModel.remove({});
			await WarehouseModel.remove({});
			await IdsModel.remove({});
			console.log("清空数据库完成");
			return true;
		} catch (e) {
			throw Error(e);
		}
	}

	async initIds() {
		let ids = INIT_IDS;
		try {
			await IdsModel.create(ids);
			console.log('初始化ids成功');
		} catch (e) {
			console.log('初始化ids失败', e);
		}
	}

	async initAdmin() {
		try {
			let id = await util.getId("admin_id");
			let obj = INIT_SUPER_ADMIN_COUNT;
			obj.id = id;
			await AdminModel.create(obj);
			console.log('初始化管理员成功');
		} catch (e) {
			console.log('初始化管理员失败', e);
		}
	}

	async initGoods_tag() {
		try {
			for (var i = 0; i < GOODS_TAGS.length; i++) {
				let id = await util.getId("goods_tag_id");
				await GoodsTagModel.create({
					name: GOODS_TAGS[i],
					id,
					created_time: new Date().toISOString()
				});
			}
			console.log('初始化商品标签成功');
		} catch (e) {
			console.log('初始化商品标签失败', e);
		}
	}

	async initStores() {
		try {
			for (var i = 0; i < STORE_NAMES.length; i++) {
				let id = await util.getId("store_id");
				await StoreModel.create({
					name: STORE_NAMES[i],
					id,
					created_time: new Date().toISOString()
				});
			}
			console.log('初始化店铺成功');
		} catch (e) {
			console.log('初始化店铺失败', e);
		}
	}

	async initWarehouses() {
		try {
			for (var i = 0; i < WAREHOUSES.length; i++) {
				let id = await util.getId("warehouse_id");
				await WarehouseModel.create({
					name: WAREHOUSES[i],
					id,
					created_time: new Date().toISOString()
				});
			}
			console.log('初始化库房成功');
		} catch (e) {
			console.log('初始化库房失败', e);
		}
	}

}

export default initData;