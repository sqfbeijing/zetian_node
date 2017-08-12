// 路由
import deal_file from "./deal_file.js"
import admin from "./api/v1/admin.js"
import goods_categories from "./api/v1/goods_categories.js"
import goods from "./api/v1/goods.js"
import stores from "./api/v1/stores.js"
import warehouses from "./api/v1/warehouses.js"

const router = (app) => {
	// 请求应用的页面 8000端口
	app.use("/", deal_file);
	//api
	app.use("/api/v1/admin", admin);
	app.use("/api/v1/goods_categories", goods_categories);
	app.use("/api/v1/goods", goods);
	app.use("/api/v1/stores", stores);
	app.use("/api/v1/warehouses", warehouses);
};

export default router;
