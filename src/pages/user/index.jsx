import React, { Component } from 'react';
import { Card, Button, Table, Modal,message } from 'antd';
import dayjs from "dayjs";

import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';
import MyButton from '../../components/my-button';
import {reqUserlist,reqAddUser} from "../../api"

export default class User extends Component {
  state = {
    users: [], //用户数组
    roles:[],// 权限数组
    isShowAddUserModal: false, //是否展示创建用户的标识
    isShowUpdateUserModal: false, //是否展示更新用户的标识
  };

  //创建用户的回调函数
  addUser = () => {
    //收集表单数据
    const { form } =this.addUserForm.props
    form.validateFields(async (err,value)=>{
      if(!err){
        console.log(value)
        const result = await reqAddUser(value)
        if(result){
          message.success("用户跟新成功")
          form.resetFields();  //清空表单内容
          this.setState({
            users: [...this.state.users,result],
            isShowAddUserModal: false,
          })
        }
      }
    })
  };
  updateUser = () => {
  };

  toggleDisplay = (stateName, stateValue) => {
    return () => this.setState({[stateName]: stateValue})
  };

  //请求用户数据
  async componentDidMount() {
   const result = await reqUserlist()
    if(result){
      console.log(result)
      this.setState({
        users:result.users,
        roles: result.roles
      })
    }
  }

  render () {
    const {roles,users, isShowAddUserModal, isShowUpdateUserModal} = this.state;
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => {
          const role = roles.find((role) => role._id === role_id);
          return role && role.name;
        }
      },
      {
        title: '操作',
        render: user => {
          return <div>
            <MyButton onClick={() => {}}>修改</MyButton>
            <MyButton onClick={() => {}}>删除</MyButton>
          </div>
        }
      }
    ];
    
    return (
      <Card
        title={
          <Button type='primary' onClick={this.toggleDisplay('isShowAddUserModal', true)}>创建用户</Button>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
          }}
        />
  
        <Modal
          title="创建用户"
          visible={isShowAddUserModal}
          onOk={this.addUser}
          onCancel={this.toggleDisplay('isShowAddUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <AddUserForm wrappedComponentRef={(form) => this.addUserForm = form} roles = {roles} />
        </Modal>
  
        <Modal
          title="更新用户"
          visible={isShowUpdateUserModal}
          onOk={this.updateUser}
          onCancel={this.toggleDisplay('isShowUpdateUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateUserForm wrappedComponentRef={(form) => this.updateUserForm = form}/>
        </Modal>
        
      </Card>
    )
  }
}
