var q = require("q");

module.exports = function(db, mongoose) {
    var JobQueueModel  = mongoose.model('JobQueueModel');
    var api = {
        createJob: createJob,
        findJobById:findJobById
    };
    return api;

    function createJob(job) {
        var deferred = q.defer();

        JobQueueModel.create(job, function(err, job) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(job);
            }
        });

        return deferred.promise;
    }

    function findJobById(id) {
        var deferred = q.defer();
        console.log(id);

        JobQueueModel.findOne({_id: id}, function(err, job){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(job);
            }
        });

        return deferred.promise;
    }
};