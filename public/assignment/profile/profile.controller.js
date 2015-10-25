(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController) 

	function ProfileController($scope, UserService, $rootScope, $location)
    {
        $scope.$location = $location;
        var curUser = $rootScope.user;
        UserService.findAllUsers(function(users) {
            console.log(users);
        })
        $scope.update = function () {
            UserService.updateUser(curUser.userid, $scope.user, function(user){
                $rootScope.user = user;
            })
        }
    }
})();