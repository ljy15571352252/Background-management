import React, { Component } from 'react';
import { Icon, Menu } from "antd";
import { Link, withRouter } from 'react-router-dom';
//withRouter（高阶组件）作用 把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上

import logo from "../../assets/images/logo.png";
import "./index.less";
import menuList from "../../config/menuList"


const { SubMenu,Item } = Menu;
class LeftNav extends Component {

  //创建公共的方法 因为一级菜单和二级子菜单结构一样
  creatMenu = (menu)=>{
    return <Item key={menu.key}>
              <Link to={menu.key}>
                <Icon type={menu.icon}/>
                <span>{menu.title}</span>
              </Link>
            </Item>
  }
    //初始画的时候就要渲染 而且只生成一次 动态生成左边菜单 更新的时候不渲染
  componentWillMount(){
    // 获取location 上的pathname 属性的值就是路由路径
    // 可以获取loction上内容 来进行判断是否跟二级菜单同名 此时就展开二级菜单的父元素一级菜单
     const {pathname} =  this.props.location

    this.menus = menuList.map((menu)=>{  //使用map是因为内容改变 长度不变
            if(menu.children){
                //二级菜单
                return <SubMenu
                    key={menu.key}
                    title={
                        <span>
                            <Icon type={menu.icon}/>
                            <span>{menu.title}</span>
                        </span>
                    }
                >
                    {
                      menu.children.map((item) => {
                        if(pathname === item.key){ //当和二级菜单的值一样的时候 就展开他的父元素
                          //初始化展开菜单
                          this.openKey = menu.key
                        }
                         return this.creatMenu(item)
                      })
                    }
                </SubMenu>
            }else {
                return this.creatMenu(menu)
            }
        })
    //初始化选中菜单
    this.SelectedKeys = pathname
  }
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
        <Menu theme="dark"  defaultSelectedKeys={[this.SelectedKeys]} defaultOpenKeys={[this.openKey]}  mode="inline">
          {
            this.menus
          }
            {/*<Item key="home">*/}
            {/*    <Link to="/home">*/}
            {/*        <Icon type="home" />*/}
            {/*        <span>首页</span>*/}
            {/*    </Link>*/}
            {/*</Item>*/}
            {/*<SubMenu  key="sub1"*/}
            {/*   title={*/}
            {/*    <span>*/}
            {/*      <Icon type="appstore" />*/}
            {/*      <span>商品</span>*/}
            {/*    </span>*/}
            {/*      }*/}
            {/*>*/}
            {/*    <Item key="category">*/}
            {/*        <Link to="/category">*/}
            {/*            <Icon type="bars" />*/}
            {/*            <span>品类管理</span>*/}
            {/*        </Link>*/}
            {/*    </Item>*/}
            {/*    <Item key="tool">*/}
            {/*        <Link to="/tool">*/}
            {/*            <Icon type="tool" />*/}
            {/*            <span>商品管理</span>*/}
            {/*        </Link>*/}
            {/*    </Item>*/}
            {/*</SubMenu>*/}
            {/*<Item key="user">*/}
            {/*    <Link to="/user">*/}
            {/*        <Icon type="user" />*/}
            {/*        <span>用户管理</span>*/}
            {/*    </Link>*/}
            {/*</Item>*/}
            {/*<Item key="role">*/}
            {/*    <Link to="/role">*/}
            {/*        <Icon type="safety" />*/}
            {/*        <span>权限管理</span>*/}
            {/*    </Link>*/}
            {/*</Item>*/}
            {/*<SubMenu*/}
            {/*    key="sub2"*/}
            {/*    title={*/}
            {/*        <span>*/}
            {/*      <Icon type="area-chart" />*/}
            {/*      <span>图形图标</span>*/}
            {/*    </span>*/}
            {/*    }*/}
            {/*>*/}
            {/*    <Item key="bar-chart">*/}
            {/*        <Icon type="bar-chart" />*/}
            {/*        <span>柱形图</span>*/}
            {/*    </Item>*/}
            {/*    <Item key="line-chart">*/}
            {/*        <Icon type="line-chart" />*/}
            {/*        <span>折线图</span>*/}
            {/*    </Item>*/}
            {/*    <Item key="pie-chart">*/}
            {/*        <Icon type="pie-chart" />*/}
            {/*        <span>饼图</span>*/}
            {/*    </Item>*/}
            {/*</SubMenu>*/}
        </Menu>
    </div>;
  }
}
// withRouter是一个高阶组件，向非路由组件传递三大属性：history、location、match
export default withRouter(LeftNav);