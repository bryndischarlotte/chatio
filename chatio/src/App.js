import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { socket } from './services/socketService';
import LoginWindow from './components/LoginWindow/LoginWindow';
import Lobby from './components/Lobby/Lobby';
import ChatWindow from './components/ChatWindow/ChatWindow';

class App extends Component {
    componentDidMount() {
        socket.emit('users');
        socket.on('userlist', userList => {
            this.setState({users: userList});
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }
    render() {
        return (
            <div>
                {console.log(socket)}
                {console.log(this.state)}
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
