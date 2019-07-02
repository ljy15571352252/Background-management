import { Upload, Icon, Modal,message } from 'antd';
import React,{Component} from "react"
import { removeImg } from "../../../api"
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export  default  class PicturesWall extends Component {
  state = {
    previewVisible: false,   //预览图片显示和隐藏
    previewImage: '',        //预览图
    //父组件中传过来的 图片显示得默认状态
    fileList: this.props.imgs.map((img,index)=>{
      return  {
        uid: -index,
        name: img,
        status: 'done',
        url: `http://localhost:5000/upload/${img}`,
      }
    })

  }
//取消预览
  handleCancel = () => this.setState({ previewVisible: false });

  //点击预览的回调
  handlePreview = async file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  //
  handleChange =async ({file, fileList }) => {
    // console.log(file) //上传图片得状态 默认有四种
    if(file.status === "uploading"){
      //上传中
    }else if(file.status === "done"){
      //上传成功
      fileList[fileList.length - 1].name = file.response.data.name
      fileList[fileList.length - 1].url = file.response.data.url;
      message.success("图片上传成功")
    }else if(file.status === "error"){
      //上传失败
      message.error("图片上传失败")
    }else {
      //删除图片
      const id = this.props.id
      const name = file.name
      const result = await removeImg(name,id)
      if(result){
        message.success("图片删除成功")
      }
    }
    //上面得判断都需要更新状态
    this.setState({ fileList });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
   //上传图片
   const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
    );
    return (
        <div className="clearfix">
          <Upload
              //上传服务器地址
              action="/manage/img/upload"
              listType="picture-card"
              //展示图片
              fileList={fileList}
              //点击预览回调
              onPreview={this.handlePreview}
              //点击删除/上传的回调
              onChange={this.handleChange}
              //上传图片 需要匹配id才能成功  data 是组件内置的对象
              //请求的参数
              data={{
                  id:this.props.id
              }}
              //要和服务器那边得名字一样  默认值是file
              name="image"
          >
            {/*当显示的图片长度大于三张的时候就不显示添加图片功能*/}
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null}  onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
    );
  }
}