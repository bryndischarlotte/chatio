import React from 'react';
import { Redirect } from 'react-router-dom';
import { socket } from '../../services/socketService';

class LoginWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            redirect: false
        };
    }
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to='/lobby' />
        }
      }
    setNickname(nickname) {
        if (nickname === '') { return false; }
        socket.emit('adduser', nickname, (resp) => {
            if (resp === true) {
                socket.emit('users');
                this.setState({ redirect: true });
            }
            else {
                console.log("doesn't work");
            }
        })
        this.setState({ nickname: '' });
    }    
    render() {
        const { nickname } = this.state;
        return (
            <div id="login-window">
                <div className="form-group" id="login-form">
                    <form>
                        <label className="control-label" htmlFor="login-name">PICK A USERNAME:</label>
                        <input type="text" name="login-input" id="login-name" className="form-control" value={ nickname }
                        onChange={e => this.setState({ nickname: e.target.value })}/>
                    </form>
                    <button type="button" className="btn btn-primary" onClick={() => this.setNickname(nickname)}>
                        SUBMIT
                    </button>
                    { this.renderRedirect() }
                </div>
            </div>
        );
    }
};

export default LoginWindow;