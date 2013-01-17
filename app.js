
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
app.get('/style.css', function( req, res ) {
  res.sendfile( __dirname + "/public/stylesheets/style.css" );
});
app.get('/jones.png', function( req, res ) {
  res.sendfile( __dirname + "/public/images/jones.png" );
});
app.get('/whip.mp3', function( req, res ) {
  res.sendfile( __dirname + "/public/media/whip.mp3" );
});
app.get('/whip.ogg', function( req, res ) {
  res.sendfile( __dirname + "/public/media/whip.ogg" );
});

io.sockets.on('connection', function( socket ) {
  socket.emit( 'init', { msg: "Connected." });
  socket.on('crack', function(data) {
    socket.broadcast.emit('whip', { val: "KA CRACK" });
  });
});