(function()
{
    angular
        .module("MovieJourney")
        .controller("FooterController", FooterController);

	function FooterController($scope, $location)
	{
		$scope.$location = $location;
	}
})();