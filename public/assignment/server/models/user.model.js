var mock = require("../data/user.mock.json");

module.exports = function() {
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

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
    }

    function createUser(user) {
        if (user != null) {
            mock.push({
                "id" : guid(),
                "firstName" : user.firstName,
                "lastName" : user.lastName,
                "username" : user.username,
                "password" : user.password
            });
            return mock[mock.length - 1];
        }
    }

    function findAllUsers() {
        return mock;
    }

    function findUserById(id) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].id == id) {
                return mock[i];
            }
        }
    }

    function findUserByUsername(username) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].username == username) {
                return mock[i];
            }
        }
    }

    function findUserByCredentials(credential) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].username == credential.username
                    && mock[i].password == credential.password) {
                return mock[i];
            }
        }
        return null;
    }

    function updateUser(id, user) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].id == id) {
                if (user.firstName != null) {
                    mock[i].firstName = user.firstName;
                }
                if (user.lastName != null) {
                    mock[i].lastName = user.lastName;
                }
                if (user.username != null) {
                    mock[i].username = user.username;
                }
                if (user.password != null) {
                    mock[i].password = user.password;
                }
                return mock[i];
            }
        }
    }

    function deleteUser(id) {
        for (var i = 0; i < mock.length; i++) {
            if (mock[i].id == id) {
                mock.splice(i, 1);
                return mock;
            }
        }
    }
}