module.exports = function(app, model) {

    app.post("/api/assignment/user", create);
    app.get("/api/assignment/user", find);
    app.get("/api/assignment/user/:id", findById);
    app.put("/api/assignment/user/:id", update);
    app.delete("/api/assignment/user/:id", deleteUser);

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
};