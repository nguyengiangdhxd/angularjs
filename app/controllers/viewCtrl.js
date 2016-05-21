app.controller('viewCtrl', function ($rootScope, $scope,$sce, $document, $modal, $filter, Danhmuc, Tinbai, $route, $routeParams) {
    $scope.routeParams = $routeParams;
    
    var id_danh_muc=$routeParams.id_danh_muc;
    Danhmuc.get('danhmuc/'+id_danh_muc).then(function(data){
        $scope.danhmuc_view = data.data;
        $scope.danhmuc_cung=data.data.danh_muc_cung_cap;
    });

    Tinbai.get('tinbai/danhmuc/'+id_danh_muc).then(function(data){
        $scope.tinbai_view = data.data;
        $scope.tong_view = data.data;
        $scope.so_luong=data.data.length;
    });

    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'views/view_chi_tiet.html',
          controller: 'view_chi_tietCtrl',
          size: 'lg',
          resolve: {
            item: function () {
              return p;
            }
          }
        });

        modalInstance.result.then(function() {
            
        });
    };

    $scope.hien_thi_chi_tiet=0;

    $scope.showChitiet = function (p){
      $scope.hien_thi_chi_tiet=1;
      $scope.chi_tiet_tin=$sce.trustAsHtml(p.chi_tiet);

    }

    $scope.cancel = function (){
      $scope.hien_thi_chi_tiet=0;
      
    }
});

app.controller('view_chi_tietCtrl', function ($scope,$sce, $modalInstance, item, Tinbai) {

  $scope.tinbai_view = angular.copy(item);
  $scope.chi_tiet_tin=$sce.trustAsHtml(item.chi_tiet);
  $scope.tong_quan=$sce.trustAsHtml(item.tong_quan);
  $scope.ho_tro=$sce.trustAsHtml(item.ho_tro);
  $scope.mau1="#eb1818";
  $scope.mau2="#666";
  $scope.mau3="#666";
  $scope.mau4="#666";

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        
        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.tinbai);
        }
        $scope.tab_show=1;
        $scope.selectTab = function(gia_tri){
          $scope.tab_show=gia_tri;
          if(gia_tri==1){
            $scope.mau1="#eb1818";
            $scope.mau2="#666";
            $scope.mau3="#666";
            $scope.mau4="#666";
          }else
          if(gia_tri==2){
            $scope.mau2="#eb1818";
            $scope.mau1="#666";
            $scope.mau3="#666";
            $scope.mau4="#666";
          }else
          if(gia_tri==3){
            $scope.mau3="#eb1818";
            $scope.mau2="#666";
            $scope.mau1="#666";
            $scope.mau4="#666";
          }else
          if(gia_tri==4){
            $scope.mau4="#eb1818";
            $scope.mau2="#666";
            $scope.mau3="#666";
            $scope.mau1="#666";
          }
        }
        
});