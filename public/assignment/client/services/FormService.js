(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {
        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            findFormById : findFormById,
            findFormByTitle : findFormByTitle,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;

        function createFormForUser(uid, form) {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/user/" + uid + "/form", form)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllFormsForUser(uid) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/" + uid + "/form")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findFormById(id) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findFormByTitle(title) {
            var deferred = $q.defer();
            if (title != null) {
                $http
                    .get("/api/assignment/form?title=" + title)
                    .success(function(response) {
                        deferred.resolve(response);
                    });
            }
            return deferred.promise;
        }

        function deleteFormById(id) {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateFormById(id, form) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/form/" + id, form)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();