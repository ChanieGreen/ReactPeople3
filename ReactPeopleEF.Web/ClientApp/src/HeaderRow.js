import React from 'react';
import {Link} from 'react-router-dom';

class HeaderRow extends React.Component {
    render() {
        const {
            onDeleteManyClicked,
            onCheckAllClicked,
            onClearAllClicked
        } = this.props;
        return (
            <div className="row">
                <div className="col-md-3">
                    <Link to='/add' className="btn btn-default">Add Person</Link>
                </div>
                <div className="col-md-3">
                    <button onClick={onDeleteManyClicked} className="btn btn-danger">Delete</button>
                </div>
                <div className="col-md-3">
                    <button onClick={onCheckAllClicked} className="btn btn-info">Check All</button>
                </div>
                <div className="col-md-3">
                    <button onClick={onClearAllClicked} className="btn btn-success">Clear All</button>
                </div>
            </div>);
    }
}

export default HeaderRow;