import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { socket } from './services/socketService';
import LoginWindow from './components/LoginWindow/LoginWindow';

class App extends Component {
    componentDidMount() {
        socket.emit('adduser', "username2", (inp) => {
            if (inp === true) {
                console.log("works");
            }
            else {
                console.log("doesn't work");
            }
        })
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
                    <Route exact path="/" component={LoginWindow} />
                </Switch>
            </div>
        );
    }
}

export default App;
