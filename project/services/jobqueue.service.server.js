module.exports = function (app, model) {
    app.post('/api/createjob', createJob);
    app.get('/api/job/:id', findJobById);
    var request = require('request');
    var kue = require('kue');
    var queue = kue.createQueue();

    queue.process('url', function(job, done){
        getHtmlFromUrl(job.data.url, job.id, done);
    });

    function getHtmlFromUrl(url, id, done) {
        var newJob = {};
        newJob.url = url;
        newJob._id = id;
        request(url, function (error, response, body) {
            newJob.content = body;
            if (!error && response.statusCode == 200) {
                model.createJob(newJob)
            }
        });
        done();
    }

    function createJob(req, res) {
        var job = queue.create('url', {
            url: req.body.url
        }).save( function(err){
            if(!err) {
                res.status(201).send(job.id+"");
            }
        });
    }

    function findJobById(req, res) {
        model
            .findJobById(req.params.id)
            .then(
                function (job) {
                    if(job == null) {
                        res.status(200).send("Job incomplete! ");
                    }
                    else {
                        res.status(200).send(job.content);
                    }
            },
                function (err){
                    res.status(500).send(err);
                }
            );}
};