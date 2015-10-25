(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController) 

	function LoginController($scope, UserService, $rootScope, $location)
    {
        UserService.findAllUsers(function(users){
            console.log(users);
        })
        $scope.$location = $location;
        $scope.login = function () {
            UserService.findUserByUsernameAndPassWord($scope.user.username, $scope.user.password, function(user){
                if (user != null) {
                    $rootScope.user = user;
                    $location.url("/profile");
                    
                }
            })
        }
    }
})();