import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class TheList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ds: [],
        }
    }

    componentDidMount() {
        // fetch('https://arcane-fjord-67464.herokuapp.com/list-room').then(response => console.log('-> ' + JSON.stringify(response.json())));
        fetch('https://pacific-cliffs-67186.herokuapp.com/list-room')
        // fetch('http://localhost:5000/list-room')
        .then(response => response.json())
        .then(data => this.setState({ ds: data }));
    }

    render() {
        const { ds } = this.state;

        return (
            <ul class="list-group">
              {ds.map(d =>
                <li class="list-group-item"><a href={"/" + d}>{d}</a><a href="#" style={{float: 'right'}}>Delete</a></li>
              )}
            </ul>
          );
    }
}

class Main extends Component {

    componentDidMount() {
        
    }

  render() {
    return (
        <div>
            <header class="header">
                <span class="addRoomIcon"><a href="#" data-toggle="modal" data-target="#exampleModal">+</a></span>
            </header>

            <TheList />

            {/* Modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create Room</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                    
                    <form id="createRoomForm" action="https://pacific-cliffs-67186.herokuapp.com/create-room" method="post">
                    {/* <form id="createRoomForm" action="http://localhost:5000/create-room" method="post"> */}
                        <div class="form-group">
                            <label for="exampleInputEmail1">Room Name</label>
                            <input type="text" class="form-control" id="exampleInput" name="roomName" aria-describedby="emailHelp" placeholder="Enter room name" />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>


                </div>
                </div>
            </div>
            </div>
        </div>
      
    );
  }
}

export default Main;
