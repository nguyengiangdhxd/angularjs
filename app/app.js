var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate','ngSanitize']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Envie - Camera',
      templateUrl: 'views/home.html',
      controller: 'homeCtrl'
    })
    .when('/view-:id_danh_muc/:tieu_de_khong_dau', {
      title: 'Envie - Camera',
      templateUrl: 'views/view.html',
      controller: 'viewCtrl'
    })
    .when('/search-:id_danh_muc/:searchParam', {
      title: 'Envie - Camera',
      templateUrl: 'views/view.html',
      controller: 'searchCtrl'
    })
    .when('/news-:id_danh_muc/:tieu_de_khong_dau', {
      title: 'Envie - Camera',
      templateUrl: 'views/news.html',
      controller: 'newsCtrl'
    })
    .when('/new-:id_tin_bai/:tieu_de_khong_dau', {
      title: 'Envie - Camera',
      templateUrl: 'views/news.html',
      controller: 'news_idCtrl'
    })
    .when('/admin/danhmuc', {
      title: 'Envie - Camera',
      templateUrl: 'views/admin/danhmuc.html',
      controller: 'danhmucCtrl'
    })
    .when('/admin/tinbai', {
      title: 'Envie - Camera',
      templateUrl: 'views/admin/tinbai.html',
      controller: 'tinbai_adminCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);

app.run(['$rootScope', '$route', '$routeParams', function($rootScope,$routeParams,$route) {
    
    $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
      $rootScope.title = currentRoute.title;
    });
}]);

app.controller('logoCtrl', function ($scope, Logo, $route, $routeParams) {
    Logo.get('logo').then(function(data){
        $scope.logo = data.data;
    });
    
});
    