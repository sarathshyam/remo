
/*!
 * Realtime Monitoring Server
 * 2018, Sarath
 */

 /**
  * Module Dependencies
  */
  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var bodyParser = require('body-parser');

  const PORT  = process.env.PORT || 3000;

  //APP Setup =========================
  app.use(express.static(__dirname + '/public'))    // to serve ui static assets
  app.use(bodyParser.json());                       // to parse application/json

  // Load all the routes
  require('./routes')(app, io);


  //Executed on each connection
  //TODO: Move to a socket.js file
  io.on('connection', function(socket){
    console.log(socket.id + ' Connected..');
    socket.on('disconnect', function(){
        console.log(socket.id + ' Disconnected..');
    });
  });

  //Starting the kafka-consumer
  require('./kafka-reader/kafka-client')(app, io);

  // Starting the server
  http.listen(PORT);
  console.log(`Listening on port ${PORT}...`);

  
