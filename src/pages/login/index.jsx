import React, { Component } from 'react';
import logo from "./logo.png"

import { Form, Icon, Input, Button } from 'antd';
import "./index.less"

const Item = Form.Item;

class Login extends Component {

    handleSubmit = (e) =>{
        e.preventDefault()

        //自定义校检
        // eero  显示报错  values 输入的内容
        this.props.form.validateFields((eero,values)=>{
            if(!eero){
                // 发送请求，请求登录
                const {username,password} = values
                console.log(username,password)
            }else{
                //校监失败
                console.log("表单验证失败")
            }
        })
    };
    // 自定义校验规则函数
    //rule
    //value 输入框里的文字
    // callback  不传参代表校验通过，传参代表校验失败
    validator = (rule, value, callback) =>{
        const name = rule.fullField ==="username"?"用户名":"密码"
        if(!value){
            callback(`请输入${name}`)
        }else if(value.length<4){
            callback(`${name}不能小于4位`)
        }else if(value.length>12){
            callback(`${name}不能大于12位`)
        }else if(!/^[a-zA-Z_0-9]+$/.test(value)){
            callback(`${name}必须是数字字母下划线`)
        }
        callback()
    }

    

    render(){
        //getFieldDecorator 是form上的方法
      const { getFieldDecorator } = this.props.form;
      return <div className="form">
       <header>
           <img src={logo} alt="logo"/>
           <h1>React项目: 后台管理系统</h1>
       </header>
        <section className="login-content">
            <h2>用户登录</h2>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Item>
                    {getFieldDecorator('username', {
                        rules: [
                        //     {
                        //     required: true,
                        //     message: '用户名不能为空!'
                        // },
                        //     {
                        //     min:4,
                        //     message:"用户名不能小于四位数"
                        // },
                        //     {
                        //     max:12,
                        //     message:"用户名不能大于12位数"
                        // },
                        //     {
                        //     pattern:/^[a-zA-Z_0-9]+$/,
                        //     message:"请正确输入数字字母下划线"
                        // }

                            { validator:this.validator },  //自定义校检

                        ],
                    })
                    (
                        <Input className="login-input"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"
                        />,
                    )}
                 </Item>
                <Item>
                    {getFieldDecorator('password', {
                        rules: [
                            { validator:this.validator },//自定义校检
                        ],
                    })(
                        <Input className="login-input"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                        />,
                    )}
                </Item>
                <Item>
                    <Button  type="primary" htmlType="submit" className="login-form-button">
                       登录
                    </Button>
                </Item>
            </Form>

        </section>
    </div>;
  }
}
export default Form.create()(Login);