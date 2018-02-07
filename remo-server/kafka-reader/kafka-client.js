/*!
 * A sample kafka client
 * 2018, Sarath
 */

module.exports = function(app, io){
    var kafka = require('kafka-node');
    var HighLevelConsumer = kafka.HighLevelConsumer;
    var Client = kafka.Client;
    
    //Zookeeper url. Needs to be moved to a configuration
    var client = new Client('localhost:2181');
    var topics = [{
        topic: 'test'
    }];
    
    var options = {
        autoCommit: true,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'buffer'
    };
    
    var consumer = new HighLevelConsumer(client, topics, options);
    
    consumer.on('message', function (message) {
        var buf = new Buffer(message.value, 'binary'); // Read string into a buffer.
        //var decodedMessage = type.fromBuffer(buf.slice(0)); // Skip prefix.
        var decodedMessage = buf.toString();
        io.sockets.emit('kafka-message', decodedMessage);
        console.log(decodedMessage);
    });
    
    consumer.on('error', function (err) {
        console.log('error', err);
    });
    
    process.on('SIGINT', function () {
        consumer.close(true, function () {
            process.exit();
        });
    });
}; 
