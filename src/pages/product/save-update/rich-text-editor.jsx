import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./index.less"

export  default class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state;
    return (
        <div>
          <Editor
              className = "text-editor"
              editorState={editorState}
              // wrapperClassName="demo-wrapper"
              editorClassName="editor"  //文本编辑框
              onEditorStateChange={this.onEditorStateChange}
          />
        </div>
    );
  }
}