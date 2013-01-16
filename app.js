
var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var port = process.env.PORT || 3000
server.listen(port, function() {
  console.log( "Express server listening on port " + port );
});

app.get('/', function( req, res ) {
  res.sendfile( __dirname + "/index.html" );
});
app.get('/socket.io/socket.io.js', function( req, res ) {
  res.sendfile( __dirname + "/node_modules/socket.io/lib/socket.io.js" );
});

io.sockets.on('connection', function( socket ) {
  socket.on('crack', function(data) {
    socket.emit('whip', { val: "KA CRACK" });
  });
});