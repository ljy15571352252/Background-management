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

//表格的接口
export const    reqCategories= function(parentId) {
    return ajax("/manage/category/list",{parentId})
}

  //天气得接口
export const  reWeather=function () {
    return new Promise((resolve,reject)=>{
      jsonp("http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2", {}, function (erro,data) {
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
  }
