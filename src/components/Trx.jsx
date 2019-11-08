import React from 'react';
import _ from 'lodash';

import { Input } from 'antd';
import { Badge } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Menu } from 'antd';
import { Icon } from 'antd';
import { Modal, Button } from 'antd';
import { Tooltip } from 'antd';

import { DragSource } from 'react-dnd';




class Trx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'modalIsOpen': !_.isNil(this.props.optionsDialog),
    }
  }



  render() {
    let plusBtn, minusBtn, premoteBtn, demoteBtn, optionsBtn, hintBtn;

    if (!_.isNil(this.props.addSelectedTrx))
      plusBtn = <Icon className="trxAdd" type="plus-circle" onClick={e => this.props.addSelectedTrx(this.props.id)}/>;

    if (!_.isNil(this.props.removeSelectedTrx))
        minusBtn = <Icon className="trxRemove" type="minus-circle" onClick={e => this.props.removeSelectedTrx(this.props.id)}/>;

    if (!_.isNil(this.props.demoteSelectedTrx))
      premoteBtn = <Icon className="trxDemote" type="caret-up" onClick={e=>this.props.demoteSelectedTrx(this.props.index)}/>;

    if (!_.isNil(this.props.premoteSelectedTrx))
      demoteBtn = <Icon className="trxPremote" type="caret-down" onClick={e => this.props.premoteSelectedTrx(this.props.index)}/>;

    if (!_.isNil(this.props.optionsDialog)){
      let optionsDialogId = _.uniqueId();
      optionsBtn = <Icon className="trxOptions" type="setting" onClick={e => {this.setState({modalIsOpen:true});}} />
    }

    if (!_.isNil(this.props.hint)){
      hintBtn =(
        <Tooltip placement="right" title={this.props.hint}>
          <Icon className="trxHint" type="question-circle"/>
        </Tooltip>
      );
    }
    let modal = null;
    if (!_.isNil(this.props.optionsDialog)){
      let newOptions = _.cloneDeep(this.props.options);
      modal = (
        <Modal
          key={_.uniqueId()}
          title={<div>{this.props.label}</div>}
          visible={this.state.modalIsOpen}
          onOk={
            e => {
              this.setState({'modalIsOpen':false});
              this.props.changeOptionsTrx(this.props.index,newOptions);
              console.log(newOptions)
            }
          }
          onCancel = {e => { this.setState({'modalIsOpen':false}) }}
          afterClose = {e => {this.setState({'modalIsOpen':false})}}
          >
            <div className="trxOptionsDialog">
              {this.props.optionsDialog(newOptions)}
            </div>
          </Modal>
        )
      }

      const { isDragging, connectDragSource, spec } = this.props;
      return connectDragSource(
        <li className="trx">
          {plusBtn}
          {minusBtn}
          <span className="trxLabel"> {this.props.label} </span>
          {optionsBtn}
          <span className="premoteDemote">
            {premoteBtn}
            {demoteBtn}
          </span>
          {modal}
          {hintBtn}
        </li>
        );
      }
  }


  
const spec = {
  beginDrag(props, monitor, component){
    props.handleDnD('beginDrag',props, monitor, component);
    return props;
  },
  endDrag(props, monitor, component){
    props.handleDnD('endDrag',props, monitor, component);
  },
  isDragging(props, monitor){
    //props.handleDnD('isDragging',props, monitor);
  }
};

const collect = (connect,monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}


export default DragSource('trx', spec, collect)(Trx);