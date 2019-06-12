import React, { Component } from 'react';
import PersonRow from './PersonRow';

export default class PeopleTable extends Component {
    render() {
        return (
            <table className="table table-hover table-striped table-bordered" style={{marginTop: 20}} >
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.people.map(person => <PersonRow onDeleteCheckChanged={this.props.onDeleteCheckChanged}
                        person={person} onDeleteClicked={this.props.onDeleteClicked} key={person.id} />)}
                </tbody>
            </table>
        )
    }
}
