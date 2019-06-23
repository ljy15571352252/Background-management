import React, { Component } from 'react';
import { Icon, Menu } from "antd";
import { Link, withRouter } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import "./index.less"



const { SubMenu,Item } = Menu;
export default class  extends Component {
  render() {
      const {collapsed} = this.props
      return <div>
        {
            //点击去home组件 
        }
        <Link className="left-logo" to="/home">
            <img src={logo} alt="logo"/>
            <h1 style={{display:collapsed?"none":"block"}} >
                硅谷后台
            </h1>
        </Link>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Item key="home">
                <Link to="/home">
                    <Icon type="home" />
                    <span>首页</span>
                </Link>
            </Item>
            <SubMenu  key="sub1"
               title={
                <span>
                  <Icon type="appstore" />
                  <span>商品</span>
                </span>
                  }
            >
                <Item key="category">
                    <Link to="/category">
                        <Icon type="bars" />
                        <span>品类管理</span>
                    </Link>
                </Item>
                <Item key="4">
                    <Link to="/tool">
                        <Icon type="tool" />
                        <span>商品管理</span>
                    </Link>
                </Item>
            </SubMenu>
            <Item key="user">
                <Icon type="user" />
                <span>用户管理</span>
            </Item>
            <Item key="6">
                <Icon type="safety" />
                <span>权限管理</span>
            </Item>
            <SubMenu
                key="sub2"
                title={
                    <span>
                  <Icon type="area-chart" />
                  <span>图形图标</span>
                </span>
                }
            >
                <Item key="7">
                    <Icon type="bar-chart" />
                    <span>柱形图</span>
                </Item>
                <Item key="8">
                    <Icon type="line-chart" />
                    <span>折线图</span>
                </Item>
                <Item key="9">
                    <Icon type="pie-chart" />
                    <span>饼图</span>
                </Item>
            </SubMenu>
        </Menu>
    </div>;
  }
}