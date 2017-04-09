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

import MyInput from "./MyInput.jsx";
import MyOutput from "./MyOutput.jsx";


export default class MyContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewInput: true,
      viewOutput: true,
      wrapInput: 'pre',
      wrapOutput: 'pre',
      input: '',
      output: ''
    };
  }

  updateInput(input){
    let output = input;
    this.props.selectedTrxList.forEach(
      (trx) => {
        output = trx.process(output,trx.options);
      }
    );
    this.setState({'input':input,'output':output});
  }
  updateOutput(){
    let output = this.state.input;
    this.props.selectedTrxList.forEach(
      (trx) => {
        output = trx.process(output,trx.options);
      }
    );
    this.setState({'output':output});
  }

  render() {
    return (
      <div className="content">
        <div className="contentHeader">
        </div>
        <div className="contentContainer">
          <MyInput
            view={this.state.viewInput}
            text={this.state.input}
            wrap={this.state.wrapInput}
            updateInput={this.updateInput.bind(this)}
          />
          <MyOutput
            view={this.state.viewOutput}
            text={this.state.output}
            wrap={this.state.wrapOutput}
            updateInput={this.updateInput.bind(this)}
          />
        </div>
      </div>
    );
  }

}
