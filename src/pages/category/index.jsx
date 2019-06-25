import React, { Component } from 'react';
import { Card ,Button,Icon,Table ,Modal,message} from 'antd';
import MyButton from "../../components/my-button"
import { reqCategories,reqAddCategories } from "../../api"
import "./index.less"
import Addcategory from "./addcategory"
//表头内容
const columns = [
  {
    title: '评类名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    className: 'column-money',
    dataIndex: 'operation',   //如果不写传入的就是整条数据 写的话就会找对应的值 没有就是undefind
    render: text =>{
    return <div style={{width:"300px"}}>
      <MyButton>退出</MyButton>
      <MyButton>查看子品类</MyButton>
    </div>
     },
  }
];
//表格数据
/*const data = [
  {
    key: '1',
    name: '手机',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: '电脑',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: '硬盘',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: '耳机',
    address: 'Sidney No. 1 Lake Park',
  },
];*/

export default class Category extends Component {
  state = {
    categories:[] , //一级分级列表
    falg :false  //弹框开关
  }

  //发送请求 接受数据 动态生成表单
  async componentWillMount() {
      const result = await reqCategories("0")
      if(result){    //返回一级菜单的信息
        this.setState({
          categories:result
        })
      }
   }

   //添加产品列表
  addwCategory = () =>{
      const { form } = this.addwCategoryform.props
      form.validateFields(async (erro,values)=>{
        //values获取表单中输入新添加的产品信息
        console.log(values)
          const { parentId,categoryName } = values
          if(!erro){
            //产品验证成功之后 就发送到服务器添加到数据库 会自动生成一个ID名   然后返回
            const result = await reqAddCategories(parentId,categoryName)
            if(result){
                message.success("添加数据成功",2)

              //清空搜索产品输入框的数据
              form.resetFields(['parentId','categoryName'])

              //一级产品分类
                if( result.parentId==="0" ){
                    this.setState({                       //在单位时间多次更新只会更新一次
                      categories:[...this.state.categories,result]
                    })
                }
                this.setState({
                  falg :false
                })
            }
          }
      })
  }

  showCategory = () =>{
    this.setState({
      falg :true
    })
  }

  handleCancel = () =>{
    this.setState({
      falg :false
    })
  }

  render() {
    const {categories,falg} = this.state
    return <div>
      <Card title="一级分类列表" extra={<Button type="primary" onClick={this.showCategory}><Icon type="plus"/> 添加品类</Button>}>
        <Table
            columns={columns}
            dataSource={categories}
            bordered
            pagination={{    //分页器
              showSizeChanger:true,   //开启分页
              defaultPageSize:3,     //默认分页
              pageSizeOptions:["3","6","9"],//可以分几页
              showQuickJumper:true    //快速跳页
            }}
            rowKey="_id"
        />
        <Modal
            title="添加分类"
            visible={falg}
            onOk={this.addwCategory}
            cancelText={"取消"}
            okText={"添加"}
            onCancel={this.handleCancel}
        >
          <Addcategory categories = {categories} wrappedComponentRef={(form) => this.addwCategoryform = form}/>
          {/* form 是 Addcategory的实例对象   this 是当前的组件的实例对象*/}
        </Modal>
      </Card>
    </div>;
  }
}