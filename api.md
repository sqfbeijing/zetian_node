###1.管理员注册 


> 只有超级管理员才能进行注册  

#### 请求URL
```
post /api/v1/admin/signup 
```
#### 参数类型: query

参数|是否必选|类型|备注
---|---|---|---
|username | 是 | string| 用户名
|password | 是 | string|  密码
#### 返回示例
```
{
	status: 1,
	message: '注册管理员成功'
}

```

###2.管理员登录 
#### 请求URL
```
POST /api/v1/admin/signin
```
#### 参数类型: query

参数|是否必选|类型|备注
---|---|---|---
|username | 是 | string| 用户名
|password | 是 | string|  密码
#### 返回示例
```
{"status":1,
	"message":"登录成功",
	"data":{
		"user":{
			"username":"admin",
			"avatar_url":"http://www.icosky.com/icon/png/System/Scrap/Administrator%202.png",
			"created_time":"2017-07-06T06:39:13.933Z",
			"is_super":true,
			"id":1
		}
	}
}

```

###3.管理员注销 

#### 请求URL
```
post /api/v1/admin/signout 
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---
#### 返回示例
```
{
	status: 1,
	message: '注销成功'
}

```

###4. 查询管理员数量 
 

#### 请求URL
```
GET /api/v1/admin/count
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---
#### 返回示例
```
{
	status: 1,
	message: '查询管理员数量成功',
	data: 20
}

```

###5.获取管理员列表 

#### 请求URL
```
 GET api/v1/admin/accounts  
```
#### 参数类型: query

参数|是否必选|类型|备注
---|---|---|---
|limit | 否 | number| 每页多少个（默认为20） 
|page | 否 | number|  第几页（默认为1）
#### 返回示例
```
{
	"status": 1,
	"message": "查询管理员账户成功",
	"data": [{
		"username": "admin",
		"id": 1,
		"created_time": "2017-07-06T06:39:13.933Z",
		"is_super": true
	}]
}

```

###5.1 获取单个管理员信息

#### 请求URL
```
 GET api/v1/admin/accounts/:id  
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---
#### 返回示例

```
{
	"status": 1,
	"message": "查询管理员账户成功",
	"data": {
		"username": "admin",
		"id": 1,
		"created_time": "2017-07-06T06:39:13.933Z",
		"is_super": true,
		"avatar_url": "http://127.0.0.1:8000/static/images/admin/avatar/default/default1.png"
	}
}

```




###6.更新管理员头像 
> 使用 multipart/form-data 后期应使用http://www.xx.com/8080:/public这样的绝对路径

#### 请求URL
```
 POST api/v1/admin/avatar/update
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```
{
	"status": 1,
	"message": "上传头像成功",
	"avatar_url": "/public/images/admin/avatar/upload/460eb77035fc71e7d86168699eee126e.jpg"
}

```
###7.添加商品分类 
> 一次只能添加一个分类

#### 请求URL
```
POST /api/v1/goods_categories
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---
|category_name|是|String|分类的名称

#### 返回示例

```
{
	"status": 1,
	"message": "添加分类成功",
	"data": {
		"category_name": "塑胶管",
		"id": 2,
		"created_time": "2017-07-24T09:21:20.700Z"
	}
}
```
###7.1 删除商品分类及分类下的商品
> 一次只能删除一个分类

#### 请求URL
```
POST /api/v1/goods_categories/:category_name/delete
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```
{
	"status": 1,
	"message": "删除分类成功",
	"data": {
		"categories": {
			"ok": 1,
			"n": 1
		},
		"goods": {
			"ok": 1,
			"n": 0
		}
	}
}
```

###8.查询商品分类(所有的)

#### 请求URL
```
GET /api/v1/goods_categories
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```
{
	"status": 1,
	"message": "查询分类成功",
	"data": [{
		"category_name": "塑胶管",
		"id": 1,
		"created_time": "2017-07-24T09:26:40.331Z"
	}]
}

```

###9.查询商品分类数量

#### 请求URL
```
GET /api/v1/goods_categories/count 
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```
{
	"status": 1,
	"message": "查询分类数量成功",
	"data": 1
}

```

###10.查询商品标签

#### 请求URL
```
GET /api/v1/goods/tags
```

#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```

{
	"status": 1,
	"message": "查询商品标签成功",
	"data": [{
		"name": "新品",
		"id": 1,
		"created_time": "2017-07-25T08:36:21.370Z"
	}, {
		"name": "精品",
		"id": 2,
		"created_time": "2017-07-25T08:36:21.376Z"
	}, {
		"name": "热销商品",
		"id": 3,
		"created_time": "2017-07-25T08:36:21.381Z"
	}]
}

