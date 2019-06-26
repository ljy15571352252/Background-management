import React, { Component } from 'react';
import { Form, Select,Input,message } from 'antd';
import PropTypes from "prop-types"
const { Option } = Select;
const { Item } = Form

 class Addcategory extends Component {
  static propTypes = {
    categories:PropTypes.array.isRequired  //分类显示
  }
  //产品判断
   validator = (role,value,callback) =>{
    //没有值得时候就不能添加
    if(!value) {
      callback("请输入需要的产品")
    }
    //判断分类输入框的值不能跟下拉列表的值一样  因为已经存在了就不需要添加
      const  result = this.props.categories.find((category) =>category.name===value)
     if(result){
       callback("需要的产品已经存在,请重新输入")
     }else{
       callback()
     }
   }
   render() {
     const { getFieldDecorator } = this.props.form;
     return    (
        <Form>
          <Item label="所属分类">
            {
              getFieldDecorator(
                  "parentId",{      //产品ID
                   initialValue:"0"
                  }
              )(<Select
                  initialValue="0"  //默认选中项 与value值一致
                  style={{width:"100%"}}
                  onChange={this.handleSelectChange}>
                <Option value="0" key = "0"> 一级分类 </Option>
                {
                  this.props.categories.map((category) => {
                    return <Option value={category._id} key = {category._id}> {category.name} </Option>
                  })
                }
              </Select>)
            }
          </Item>
          <Item label="分类名称">
            {
              getFieldDecorator(
                  "categoryName",{   //产品分类
                      rules:[{
                        validator:this.validator
                      }]
                  }
              )(
                <Input placeholder="请输入分类名称"/>
              )
            }
          </Item>
        </Form>
    );
  }
}
export default Form.create()(Addcategory)