var q = require("q");

module.exports = function(db, mongoose) {
    var UserSchema = require("./project.user.schema.js")(mongoose);
    var UserModel  = mongoose.model("ProjectUserModel", UserSchema);
    var api = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser,
        buildUserConnections : buildUserConnections,
        findFollowing : findFollowing,
        findFollowed : findFollowed,
        dismissUserConnections : dismissUserConnections
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function(err, user) {
            console.log(err);
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find(function(err, users){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();

        UserModel.findById(id, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne({username: username}, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credential) {
        var deferred = q.defer();

        UserModel.findOne({username: credential.username, password: credential.password}, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function updateUser(id, user) {
        var deferred = q.defer();

        UserModel.update({_id: id}, {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            password: user.password
        }, function(err, user) {
            // update does not return user in mogodb,
            // so we need to retrieve the user and return.
            if(err) {
                deferred.reject(err);
            } else {
                UserModel.findById(id, function(err, user){
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = q.defer();

        UserModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

    function buildUserConnections(me, other) {
        var deferred = q.defer();

        UserModel.update({_id: me},
            {$addToSet: {following: other}}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                UserModel.update({_id: other},
                    {$addToSet: {followed: me}}, function(err, user) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findFollowing(id) {
        var deferred = q.defer();
        UserModel.findById(id, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                UserModel.find({_id : { $in: user.following} }, function(err, res){
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(res);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findFollowed(id) {
        var deferred = q.defer();
        UserModel.findById(id, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                UserModel.find({_id : { $in: user.followed} }, function(err, res){
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(res);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function dismissUserConnections(me, other) {
        var deferred = q.defer();

        UserModel.update({_id: me},
            {$pop: {following: other}}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                UserModel.update({_id: other},
                    {$pop: {followed: me}}, function(err, user) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
            }
        });

        return deferred.promise;
    }
}