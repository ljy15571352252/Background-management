import React, { Component } from 'react';
import {Card, Button, Icon, Form, Select,Input,Cascader,InputNumber} from 'antd';
import {reqCategories,addProducts} from "../../../api"
import EditorConvertToHTML from "./rich-text-editor"  //富文本编辑器
import draftToHtml from 'draftjs-to-html';
import {convertToRaw} from "draft-js";

import  "./index.less"
const { Item } = Form
const {Option} = Select
class SaveUpdate extends Component {
  state = {
    options :[],
  }


  /*ref获取普通标签，就是拿到真实DOM元素
  获取组件，就是拿到组件的实例对象 就可以获取该组件上的方法*/
  richTextEditorRef = React.createRef();

  //提交数据
  addProduct = (e) =>{
    e.preventDefault()
    // 获取商品详情的信息

    this.props.form.validateFields(async (errors,value)=>{    //只能收集antd的组件 其余的组件都收集不到
        console.log(value)

       if(!errors){
         const { editorState } = this.richTextEditorRef.current.state;
         const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()));

         const {name,desc,categoriesId,price} = value
         // categoriesId  如果分类列表之选一个 那categoriesId数组中只存在一个值的id 如果是两个 那么第一个值就是0 第二个就是id
         let pCategoryId ="0"
         let categoryId =""
         //判断 当是一级分类的时候就给一级分类赋值第一个categoriesId的ID 因为以一级分类ID是0  二级分类是id
         if(categoriesId.length===1){
           categoryId = categoriesId[0]
         }else {
           pCategoryId =categoriesId[0]
           categoryId = categoriesId[1]
         }

         const result = await addProducts({name, desc, price, categoryId, pCategoryId, detail})
         if(result) {

           //添加成功 返回产品展示页面  切换组件router组件的时候就会卸载当前组件 下次进来的时候就会重新渲染
           this.props.history.push("/product/index")
         }
       }
    })

  }




  //请求一级分类
  async componentDidMount() {
    const result = await reqCategories('0');  //返回一级分类数据
    if (result) {
      this.setState({
        options: result.map((item) => {
          return {
            value: item._id,
            label: item.name,
            isLeaf: false,
          }
        })
      })
    }
  };

  //级联列表
  loadData =async selectedOptions => {
    console.log(selectedOptions) //当权选中得产品对象
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    console.log(targetOption) //一级分类数据
    //发送请求 请求二级数据信息   根据一级分类得ID来求 targetOption.value就时一级分类得ID
    const result = await reqCategories(targetOption.value)
    if (result) {
      //取消loading图
      targetOption.loading = false;
      targetOption.children = result.map((item) => {
        return {
          value: item._id,
          label: item.name,
        }
      })
      //更新状态
      this.setState({
        options: [...this.state.options],
      });
    }
  }

  //回退
  goback = () =>{
    this.props.history.goBack()  //回退
  }

render() {
    const { getFieldDecorator } = this.props.form
    const { options } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span:3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    return <Card title={
      <div className="product-title"><Icon type="arrow-left" className="icon-plus" onClick={this.goback}/>添加商品</div>
    }>
      <Form {...formItemLayout} onSubmit={this.addProduct}>
          <Item label="商品名称">
            {
              getFieldDecorator(
                    "name",{
                    rules:[
                      {required: true, message: '请输入商品名称'}
                    ]
                  }
              )(
                  <Input placeholder="请输入商品名称"/>
              )
            }

          </Item>
          <Item label="请输入商品描述">
            {
              getFieldDecorator(
                  "desc",{
                    rules:[
                        {required: true, message: '请输入商品名称'}
                    ]
                  }
              )(
                  <Input placeholder="请输入商品名称"/>
              )
            }
          </Item>
        <Item label="商品选择分类" wrapperCol={{span:5}}>
          {
            getFieldDecorator(
                "categoriesId",{
                  rules:[
                    {required:true,message:"请选择分类的产品"}
                  ]
                }
            )(
                <Cascader
                    options={options}
                    loadData={this.loadData}
                    changeOnSelect
                />
            )
          }
        </Item>
        <Item label="商品价格">
          {
            getFieldDecorator(
                "price",{
                  rules:[{
                    required:true,message:"请输入商品价格"
                  }]
                }
            )(
                <InputNumber
                    //格式化 输入数据进行格式化
                    formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                    className="input-number"
                />
            )
          }
        </Item>
        <Item label="商品图片">
        </Item>
        <Item label="商品详情" wrapperCol={{span: 20}}>
          <EditorConvertToHTML ref ={this.richTextEditorRef}/>
        </Item>
        <Button type="primary" htmlType="submit" className="refer">提交</Button>
      </Form>
    </Card>
  }
}
export default Form.create()(SaveUpdate)