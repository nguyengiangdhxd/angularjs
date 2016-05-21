app.controller('headerCtrl', function ($document, $scope, $modal, $filter, Header) {
  
    $scope.title = $document[0].title;
  $scope.windowTitle = angular.element(window.document)[0].title;
  Header.get('header').then(function(data){
        var dm,dm3,dm4;
        $scope.headerDM = data.data;
        $scope.camera=data.data[0];
        dm=data.data[0];
    	$scope.cap1=dm['danh_muc_con'];
    
    var tg="";
    var dm2=dm['danh_muc_con'];
    $scope.cap2=dm2['danh_muc_con'];
    
    	tg+='<div class="inpannel">';
          tg+='<div class="panhead">';
            tg+='<div class="container">';
              tg+='<p class="inbread"><span>'+dm['ten_danh_muc']+'</span></p>';
              tg+='<p class="closeit">';
                tg+='<a class="btn-slide" href="javascript:void(0);">';
                  tg+='<img src="./libs/icn-close.gif" width="9" height="9" alt="Đóng">';
                tg+='</a>';
              tg+='</p>';
            tg+='</div>';
          tg+='</div>';
          	if(dm2.length>0){
          		tg+='<div class="parrays">';
            	tg+='<ul>  ';  
        	}
        for(var i=0;i<dm2.length;i++){
              dm3=dm2[i]['danh_muc_con'];

              tg+='<li>';
                tg+='<div class="parbase">';
                  if(dm3.length>0)
                    tg+='<a href="#/view-'+dm2[i]['id_danh_muc']+'/'+dm2[i]['tieu_de_khong_dau']+'" title="'+dm2[i]['ten_danh_muc']+'">';
                  else
                    tg+='<a class="support" href="#/view-'+dm2[i]['id_danh_muc']+'/'+dm2[i]['tieu_de_khong_dau']+'" title="'+dm2[i]['ten_danh_muc']+'">';
                    
                    tg+='<span class="img-element">';
                      tg+='<img height="92px" title="'+dm2[i]['tieu_de']+'" alt="" src="images/'+dm2[i]['anh']+'">';
                    tg+='</span>';
                    tg+='<span class="catname">'+dm2[i]['ten_danh_muc']+'</span>';
                  tg+='</a>';
                tg+='</div>';
                
                
                if(dm3.length>0)
                	tg+='<ul>';
                for(var j=0;j<dm3.length;j++){
                  dm4=dm3[j]['danh_muc_con'];
                  tg+='<li>';
                    tg+='<div class="parbase">';
                      if(dm4.length>0)
                        tg+='<a href="#/view-'+dm3[j]['id_danh_muc']+'/'+dm3[j]['tieu_de_khong_dau']+'" title="'+dm3[j]['ten_danh_muc']+'">';
                      else
                        tg+='<a class="support" href="#/view-'+dm3[j]['id_danh_muc']+'/'+dm3[j]['tieu_de_khong_dau']+'" title="'+dm3[j]['ten_danh_muc']+'">';
                        
                        tg+='<span class="img-element">';
                          tg+='<img height="92px" title="'+dm3[j]['ten_danh_muc']+'" alt="" data-type="delay-load" src="images/'+dm3[j]['anh']+'" data-src="'+dm3[j]['anh']+'">';
                        tg+='</span>';
                       tg+=' <span class="catname">'+dm3[j]['ten_danh_muc']+'</span>';
                      tg+='</a>';
                    tg+='</div>';
                    
                    if(dm4.length>0)
                    	tg+='<ul>';
                    
                    for(var k=0;k<dm4.length;k++){
                      tg+='<li>';
                        tg+='<div class="parbase">';
                          tg+='<a href="#/view-'+dm4[k]['id_danh_muc']+'/'+dm4[k]['tieu_de_khong_dau']+'" title="'+dm4[k]['ten_danh_muc']+'">';
                            tg+='<span class="img-element">';
                              tg+='<img height="92px" title="'+dm4[k]['ten_danh_muc']+'" alt="" data-type="delay-load" src="images/'+dm4[k]['anh']+'" data-src="'+dm4[k]['anh']+'">';
                            tg+='</span>';
                            tg+='<span class="catname">'+dm4[k]['ten_danh_muc']+'</span>';
                          tg+='</a>';
                        tg+='</div> ';            
                      tg+='</li> ';   
    				}
                    if(dm4.length>0)
                    	tg+='</ul>';
                  tg+='</li>'; 
                }                    
                                       
                if(dm3.length>0)
                	tg+='</ul>';
              tg+='</li> ';
        }                    
       		if(dm2.length>0){
       			tg+='</ul>';
         	 	tg+='</div>';
         	}
          
        tg+='</div>';
    
        $scope.headerHTML=tg;
        $scope.hhhh="gdgdgd";
    });
});