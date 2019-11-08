import React from 'react';
import _ from 'lodash';
import less from 'less';

import { Input,Upload } from 'antd';
import { Badge } from 'antd';
import { Layout } from 'antd';
import { Switch, Dropdown, Row, Col } from 'antd';
import { Menu, Icon } from 'antd';
import { Affix, Button } from 'antd';
import { Select } from 'antd';
import FuzzySearch from 'fuzzy-search';

import globals from './../globals.js';
import Trx from "./Trx.jsx";
import MyInput from "./MyInput.jsx";
import MyOutput from "./MyOutput.jsx";
import MyContent from "./MyContent.jsx";
import './App.less';
import FilteredTrxList from './FilteredTrxList.jsx';
import SelectedTrxList from './SelectedTrxList.jsx';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText:'',
      filteredTrxList: [],
      selectedTrxList: [],
    };
    
    this.allTrx = globals.Transformations
      .filter(trx => !_.isNil(trx.process))
      .sort((a,b)=>a.label>b.label?1:-1)
      .map((trx) => { trx.id = _.uniqueId('id_'); return trx; });

    this.state.filteredTrxList = this.allTrx;
  }

  updateFilteredTrxList(filterText){
    const searcher = new FuzzySearch(this.allTrx, ['label','tags'], {
      caseSensitive: false,
      sort: true
    });
    let items = searcher.search(filterText);
    this.setState({'filterText':filterText,'filteredTrxList':items});
  }

  addSelectedTrx(id){
    this.allTrx.filter(trx => trx.id === id).map(
      trx => {
        let newTrx = _.cloneDeep(trx);
        newTrx.id = _.uniqueId('id_');
        this.state.selectedTrxList.push(newTrx);
      }
    );
    this.setState({'selectedTrxList':this.state.selectedTrxList});
    this.updateOutput();
  }

  removeSelectedTrx(id){    
    this.setState({'selectedTrxList':this.state.selectedTrxList.filter(trx => trx.id !== id)});
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

  clearSelectedTrx(){
    this.setState({'selectedTrxList':[]});
    this.updateOutput();
  }

  updateOutput(){
    this.myContent.updateOutput();
  }

  changeOptionsTrx(index,options){
    let trx = this.state.selectedTrxList[index];
    trx.options = options;
    this.setState({'selectedTrxList':_.clone(this.state.selectedTrxList)});
    this.updateOutput();
  }


  handleDnD(event, props, monitor, component){
    console.log("DRAG EVENT -> "+event);

    if (event === 'hover'){

    }

    if (event === 'beginDrag'){
      this.setState({glow:true})
    }

    if (event === 'endDrag'){
      let trx = monitor.getItem();
      if (monitor.didDrop()){
        this.addSelectedTrx(trx.id);
      } else {
        this.removeSelectedTrx(trx.id);
      }
      this.setState({glow:false})
    }

    if (event === 'drop'){
      
    }

    

  }

  render() {
    let input = this.state.input;
    let output = this.state.output;
      return (
        <div className="appContent">
          <div className="leftSideBar">
            <div className="trxSelectionLabel">Selected Formatters</div>
          
           <SelectedTrxList 
              glow={this.state.glow}
              selectedTrxList={this.state.selectedTrxList}
              removeSelectedTrx={this.removeSelectedTrx.bind(this)}
              premoteSelectedTrx={this.premoteSelectedTrx.bind(this)}
              demoteSelectedTrx={this.demoteSelectedTrx.bind(this)}
              changeOptionsTrx={this.changeOptionsTrx.bind(this)}
              handleDnD={this.handleDnD.bind(this)}
            />
            <div className="trxSearchBox">
              <Input.Search
                placeholder="Search"
                onChange={e=>this.updateFilteredTrxList(e.target.value)}
              />
            </div>
            <FilteredTrxList 
              filteredTrxList={this.state.filteredTrxList}
              addSelectedTrx={this.addSelectedTrx.bind(this)}
              handleDnD={this.handleDnD.bind(this)}
            />
          </div>
          <MyContent
            selectedTrxList={this.state.selectedTrxList}
            ref={instance => { this.myContent = instance; }}
          />
        </div>
    );
  }
}


export default DragDropContext(HTML5Backend)(App);