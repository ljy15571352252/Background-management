import React, { Component } from 'react';
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav"
import HeaderMain from "../../components/header-main"
import {getinformation}  from  "../../utils"
import {reqValidateUserInfo} from "../../api"
import {Route,Switch,Redirect} from "react-router-dom"

import Home from '../home';
import Category from '../category';
import Product from '../product';
import User from '../user';
import Role from '../role';
import Line from '../charts/line';
import Bar from '../charts/bar';
import Pie from '../charts/pie';

const { Header, Content, Footer, Sider } = Layout;


export default class Admin extends Component {
    state = {
        collapsed: false,
        isLogin:true,
        success:false
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    //读取用户信息
    async componentWillMount() {
      const user = getinformation()
      //说明登录成功
      if(user &&user._id){
        //进行再次验证ID
        const  result = await reqValidateUserInfo(user._id)

   //问题是在login中输入home 没有用户信息也可以进入到admin中
   //因为在开始的时候是进入login 可以在render重定向的时候 又给重定向到home中
   //所以要来进行判断  当用户请求成功的时候才可以进入home   如果没有用户的时候就不能进入home 重定向到login

        if(result) {
         return  this.setState({
            isLogin:false,
            success:true
          })
        }
      }
        //如果失败 没有用户信息的时候 就要返回login页面
        this.setState({
          isLogin:false,
          success:false
        })
/*      //没有用户信息的时候 不能进入admin页面
      this.props.history.replace("/login")*/
    }

  render() {
        const {collapsed,isLogin,success} = this.state
        if(isLogin) return null
        //有用户信息的时候 就进入home中 没有的话就重定向login
        return success?<Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                  <LeftNav collapsed={collapsed}/>
                </Sider>

                <Layout>
                  <Header style={{ background: '#fff', padding: 0, minHeight: 100 }}>
                    <HeaderMain/>
                  </Header>
                  <Content style={{ margin: '25px 16px' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                      <Switch>
                        <Route path="/home" component={Home}/>
                        <Route path="/category" component={Category}/>
                        <Route path="/product" component={Product}/>
                        <Route path="/user" component={User}/>
                        <Route path="/role" component={Role}/>
                        <Route path="/charts/line" component={Line}/>
                        <Route path="/charts/bar" component={Bar}/>
                        <Route path="/charts/pie" component={Pie}/>
                        <Redirect to="/home"/>
                      </Switch>
                    </div>
                  </Content>
                  <Footer style={{ textAlign: 'center' }}>
                    推荐使用谷歌浏览器，可以获得更佳页面操作体验
                  </Footer>
                </Layout>
              </Layout>:<Redirect to="/login" />

  }
}