import React from 'react';
import ReactTooltip from 'react-tooltip';
import ReactModal from 'react-modal';
import _ from 'lodash';

import {
    Button,
    Menu,
    MenuItem,
    MenuDivider,
    Popover,
    Position,
    Tooltip,
    Dialog,
    Intent
} from "@blueprintjs/core";


export default class Trx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'modalIsOpen': false,
    }
  }

  render() {
    let plusBtn, minusBtn, premoteBtn, demoteBtn, optionsBtn, hintBtn;

    if (!_.isNil(this.props.addSelectedTrx))
      plusBtn = (<span className="trxAdd pt-icon-standard pt-icon-add" key={0} src="./../resources/plus.png" onClick={e => this.props.addSelectedTrx(this.props.label)}/>);

      if (!_.isNil(this.props.removeSelectedTrx))
        minusBtn = <span className="trxRemove pt-icon-standard pt-icon-delete" src="./../resources/minus.png" onClick={e => this.props.removeSelectedTrx(this.props.index)}/>;

      if (!_.isNil(this.props.demoteSelectedTrx))
        premoteBtn = <span className="trxDemote pt-icon-standard pt-icon-caret-up"  onClick={e=>this.props.demoteSelectedTrx(this.props.index)}/>;

      if (!_.isNil(this.props.premoteSelectedTrx))
        demoteBtn = <span className="trxPremote pt-icon-standard pt-icon-caret-down" src="./../resources/down.png" onClick={e => this.props.premoteSelectedTrx(this.props.index)}/>;

      if (!_.isNil(this.props.optionsDialog)){
        let optionsDialogId = _.uniqueId();
        optionsBtn = (
          <span className="trxOptions pt-icon-standard pt-icon-cog"  onClick={e => {this.setState({modalIsOpen:true});}}/>
        );
      }

      if (!_.isNil(this.props.hint) ){
        let hintId = _.uniqueId();
        hintBtn =(
          <Tooltip
             content={this.props.hint}
             inline={false}
             position={Position.RIGHT}
             intent={Intent.INFO}
           >
              <span className="trxHint pt-icon-standard pt-icon-help"/>
            </Tooltip>
        );
      }

      let modal = null;
      if (!_.isNil(this.props.optionsDialog)){
        let newOptions = _.cloneDeep(this.props.options);
        modal = (
          <Dialog
            isOpen={this.state.modalIsOpen}
            contentLabel={this.props.label}
            title={<div><span className="pt-icon-large pt-icon-cog"></span><span>{this.props.label}</span></div>}
            onClose={e => {this.setState({'modalIsOpen':false})}}
            >
              <div className="trxOptionsDialog pt-dialog-body">
                {this.props.optionsDialog(newOptions)}
              </div>
              <div className="pt-dialog-footer pt-dialog-footer-actions">
                <Button className="cancel" text="Cancel"
                  onClick={e => {this.setState({'modalIsOpen':false})}}
                />
                <Button className="apply" text="Apply" intent={Intent.PRIMARY}
                  onClick={e => {this.setState({'modalIsOpen':false});this.props.changeOptionsTrx(this.props.index,newOptions);}}
                />
              </div>
            </Dialog>)
          }

          return (
            <div className="trx pt-input-group">
              {plusBtn}
              {minusBtn}
              <div className="trxLabel pt-label"> {this.props.label} </div>
              {hintBtn}
              {optionsBtn}
              <div className="premoteDemote">
                {premoteBtn}
                {demoteBtn}
              </div>
              {modal}
            </div>
          );
        }
      }
