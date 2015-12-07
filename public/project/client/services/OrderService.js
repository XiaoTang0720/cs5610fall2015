(function() {
    angular
        .module("MovieJourney")
        .factory("OrderService", OrderService);

    function OrderService($http, $q) {
        var service = {
            createOrderForUser: createOrderForUser,
            findAllOrdersForUser: findAllOrdersForUser,
            deleteOrderById: deleteOrderById,
            cleanOrdersForUser: cleanOrdersForUser
        };
        return service;

        function createOrderForUser(movieOrder) {
            var deferred = $q.defer();
            $http
                .post("/api/project/order", movieOrder)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllOrdersForUser(uid) {
            var deferred = $q.defer();
            $http
                .get("/api/project/" + uid + "/order")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteOrderById(id) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/order/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function cleanOrdersForUser(uid) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/" + uid + "/order")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();