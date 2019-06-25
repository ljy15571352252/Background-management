
import axios from  "axios"
import {message } from 'antd';

//url       地址
//data      参数  //没有的话默认为空对象
//method    请求方式 如果不写 默认为get请求

export default function ajax(url, data = {}, method="get") {
    let reParams = data
    method = method.toLowerCase()
    if(method==="get"){
        reParams={
            params:data  //是get请求的参数
        }
    }
    
  return   axios[method](url,reParams)
    //通过代理服务器发送到http://localhost:5000  然后返回该地址的信息 解决跨域的问题
      //但是如果上线了 就不会存在跨域问题
    //返回成功的状态 的参数
      //请求成功
        .then((res)=>{
            const {data} = res
            //验证登陆成功
            if(data.status===0){
                //登录成功
                //通过http://localhost:5000 来返回响应
                //   虚拟DOM中render用Router重定向  再函数式编程中使用history
                // this.props.history.replace("/")
                return data.data|| {};   //post里面data的用户数据信息

            }else{
                //登录失败   2 是提示存在的时间
                message.error(data.msg,2)
            }
        })
        .catch((eer) =>{
            console.log(eer)
            //网咯错误
            message.error("网咯出现异常",2)
        })

}
