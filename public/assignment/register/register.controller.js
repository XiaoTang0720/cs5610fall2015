(function()
{
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController) 

	function RegisterController($scope, UserService, $rootScope, $location)
    {
        $scope.register = function () {
            UserService.createUser($scope.user, function(newUser){
                    $rootScope.user = newUser;
             })
        $location.url("/profile");
        }
    }
})();