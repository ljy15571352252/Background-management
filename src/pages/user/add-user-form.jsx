import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import propTypes from "prop-types"
const Item = Form.Item;
const Option = Select.Option;

class AddUserForm extends Component {
  static propTypes = {
    roles:propTypes.array.isRequired
  }


  validator = (rule, value, callback) =>{
    const name = rule.fullField ==="name"?"用户名":"密码"
    // console.log(rule)
    if(!value){
      callback(`必须输入${name}`)
    }else if(value.length<4){
      callback(`${name}不能小于4位`)
    }else if(value.length>12){
      callback(`${name}不能大于12位`)
    }else if(!/^[a-zA-Z_0-9]+$/.test(value)){
      callback(`${name}必须是数字字母下划线`)
    }
    callback()
  }

  render () {
    const {getFieldDecorator} = this.props.form;
    console.log(this.props.roles)
    return (
      <Form>
        <Item label='用户名' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'username',
                {
                  rules:[{
                    required:true,
                    validator:this.validator
                  }]
                }
            )(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        <Item label='密码' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'password',
                {
                  rules:[{
                    required:true,
                    validator:this.validator
                  }]
                }

            )(
              <Input placeholder='请输入密码' type='password'/>
            )
          }
        </Item>
        <Item label='手机号' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'phone',
                {
                  rules:[{
                    required:true,
                    message:"手机号不能为空"
                  }]
                }
            )(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'email',
          {
            rules:[{
            required:true,
            message:"邮箱不能为空"
          }]
          }
            )(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
        <Item label='角色' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'role_id'
            )(
              <Select placeholder='请选择分类'>
                {
                  this.props.roles.map((item,index) =>{
                    return   <Option value={item._id} key={item._id}>{item.name} </Option>
                  })
                }

              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddUserForm);