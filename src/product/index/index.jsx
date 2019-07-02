import React, { Component } from 'react';
import {Card, Button, Icon, Table, Select, Input,message} from 'antd';
import "./index.less"
import MyButton from "../../../components/my-button"
import {reqProducts ,reqProductsmessage,reqUpdateProductStatus} from "../../../api"
const { Option } = Select
export default class Index extends Component {
  state={
    total:0,
    products:[],
    loading:true,
    searchType:"productName",
    searchContent:"",
    pageNum:'1',
    pageSize:'3'
  }

 //默认的上来显示的分页是一页 三条数据
   componentDidMount() {
     this.getProducts(1,3)
  }

  //动态生成数据  在点击分页的时候也需要获取数据 所以提取出来
   getProducts =async (pageNum,pageSize) =>{
    //当前得页数  一页得个数
     this.setState({
       loading:true
     })

     //收集数据
     const {searchType,searchContent} = this.state
     //发送请求
     let promise = null;

     //输入框有内容就进入搜索状态 this.issearch为true得时候才能搜索 没值得时候就不能进行搜索
     if( this.issearch&&searchContent){
       promise =reqProductsmessage({searchType,searchContent,pageNum,pageSize})
     }else {
       promise = reqProducts(pageNum,pageSize)
     }
     const result = await promise
    if(result){
      this.setState({
        total:result.total,
        products:result.list,
        loading:false,
        //搜索框需要最新得内容
        pageNum,
        pageSize
      })
    }
  }

  //跳转到添加数据页
  showAddProduct = () =>{
      this.props.history.push("/product/saveupdate")
  }

  //修改产品
  showUpdateProduct = (path,product) =>{
     return () =>{
       this.props.history.push(path,product)   //第二个值将product传入到该地址中 该组件的this.props.location.state
     }
  }

  //获取搜索框内得值 创建一个函数 谁调用 就给谁赋值表单中得内容
  handleChange = (searchName) =>{
    return (e) => {
      // console.log(e) //下拉框中 e就是他得value值 而input表框中e是目标事件上得value值
      let value = "";
      if(searchName === "searchType"){
        value = e
      }else{
        value = e.target.value
        //input输入框中一定有值 才能搜索
        if(!value) this.issearch = false
      }
      this.setState({
        [searchName]:value
      })
    }
  }

  //搜索信息
  searchProduct = () =>{
    const {searchContent,pageNum ,pageSize} = this.state
    //搜索框有内容得时候才能搜索
    if(searchContent){
      //发送请求
      this.issearch = true  //如果第二次搜索得时候 输入框有值 点击分页器得时候才能搜索 如果输入框没有点击分页器就不能进入搜索判断
      //如果输入框有值得话 才会开启搜索 就调用getProducts函数 进入里面判断
      this.getProducts(pageNum ,pageSize)
    }else{
      message.warn("请输入搜索信息",2)
    }
  }


  //更新商品上下架
  updateProductStatus = (product) =>{
     return async()=>{
       const status = 3 - product.status
       const parentId = product._id
       const  result = await reqUpdateProductStatus(parentId,status)
       if(result){
         message.success("商品更新成功",2)
         this.setState({
           products:this.state.products.map((item)=>{
             //遍历找到点击得 那一项对象 给他返回一个新对象 改变他
             if(item._id===parentId){
               //展开对象 status改变 重新给对象中status赋值上架边为下架 下架为上架
               return {...item,status}
             }
             //没点击就上面都不改变 返回原值
             return  item
           })
         })
       }
     }
  }



  render() {
    const { products,total,loading } = this.state

    const columns = [
      {
        title:"商品名称",
        dataIndex:"name"
      },
      {
        title:"商品描述",
        dataIndex:"desc"
      },
      {
        title:"价格",
        dataIndex:"price"
      },
      {
        className:"product-status",
        title:"状态",
        // dataIndex:"status",
        render:(product) =>{
          console.log(product)
          return  product.status===1?
            <div><Button type="primary" onClick={this.updateProductStatus(product)}>下架</Button>  &nbsp;在售</div>:
            <div><Button type="primary" onClick={this.updateProductStatus(product)}>上架</Button> &nbsp;已下架</div>
        }
      },
      {
        className:"product-status",
        title:"操作",
        render:(product) =>{
          //product 当行的点击的产品数据
          // console.log(product)
          return <div>
            <MyButton type="primary"  onClick = {this.showUpdateProduct("/product/detail",product)}>详情</MyButton>
            <MyButton type="primary"  onClick = {this.showUpdateProduct("/product/saveupdate",product)}>修改</MyButton>
          </div>
        }
      },
    ]
    return <Card
      title={
        <div>
          <Select defaultValue="productName" onChange={this.handleChange("searchType")}>
            <Option key={0} value="productName">根据商品进行分类</Option>
            <Option key={1} value="productDesc">根据商品进行描述</Option>
          </Select>
          <Input placeholder="关键字" className="search-input" onChange={this.handleChange("searchContent")}/>
          <Button type="primary" onClick={this.searchProduct}>搜索</Button>
        </div>
      }
      extra={<Button type="primary" onClick={this.showAddProduct}><Icon type="plus"/>添加产品</Button>}
    >
      <Table
        columns={columns}
        dataSource={products}  //显示得内容
        bordered   //给表格添加边框
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['3', '6', '9', '12'],
          defaultPageSize: 3,
          total,
          onChange: this.getProducts,          //点级上一页下一页更新数据
          onShowSizeChange: this.getProducts //点击分页数字 更新数据
        }}
        rowKey="_id"  //  每条数据都会有个id  作为key的值
        loading={loading}
      >
      </Table>
    </Card>

  }
}