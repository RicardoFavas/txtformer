import React from 'react';
import _ from 'lodash';
import less from 'less';
import Trx from "./Trx.jsx";

class FilteredTrxList extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <ul className="trxList">
          {
            this.props.filteredTrxList.map(
              (v,k) =>
              <Trx
                key={k} 
                index={k}
                id={v.id}
                label={v.label} 
                hint={v.hint}
                handleDnD={this.props.handleDnD}
                addSelectedTrx={this.props.addSelectedTrx}
              />
            )
          }
        </ul>
      )
    }
}

export default FilteredTrxList;