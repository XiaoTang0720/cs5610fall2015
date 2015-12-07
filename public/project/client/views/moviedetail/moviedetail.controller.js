(function() {
    angular
        .module("MovieJourney")
        .controller("MovieDetailController", MovieDetailController);

	function MovieDetailController($scope, $rootScope,
        OrderService, WatchlistService, MovieService, UserService, $location, $http) {
		$scope.$location = $location;
        $scope.noComments = true;
        $scope.pageIsLoading = true;
        var curUser = $rootScope.user;
        var currentMovie;
        if ($rootScope.globalIdIMDB) {
            var uri = "http://www.myapifilms.com/imdb?idIMDB=IMDBID&format=JSONP&callback=JSON_CALLBACK";
            var searchURI = uri.replace(/IMDBID/g, $rootScope.globalIdIMDB);
            $http.jsonp(searchURI)
                .success(function(response) {
                    if (response != null) {
                        $scope.response = response;
                        currentMovie = response;

                        // load comments on this movie.
                        MovieService.searchCommentsByMovieId(currentMovie.idIMDB).then(function(comments) {
                            $scope.comments = comments;
                            if (comments == null || comments.length == 0) {
                                $scope.noComments = true;
                            } else {
                                $scope.noComments = false;
                            }
                            $scope.pageIsLoading = false;
                        });
                    } else {
                        $scope.pageIsLoading = false;
                    }
                });
        } else {
            $location.url("/movie");
        }

        $scope.addMovieToOrder = function() {
            if (curUser == null) {
                alert("Please login first!");
                $location.url("/login");
            } else if (currentMovie != null){
                var newOrder = {
                    "idIMDB" : currentMovie.idIMDB,
                    "title" : currentMovie.title,
                    "price": Math.floor(Math.random() * 10) + 1,
                    "userId" : curUser._id
                };
                OrderService.createOrderForUser(newOrder).then(function(callorder) {
                    $location.url("/order");
                });
            }
        }

        $scope.addMovieToWatchlist = function() {
            if (curUser == null) {
                alert("Please login first!");
                $location.url("/login");
            } else if (currentMovie != null){
                var newWatchlist = {
                    "idIMDB" : currentMovie.idIMDB,
                    "title" : currentMovie.title,
                    "userId" : curUser._id
                };
                WatchlistService.createWatchlistForUser(newWatchlist).then(function(callWatchlist) {
                    $location.url("/watchlist");
                });
            }
        }

        $scope.createComment = function(inputMessage) {
            if (curUser == null) {
                alert("Please login first!");
                $location.url("/login");
            } else if (inputMessage == null || inputMessage.length == 0) {
                $scope.inputEmptyMessage = true;
            } else {
                $scope.inputEmptyMessage = false;
                var newComment = {
                    "idIMDB" : currentMovie.idIMDB,
                    "message": inputMessage,
                    "userId" : curUser._id,
                    "username" : curUser.username,
                    "firstname" : curUser.firstname,
                    "lastname" : curUser.lastname,
                    "time" : Date()
                };
                MovieService.createCommentForMovie(newComment).then(function(sth) {
                    MovieService.searchCommentsByMovieId(currentMovie.idIMDB).then(function(comments) {
                        $scope.comments = comments;
                        if (comments == null || comments.length == 0) {
                            $scope.noComments = true;
                        } else {
                            $scope.noComments = false;
                        }
                    });
                });
            }
        }

        $scope.addUserAsFriend = function(userId) {
            if (curUser == null) {
                alert("Please login first!");
                $location.url("/login");
            } else if (curUser._id == userId) {
                alert("Sorry, you cannot add yourself as friends!");
            } else {
                UserService.buildUserConnections(curUser._id, userId).then(function(response) {
                    $location.url("/friend");
                });
            }
        }
	}
})();