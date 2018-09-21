const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 5000;
var server = app.listen(port);

var io = require("socket.io")(server);
var createdRooms = new Array();

var io2 = require('socket.io-client');
var socket = io2.connect("http://localhost:5000");

io.on("connection", function(socket) {
    console.log("New client connected");
  
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  
    socket.on('chatMessage', (roomName, msg) => {
      console.log('-> recebeu mensagem: ' + msg + ' para ' + roomName);
      io.in(roomName).emit('thread', msg);
    });
  
    socket.on('createRoom', (roomName) => {
      socket.join(roomName);
      createdRooms.push(roomName);
      console.log('Room ' + roomName + ' created');
    });
  
    socket.on('listRooms', (fn) => {
      allData = Object.keys(io.sockets.adapter.rooms);
      let l = new Array();
      for(let i=0; i < allData.length; i++) {
        if (createdRooms.includes(allData[i])) {
          l.push(allData[i]);
        }
      }
      fn(l);
    });
  
    socket.on('joinRoom', (roomName) => {
      socket.join(roomName);
      io.to(roomName).emit('thread', 'voce entrou');
      console.log('Room ' + roomName + ' joined');
    });
  });

  app.post('/create-room', function(req, res, next) {
    socket.emit('createRoom', req.body.roomName);
    res.redirect('back');
  });
  
  app.get('/list-room', function(req, res, next) {
    socket.emit('listRooms', (data) => {
      let l = new Array();
      for(var i=0; i < data.length; i++) {
        l.push(data[i]);
      }
      res.send(l);
    })
  });
  
  app.post('/join-room', (req, res, next) => {
    socket.emit('joinRoom', req.body.roomName);
    res.send('joined ' + roomName + ' room');
  });

// An api endpoint that returns a short list of items
/* app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
}); */

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

console.log('App is listening on port ' + port);