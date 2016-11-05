var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/overlay';
var bodyParser= require('body-parser');

app.use(bodyParser.json());

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

app.get('/persons', function (req, res) {
  console.log('find persons');
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    db.collection('persons').find().toArray(function (err, result) {
      if (err) throw err;

      console.log(result);
      res.send(result);
    })
  });
})

app.post('/persons', function (req, res) {
  console.log('body ', req.body);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to server.");
    db.collection('persons').insertOne(
        req.body,
        function(err, result) {
          assert.equal(err, null);
          console.log("Inserted a person.");
        });
    db.close();
  });
})


