import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import compression from 'compression';
import logger from 'morgan';
import config from 'config-lite';
import cookieParser from 'cookie-parser'; //废弃，express-session实现
import session from 'express-session';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import mongoose from "mongoose"
import db from "./mongodb/db.js"; // 自动执行此文件

var app = express();
app.use(compression());
app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*'); // 这很重要
	// res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //浏览器可以带cookie 发送到服务器
	res.header("X-Powered-By", '3.2.1');
	if (req.method == 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});

const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
	secret: 'zetian',
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30 //默认30天
	},
	resave: true, // 重新保存：强制会话保存即使是未修改的。
	saveUninitialized: false, // 强制“未初始化”的会话保存到存储。
	store: new MongoStore({
		mongooseConnection: db
	})
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use('/static', express.static(path.join(__dirname, 'public'), )); // 虚拟static路径

// 路由
router(app);

// 未匹配到的路由
app.use(function(req, res, next) {
	// res.send('你来到了错误的页面');
	res.redirect("/");
});

module.exports = app;