```


###11.上传商品唯一图片
> form 的name名称为 'avatar'

#### 请求URL
```
POST /api/v1/goods/image/unique
```

#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```

{
	"status": 1,
	"message": "上传图片成功",
	"avatar_url": "http://127.0.0.1:8000/static/images/goods/unique/96f8216793dee72806672258daed9e08.jpg"
}

```


###12.添加商品

#### 请求URL
```
POST /api/v1/goods/add
```

#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---
name|是|string|名称（不可重复）
serial_number |是|string|商品编号
unit |是|string|单位
price |是|number|单价 最小为0
category_name |是|string|所属分类的名称(只属于一个分类)
putaway_time |是|string|上架时间(ISOString,精确到日)
store |是|array|店铺名称的数组
warehouse |是| array |库房名称的数组
sold_count |否|number|总销售量：默认为0
inventory |否|number|库存：默认为0
tags |否| array |标签名称的数组(新品，精品，热销商品)
image_url |是|string|唯一的图片标识
description |否|string|商品简介

### 参数示例
```
{
	"name": "塑胶管",
	"serial_number": "AK982130",
	"unit": "个",
	"price": 300,
	"category_name": '滴灌',
	"putaway_time": "2017-07-26T16:00:00.000Z",
	"store": ['商业街1号'],
	"warehouse": ['诗书路2号楼1层'],
	"sold_count": 0,
	"inventory": 1000,
	"tags": ["精品"],
	"image_url": "http://127.0.0.1:8000/static/images/goods/unique/60e3dba6e8719972a6e09ed73e56a708.jpg",
	"description": "随便写点"
}
```
#### 返回示例

```

{
	"status": 1,
	"message": "添加商品成功"
}

```


###13.查询商品的数量
#### 请求URL
```
GET /api/v1/goods/count
```

#### 参数类型:
> name 和 category_name二选一，如若都不选，则查询所有的商品的数量

参数|是否必选|类型|备注
---|---|---|---
name|否|string|商品关键字
category_name|否|string|商品分类名

#### 返回示例

```
{
	"status": 1,
	"message": "查询商品数量成功",
	"data": 2
}

```


###14.查询单个商品信息 

#### 请求URL

```
GET /api/v1/goods/:id/info 
```

#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```

{
	"status": 1,
	"message": "查询商品信息成功",
	"data": {
		"name": "1",
		"id": 1,
		"creater_id": 1,
		"created_time": "2017-07-27T08:21:15.356Z",
		"serial_number": "2",
		"unit": "3",
		"price": 0,
		"category_name": "哈哈",
		"putaway_time": "2017-07-26T16:00:00.000Z",
		"image_url": "http://127.0.0.1:8000/static/images/goods/unique/7c137b4bb239d3e6b376f4e88f3e6a61.jpg",
		"description": "",
		"tags": ["热销商品", "精品"],
		"inventory": 0,
		"sold_count": 0,
		"warehouse": ["诗书路库房2"],
		"store": ["商业街1号"]
	}
}

```


###15.查询一批商品信息 

#### 请求URL

```
GET /api/v1/goods
```

#### 参数类型:
> category_name 和 name 二选一，当两个都查询时，查询name；
> 都不填 则查询所有商品

参数|是否必选|类型|备注
---|---|---|---
name|否|string|商品名称模糊查询
category_name |否|string|按分类名称查询
limit|否|number|每页显示多少个，默认为20
page |否|number|查询的页数，默认为1

#### 返回示例

```
{
	"status": 1,
	"message": "查询商品信息成功",
	"data": [{
		"name": "我去问313131",
		"id": 2,
		"creater_id": 1,
		"created_time": "2017-07-27T08:39:00.108Z",
		"serial_number": "ak3114531341241",
		"unit": "个",
		"price": 20000,
		"category_name": "哈哈",
		"putaway_time": "2017-07-24T16:00:00.000Z",
		"image_url": "http://127.0.0.1:8000/static/images/goods/unique/aabb3390db8dfb43103255c8e98dbe58.jpg",
		"description": "完全二发完全二发完全二发完全二发完全二发完全二发完全二发完全二发完全二发完全二发完全二发完全二发完全二发完",
		"tags": ["精品", "新品"],
		"inventory": 8,
		"sold_count": 300,
		"warehouse": ["诗书路库房1", "诗书路库房2"],
		"store": ["商业街1号", "商业街2号"]
	}]
}

```


###16.删除商品
>   (超级管理员权限)

#### 请求URL
```
POST /api/v1/goods/:id/delete
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```

{
	"status": 1,
	"message": "删除商品成功",
	"data": {
		"ok": 1,
		"n": 1
	}
}

```


###17.出售商品

