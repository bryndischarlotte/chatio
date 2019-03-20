import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { socket } from '../../services/socketService';

class Lobby extends React.Component {
    componentDidMount() {
        socket.on('roomlist', roomList => {
            this.setState({ ...this.state, rooms: roomList });
        });
        socket.on('userlist', userList => {
            this.setState({ ...this.state, users: userList });
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            users: [],
            showModal: false,
            newRoom: {
                roomName: '',
                roomPass: ''
            }
        };
    }
    createNewRoom(room) {
        if (room.roomName === '' || room.roomPass === '') { return false; }
        const roomObj = {
            room: room.roomName,
            pass: room.roomPass
        }
        socket.emit('joinroom', roomObj, (resp) => {
            if (resp === true) {
                socket.emit('rooms');
                this.toggleModal(false);
                this.setState({ ...this.state, newRoom: { roomName: '', roomPass: '' } });
            }
            else {
                console.log('Did not work');
            }
        });
    };
    toggleModal(inp) {
        if (inp === true) {
            this.setState({ ...this.state, showModal: true });
        }
        else {
            this.setState({ ...this.state, showModal: false });
        }
    }
    render() {
        return (
            <div>
                {console.log(this.state.rooms)}
                {console.log(this.state.users)}
                <button type="button" className="btn btn-success" onClick={() => this.toggleModal(true)} >Create Room</button>
                <Modal visible={ this.state.showModal }>
                    <div className="modal-header">
                        <h5 className="modal-title">Create new room</h5>
                    </div>
                    <div className="modal-body">
                        <label className="control-label" htmlFor="login-name">ROOM NAME:</label>
                        <input type="text" name="name-of-room" id="room-name" className="form-control" value={ this.state.newRoom.roomName } 
                        onChange={e => this.setState({ ...this.state, newRoom: { roomName: e.target.value, roomPass: this.state.newRoom.roomPass } })} />
                        <label className="control-label" htmlFor="login-name">ROOM PASSWORD:</label>
                        <input type="text" name="pass-of-room" id="room-pass" className="form-control" value={ this.state.newRoom.roomPass }
                        onChange={e => this.setState({ ...this.state, newRoom: { roomName: this.state.newRoom.roomName, roomPass: e.target.value } })} />
                        {console.log(this.state.newRoom.roomName)}
                        {console.log(this.state.newRoom.roomPass)}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal(false)}>
                            Cancel
                </button>
                        <button type="button" className="btn btn-primary" onClick={() => this.createNewRoom(this.state.newRoom)}>
                            Submit
                </button>
                    </div>
                </Modal>
            </div>
        )
    }
};



export default Lobby;