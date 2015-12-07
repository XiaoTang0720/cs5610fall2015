(function() {
    angular
        .module("MovieJourney")
        .controller("LogoutController", LogoutController)

	function LogoutController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $rootScope.user = null;
        $rootScope.userName = "Sign in";
        $location.url("/home");
    }
})();