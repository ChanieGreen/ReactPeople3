import React from 'react';
import {produce} from 'immer';
import axios from 'axios';


export default class Add extends React.Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age: '',
        }
    }

    onInputChange = e => {
        const newState = produce(this.state, draftState => {
            const { person } = draftState;
            person[e.target.name] = e.target.value;
        });
        this.setState(newState);
    }

    onAddClick = () => {
        axios.post('/api/people/add', this.state.person).then(() => {
            const nextState = produce(this.state, draftState => {
                draftState.person = {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
            this.setState(nextState);
            this.props.history.push('/');
        });
    }

    render() {
        const {firstName, lastName, age} = this.state;
        const style = {
            marginTop: 20
        }
        return (
            <div className="container">
                <div className="row">
                    <h1>Add Person</h1>
                    <input name="firstName" value={firstName} onChange={this.onInputChange} className="form-control" placeholder="First Name" style={style} />
                    <input name="lastName" value={lastName} onChange={this.onInputChange} className="form-control" placeholder="Last Name" style={style} />
                    <input name="age" value={age} onChange={this.onInputChange} className="form-control" placeholder="Age" style={style} />
                    <button className="btn btn-primary" onClick={this.onAddClick} style={style}>Add</button>
                </div>
            </div>
        )
    }
}