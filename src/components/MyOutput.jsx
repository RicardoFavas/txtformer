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
import { Message, Select } from 'antd';


export default class MyOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'view':true,
      'wrap':'pre',
    };
  }

  hanbdleClickDownload(filename, data) {
      var blob = new Blob([data], {type: 'text/csv'});
      if(window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, filename);
      } else {
          var elem = window.document.createElement('a');
          elem.href = window.URL.createObjectURL(blob);
          elem.download = filename;
          document.body.appendChild(elem);
          elem.click();
          document.body.removeChild(elem);
      }
  }
  handleClickCopy(text){
    console.log(text);
    let dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    Message.success('Text has been copied to clipboard');
  }

  render() {
    return (
      <div className="outputContainer">
        <header>
          <label className="outputLabel">Output</label>
          <Icon type="download" className="download" onClick={e => this.hanbdleClickDownload(_.now()+'.txt',this.props.text)}/>
          <Icon type="copy" className="copy" onClick={e => this.handleClickCopy(this.props.text) }/>
          <Icon type="swap" className="wrapOutput" onClick={e => this.setState({'wrap':{'pre-wrap':'pre','pre':'pre-wrap'}[this.state.wrap]})}/>
          <Icon type={this.state.view?"eye":"eye-o"} className="viewOutput" onClick={e => this.setState({'view':!this.state.view})}/>
        </header>
        {
          this.state.view ?
            <textarea
              className="output"
              style={{'whiteSpace':this.state.wrap}}
              value={this.props.text}
              placeholder="Yout input goes here"
              readOnly={true}
            />
          : <div className="nopreview"></div>
        }
        <footer className="">
          <label>{'length: '+this.props.text.length}</label>
          <label>{'lines: '+this.props.text.split('\n').length}</label>
        </footer>
      </div>
    );
  }

}
