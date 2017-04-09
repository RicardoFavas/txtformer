import React from 'react';
import _ from 'lodash';
import less from 'less';

import { Input,Upload } from 'antd';
import { Badge } from 'antd';
import { Layout } from 'antd';
import { Switch, Dropdown, Row, Col } from 'antd';
import { Menu, Icon } from 'antd';
import { Affix, Button } from 'antd';
import { DragDropContext } from 'react-dnd';
import { DragSource } from 'react-dnd';
import { Select } from 'antd';

export default class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'view':true,
      'wrap':'pre',
    };
  }

  handleUploadFile(file){
    let reader = new FileReader();
    reader.onload = (e) => {
      let text = reader.result;
      this.props.updateInput(text);
    }
    reader.readAsText(file, "UTF-8");
  }

  render() {
    return (
      <div className="inputContainer">
        <header>
          <label className="inputLabel">Input</label>
          <Upload
            showUploadList={false}
            action={''}
            customRequest={e => this.handleUploadFile(e.file)}
          >
            <Icon type="upload" className="upload"/>
          </Upload>
          <Icon type="swap" className="wrapInput" onClick={e => this.setState({'wrap':{'pre-wrap':'pre','pre':'pre-wrap'}[this.state.wrap]})}/>
          <Icon type={this.state.view?"eye":"eye-o"} className="viewInput" onClick={e => this.setState({'view':!this.state.view})}/>
        </header>
        {
          this.state.view ?
          <textarea
            className="input"
            style={{'whiteSpace':this.state.wrap}}
            value={this.props.text}
            placeholder="Yout input goes here"
            onChange={e => { this.props.updateInput(e.target.value);}}
          />
          :
          <div className="nopreview"></div>
        }
        <footer className="">
          <label>{'length: '+this.props.text.length}</label>
          <label>{'lines: '+this.props.text.split('\n').length}</label>
        </footer>
      </div>
    );
  }

}
