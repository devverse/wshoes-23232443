var mobileApp = angular.module('mobileApp', []);

mobileApp.config(['$routeProvider', '$compileProvider',
  function($routeProvider, $compileProvider) {
    "use strict";

    $routeProvider.when('/', {
      templateUrl: appConfig.admin_url + 'partials/home.html',
      controller: homeController
    }).

    when('/view/:search', {
      templateUrl: appConfig.admin_url + 'partials/view.html',
      controller: viewItemsController
    })

    .otherwise({redirectTo:'/'});
  }
]);

mobileApp.config(['$httpProvider',
  function($httpProvider) {
    "use strict";
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }
]);
