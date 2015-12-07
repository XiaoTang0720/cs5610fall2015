(function() {
    angular
        .module("MovieJourney")
        .controller("MovieController", MovieController);

	function MovieController($scope, $rootScope, $location, $http, MovieService) {
		$scope.$location = $location;
        $scope.pageIsLoading = true;
        // search by ranking is really tooooo slow, I keep the json locally to make the first loading page faster.
        // But we do support dynamiclly search by title, etc.
        $scope.searchByTitleSucceed = false;
        $scope.searchByAuthorSucceed = false;
        $scope.searchReturnNoResults = false;
        MovieService.findInitialRankings().then(function(rankings){
            $scope.movies = rankings;
        });
        $scope.nothingChoosed = true;
        $scope.pageIsLoading = false;

        $scope.searchMovieByTitle = function(inputTitle) {
            if (inputTitle) {
                $scope.pageIsLoading = true;
                MovieService.searchMovieByTitle(inputTitle).then(function(movies){
                    if (movies && movies.length > 0) {
                        $scope.nothingChoosed = false;
                        $scope.searchByTitleSucceed = true;
                        $scope.searchReturnNoResults = false;
                        $scope.searchByAuthorSucceed = false;
                        $scope.moviesByTitle = movies;
                        $scope.pageIsLoading = false;
                    } else {
                        $scope.searchByTitleSucceed = false;
                        $scope.searchReturnNoResults = true;
                        $scope.nothingChoosed = true;
                        $scope.searchByAuthorSucceed = false;
                        MovieService.findInitialRankings().then(function(rankings){
                            $scope.movies = rankings;
                        });
                        $scope.pageIsLoading = false;
                    }
                });
            } else {
                $scope.searchByTitleSucceed = false;
                $scope.searchReturnNoResults = true;
                $scope.nothingChoosed = true;
                $scope.searchByAuthorSucceed = false;
                MovieService.findInitialRankings().then(function(rankings){
                    $scope.movies = rankings;
                });
            }
        }

        $scope.searchMovieByActor = function(inputActor) {
            if (inputActor) {
                $scope.pageIsLoading = true;
                MovieService.searchMovieByActor(inputActor).then(function(actors){
                    if (actors && actors.length > 0) {
                        $scope.searchByAuthorSucceed = true;
                        $scope.nothingChoosed = false;
                        $scope.searchByTitleSucceed = false;
                        $scope.searchReturnNoResults = false;
                        $scope.authors = actors;
                        $scope.pageIsLoading = false;
                    } else {
                        $scope.searchByAuthorSucceed = false;
                        $scope.searchByTitleSucceed = false;
                        $scope.searchReturnNoResults = true;
                        $scope.nothingChoosed = true;
                        MovieService.findInitialRankings().then(function(rankings){
                            $scope.movies = rankings;
                        });
                        $scope.pageIsLoading = false;
                    }
                });
            } else {
                $scope.searchByAuthorSucceed = false;
                $scope.searchByTitleSucceed = false;
                $scope.searchReturnNoResults = true;
                $scope.nothingChoosed = true;
                MovieService.findInitialRankings().then(function(rankings){
                    $scope.movies = rankings;
                });
            }
        }

        $scope.goToMoveDetail = function(idIMDB) {
            $rootScope.globalIdIMDB = idIMDB;
            $location.url("/moviedetail");
        }
	}
})();
