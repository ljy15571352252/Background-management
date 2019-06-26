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



