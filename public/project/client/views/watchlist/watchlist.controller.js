(function() {
    angular
        .module("MovieJourney")
        .controller("WatchlistController", WatchlistController)

    function WatchlistController($scope, WatchlistService, OrderService, $rootScope, $location) {
        $scope.$location = $location;
        var curUser = $rootScope.user;
        if (curUser != null) {
            WatchlistService.findAllWatchlistsForUser(curUser._id).then(function(callwatchlist) {
                var newWatchlist = [];
                for (var i = 0; i < callwatchlist.length; i++) {
                    newWatchlist.push({
                        "_id" : callwatchlist[i]._id,
                        "idIMDB" : callwatchlist[i].idIMDB,
                        "title" : callwatchlist[i].title,
                        "userId" : callwatchlist[i].userId
                    });
                }
                if (newWatchlist.length == 0) {
                    $scope.watchlistIsEmpty = true;
                } else {
                    $scope.watchlistIsEmpty = false;
                }
                $scope.watchlist = newWatchlist;
            });
        } else {
            $location.url("/login");
        }

        $scope.linkBackToMovieDetail = function(idIMDB) {
            $rootScope.globalIdIMDB = idIMDB;
            $location.url("/moviedetail");
        }

        $scope.deleteWatchlistById = function deleteWatchlistById(index) {
            WatchlistService.deleteWatchlistById($scope.watchlist[index]._id).then(function(watchlist) {
                $scope.watchlist.splice(index, 1);
                if ($scope.watchlist.length == 0) {
                    $scope.watchlistIsEmpty = true;
                }
            });
        }

        $scope.addWatchlistToOrder = function(movie) {
            if (movie != null){
                var newOrder = {
                    "idIMDB" : movie.idIMDB,
                    "title" : movie.title,
                    "price": Math.floor(Math.random() * 10) + 1,
                    "userId" : curUser._id
                };
                OrderService.createOrderForUser(newOrder).then(function(callorder) {
                    $location.url("/order");
                });
            }
        }
    }
})();