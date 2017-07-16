module.exports = function(app) {
    var connectionString = 'mongodb://127.0.0.1:27017/JobQueue';

    var mongoose = require("mongoose");
    var connection = mongoose.createConnection(connectionString);

    var db = connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("we're connected!");
    });

    require("./model/models.server.js")(mongoose);
    var jobQueueModel = require("./model/jobqueue/jobqueue.model.server.js")(mongoose, db);
    require("./services/jobqueue.service.server.js")(app, jobQueueModel);
};