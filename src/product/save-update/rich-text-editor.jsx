import React, { Component } from 'react';
import { EditorState,ContentState  } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';  //字符转换
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes  from "prop-types"
import "./index.less"

export  default class EditorConvertToHTML extends Component {
  static propTypes = {
    detail: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props); // 不传就不能再constructor使用props。传了就可以使用
    console.log(this.props.detail)
    const blocksFromHtml = htmlToDraft(this.props.detail);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState
    };
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };
  render() {
    const { editorState } = this.state;
    return (
        <div>
          <Editor
              editorState={editorState}
              // wrapperClassName="demo-wrapper"
              editorClassName="editor"  //文本编辑框
              onEditorStateChange={this.onEditorStateChange}
          />
        </div>
    );
  }
}