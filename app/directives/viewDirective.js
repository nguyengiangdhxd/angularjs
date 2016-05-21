app.directive('viewDirective', function() {
    return {
        restrict: 'E',
        templateUrl: "views/view.html",
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