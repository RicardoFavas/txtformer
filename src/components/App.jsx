import React from 'react';
import DropZone from 'react-dropzone';
import _ from 'lodash';
import { InputGroup, Position, Classes, EditableText, Tag } from "@blueprintjs/core";

import globals from './../globals.js';
import Trx from "./Trx.jsx";
import './App.css';


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
      'outputNotifications':[],
      'inputNotifications':[]
    }
    this.allTrx = globals.Transformations.filter(trx => !_.isNil(trx.process)).sort((a,b)=>a.label>b.label?1:-1);
    this.state.filteredTrxList = this.allTrx;
  }

  handleUploadFile(newInput){
    this.state.input = newInput; //hack
    this.updateOutput();
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
  handleDropFile(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length == 0)
    return;
    let reader = new FileReader();
    reader.onload = (e) => {
      let text = reader.result;
      this.handleUploadFile(text);
    }
    reader.readAsText(acceptedFiles[0], "UTF-8");
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
        <header>
        </header>
        <section className="leftSideBar" >
          <label className="trxSelectionLabel">Selected Formatters</label>
          <ul className="trxSelection pt-elevation-3">
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
          <InputGroup
            className="trxSearchBox pt-elevation-2"
            onChange={ e => this.updateFilteredTrxList(e.target.value) }
            placeholder="Search"
            rightElement={
              <Tag className={Classes.MINIMAL}>{this.state.filteredTrxList.length}</Tag>
            }
            leftIconName="pt-icon-filter"
          />
          <ul className="trxList pt-elevation-3">
            {
              this.state.filteredTrxList.map(
                (v,k) =>
                <Trx
                  key={k}
                  label={v.label}
                  hint={v.hint}
                  addSelectedTrx={this.addSelectedTrx.bind(this)}
                />
              )
            }
          </ul>
        </section>


        <div className="inputContainer">
          <header>
            <label className="inputLabel">Input</label>
            <DropZone className="upload" onDrop={this.handleDropFile.bind(this)}>
              <span className="upload pt-icon-standard pt-icon-cloud-upload"/>
            </DropZone>
            <span className="wrapInput pt-icon-standard pt-icon-key-enter" onClick={e => this.setState({'wrapInput':{'pre-wrap':'pre','pre':'pre-wrap'}[this.state.wrapInput]})}/>
            <span className="viewInput pt-icon-standard pt-icon-eye-open" onClick={e => this.setState({'viewInput':!this.state.viewInput})}/>
          </header>
          { this.state.viewInput ? <textarea className="input pt-input" style={{'viewInput':!this.state.viewInput}} style={{'whiteSpace':this.state.wrapInput}} value={input} placeholder="Your text goes here" onChange={e => {this.state.input = e.target.value; this.updateOutput()}}/> : null }
          <footer className="pt-elevation-3">
            <label>{'length: '+this.state.input.length}</label>
            <label>{'lines: '+this.state.input.split('\n').length}</label>
          </footer>
        </div>
        <div className="outputContainer">
          <header>
            <label className="outputLabel">Output</label>
            <span className="download pt-icon-standard pt-icon-cloud-download" onClick={e => this.hanbdleClickDownload(_.now()+'.txt',this.state.output)}></span>
            <span className="copy pt-icon-standard pt-icon-clipboard" onClick={e => this.handleClockCopy(this.state.output) }></span>
            <span className="wrapOutput pt-icon-standard pt-icon-key-enter" onClick={e => this.setState({'wrapOutput':{'pre-wrap':'pre','pre':'pre-wrap'}[this.state.wrapOutput]})}/>
            <span className="viewOutput pt-icon-standard pt-icon-eye-open" onClick={e => this.setState({'viewOutput':!this.state.viewOutput})}/>
          </header>
          {this.state.viewOutput ? <textarea className="output pt-input" style={{'whiteSpace':this.state.wrapOutput}} readonly={true} value={output} placeholder="and this is the result"/> : null}
          <footer className="pt-elevation-3">
            <label>{'length: '+this.state.output.length}</label>
            <label>{'lines: '+this.state.output.split('\n').length}</label>
          </footer>
        </div>

      </div>
    );
  }
}
