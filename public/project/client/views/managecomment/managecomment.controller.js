(function() {
    angular
        .module("MovieJourney")
        .controller("ManageCommentController", ManageCommentController)

    function ManageCommentController($scope, MovieService, $rootScope, $location) {
        $scope.$location = $location;
        var curUser = $rootScope.user;
        if (curUser != null && curUser.isAdmin) {
            MovieService.findAllCommentsForAdmin().then(function(callComments) {
                $scope.comments = callComments;
            });
        } else {
            $location.url("/home");
        }

        $scope.deleteComment = function deleteComment(index) {
            MovieService.deleteCommentById($scope.comments[index]._id).then(function(callComments) {
                $scope.comments.splice(index, 1);
            });
        }
    }
})();