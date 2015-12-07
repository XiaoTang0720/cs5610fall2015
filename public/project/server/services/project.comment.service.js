module.exports = function(app, model) {

    app.post("/api/project/comment", create);
    app.get("/api/project/comment/:id", find);

    function create(req, res) {
        model
            .createComment(req.body)
            .then(function(comment) {
                res.json(comment);
            });
    }

    function find(req, res) {
        model
            .findAllCommentsForMovie(req.params.id)
            .then(function(comments) {
                res.json(comments);
            });
    }

};