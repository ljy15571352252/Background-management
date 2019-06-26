import React, { Component } from 'react';
import {Card, Button, Icon, Table, Select, Input, Modal} from 'antd';
const { Option } = Select
export default class Index extends Component {
  render() {
    return    <Card title="}

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
}