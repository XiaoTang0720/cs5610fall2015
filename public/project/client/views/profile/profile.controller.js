(function() {
    angular
        .module("MovieJourney")
        .controller("ProfileController", ProfileController)

	function ProfileController($scope, UserService, MovieService, $rootScope, $location) {
        $scope.$location = $location;
        var curUser = $rootScope.user;
        if (!curUser) {
            $location.url("/login");
        }
        $scope.updateuser = curUser;
        $scope.update = function(updateuser) {
            UserService.updateUser(curUser._id, updateuser).then(function(user){
                $rootScope.user = user;
                $rootScope.userName = user.username;
                $scope.updateuser = user;
                var userInComment = {
                    userId: curUser._id,
                    firstname: updateuser.firstname,
                    lastname: updateuser.lastname,
                    email: updateuser.email
                };
                MovieService.updateCommentByUserId(userInComment).then(function(comment){
                    // do nothing.
                });
                alert("Update user profile successfully!");
                $location.url("/movie");
            })
        }
    }
})();