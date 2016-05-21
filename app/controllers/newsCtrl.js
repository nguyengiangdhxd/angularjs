app.controller('newsCtrl', function ($rootScope, $scope,$sce, $document, $modal, $filter, Danhmuc, Tinbai, $route, $routeParams) {
    $scope.routeParams = $routeParams;
    
    var id_danh_muc=$routeParams.id_danh_muc;
    Danhmuc.get('danhmuc/'+id_danh_muc).then(function(data){
        $scope.danhmuc_news = data.data;
    });

    Tinbai.get('tinbai/danhmuc/'+id_danh_muc).then(function(data){
        $scope.tinbai_news = data.data;
        tin=data.data;
        $scope.tong_news=tin.length;
        $scope.chi_tiet=$sce.trustAsHtml(data.data[0].chi_tiet);
        
    });

    
});

app.controller('news_idCtrl', function ($rootScope, $scope,$sce, $document, $modal, $filter, Danhmuc, Tinbai, $route, $routeParams) {
    $scope.routeParams = $routeParams;
    
    var id_tin_bai=$routeParams.id_tin_bai;
    
    Tinbai.get('tinbai/news/'+id_tin_bai).then(function(data){
        $scope.tinbai_news = data.data;
        $scope.tong_news=1;
        $scope.chi_tiet=$sce.trustAsHtml(data.data[0].chi_tiet);
        
    });

    
});

