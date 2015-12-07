(function() {
    angular
        .module("MovieJourney")
        .controller("FriendController", FriendController)

    function FriendController($scope, UserService, $rootScope, $location) {
        $scope.$location = $location;
        $scope.followingIsEmpty = true;
        $scope.followedIsEmpty = true;
        var curUser = $rootScope.user;
        if (curUser != null) {
            UserService.findAllFollowingsForUser(curUser._id).then(function(callfriends) {
                var newFollowings = [];
                for (var i = 0; i < callfriends.length; i++) {
                    newFollowings.push({
                        "_id" : callfriends[i]._id,
                        "username" : callfriends[i].username,
                        "firstname" : callfriends[i].firstname,
                        "lastname": callfriends[i].lastname,
                    });
                }
                if (newFollowings.length == 0) {
                    $scope.followingIsEmpty = true;
                } else {
                    $scope.followingIsEmpty = false;
                }
                $scope.followings = newFollowings;
            });

            UserService.findAllFollowedsForUser(curUser._id).then(function(callfriends) {
                var newFolloweds = [];
                for (var i = 0; i < callfriends.length; i++) {
                    newFolloweds.push({
                        "_id" : callfriends[i]._id,
                        "username" : callfriends[i].username,
                        "firstname" : callfriends[i].firstname,
                        "lastname": callfriends[i].lastname,
                    });
                }
                if (newFolloweds.length == 0) {
                    $scope.followedIsEmpty = true;
                } else {
                    $scope.followedIsEmpty = false;
                }
                $scope.followeds = newFolloweds;
            });
        } else {
            $location.url("/login");
        }


        $scope.deleteFollowingById = function deleteFollowingById(index) {
            UserService.deleteFollowingById(curUser._id, $scope.followings[index]._id).then(function(friends) {
                $scope.followings.splice(index, 1);
                if ($scope.followings.length == 0) {
                    $scope.followingIsEmpty = true;
                }
            });
        }
    }
})();