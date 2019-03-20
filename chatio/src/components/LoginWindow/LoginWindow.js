import React from 'react';

class LoginWindow extends React.Component {
    render() {
        return (
            <div id="login-window">
                <div className="form-group" id="login-form">
                    <form>
                        <label className="control-label" htmlFor="login-name">PICK A USERNAME:</label>
                        <input type="text" name="login" id="login-name" className="form-control" />
                    </form>
                    <button type="button" className="btn btn-primary">SUBMIT</button>
                </div>
            </div>
        );
    }
};

export default LoginWindow;