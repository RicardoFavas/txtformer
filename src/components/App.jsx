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
import MyInput from "./MyInput.jsx";
import MyOutput from "./MyOutput.jsx";
import MyContent from "./MyContent.jsx";

import './App.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText:'',
      filteredTrxList: [],
      selectedTrxList: []
    }
    this.allTrx = globals.Transformations.filter(trx => !_.isNil(trx.process)).sort((a,b)=>a.label>b.label?1:-1);
    this.state.filteredTrxList = this.allTrx;
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
  clearSelectedTrx(){
    this.setState({'selectedTrxList':[]});
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
  updateOutput(){
    this.myContent.updateOutput();
  }

  render() {
    let input = this.state.input;
    let output = this.state.output;
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
                    <Menu.Item key={'clear'}>
                      <div onClick={ e => {this.clearSelectedTrx()}}>Clear</div>
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
          <MyContent
            selectedTrxList={this.state.selectedTrxList}
            ref={instance => { this.myContent = instance; }}
          />
        </div>
    );
  }
}
