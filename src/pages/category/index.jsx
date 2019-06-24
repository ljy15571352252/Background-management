import React, { Component } from 'react';
import { Card ,Button,Icon,Table } from 'antd';
import MyButton from "../../components/my-button"
import { reqCategories } from "../../api"
import "./index.less"
//表头内容
const columns = [
  {
    title: '评类名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    className: 'column-money',
    dataIndex: 'money',
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
    table:[]   //一级分级列表
  }

  //发送请求 接受数据 动态生成表单
  async componentWillMount() {
     const result = await reqCategories("0")
      if(result){    //返回一级菜单的信息
        this.setState({
          table:result
        })
      }
   }

  render() {
    return <div>
      <Card title="一级分类列表" extra={<Button type="primary"><Icon type="plus"/> 添加品类</Button>}>
        <Table
            columns={columns}
            dataSource={this.state.table}
            bordered
            pagination={{    //分页器
              showSizeChanger:true,   //开启分页
              defaultPageSize:3,     //默认分页
              pageSizeOptions:[3,6,9],//可以分几页
              showQuickJumper:true    //快速跳页
            }}
        />
      </Card>
    </div>;
  }
}