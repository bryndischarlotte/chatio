import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginWindow from './components/LoginWindow/LoginWindow';
import Lobby from './components/Lobby/Lobby';
import ChatWindow from './components/ChatWindow/ChatWindow';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={ LoginWindow } />
                    <Route exact path="/lobby" component={ Lobby } />
                    <Route exact path="/chatroom" component={ ChatWindow } />
                </Switch>
            </div>
        );
    }
}

export default App;
