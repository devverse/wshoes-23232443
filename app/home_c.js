function homeController($scope, $rootScope, app_service)
{
	$scope.menu = [];

	$scope.getMenu = function(){
		app_service.getMenu().then(function (data) {
			data.sort($scope.SortBy('name', false, function(a){return a.toUpperCase()}))
			data = $scope.appendMenuImages(data);
			$scope.menu = data;
		}, function (err) {
			window.console.log(err);
		});
	};

	$scope.appendMenuImages = function (data){

		for (var i = 0; i < data.length; i++) {
			data[i].menuImage = i + "w.jpg";
		}

		return data;
	};

	$scope.SortBy = function(field, reverse, primer){

	   var key = primer ? 
	       function(x) {return primer(x[field])} : 
	       function(x) {return x[field]};

	   reverse = !reverse ? 1 : -1;

	   return function (a, b) {
	       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	     } 
	}

    $scope.init = (function ()
    {
    	$scope.getMenu();
    })();
}