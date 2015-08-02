function viewItemsController($scope, $rootScope, $routeParams, app_service)
{
	$scope.products = [];
	$scope.page = 10;

 	$scope.buyProduct = function(product) {
    	window.open(product.clickUrl, '_blank', 'location=yes');
	};

	$scope.getDefaultItems = function(){
		$scope.showLoading = true;
		app_service.getDefaultItems().then(function (data) {
			$scope.products = data;
			$scope.showLoading = false;
		}, function (err) {
			window.console.log(err);
		});
	};

	 $scope.getCache = function(functionName){
        
        var retrievedObject = localStorage.getItem(functionName);

        if (typeof retrievedObject === 'string' || typeof retrievedObject == undefined){
          return JSON.parse(retrievedObject);
        } else{
         	return false;
        }
    };


    $scope.setCache = function(functionName,data){
      localStorage.setItem(functionName, JSON.stringify(data));
    };

	$scope.search = function(search){
		$scope.showLoading = true;
        $scope.page = 10;
        $scope.searchStr = search;
        $scope.category = $scope.searchStr.replace("_"," ");
		var products = $scope.getCache(search);
			
		if (products !== false){
			$scope.products = products;
			$scope.showLoading = false;
		} else{
			$scope.completeSearch(search);
		}
	};

	$scope.completeSearch = function(search){
		app_service.search(search).then(function (data) {
			$scope.products = data;
			$scope.setCache(search, data);
			$scope.showLoading = false;
		}, function (err) {
			window.console.log(err);
		});
	};

	$scope.paginate = function(){
        $scope.showLoading = true;
        $scope.page = $scope.page + 20;
        var post = "search=" + $scope.searchStr;
        post += "&offset=" + $scope.page;

        app_service.paginate(post).then(function (data) {
        	$scope.showLoading = false;
            $scope.completePaginate(data);
        }, function (err) {
            window.console.log(err);
        });
    }

    $scope.completePaginate = function(data) {
    	for (var i = 0; i < data.length; i++) {
			$scope.products.push(data[i]);
		}
    };

    $scope.init = (function ()
    {
		var searchTerm = $routeParams.search;
		$scope.search(searchTerm);
		$scope.title = searchTerm;
    })();
}