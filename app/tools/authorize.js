import AdminModel from "./../models/v1/admin.js"

class Authorize {
	constructor(){}

	async admin(req, res, next) {
		if (!req.session.admin) {
			res.send({
				status: 0,
				type: 'ERROR_SESSION',
				message: '亲，您还没有登录'
			})
			return;
		}
		next();
	}
	
	async superAdmin(req, res, next) {
		if (!req.session.admin) {
			res.send({
				status: 0,
				type: 'ERROR_SESSION',
				message: '亲，您还没有登录'
			})
			return;
		} else if (!req.session.admin.is_super) {
			res.send({
				status: 0,
				type: 'HAS_NO_ACCESS',
				message: '权限不足，请联系管理员提升权限'
			})
			return;
		}
		next();
	}
}
export default new Authorize();