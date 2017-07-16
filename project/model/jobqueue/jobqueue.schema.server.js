module.exports = function(mongoose) {
    var JobQueue = mongoose.Schema({
        _id: Number,
        url: String,
        content: String
    }, {collection: "jobqueue"});
    return JobQueue;
};