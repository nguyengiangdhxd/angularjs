app.controller('tinbai_adminCtrl', function ($document, $scope, $modal, $filter, Danhmuc, Tinbai) {
    $scope.tinbai_new = {};
    $scope.tk={"s_id_danh_muc":""};
    $scope.title = $document[0].title;
  $scope.windowTitle = angular.element(window.document)[0].title;

    Danhmuc.get('danhmuc/tinbai').then(function(data){
        $scope.danhmuc = data.data;
    });
    
    Tinbai.get('tinbai').then(function(data){
        $scope.tinbai = data.data;
    });
    
    
    
 $scope.columns = [
                    {text:"Tên bài",predicate:"ten_bai",sortable:true},
                    {text:"Tiêu đề",predicate:"tieu_de",sortable:true},
                    {text:"Danh mục",predicate:"ten_danh_muc",sortable:true},
                    {text:"Tình trạng",predicate:"tinh_trang",sortable:true},
                    {text:"Ảnh",predicate:"anh_nho",reverse:true,sortable:false},
                    
                ];

    $scope.open = function (p,danhmuc,size) {
        var modalInstance = $modal.open({
          templateUrl: 'views/admin/tinbaiEdit.html',
          controller: 'tinbaiEditCtrl',
          size: 'lg',
          resolve: {
            item: function () {
              return p;
            },
            item2: function () {
              return danhmuc;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.tinbai.push(selectedObject);
                $scope.tinbai = $filter('orderBy')($scope.tinbai, 'id_tin_bai', 'reverse');
            }else if(selectedObject.save == "update"){
                p.id_danh_muc = selectedObject.id_danh_muc;
                p.ten_danh_muc = selectedObject.ten_danh_muc;
                p.tinh_trang = selectedObject.tinh_trang;
                p.anh_slide=selectedObject.anh_slide;
                p.tieu_de=selectedObject.tieu_de;
                p.ten_tinh_trang=selectedObject.ten_tinh_trang;
                p.ten_bai=selectedObject.ten_bai;

            }
        });
    };

});

app.controller('tibaiCtrl', function ($document, $scope, $modal, $filter, Danhmuc, Tinbai) {
    $scope.danhmuc_new = {};
    $scope.title = $document[0].title;
  $scope.windowTitle = angular.element(window.document)[0].title;

    Danhmuc.get('danhmuc/tinbai').then(function(data){
        $scope.danhmuc = data.data;
    });
    
    Tinbai.get('tinbai').then(function(data){
        $scope.tinbai = data.data;
    });
    
    
    
 $scope.columns = [
                    {text:"Tên danh mục",predicate:"ten_danh_muc",sortable:true},
                    {text:"Tiêu đề",predicate:"tieu_de",sortable:true},
                    {text:"Danh mục cha",predicate:"danh_muc_cha",sortable:true},
                    {text:"Tình trạng",predicate:"tinh_trang",sortable:true},
                    {text:"Ảnh",predicate:"anh",reverse:true,sortable:false},
                    
                ];

});


app.controller('tinbaiEditCtrl', function ($scope, $modalInstance, item, item2, Danhmuc, Tinbai) {

  $scope.tinbai = angular.copy(item);
  $scope.danhmuc = angular.copy(item2);
        
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id_tin_bai > 0) ? 'Cập nhật tin bài' : 'Add tin bài';
        $scope.buttonText = (item.id_tin_bai > 0) ? 'Sửa tin bài' : 'Thêm tin bài';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.tinbai);
        }
        $scope.saveTinbai = function (tinbai) {
            //danhmuc.uid = $scope.uid;
            if(tinbai.id_tin_bai > 0){
                
                Tinbai.put('tinbai/'+tinbai.id_tin_bai, tinbai).then(function (result) {
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
                Tinbai.post('tinbai', tinbai).then(function (result) {
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
