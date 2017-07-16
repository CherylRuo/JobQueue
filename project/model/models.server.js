/**
 * Created by CherylRuo on 11/9/16.
 */
module.exports = function(mongoose) {
    var JobQueueSchema = require("./jobqueue/jobqueue.schema.server.js")(mongoose);
    mongoose.model("JobQueueModel", JobQueueSchema);
};