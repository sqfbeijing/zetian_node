* api 为8000 端口
* 127.0.0.1:8000/api/v1/item/:item_id 这样
* 返回的数据 

	```
	{
	status: 0 代表失败， 1代表成功
	type: 失败时候会有此字段 e.g.  'EXISTED_USERNAME'
	message: '注册管理员成功'
	}
	
	```
* 保存时间信息均用 ISO字符串（参考cnodejs） 

		new Date().toISOString()
		"2017-06-29T07:45:31.194Z"
* 权限验证,在路由加个中间件,如下：
	
	```	
	router.post('/signup', Admin.signup);
	router.post('/signin', Admin.signin);
	router.post('/getList', authorize.admin, Admin.getList);
	```
* 商品 有编辑页，编辑和增加商品复用同一个组件
* 图文详情会在数据库 使用一个单独的表，用goods_id 来挂钩对应的商品