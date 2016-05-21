app.controller('footerCtrl', function ($rootScope, $scope,$sce, $document, $filter, Footer, $route, $routeParams) {
    
    Footer.get('footer').then(function(data){
        $scope.dm_footer = data.data;
        
    });

    
    
});


