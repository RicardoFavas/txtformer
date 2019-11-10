import React from 'react';
import { findDOMNode } from 'react-dom'
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
      .map((trx) => { trx.id = _.uniqueId('id_'); trx.type = 'trx'; return trx; });

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
        newTrx.type = 'selectedTrx';
        this.state.selectedTrxList.push(newTrx);
      }
    );
    this.setState({'selectedTrxList':this.state.selectedTrxList});
    this.updateOutput();
  }

  removeSelectedTrx(index){    
    this.state.selectedTrxList.splice(index,1)
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

  shiftSelectedTrx(from_index,to_index){
    let from_trx = this.state.selectedTrxList[from_index];
    let to_trx = this.state.selectedTrxList[to_index];

    this.state.selectedTrxList.splice(from_index,1)
    this.state.selectedTrxList.splice(to_index,0,from_trx)
    this.setState({'selectedTrxList':this.state.selectedTrxList})
    this.updateOutput();
  }

  handleDnD(event, props, monitor, component){
    let from_type = monitor.getItem() && monitor.getItem().type
    let from_index = monitor.getItem() && monitor.getItem().index
    let from_id = monitor.getItem() && monitor.getItem().id
    let to_index = props.index
    let to_type = props.type
    let to_id = props.id

    if (event === 'isDragging'){
      
    } else if (event === 'hover'){
      if ( !monitor.isOver({ shallow: true }) )
        return
      

    } else if (event === 'beginDrag'){
      this.setState({glow:true})
    } else if (event === 'endDrag'){
      
      this.setState({glow:false})
      if (!monitor.didDrop()){
        if (from_type === 'selectedTrx')
          this.removeSelectedTrx(from_index);
      }
    } else if (event === 'drop'){
      this.setState({glow:false})

      if ( !monitor.isOver({ shallow: true }) )
        return;



      if (from_type === 'trx' && to_type == null){ //adiciona ah lista dos seleionados
        this.addSelectedTrx(from_id);
      } else if (from_type === 'selectedTrx' && to_type === 'trx'){  //remove da lista dos selecionados
        this.removeSelectedTrx(from_index);
      } else if (from_type === 'selectedTrx' && to_type === 'selectedTrx'){  //replace
      }




      

   }

    

  }

  render() {
    let input = this.state.input;
    let output = this.state.output;
      return (
        <div className="appContent">
          <div className="leftSideBar">
            <div className="trxSelectionLabel">Transformations</div>
          
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