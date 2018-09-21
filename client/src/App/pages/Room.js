import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
const socket = io.connect('https://pacific-cliffs-67186.herokuapp.com');
// const socket = io.connect('http://localhost:5000');

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
        };
        socket.emit('joinRoom', this.props.match.params.roomName);
        this.sendMessage = this.sendMessage.bind(this);
        this.inputRef = React.createRef();
        this.ulRef = React.createRef();
        this.submitRef = React.createRef();
        
    }

    componentDidMount() {
        socket.on("thread", (data) =>{
            this.setState({ response: data });
            var li = document.createElement("li");
            var text = document.createTextNode(data);
            li.innerHTML = data;
            this.ulRef.current.appendChild(li);
            this.ulRef.current.scrollBy(0, this.ulRef.current.scrollHeight);
        });
    } 
    add() {
        this.ulRef.current.appendChild(document.createElement("li"));
    }

    sendMessage() {
        if(this.inputRef.current.value != '') {
            socket.emit('chatMessage', this.props.match.params.roomName, /* 'mensagem' */this.inputRef.current.value);
        }
    }

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) {
            this.sendMessage();
            this.inputRef.current.value = '';
        } 
    }

  render() {
    const { response } = this.state;
    return (
        <div>
            <header class="header">
                <span class="addRoomIcon"></span>
            </header>
            <ul ref={this.ulRef} style={{width: "500px", height: "500px", backgroundColor: "gray", border: "5px solid black", overflowY: "scroll"}}>
                
            </ul>
                <input ref={this.inputRef} onKeyPress={this.enterPressed.bind(this)} type="text" style={{width: "500px"}}></input>
                <button ref={this.submitRef} type="button" onClick={this.sendMessage.bind()}>asdfadsf</button>
        </div>
    );
  }
}

export default Room;
