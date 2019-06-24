const USER_KEY = "USER_KEY";
const USER_TIME = "USER_TIME";
const remot_time = 1000*3600*24*7

//读取用户信息
export const getinformation=function  () {
  const start_time = localStorage.getItem(USER_TIME)
  //超过七天清除用户信息
  if(Date.now()-start_time>remot_time){
    removeinformation()
    return {}  //清空信息
  }
  //没有过期
   return   JSON.parse(localStorage.getItem(USER_KEY))
}

//设置用户信息
export const  setinformation=function  (data) {
  //设置第一次登录的时间  会被缓存下来
   localStorage.setItem(USER_TIME,Date.now())
  //  //设置第一次登录的信息
   localStorage.setItem(USER_KEY,JSON.stringify(data))   //因为localStorage只能存储字符串
}

//删除用户信息
export const removeinformation= function  () {
  //删除时间
  localStorage.removeItem(USER_TIME,Date.now())
  //删除用户
  localStorage.removeItem(USER_KEY)
}
