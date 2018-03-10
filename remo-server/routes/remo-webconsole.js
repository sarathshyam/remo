/*!
 * Routes for the web console
 * 2018, Sarath
 */

 module.exports = function(app){
    // Web console -------------------------------------------------------------
    app.get('/', function(req, res) {
        res.sendfile('./visceral/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.get('/test', function(req, res){
        res.send('OK');
    });
 };