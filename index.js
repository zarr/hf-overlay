var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('message', function(msg){
    console.log("Relaying ", msg)
    io.emit('message', msg);
  });
})

http.listen(3000, function () {
  console.log('Server started!')
})

app.use('/', express.static('static'))
app.use('/lib', express.static('node_modules'))
