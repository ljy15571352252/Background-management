import React, { Component } from 'react';
import { Card ,Button,Icon,Table ,Modal,message} from 'antd';
import MyButton from "../../components/my-button"
import { reqCategories,reqAddCategories,reqUpdateCategoryName} from "../../api"
import "./index.less"
import Addcategory from "./addcategory"
import UpdateCategoryNameForm from "./update-category-name"
import  Mybutton from "../../components/my-button/index"
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
    subCategories: [], // 二级分类列表
    isShowAddCategory: false, // 显示添加品类
    isShowUpdateCategoryName:false,   //修改分类名称弹框开关
    isShowSubCategories: false, // 是否显示二级分类列表
    loading:true             //加载数据额过程中显示loading图
  }
  category={}  //列表信息的初始值为空对象  在点击的时候才能获取
  //发送请求 接受数据 动态生成表单
  async componentWillMount() {
      const result = await reqCategories("0")
      if(result){    //返回一级菜单的信息
        this.setState({
          categories:result
        })
      }
   }

   componentDidMount() {
     this.fetchCategories(0)
   }

   //默认先加载一级组件
  fetchCategories = async (parentId) =>{
    this.setState({
      loading:true
    })
    const result = await reqCategories(parentId)
    if(parentId ===0) {
      this.setState({
        categories:result
      })
    }else{
      this.setState({
        subCategories:result,
        isShowSubCategories:true
      })
    }
    this.setState({
      loading:false
    })
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
            this.setState({
              loading:true
            })
            const result = await reqAddCategories(parentId,categoryName)
            if(result){
                message.success("添加数据成功",2)
              //清空搜索产品输入框的数据
               form.resetFields(['parentId','categoryName'])

              const { isShowSubCategories,loading } = this.state

              let option ={
                isShowAddCategory :false,
              }
              this.setState({
                loading:false
              })

              //添加一级产品分类
                if( result.parentId==="0" ){
              //在单位时间多次更新只会更新一次
                  option.categories=[...this.state.categories,result]
               //当前显示的是二级分类，还需要满足添加分类的一级分类和当前显示的一级分类一致，才显示，否则不显示
                }else if(isShowSubCategories&&result.parentId===this.parentCategory._id){
                  option.subCategories=[...this.state.subCategories,result]
                }
                this.setState(option)
            }
          }
      })
  }

  toogledisplay =(setName,setValue)=>{
    //防止无防止循坏掉用this.setState  所以用个函数保存
      return ()=>{
        this.setState({
          [setName]:setValue
        })
      }
  }

  //点击取消清空弹出框的数据 并且隐藏
  hideUpdateCategoryName = () =>{
    this.updateCategoryform.props.form.resetFields(['categoryName'])   //可以获取实例对象上的属性和方法
    this.setState({
      isShowUpdateCategoryName:false
    })
  }

  //修改产品名称
  updateCategoryName = ()=>{
    const {form} =  this.updateCategoryform.props
    form.validateFields(async (err,values) =>{
      // console.log(values)  //修改的名称
      if(!err){
        const {categoryName} = values
        const categoryId = this.category._id
        const result = await reqUpdateCategoryName(categoryId,categoryName)
        console.log(result)
        if(result){

          const { parentId } = this.category;   //获取id
          let categorieData = this.state.categories;
          let setName = "categories";
            //当时二级分类的时候 更改 状态 在循环遍历的时候就切换到二级分类中
          if(parentId !== "0" ) {
             categorieData =this.state.subCategories
             setName = "subCategories"
          };

          //返回新的数据
           const categories = categorieData.map((item) => {
             // console.log(item)  所有的产品数据
             let {parentId,name,_id} = item
             //如果修改的id是一样的话 就修改对象的对象产品的nama
             if(_id === categoryId){
               name = categoryName
               return {
                 parentId,
                 name,
                 _id
               }
             }
             return item
           })
          message.success('更新分类名称成功~', 2);
          form.resetFields(['categoryName'])   //可以获取实例对象上的属性和方法
          this.setState({
              isShowUpdateCategoryName:false,
              [setName]:categories   //返回的新数据重新更该状态
          }) 
        }
      }
    })
  }

//出现修改类品弹框
  saveCategory = (category) =>{
    return  () =>{        //有函数保存 不会被直接调用
      //返回一个函数的话 给实例对象赋值
      this.category = category
      console.log(this.category)
      this.setState({
        isShowUpdateCategoryName:true   //修改分类名称弹框开关
      })
    }
  }



//点击二级分类
  showsubcategory = (category) =>{
      return async () =>{
        //创建属性 获取一级分类的所有信息
        this.parentCategory = category
        this.fetchCategories(category._id)
      }
  }
  //回到一级菜单
  goback = () =>{
    this.setState({
      isShowSubCategories:false
    })
  }

  //二级分类的parentId和一级分类的_id一致
  render() {
    const {categories,isShowAddCategory,isShowUpdateCategoryName,isShowSubCategories,subCategories,loading} = this.state
    //表头内容
    const columns = [
      {
        title: '评类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        className: 'column-money',
        // dataIndex: 'operation',   //如果不写传入的就是整条数据 写的话就会找对应的值 没有就是undefind
        render: category =>{
           //显示当行的数据信息  应为数据是遍历生成的 所以渲染了三次 打印了三条数据 不是在同一个对象中
          // console.log(category)
          return <div style={{width:"300px"}}>
            <MyButton onClick={this.saveCategory(category)}>修改名称</MyButton>
            {
              isShowSubCategories?null:<MyButton onClick = {this.showsubcategory(category)}>查看子品类</MyButton>
            }
          </div>
        },
      }
    ];
    return <div>
      <Card title={isShowSubCategories?<div><Mybutton onClick={this.goback}>一级分类列表</Mybutton><Icon type="arrow-right"/>&nbsp;{this.parentCategory.name}</div>:"一级分类列表"}

            extra={<Button type="primary" onClick={this.toogledisplay("isShowAddCategory",true)}><Icon type="plus"/> 添加品类</Button>}>
        <Table
            columns={columns}
            dataSource={isShowSubCategories ? subCategories:categories}   //是否显示子级列表
            bordered
            pagination={{    //分页器
              showSizeChanger:true,   //开启分页
              defaultPageSize:3,     //默认分页
              pageSizeOptions:["3","6","9"],//可以分几页
              showQuickJumper:true    //快速跳页
            }}
            rowKey="_id"
            loading={loading}
        />
        <Modal
            title="添加分类"
            visible={isShowAddCategory}
            onOk={this.addwCategory}
            cancelText={"取消"}
            okText={"添加"}
            onCancel={this.toogledisplay("isShowAddCategory", false)}
        >
          <Addcategory categories = {categories} wrappedComponentRef={(form) => this.addwCategoryform = form}/>
          {/* form 是 Addcategory的实例对象   this 是当前的组件的实例对象*/}
        </Modal>
        <Modal
            title="修改分类名称"
            visible={isShowUpdateCategoryName}
            onOk={this.updateCategoryName}
            onCancel={this.hideUpdateCategoryName}
            okText="确认"
            cancelText="取消"
            width={250}
        >
          <UpdateCategoryNameForm categoryName = {this.category.name} wrappedComponentRef={(form) => this.updateCategoryform = form}/>
        </Modal>
      </Card>
    </div>;
  }
}