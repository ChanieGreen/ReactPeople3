import React from 'react';
import { render } from 'react-dom';
import PeoplePage from './PeoplePage';
import { BrowserRouter, Route, } from 'react-router-dom';
import Add from './Add';
import Edit from './Edit';

class App extends React.Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={PeoplePage} />
                <Route exact path='/add' component={Add} />
                <Route path='/edit/:id?' component={Edit} />
            </div>
        );
    }
}


render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'));