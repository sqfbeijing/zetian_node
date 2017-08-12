import mongoose from "mongoose"
import initData from "./../init_data/index.js"
mongoose.connect('mongodb://localhost/zetian');
mongoose.Promise = global.Promise;


let db = mongoose.connection;
db.on("error",()=>{
	console.error("数据库连接错误");
});
db.once("open",()=>{
	console.log("数据库连接成功");
	//初始化
	new initData();
})

export default db;
