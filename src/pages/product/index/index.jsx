import React, { Component } from 'react';
import {Card, Button, Icon, Table, Select, Input} from 'antd';
import "./index.less"
import MyButton from "../../../components/my-button"
import {reqProducts} from "../../../api"
const { Option } = Select
export default class Index extends Component {
  state={
    total:0,
    products:[],
    loading:true
  }

 //默认的上来显示的分页是一页 三条数据
   componentDidMount() {
     this.getProducts(1,3)
  }

  //动态生成数据  在点击分页的时候也需要获取数据 所以提取出来
   getProducts =async (pageNum,psgeSize) =>{
    //当前得页数  一页得个数
     this.setState({
       loading:false
     })
    const result = await reqProducts(pageNum,psgeSize)
    console.log(result.total)
    if(result){
      this.setState({
        total:result.total,
        products:result.list,
        loading:false
      })
    }
  }

  //跳转到添加数据页
  showAddProduct = () =>{
      this.props.history.push("/product/saveupdate")
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
        dataIndex:"status",
        render:(status) =>{
          return  status===1?
            <div><Button type="primary">下架</Button>  &nbsp;在售</div>:
            <div><Button type="primary">上架</Button> &nbsp;已下架</div>
        }
      },
      {
        className:"product-status",
        title:"操作",
        render:(product) =>{
          //product 当行的显示的数据
          return <div>
            <MyButton type="primary">详情</MyButton>
            <MyButton type="primary">修改</MyButton>
          </div>
        }
      },
    ]
    return <Card
      title={
        <div>
          <Select defaultValue={0}>
            <Option key={0} value={0}>根据商品进行分类</Option>
            <Option key={1} value={1}>根据商品进行描述</Option>
          </Select>
          <Input placeholder="关键字" className="search-input"/>
          <Button type="primary">搜索</Button>
        </div>
      }
      extra={<Button type="primary" onClick={this.showAddProduct}><Icon type="plus"/>添加产品</Button>}
    >
      <Table
        columns={columns}
        dataSource={products}
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