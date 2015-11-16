var model = require("../models/user.model.js")();

module.exports = function(app) {

    app.post("/api/assignment/user", create);
    app.get("/api/assignment/user", find);
    app.get("/api/assignment/user/:id", findById);
    app.put("/api/assignment/user/:id", update);
    app.delete("/api/assignment/user/:id", deleteUser);

    function create(req, res) {
        res.json(model.createUser(req.body));
    }

    function find(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username != null && password != null) {
            var credential = {
                "username": username,
                "password": password
            }
            res.json(model.findUserByCredentials(credential));
        } else if (username != null) {
            res.json(model.findUserByUsername(username));
        } else {
            res.json(model.findAllUsers());
        }
    }

    function findById(req, res) {
        var uid = req.params.id;
        res.json(model.findUserById(uid));
    }

    function update(req, res) {
        var id = req.params.id;
        var user = req.body;
        res.json(model.updateUser(id, user));
    }

    function deleteUser(req, res) {
        var uid = req.params.id;
        res.json(model.deleteUser(uid));
    }
};