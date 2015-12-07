(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

	function HeaderController($scope, $rootScope, $location) {
		$scope.$location = $location;
        $rootScope.userName = "Sign in";
        var curUser = $rootScope.user;
        if (curUser) {
            $rootScope.userName = curUser.username;
        }
	}
})();