import React, { Component } from 'react';
import { Icon, Menu } from "antd";
import { Link, withRouter } from 'react-router-dom';
//withRouter（高阶组件）作用 把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上

import logo from "../../assets/images/logo.png";
import "./index.less";
import menuList from "../../config/menuList"
import { getinformation }  from "../../utils"


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
    //只要没选中其他的组件的时候 默认选中home
    let ishome = true;
    //通过每个用户设置得不同权限组件 重而来分配不同得界面
    let { role :{menus} ,username} = getinformation()

    if (username === 'admin') {
      // 就是admin
      menus = [
        '/home',
        '/products',
        '/category',
        '/product',
        '/user',
        '/role',
        '/charts',
        '/charts/line',
        '/charts/bar',
        '/charts/pie',
      ]
    }

    console.log(menus);

    // 获取location 上的pathname 属性的值就是路由路径
    // 可以获取loction上内容 来进行判断是否跟二级菜单同名 此时就展开二级菜单的父元素一级菜单
     let {pathname} =  this.props.location
    
    //在其它的二级组件中也要显示
     const pathnameReg = /^\/product\// 
    if(pathnameReg.test(pathname)){
      pathname = pathname.slice(0,8)
    }

    this.menus = menuList.reduce((prev,curr) =>{
      const  children = curr.children
      let isshowmenus = false
      if( children ){
        //生成二级菜单
        const subMenu = <SubMenu
            key={curr.key}
            title={
              <span>
              <Icon type={curr.icon} />
              <span>{curr.title}</span>
            </span>
            }
        >
          {
            children.reduce((prev, current) => {
              const menu = menus.find((menu) => menu === current.key);
              if (menu) {
                isshowmenus = true
                //当匹配到了二级菜单得时候则展开一级菜单
                if(current.key===pathname){
                  this.openKey = curr.key
                }
                return [...prev, this.creatMenu(current)]
              } else {
                return prev
              }
            }, [])
          }
            </SubMenu>;

         //当有二级菜单得时候才会显示一级菜单如果没有就不显示
          return isshowmenus ? [...prev,subMenu]:prev
      }else {
        //生成一级菜单
        const menu = menus.find((menu) =>  menu === curr.key)
        if(menu){
          //返回一个新得数组
          return [...prev,this.creatMenu(curr)]
        }else{
           return  prev
        }
      }
    },[])


    //初始化选中菜单
    this.SelectedKeys = ishome ? "/home":pathname;
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
        </Menu>
    </div>;
  }
}
// withRouter是一个高阶组件，向非路由组件传递三大属性：history、location、match
export default withRouter(LeftNav);