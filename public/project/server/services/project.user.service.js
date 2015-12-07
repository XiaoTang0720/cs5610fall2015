module.exports = function(app, model) {

    app.post("/api/project/user", create);
    app.get("/api/project/user", find);
    app.get("/api/project/user/:id", findById);
    app.put("/api/project/user/:id", update);
    app.delete("/api/project/user/:id", deleteUser);
    app.get("/api/project/:id/:otherId/user", connect);
    app.get("/api/project/user/following/:id", findFollowing);
    app.get("/api/project/user/followed/:id", findFollowed);
    app.delete("/api/project/:id/:otherId/user", disconnect);

    function create(req, res) {
        model
            .createUser(req.body)
            .then(function(user) {
                res.json(user);
            });
    }

    function find(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username != null && password != null) {
            var credential = {
                "username": username,
                "password": password
            }
            model
                .findUserByCredentials(credential)
                .then(function(user) {
                    res.json(user);
                })
        } else if (username != null) {
            model
                .findUserByUsername(username)
                .then(function(user) {
                    res.json(user);
                })
        } else {
            model
                .findAllUsers()
                .then(function(users) {
                    res.json(users);
                })
        }
    }

    function findById(req, res) {
        var uid = req.params.id;
        model
            .findUserById(uid)
            .then(function(user) {
                res.json(user);
            });
    }

    function update(req, res) {
        var id = req.params.id;
        var user = req.body;
        model
            .updateUser(id, user)
            .then(function(user) {
                res.json(user);
            });
    }

    function deleteUser(req, res) {
        model
            .deleteUser(req.params.id)
            .then(function(user) {
                res.json(user);
            });
    }

    function connect(req, res) {
        var id = req.params.id;
        var otherId = req.params.otherId;
        model
            .buildUserConnections(id, otherId)
            .then(function(sth) {
                res.json(sth);
            });
    }

    function findFollowing(req, res) {
        var id = req.params.id;
        model
            .findFollowing(id)
            .then(function(response) {
                res.json(response);
            });
    }

    function findFollowed(req, res) {
        var id = req.params.id;
        model
            .findFollowed(id)
            .then(function(response) {
                res.json(response);
            });
    }

    function disconnect(req, res) {
        var id = req.params.id;
        var otherId = req.params.otherId;
        model
            .dismissUserConnections(id, otherId)
            .then(function(sth) {
                res.json(sth);
            });
    }
};