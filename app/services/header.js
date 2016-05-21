app.factory("Header", ['$http', '$location',
    function ($http, $q, $location) {

        var serviceBase = 'api/v1/';

        var obj = {};

        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        
        return obj;
}]);
