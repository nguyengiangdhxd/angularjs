app.controller('danhmucCtrl', function ($document, $scope, $modal, $filter, Danhmuc) {
    $scope.danhmuc_new = {};
    $scope.title = $document[0].title;
  $scope.windowTitle = angular.element(window.document)[0].title;

    Danhmuc.get('danhmuc').then(function(data){
        $scope.danhmuc = data.data;
    });
    
    
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'views/admin/danhmucEdit.html',
          controller: 'danhmucEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.danhmuc.push(selectedObject);
                $scope.danhmuc = $filter('orderBy')($scope.danhmuc, 'id_danh_muc', 'reverse');
            }else if(selectedObject.save == "update"){
                p.ten_danh_muc = selectedObject.ten_danh_muc;
                p.tinh_trang = selectedObject.tinh_trang;
                p.danh_muc_cha = selectedObject.danh_muc_cha;
                p.anh=selectedObject.anh;
                p.tieu_de=selectedObject.tieu_de;
                p.vi_tri=selectedObject.vi_tri;
                p.ten_danh_muc_cha=selectedObject.ten_danh_muc_cha;
                p.ten_tinh_trang=selectedObject.ten_tinh_trang;
            }
        });
    };
    
 $scope.columns = [
                    {text:"Tên danh mục",predicate:"ten_danh_muc",sortable:true},
                    {text:"Tiêu đề",predicate:"tieu_de",sortable:true},
                    {text:"Danh mục cha",predicate:"danh_muc_cha",sortable:true},
                    {text:"Tình trạng",predicate:"tinh_trang",sortable:true},
                    {text:"Ảnh",predicate:"anh",reverse:true,sortable:false},
                    
                ];

});


app.controller('danhmucEditCtrl', function ($scope, $modalInstance, item, Danhmuc) {

  $scope.danhmuc = angular.copy(item);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id_danh_muc > 0) ? 'Edit danh muc' : 'Add danh muc';
        $scope.buttonText = (item.id_danh_muc > 0) ? 'Sửa Danh mục' : 'Thêm Danh mục';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.danhmuc);
        }
        $scope.saveDanhmuc = function (danhmuc) {
            //danhmuc.uid = $scope.uid;
            if(danhmuc.id_danh_muc > 0){
                
                Danhmuc.put('danhmuc/'+danhmuc.id_danh_muc, danhmuc).then(function (result) {
                    if(result.status != 'error'){
                        var x = result.data;
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                //danhmuc.tinh_trang = 1;
                Danhmuc.post('danhmuc', danhmuc).then(function (result) {
                    if(result.status != 'error'){
                        //var x = angular.copy(danhmuc);
                        
                        var x = result.data;
                        x.save = 'insert';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});
