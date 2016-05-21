app.controller('homeCtrl', function ($document, $scope, $modal, $filter, SlideRun) {
    SlideRun.get('slide').then(function(data){
        $scope.slides = data.data;
        var sl=data.data;
        var tg="";
        for(var i=0;i < sl.length;i++){
          tg+='<div class="div_slide">';
            tg+='<div class="slide_seemore">';
              tg+='<a href="#/view-'+sl[i]['id_danh_muc']+'/'+sl[i]["tieu_de"]+'">';
                tg+='<span>Tìm hiểu thêm</span>';
              tg+='</a>';
            tg+='</div>';
            tg+='<a href="#/view-'+sl[i]['id_danh_muc']+'/'+sl[i]["tieu_de"]+'">';
            tg+='<img width="1200px" height="470px" src="images/'+sl[i]['anh']+'"  alt="'+sl[i]["tieu_de"]+'" /></a>';
            
          tg+='</div>';
          
        }
        
        $scope.slide_runHTML=tg;
    });
             

});

