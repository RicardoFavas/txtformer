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


import globals from './../globals.js';
import Trx from "./Trx.jsx";

import './App.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText:'',
      filteredTrxList: [],
      selectedTrxList: [],
      input: '',
      output: '',
      viewInput: true,
      viewOutput: true,
      wrapInput: 'pre',
      wrapOutput: 'pre',
      inputPage: 1,
      outputPage: 1
    }
    this.allTrx = globals.Transformations.filter(trx => !_.isNil(trx.process)).sort((a,b)=>a.label>b.label?1:-1);
    this.state.filteredTrxList = this.allTrx;
  }

  handleUploadFile(file){
    let reader = new FileReader();
    reader.onload = (e) => {
      let text = reader.result;
      this.setState({'input':text});
      this.updateOutput();
    }
    reader.readAsText(file, "UTF-8");
  }

  updateOutput(){
    let output = this.state.input;
    this.state.selectedTrxList.forEach(
      (trx) => {
        output = trx.process(output,trx.options);
      }
    );
    this.setState({'output':output});
  }

  updateFilteredTrxList(filterText){
    filterText = filterText.trim().toLowerCase();
    let items = this.allTrx.filter(
      v => {
         let tags = [v.label];
         if (_.isArray(v.tags))
           tags = tags.concat(v.tags);
         return tags.some(tag => tag.toLowerCase().indexOf(filterText) !== -1);
       }
     );

    this.setState({'filterText':filterText,'filteredTrxList':items});
  }

  addSelectedTrx(label){
    this.allTrx.filter(trx => trx.label == label).map(
      trx => this.state.selectedTrxList.push(_.cloneDeep(trx))
    );
    this.setState({'selectedTrxList':this.state.selectedTrxList});
    this.updateOutput();
  }

  removeSelectedTrx(index){
    this.state.selectedTrxList.splice(index,1);
    this.setState({'selectedTrxList':this.state.selectedTrxList});
    this.updateOutput();
  }
  demoteSelectedTrx(index){
    if (index <= 0)
      return;
    let trx = this.state.selectedTrxList[index];
    this.state.selectedTrxList.splice(index,1);
    this.state.selectedTrxList.splice(index-1,0,trx);
    this.setState({'selectedTrxList':this.state.selectedTrxList});
    this.updateOutput();
  }
  premoteSelectedTrx(index){
    if (index+1 >= this.state.selectedTrxList.length)
      return;
    let trx = this.state.selectedTrxList[index];
    this.state.selectedTrxList.splice(index,1);
    this.state.selectedTrxList.splice(index+1,0,trx);
    this.setState({'selectedTrxList':this.state.selectedTrxList});
    this.updateOutput();
  }
  changeOptionsTrx(index,options){
    let trx = this.state.selectedTrxList[index];
    trx.options = options;
    this.setState({'selectedTrxList':this.state.selectedTrxList});
    this.updateOutput();
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
  handleClockCopy(text){
    let dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  render() {
    let input = this.state.input;
    let output = this.state.output;
    if (this.state.input.length >= 200000)
      input = this.state.input.substring(0,200000);
    if (this.state.output.length >= 200000)
      output = this.state.output.substring(0,200000);
      return (
        <div className="appContent">
          <div className="leftSideBar">
            <div className="trxSelectionLabel">Selected Formatters</div>
            <ul className="trxSelection">
              {
                this.state.selectedTrxList.map(
                  (v,k) =>
                  <Trx
                    key={k} index={k} label={v.label}
                    removeSelectedTrx={this.removeSelectedTrx.bind(this)}
                    premoteSelectedTrx={this.premoteSelectedTrx.bind(this)}
                    demoteSelectedTrx={this.demoteSelectedTrx.bind(this)}
                    options={_.cloneDeep(v.options)}
                    optionsDialog={v.optionsDialog}
                    changeOptionsTrx={this.changeOptionsTrx.bind(this)}
                  />
                )
              }
            </ul>
            <div className="trxSearchBox">
              <Input.Search
                placeholder="Search"
                onChange={e=>this.updateFilteredTrxList(e.target.value)}
              />
              <Dropdown
                trigger={['click']}
                overlay={
                  <Menu mode="vertical">
                    <Menu.Item key={'get'}>
                      Get code
                    </Menu.Item>
                    <Menu.Item key={'set'}>
                      Set code
                    </Menu.Item>
                    <Menu.Item key={'clear'}>
                      Clear
                    </Menu.Item>
                  </Menu>
              }>
              <Icon type="star-o" style={{'width':'40px','fontSize':'20px'}}/>
              </Dropdown>
            </div>
            <ul className="trxList">
              {
                this.state.filteredTrxList.map(
                  (v,k) =>
                  <Trx
                    key={k} index={k}
                    label={v.label} hint={v.hint}
                    addSelectedTrx={this.addSelectedTrx.bind(this)}
                  />
                )
              }
            </ul>
          </div>
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
              <Icon type="swap" className="wrapInput" onClick={e => this.setState({'wrapInput':{'pre-wrap':'pre','pre':'pre-wrap'}[this.state.wrapInput]})}/>
              <Icon type="eye" className="viewInput" onClick={e => this.setState({'viewInput':!this.state.viewInput})}/>
            </header>
            { this.state.viewInput ? <textarea className="input" style={{'viewInput':!this.state.viewInput}} style={{'whiteSpace':this.state.wrapInput}} value={input} placeholder="Your input goes here" onChange={e => {this.state.input = e.target.value; this.updateOutput()}}/> : null }
            <footer className="">
              <label>{'length: '+this.state.input.length}</label>
              <label>{'lines: '+this.state.input.split('\n').length}</label>
            </footer>
          </div>
          <div className="outputContainer">
            <header>
              <label className="outputLabel">Output</label>
              <Icon type="download" className="download" onClick={e => this.hanbdleClickDownload(_.now()+'.txt',this.state.output)}/>
              <Icon type="copy" className="copy" onClick={e => this.handleClockCopy(this.state.output) }/>
              <Icon type="swap" className="wrapOutput" onClick={e => this.setState({'wrapOutput':{'pre-wrap':'pre','pre':'pre-wrap'}[this.state.wrapOutput]})}/>
              <Icon type="eye" className="viewOutput" onClick={e => this.setState({'viewOutput':!this.state.viewOutput})}/>
            </header>
            {this.state.viewOutput ? <textarea className="output" style={{'whiteSpace':this.state.wrapOutput}} value={output} placeholder="and this is the result"/> : null}
            <footer className="">
              <label>{'length: '+this.state.output.length}</label>
              <label>{'lines: '+this.state.output.split('\n').length}</label>
            </footer>
          </div>
        </div>
    );
  }
}
