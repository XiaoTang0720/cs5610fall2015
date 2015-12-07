(function() {
    angular
        .module("MovieJourney")
        .factory("WatchlistService", WatchlistService);

    function WatchlistService($http, $q) {
        var service = {
            createWatchlistForUser: createWatchlistForUser,
            findAllWatchlistsForUser: findAllWatchlistsForUser,
            deleteWatchlistById: deleteWatchlistById
        };
        return service;

        function createWatchlistForUser(watchMovie) {
            var deferred = $q.defer();
            $http
                .post("/api/project/watchlist", watchMovie)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllWatchlistsForUser(uid) {
            var deferred = $q.defer();
            $http
                .get("/api/project/" + uid + "/watchlist")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findWatchListById(watchlistid) {
            var deferred = $q.defer();
            $http
                .get("/api/project/watchlist/" + watchlistid)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteWatchlistById(id) {
            var deferred = $q.defer();
            $http
                .delete("/api/project/watchlist/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();