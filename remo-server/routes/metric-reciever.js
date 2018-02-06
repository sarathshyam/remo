/*!
 * Routes for recieving the metrics from agents
 * 2018, Sarath
 */

module.exports = function(app, io){
    var count = 1;
    // Web console -------------------------------------------------------------
    app.post('/broadcast', function(req, res){
        console.log('posting.. ' + req.body.value);
        io.sockets.emit('broadcast',req.body);
        res.send('OK');
    });
 };