(function() {
        angular
        .module("MovieJourney")
        .factory("MovieService", MovieService);

        function MovieService($http, $q) {
            var service = {
                searchMovieByTitle: searchMovieByTitle,
                searchMovieByActor: searchMovieByActor,
                findInitialRankings: findInitialRankings,
                createCommentForMovie: createCommentForMovie,
                searchCommentsByMovieId: searchCommentsByMovieId,
                findAllCommentsForAdmin: findAllCommentsForAdmin,
                deleteCommentById: deleteCommentById
            };
            return service;

            function findInitialRankings() {
                var deferred = $q.defer();
                $http.get('../client/img/rankinglist.json').success(function(rankings) {
                    var nextPage = [];
                    for (var i = 0; i < rankings.length; i++) {
                        nextPage.push(rankings[i]);
                    }
                    deferred.resolve(nextPage);
                });
                return deferred.promise;
            }

            function searchMovieByTitle(inputTitle) {
                var deferred = $q.defer();
                var uri = "http://www.myapifilms.com/imdb?title=TITLE&limit=10&format=JSONP&callback=JSON_CALLBACK";
                var searchURI = uri.replace(/TITLE/g, inputTitle);
                $http.jsonp(searchURI)
                    .success(function(response) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            }

            function searchMovieByActor(inputActor) {
                var deferred = $q.defer();
                var uri = "http://www.myapifilms.com/imdb?name=NAME&limit=10&format=JSONP&callback=JSON_CALLBACK";
                var searchURI = uri.replace(/NAME/g, inputActor);
                $http.jsonp(searchURI)
                    .success(function(response) {
                    deferred.resolve(response);
                });
                return deferred.promise;
            }

            function createCommentForMovie(comment) {
                var deferred = $q.defer();
                $http
                    .post("/api/project/comment", comment)
                    .success(function(response) {
                        deferred.resolve(response);
                    });
                return deferred.promise;
            }

            function searchCommentsByMovieId(idIMDB) {
                var deferred = $q.defer();
                $http
                    .get("/api/project/comment/" + idIMDB)
                    .success(function(response) {
                        deferred.resolve(response);
                    });
                return deferred.promise;
            }

            function findAllCommentsForAdmin() {
                var deferred = $q.defer();
                $http
                    .get("/api/project/comments")
                    .success(function(response) {
                        deferred.resolve(response);
                    });
                return deferred.promise;
            }

            function deleteCommentById(id) {
                var deferred = $q.defer();
                $http
                    .delete("/api/project/comment/" + id)
                    .success(function(response) {
                        deferred.resolve(response);
                    });
                return deferred.promise;
            }
        }
})();