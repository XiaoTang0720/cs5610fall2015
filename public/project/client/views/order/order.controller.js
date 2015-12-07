(function() {
    angular
        .module("MovieJourney")
        .controller("OrderController", OrderController)

    function OrderController($scope, OrderService, $rootScope, $location) {
        $scope.$location = $location;
        var curUser = $rootScope.user;
        if (curUser != null) {
            OrderService.findAllOrdersForUser(curUser._id).then(function(callorder) {
                var newOrder = [];
                for (var i = 0; i < callorder.length; i++) {
                    newOrder.push({
                        "_id" : callorder[i]._id,
                        "idIMDB" : callorder[i].idIMDB,
                        "title" : callorder[i].title,
                        "price": callorder[i].price,
                        "userId" : callorder[i].userId
                    });
                }
                if (newOrder.length == 0) {
                    $scope.orderIsEmpty = true;
                } else {
                    $scope.orderIsEmpty = false;
                }
                $scope.order = newOrder;
            });
        } else {
            $location.url("/login");
        }

        $scope.linkBackToMovieDetail = function(idIMDB) {
            $rootScope.globalIdIMDB = idIMDB;
            $location.url("/moviedetail");
        }

        $scope.deleteOrderById = function deleteOrderById(index) {
            OrderService.deleteOrderById($scope.order[index]._id).then(function(order) {
                $scope.order.splice(index, 1);
                if ($scope.order.length == 0) {
                    $scope.orderIsEmpty = true;
                }
            });
        }

        $scope.cleanAllOrderForUser = function cleanAllOrderForUser() {
            OrderService.cleanOrdersForUser(curUser._id).then(function(callorder) {
                $scope.order = [];
                $scope.orderIsEmpty = true;
            });
        };
    }
})();