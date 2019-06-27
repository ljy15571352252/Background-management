import React, { Component } from 'react';
import { Modal } from 'antd';
import MyButton from '../my-button';
import './index.less';
import {withRouter} from  "react-router-dom"
import {removeinformation,getinformation} from "../../utils"
import dayjs from 'dayjs'  // 更改时间得插件
import {reWeather} from "../../api"
import menuList from "../../config/menuList"


 class HeaderMain extends Component {

    state ={
     time:Date.now(),
     weather:"晴",   //天气默认设置
     PictureUrl: "http://api.map.baidu.com/images/weather/day/zhongyu.png" //接口天气图片
    }

  //点击退出功能
   onexit = () =>{
    Modal.confirm({
      title: '你确认要退出登录吗?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        removeinformation()  //退出后 要回到登录页面 删除用户信息
        this.props.history.replace("/login")
      },
    });
 }

 //动态生成用户名
   componentWillMount() {
       this.uesernam =getinformation().username
       this.title = this.getTitle(this.props)   //渲染之前获取  防止定时器反复的渲染
   }

   //定时器重新渲染不会经过这一步
   componentWillReceiveProps(nextProps, nextContext) {
     this.title = this.getTitle(nextProps)
   }

   //跟新时间
   async componentDidMount() {
      this.time = setInterval(() =>{
          this.setState({
            time:Date.now()
          })
       },1000)
     const {promise,cancel} = reWeather()
     console.log(cancel)
     this.cancel = cancel  //因为在取消定时器的时候这个请求还没接收到 render中就使用了 所以就会报错
     //请求成功才会获取信息 不然限制性就获取不到信息
    const  result =await promise
     if(result){
       this.setState(result)
     }
    }

    //动态生成title
    getTitle = (nextProps) =>{
      let {pathname} = nextProps.location //获取最新的值

      //product组件也需要获取值
      const pathnameReg = /^\/product\//
      if(pathnameReg.test(pathname)){
        pathname = pathname.slice(0,8)
      }

      for (let i = 0; i < menuList.length; i++) {
        const menu  = menuList[i]
        if(menu.children){
          for (let j = 0; j < menu.children.length; j++) {
            const item = menu.children[j]
            if(item.key===pathname){
             return  item.title
            }
          }
        }else {
          if(menu.key===pathname){
            return  menu.title
          }
        }
      }
    }

    //解决内存泄漏 清除定时器和取消天气的ajax请求
   componentWillUnmount() {
      clearInterval(this.time )
      this.cancel()
   }

   render() {
   const {time,weather,PictureUrl} = this.state
    return <div>
      <div className="header-main-top">
        <span>欢迎, {this.uesernam}</span>
        <MyButton onClick = {this.onexit}>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">{this.title}</span>
        <div className="header-main-right">
          <span>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</span>
          <img src={PictureUrl} alt=""/>
          <span>{weather}</span>
        </div>
      </div>
    </div>;
  }
}
export default withRouter(HeaderMain)