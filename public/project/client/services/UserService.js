(function() {
    angular
        .module("MovieJourney")
        .factory("UserService", userService);

    function userService($http, $q) {

        var service = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser,
            buildUserConnections : buildUserConnections,
            findAllFollowingsForUser : findAllFollowingsForUser,
            findAllFollowedsForUser : findAllFollowedsForUser,
            deleteFollowingById : deleteFollowingById
        };
        return service;

        function createUser(user) {
            var deferred = $q.defer();
            $http
                .post("/api/project/user", user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserById(id) {
            var deferred = $q.defer();
            $http
                .get("/api/project/user/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            if (username != null) {
                $http
                    .get("/api/project/user?username=" + username)
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
                    .get("/api/project/user?username=" + username + "&password=" + password)
                    .success(function(response) {
                        deferred.resolve(response);
                    });
            }
            return deferred.promise;
        }

        function updateUser(id, user) {
            var deferred = $q.defer();
            $http
                .put("/api/project/user/" + id, user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteUser(id) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/user/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function buildUserConnections(me, other) {
            var deferred = $q.defer();
            $http
                .get("/api/project/" + me + "/" + other + "/user")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllFollowingsForUser(id) {
            var deferred = $q.defer();
            $http
                .get("/api/project/user/following/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllFollowedsForUser(id) {
            var deferred = $q.defer();
            $http
                .get("/api/project/user/followed/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFollowingById(me, other) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/" + me + "/" + other + "/user")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();