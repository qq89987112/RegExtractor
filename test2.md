---
layout: index.jade
title: Module
---


[TOC]

---

### 1. 商品列表接口
**接口描述：**

- PC端商品列表接口。

**请求URL：**
- ` /product/list?id={id}&page={page}&rows={rows} `

**请求方式：**
- GET

** 接口请求示例 **
```
/product/list?id=PF&page=1&rows=20&query=[]&orderField=&orderDir=
```

**请求参数说明**

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|id |是  |string |渠道编号   |
|query     |否  |string | 模糊查询字段（支持：产品编号、产品名称）    |


 **接口返回示例**

```
{
   "status": true,
   "code": 0,
   "msg": "查询商品列表成功",
   "data": [
            {
         "branch": "XX",
         "categoryId": "01.02",
         "categoryName": "料理机",
         "detailContent": "",
         "id": "01.02.02",
     },
   ]
}
```

 **返回参数说明**

|参数名|类型|说明|
|:-----  |:-----|-----|
|status|boolean|返回状态：成功-true，失败-false  |
|code|string|错误码|
|msg|string|提示消息|
|data|json|数据，对象|

**返回参数说明-data**

|参数名|类型|说明|
|:-----  |:-----|-----|
| branch | String| 产品品牌 |
| categoryId | string| 产品类编ID |
| categoryName | string| 产品类别名称 |
| detailContent | string| 图文详情 |
| id | string| 产品id |


 **备注**

- 更多返回错误代码请看首页的错误代码描述


### 2. 商品分类接口
**接口描述：**

- PC端商品分类接口。

**请求URL：**
- ` /product/category `

**请求方式：**
- GET

** 接口请求示例 **
- 无

**请求参数说明**
- 无

**接口返回示例**
```
{
   "status": true,
   "code": 0,
   "msg": "查询分类成功",
   "data": [
        {
         "categoryName": "XX",
         "goodsLevel": 2,
         "id": "09.01",
         "isHasChildren": false,
         "parentId": "09",
         "thumbnail": ""
      }
   ]
}
```

 **返回参数说明**

|参数名|类型|说明|
|:-----  |:-----|-----|
|status|boolean|返回状态：成功-true，失败-false  |
|code|string|错误码|
|msg|string|提示消息|
|data|json|数据|

**返回参数说明-data**

|参数名|类型|说明|
|:-----  |:-----|-----|
|categoryName|String|编号|
|goodsLevel|String|商品等级|
|id|String|编号|
|isHasChildren|boolean|是否是下级|
|parentId|String|上级编号|
|thumbnail|String|产品缩略图|
 **备注**

- 更多返回错误代码请看首页的错误代码描述

