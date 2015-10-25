(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

	function ProfileController($scope, UserService, $rootScope, $location) {
        $scope.$location = $location;
        var curUser = $rootScope.user;
        $scope.update = function(updateuser) {
            console.log("update user: " + updateuser);
            UserService.updateUser(curUser.userid, $scope.updateuser, function(user){
                $rootScope.user = user;
            })
        }
    }
})();