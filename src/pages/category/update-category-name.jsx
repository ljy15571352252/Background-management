import React, { Component } from 'react';
import {Form, Input, Select} from "antd";
import PropTypes from "prop-types"

 class UpdateCategroyName extends Component {
  static propTypes = {
    categoryName:PropTypes.string.isRequired
  }
   validator = (rule,value,callback)=>{
      if(!value){
        callback("请输入修改的名字")
      }else if(value===this.props.categoryName){
        callback(`${value}已存在,请重新修改`)
      }else{
        callback()
      }
   }

  render() {
      const { getFieldDecorator } = this.props.form;
      return    (
      <Form.Item>
      {
        getFieldDecorator(
            "categoryName", //产品分类
            {
              initialValue: this.props.categoryName,
              rules:[{
                  validator:this.validator
                }]
              }
        )(
            <Input placeholder="请输入分类名称"/>
        )
      }
      </Form.Item>
      );
    }
}
export default Form.create()(UpdateCategroyName)