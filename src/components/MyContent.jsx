import React from 'react';

import MyInput from "./MyInput.jsx";
import MyOutput from "./MyOutput.jsx";

export default class MyContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
