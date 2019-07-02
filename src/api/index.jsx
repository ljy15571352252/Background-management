import ajax from    "./ajax"
import jsonp from 'jsonp'; //Andt 自己封装得jsonp 解决跨域
import { message } from 'antd';


  //返回的一定是一个promise成共状态的对象 成功就会有数据 失败就没有
export default function  login(username,password) {
  return ajax("/login", {username, password}, "POST")
}

//验证接口r
export const  reqValidateUserInfo =function(id) {
    return ajax("/validate/user",{id},"POST")
}



  //天气得接口
//最外面套层函数 是为了防止里面的prominse自调用
export const  reWeather=function () {
  let cancel = null //jsonp返回一个取消ajax请求的函数
  const promise = new Promise((resolve,reject)=>{
        cancel= jsonp("http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2", {}, function (erro,data) {
        //请求成功
        if(!erro){
          const {dayPictureUrl,weather} = data.results[0].weather_data[0];
          resolve({
            weatherImg:dayPictureUrl,
            weather :weather
          })
        }else{
          message.error("请求天气失败，请重新刷新页面")
          resolve()
        }
      })
    })
   return{
     promise,
     cancel
   }
}

//获取分类接口
export const    reqCategories= function(parentId) {
  return ajax("/manage/category/list",{parentId})
}

//添加分类接口
export const    reqAddCategories= function(parentId,categoryName) {
  return ajax("/manage/category/add",{parentId,categoryName},"POST")
}

//修改名称的接口
export const    reqUpdateCategoryName= function(categoryId,categoryName) {
  return ajax("/manage/category/update",{categoryId,categoryName},"POST")
}

//请求商品的接口
export const  reqProducts= function(pageNum,pageSize) {
  return ajax("/manage/product/list",{pageNum,pageSize})
}

//添加商品
export const  addProducts= function({name, desc, price, categoryId, pCategoryId, detail}) {
  return ajax("/manage/product/add",{name, desc, price, categoryId, pCategoryId, detail},"POST")
}

//更新修改产品的接口
export const  updataProductsName= function({name, desc, price, categoryId, pCategoryId, detail,_id}) {
  return ajax("/manage/product/update",{name, desc, price, categoryId, pCategoryId, detail,_id},"POST")
}

//删除图片
export const removeImg = (name,id) => ajax("/manage/img/delete",{name,id},"POST")

//搜索用户信息
export const reqProductsmessage = ({searchType,searchContent,pageNum,pageSize}) => ajax("/manage/product/search",{[searchType]:searchContent,pageNum,pageSize})

//更新上下架
export const reqUpdateProductStatus = (productId, status) => ajax("/manage/product/updateStatus",{productId, status},"POST")

//获取角色信息
export const Acquirerole = () => ajax("/manage/role/list")
//添加角色
export const reqAddRole = (name) => ajax("/manage/role/add",{name},"POST")

//设置角色权限
export const reqUpdateRole = (_id,auth_name,menus) => ajax("/manage/role/update",{_id,auth_name,menus},"POST")

//获取用户信息
export const reqUserlist = () => ajax("/manage/user/list")

//添加用户
export const reqAddUser = ({username, password, phone, email, role_id}) => ajax("/manage/user/add",{username, password, phone, email, role_id},"POST")



