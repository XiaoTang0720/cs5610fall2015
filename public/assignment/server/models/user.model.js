var q = require("q");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.js")(mongoose);
    var UserModel  = mongoose.model("UserModel", UserSchema);
    var api = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser
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
}