#### 请求URL
```
POST /api/v1/goods/:id/sale
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---
salecount|是|number| 数量范围：[0，库存数量]

#### 返回示例
> 

```
{
	"status": 1,
	"message": "出售商品成功", 
	"data": 99996000 //出售之后的库存量
}

```



###18.更新商品
> 数据如同 添加商品，需要整个表单一起提交

#### 请求URL
```
POST /api/v1/goods/:id/update
```

#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---
name|是|string|名称（不可重复）
serial_number |是|string|商品编号
unit |是|string|单位
price |是|number|单价 最小为0
category_name |是|string|所属分类的名称(只属于一个分类)
putaway_time |是|string|上架时间(ISOString,精确到日)
store |是|array|店铺名称的数组
warehouse |是| array |库房名称的数组
sold_count |否|number|总销售量：默认为0
inventory |否|number|库存：默认为0
tags |否| array |标签名称的数组(新品，精品，热销商品)
image_url |是|string|唯一的图片标识
description |否|string|商品简介

#### 参数示例
```
{
	"name": "a",
	"serial_number": "31",
	"unit": "ssss",
	"price": 2,
	"category_name": "\b喷头类",
	"putaway_time": "2017-07-18T16:00:00.000Z",
	"store": ["商业街2号"],
	"warehouse": ["诗书路库房2"],
	"tags": ["精品", "热销商品"],
	"image_url": "http://127.0.0.1:8000/static/images/goods/unique/85de45fb0ba418e073c669c3d510ae81.jpg",
	"description": ""
}
```
#### 返回示例

```

{
	"status": 1,
	"message": "修改商品成功",
	"data": {
		"ok": 1,
		"n": 1,
		"nModified": 1
	}
}

```



###19.上传商品图文图片
> name为 detail_image
> 每次只能上传一张图片

#### 请求URL
```
POST /api/v1/goods/detail/photo
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```
{
	"status": 1,
	"message": "上传图片成功",
	"detail_image_url": "http://127.0.0.1:8000/static/images/goods/detail/d8b99fabe90aa202984cabeadd404f24.jpg"


```


###20.查询商品图文
#### 请求URL
```
GET /api/v1/goods/:id/detail/info
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```

{
	"status": 1,
	"message": "查询商品图文成功",
	"data": {
		"content": "<p>wq<img src=\"http://127.0.0.1:8000/static/images/goods/detail/b37450182d595df3e38aeeb898ddc94b.jpg\"></p>",
		"created_time": "2017-08-04T08:35:22.179Z",
		"creater_id": 1,
		"goods_id": 1,
		"id": 1,
		"last_modify_person_id": 1,
		"last_modify_time": "2017-08-04T08:35:32.548Z"
	}
}

```


###21.添加商品图文

#### 请求URL
```
POST /api/v1/goods/:id/detail/add
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---
content|否|string|默认为`""`
#### 返回示例

```
{
	"status": 1,
	"message": "添加商品图文成功",
	"data": {
		"id": 2,
		"goods_id": "2",
		"creater_id": 1,
		"created_time": "2017-08-04T08:40:19.141Z",
		"last_modify_person_id": 1,
		"last_modify_time": "2017-08-04T08:40:19.141Z",
		"content": ""
	}
}


```


###22.修改商品图文

#### 请求URL
```
POST /api/v1/goods/:id/detail/update
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---
content|是|string|默认为`""`
#### 返回示例

```

{
	"status": 1,
	"message": "更新商品图文成功",
	"data": {
		"id": 2,
		"goods_id": 2,
		"creater_id": 1,
		"created_time": "2017-08-04T08:40:19.141Z",
		"last_modify_person_id": 1,
		"last_modify_time": "2017-08-04T08:42:05.235Z",
		"content": "<p>wqqw</p>"a
	}
}

```

###30.查询店铺

#### 请求URL
```
GET /api/v1/stores
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```

{
	"status": 1,
	"message": "查询店铺成功",
	"data": [{
		"name": "商业街1号",
		"id": 1,
		"created_time": "2017-07-25T08:42:07.261Z"
	}, {
		"name": "商业街2号",
		"id": 2,
		"created_time": "2017-07-25T08:42:07.265Z"
	}]
}

```



###31.查询库房

#### 请求URL
```
GET /api/v1/warehouses
```
#### 参数类型:

参数|是否必选|类型|备注
---|---|---|---

#### 返回示例

```

{
	"status": 1,
	"message": "查询库房成功",
	"data": [{
		"name": "诗书路库房1",
		"id": 1,
		"created_time": "2017-07-25T08:42:07.269Z"
	}, {
		"name": "诗书路库房2",
		"id": 2,
		"created_time": "2017-07-25T08:42:07.273Z"
	}]
}

```