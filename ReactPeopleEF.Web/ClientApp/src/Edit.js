import React from 'react';
import axios from 'axios';
import { produce } from 'immer';

export default class Edit extends React.Component {
    state = {
        people: [],
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        value: 0
    }

    componentDidMount = () => {
        if (this.props.match.params.id) {
            axios.get('/api/people/getperson', { params: { personId: this.props.match.params.id } })
                .then(({ data }) => {
                    this.setState({ person: data });
                });
        } else {
            axios.get('api/people/getall')
                .then(({ data }) => {
                    this.setState({ people: data });
                });
        }
    }

    onInputChange = e => {
        const newState = produce(this.state, draftState => {
            const { person } = draftState;
            person[e.target.name] = e.target.value;
        });
        this.setState(newState);
    }

    onEditClick = () => {
        axios.post('/api/people/edit', this.state.person).then(() => {
            const nextState = produce(this.state, draftState => {
                draftState.person = {
                    id: '',
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
            this.setState(nextState);
            this.props.history.push('/');
        });
    }

    onChooseClick = id => {
        axios.get('/api/people/getperson', { params: { personId: id } })
            .then(({ data }) => {
                this.setState({ person: data, people: [] });
            });
    };


    onPersonChange = e => {
        this.setState({ value: e.target.value });
    }

    render() {
        const { person, people, value } = this.state;
        const style = {
            marginTop: 20
        }
        let content;
        if (!people && !person){
            <h1>Loading...</h1>
        }
        else if(people.length) {
            content = 
                <div className="row">
                    <select value={value} onChange={this.onPersonChange} className="form-control" style={style}>
                        <option key={0} value={0}>--Choose a Person--</option>
                        {people.map((person) => {
                            return (
                                <option key={person.id} value={person.id}>{person.firstName} {person.lastName} {person.age}</option>
                            )
                        })
                        }
                    </select>
                    <button className="btn btn-success" onClick={() => this.onChooseClick(value)} style={style}>Edit Person</button>
                </div>
            
        } else {
            content = 
                <div className="row">
                    <h1>Edit</h1>
                    <input name="firstName" value={person.firstName} onChange={this.onInputChange} className="form-control" placeholder="First Name" style={style} />
                    <input name="lastName" value={person.lastName} onChange={this.onInputChange} className="form-control" placeholder="Last Name" style={style} />
                    <input name="age" value={person.age} onChange={this.onInputChange} className="form-control" placeholder="Age" style={style} />
                    <button className="btn btn-primary" onClick={this.onEditClick} style={style}>Edit</button>
                </div>
            
        }

        return (
            <div className="container">
                {content}
            </div>
        )
    }
}
