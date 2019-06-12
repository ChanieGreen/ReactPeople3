import React from 'react';
import HeaderRow from './HeaderRow';
import { produce } from 'immer';
import axios from 'axios';
import PeopleTable from './PeopleTable';

class PeoplePage extends React.Component {
    state = {
        people: []
    }

    componentDidMount = () => {
        axios.get('/api/people/getall').then(({ data }) => {
            data.forEach(p => p.markedForDeletion = false);
            this.setState({ people: data });
        });
    }

    onDeleteCheckChanged = person => {
        const nextState = produce(this.state, draftState => {
            const personThatChanged = draftState.people.find(p => p.id === person.id);
            personThatChanged.markedForDeletion = !personThatChanged.markedForDeletion;
        });

        this.setState(nextState);
    }

    onDeleteManyClicked = () => {
        axios.post('/api/people/delete',
            { personIds: this.state.people.filter(p => p.markedForDeletion).map(p => p.id) })
            .then(() => {
                axios.get('/api/people/getall').then(({ data }) => {
                    data.forEach(p => p.markedForDeletion = false);
                    this.setState({ people: data });
                });
            });
    }

    onDeleteClicked = (personId) => {
        axios.post('/api/people/delete',
            { personIds: [personId] })
            .then(() => {
                axios.get('/api/people/getall').then(({ data }) => {
                    data.forEach(p => p.markedForDeletion = false);
                    this.setState({ people: data });
                });
            });
    }

    onCheckAllClicked = () => {
        const nextState = produce(this.state, draftState => {
            draftState.people.forEach(p => p.markedForDeletion = true);
        });
        this.setState(nextState);
    }

    onClearAllClicked = () => {
        const nextState = produce(this.state, draftState => {
            draftState.people.forEach(p => p.markedForDeletion = false);
        });
        this.setState(nextState);
    }

    render() {
        const { person, people } = this.state;
        return (
            <div className="container" style={{ marginTop: 40 }}>
                <HeaderRow
                    onDeleteManyClicked={this.onDeleteManyClicked}
                    onCheckAllClicked={this.onCheckAllClicked}
                    onClearAllClicked={this.onClearAllClicked} />
                <PeopleTable
                    onDeleteCheckChanged={this.onDeleteCheckChanged}
                    people={people}
                    onDeleteClicked={this.onDeleteClicked} />
            </div>
        )
    }

}

export default PeoplePage;
