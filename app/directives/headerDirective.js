app.directive('slideDirective', function() {
    return {
        restrict: 'E',
        templateUrl: "views/slide_home.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            $scope.slides=[
                    {name:"duan",abc:"dd"},
                    {name:"duan2",abc:"dd2"},
                    {name:"duan3",abc:"dd3"}
                ];
        }]
    }
});

app.directive('headerDirective', function() {
    return {
        restrict: 'E',
        templateUrl: "views/common/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here :)
            $scope.slides=[
                    {name:"duan",abc:"dd"},
                    {name:"duan2",abc:"dd2"},
                    {name:"duan3",abc:"dd3"}
                ];
        }]
    }
});