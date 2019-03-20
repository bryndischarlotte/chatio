import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { socket } from './services/socketService';
import LoginWindow from './components/LoginWindow/LoginWindow';

class App extends Component {
    componentDidMount() {
        socket.on()
    }
    render() {
        return (
            <div>
                {console.log(socket)}
                <Switch>
                    <Route exact path="/" component={ LoginWindow } />
                </Switch>
            </div>
        );
    }
}

export default App;
