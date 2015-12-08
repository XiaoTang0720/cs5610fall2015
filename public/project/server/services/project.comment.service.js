module.exports = function(app, model) {

    app.post("/api/project/comment", create);
    app.get("/api/project/comment/:id", find);
    app.get("/api/project/comments", findAll);
    app.delete("/api/project/comment/:id", deleteComment);
    app.post("/api/project/userincomment", updateUserInComment);

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

    function findAll(req, res) {
        model
            .findAllCommentsForAdmin()
            .then(function(comments) {
                res.json(comments);
            });
    }

    function deleteComment(req, res) {
        model
            .deleteComment(req.params.id)
            .then(function(comment) {
                res.json(comment);
            });
    }

    function updateUserInComment(req, res) {
        model
            .updateUserInComment(req.body)
            .then(function(comment) {
                res.json(comment);
            });
    }
};