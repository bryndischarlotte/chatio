import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { socket } from '../../services/socketService';
import RoomView from '../RoomView/RoomView';

class Lobby extends React.Component {
    componentDidMount() {
        socket.on('roomlist', roomList => {
            this.setState({ ...this.state, rooms: roomList });
        });
        socket.on('userlist', userList => {
            this.setState({ ...this.state, users: userList });
        })
  /*      socket.on('updateusers', (room, roomUsers, roomOps) => {
            console.log('------------------------------');
            console.log(room);
            console.log(roomUsers);
            console.log(roomOps);
            console.log('------------------------------');
        })*/
    }
    constructor(props) {
        super(props);
        this.state = {
            rooms: {},
            users: [],
            showModal: false,
            newRoom: {
                roomName: '',
                roomPass: ''
            }
        };
    }
    createNewRoom(room) {
        if (room.roomName === '') { return false; }
        const roomObj = {
            room: room.roomName,
            pass: room.roomPass
        }
        if (room.roomPass === '') {
            roomObj.pass = undefined;
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
        const { rooms, users, newRoom, showModal } = this.state;
        console.log(rooms);
        console.log(users);
        console.log(newRoom);
        return (
            <div>
                <RoomView rooms={ rooms } />
                <button type="button" className="btn btn-success" onClick={() => this.toggleModal(true)} >Create Room</button>
                <Modal visible={ showModal }>
                    <div className="modal-header">
                        <h5 className="modal-title">CREATE NEW ROOM</h5>
                    </div>
                    <div className="modal-body">
                        <label className="control-label" htmlFor="room-name">ROOM NAME:</label>
                        <input type="text" name="name-of-room" id="room-name" className="form-control" value={newRoom.roomName}
                            onChange={e => this.setState({ ...this.state, newRoom: { roomName: e.target.value, roomPass: newRoom.roomPass } })} />
                        <label className="control-label" htmlFor="room-pass">ROOM PASSWORD:</label>
                        <input type="text" name="pass-of-room" id="room-pass" className="form-control" value={newRoom.roomPass}
                            onChange={e => this.setState({ ...this.state, newRoom: { roomName: newRoom.roomName, roomPass: e.target.value } })} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => this.toggleModal(false)}>
                            CANCEL
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => this.createNewRoom(newRoom)}>
                            SUBMIT
                        </button>
                    </div>
                </Modal>
            </div>
        )
    }
};



export default Lobby;