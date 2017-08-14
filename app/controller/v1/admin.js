import AdminModel from "../../models/v1/admin.js"
import Util from "../../tools/util.js"
import formidable from "formidable"
import path from "path"
import fs from "fs"

class Admin extends Util {
	constructor() {
		super();
		this.signup = this.signup.bind(this);
		this.signin = this.signin.bind(this);
		this.signout = this.signout.bind(this);
		this.count = this.count.bind(this);
		this.accounts = this.accounts.bind(this);
		this.account = this.account.bind(this);
		this.upload_avatar = this.upload_avatar.bind(this);
	}

	async signup(req, res, next) {
		let username, password;
		try {
			if (!req.body.username) {
				throw new Error('用户名错误')
			} else if (!req.body.password) {
				throw new Error('密码错误')
			}
			[username, password] = [req.body.username, req.body.password];
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
			let u1 = await AdminModel.findOne({
				username
			});
			if (u1) {
				console.log("已存在的用户名");
				res.send({
					status: 0,
					type: "EXISTED_USERNAME",
					message: '已存在的用户名'
				})
			} else {
				let is_super = false;
				let id = await this.getId("admin_id");
				let obj = {
					username,
					password: this.MD5(password),
					id: id,
					created_time: new Date().toISOString(),
					is_super
				}
				await AdminModel.create(obj);
				res.send({
					status: 1,
					message: '注册管理员成功'
				})
			}
		} catch (e) {
			console.log('注册管理员失败', e);
			res.send({
				status: 0,
				type: "REGISTER_ADMIN_FAIL",
				message: '注册管理员失败'
			})
		}
	}

	async signin(req, res, next) {
		let username, password;
		
		if (req.session.admin) {
			res.send({
				status: 0,
				type: 'ALREADY_LOGIN',
				message: "已经登录，无法再次进行登录"
			})
			return;
		}

		try {
			if (!req.body.username) {
				throw new Error('用户名错误')
			} else if (!req.body.password) {
				throw new Error('密码错误')
			}
			[username, password] = [req.body.username, req.body.password];
		} catch (err) {
			console.log(err.message, err);
			res.send({
				status: 0,
				type: 'ERROR_PARAM',
				message: err.message,
			})
			return;
		}

		try {
			let u1 = await AdminModel.findOne({
				username
			});

			if (!u1) {
				console.log("用户名不存在");
				res.send({
					status: 0,
					type: "ERROR_USERNAME_OR_PASSWORD",
					message: '用户名或密码不正确'
				});
			} else if (u1 && u1.password !== this.MD5(password)) {
				console.log("密码不正确");
				res.send({
					status: 0,
					type: "ERROR_USERNAME_OR_PASSWORD",
					message: '用户名或密码不正确'
				});
			} else if (u1 && u1.password === this.MD5(password)) {
				req.session.admin = u1;
				console.log('登录成功', req.session.admin);
				console.log(req.sessionID);
				let u = await AdminModel.findOne({
					username: username
				});
				res.send({
					status: 1,
					message: '登录成功',
					data: {
						user: {
							username: username,
							avatar_url: u.avatar_url,
							created_time: u.created_time,
							is_super: u.is_super,
							id: u.id
						}
					}
				});
			}
		} catch (e) {
			console.log('登录失败', e);
			res.send({
				status: 0,
				type: "LOGIN_FAIL",
				message: '登录失败'
			})
		}
	}
	async signout(req, res, next) {
		try {
			delete req.session.admin;
			res.send({
				status: 1,
				message: '注销成功'
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "SIGNOUT_FAIL",
				message: '注销失败'
			});
		}
	}

	async count(req, res, next) { // 查询管理员数量
		try {
			const count = await AdminModel.count({});
			res.send({
				status: 1,
				message: '查询管理员数量成功',
				data: count
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "GET_ADMIN_COUNT_FAIL",
				message: '查询管理员数量失败'
			});
		}
	}

	async accounts(req, res, next) { // 查询多个管理员信息
		try {
			const {
				limit = 20, page = 1
			} = req.query;
			let skip = limit * (page - 1);
			let u1 = await AdminModel.find({}, {
				"created_time": 1,
				"is_super": 1,
				"username": 1,
				"id": 1,
				"_id": 0
			}).limit(Number(limit)).sort({
				id: -1
			}).skip(skip);
			res.send({
				status: 1,
				message: '查询管理员账户成功',
				data: u1
			});
		} catch (e) {
			console.log(e);
			res.send({
				status: 0,
				type: "QUERY_ADMIN_FAIL",
				message: '查询管理员账户失败'
			});
		}
	}

	async account(req, res, next) { // 查询单个管理员信息
		try {
			let id = req.params.id;
			let u1 = await AdminModel.findOne({
				id: Number(id)
			}, {
				"_id": 0,
				"__v": 0,
				"password": 0
			});
			res.send({
				status: 1,
				message: '查询管理员账户成功',
				data: u1
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "GET_ADMIN_INFO_FAIL",
				message: '查询管理员账户失败'
			});
		}
	}

	async upload_avatar(req, res, next) {
		let self = this;
		try {
			let form = new formidable.IncomingForm();
			let dir = path.join(__dirname, "../../public/images/admin/avatar/upload");
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
				let newpath = path.join(__dirname, "../../public/images/admin/avatar/upload", str + extname).replace(/\\/g, '/');
				// 返回给前端的路径
				let avatar_url = self.getServerStaticPath() + newpath.slice(newpath.indexOf('/images'));

				try {
					//改名
					await self.rename(temppath, newpath);
					//更新数据库
					let id = req.session.admin.id;
					let admin = await AdminModel.findOne({
						id
					});
					let previous_avatar_url = admin.avatar_url.match(/\/images.*$/)[0]; // 截取到原先的数据库的路径
					admin.avatar_url = avatar_url;
					await admin.save();
					//删除数据库中旧头像
					if (previous_avatar_url.indexOf("default") === -1) {
						await self.removeFile(path.join(__dirname, "../../public/", previous_avatar_url));
					}
					res.send({
						status: 1,
						message: '上传头像成功',
						avatar_url: avatar_url
					});
				} catch (e) {
					console.log('服务器异常，上传头像失败');
					console.log(e.message);
					res.send({
						status: 0,
						type: "UPLOAD_AVATAR_FAIL",
						message: '服务器异常，上传头像失败'
					});
				}
			});
		} catch (e) {
			res.send({
				status: 0,
				type: "UPLOAD_AVATAR_FAIL",
				message: '上传头像失败'
			});
		}
	}
}

export default new Admin()