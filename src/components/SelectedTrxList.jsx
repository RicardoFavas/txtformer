import React from 'react';
import _ from 'lodash';
import less from 'less';

import Trx from "./Trx.jsx";

import { DropTarget } from 'react-dnd';





class SelectedTrxList extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        const { connectDropTarget, hovered, item } = this.props;

        let rgb = this.props.glow ? '179, 255, 231' : '255,255,255';

        let style = {
            backgroundColor: `rgb(${rgb})`,
            backgroundImage: `linear-gradient(rgba(${rgb},.80), rgba(${rgb},.95)), url(/resources/arrow-down.svg)`
        }
        return (connectDropTarget(
            <ul className="trxSelection" style={style}>
                {
                    this.props.selectedTrxList.map(
                        (v,k) =>
                        <Trx
                            key={k} 
                            index={k}
                            id={v.id}
                            label={v.label}
                            type = {v.type}
                            removeSelectedTrx={this.props.removeSelectedTrx}
                            premoteSelectedTrx={this.props.premoteSelectedTrx}
                            demoteSelectedTrx={this.props.demoteSelectedTrx}
                            options={_.cloneDeep(v.options)}
                            optionsDialog={v.optionsDialog}
                            changeOptionsTrx={this.props.changeOptionsTrx}
                            handleDnD={this.props.handleDnD}
                        />
                    )
                }
            </ul>
        ));
    }
}


const spec = {
    canDrop(props, monitor) { return true; },
    hover(props, monitor, component) {  
        props.handleDnD('hover',props, monitor, component);
     },
    drop(props, monitor, component) {
        props.handleDnD('drop',props, monitor, component);
    },
};
const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
    }    
}
export default DropTarget('trx', spec, collect)(SelectedTrxList);
