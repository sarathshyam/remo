/*!
 * Defines all route modules
 * 2018, Sarath
 */

module.exports = function(app, io){
    require('./remo-webconsole')(app);
    require('./metric-reciever')(app, io);
};