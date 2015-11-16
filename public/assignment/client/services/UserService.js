/* global Guid */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $q) {

        var service = {
            createUser : createUser,
            findAllUsers : findAllUsers,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };
        return service;

        function createUser(user) {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/user", user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserById(id) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            if (username != null) {
                $http
                    .get("/api/assignment/user?username=" + username)
                    .success(function(response) {
                        deferred.resolve(response);
                    });
            }
            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            if (username != null && password != null) {
                $http
                    .get("/api/assignment/user?username=" + username + "&password=" + password)
                    .success(function(response) {
                        deferred.resolve(response);
                    });
            }
            return deferred.promise;
        }

        function updateUser(id, user) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/user/" + id, user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUser(id) {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/user/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();