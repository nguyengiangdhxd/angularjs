<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';
include_once 'common.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();


$app->get('/slide', function() { 
    global $db;
    //$rows = $db->select("danh_muc","id_danh_muc,ten_danh_muc,tieu_de,anh,tinh_trang,danh_muc_cha",array());
    $rows = $db->query("select * from slide_run where tinh_trang=1 order by tinh_trang desc");
    $mang=array();
    if($rows["status"]=="success"){
        
        $m=$rows["data"];
        $n=count($m);
        if($n > 8) $n=8;
        for($i=0;$i<$n;$i++){
            
            $tt=$m[$i]["tinh_trang"];
            if($tt=="1")
                $ten_tinh_trang="Enable";
            else
                $ten_tinh_trang="Disable";
            
            $tieu_de=$m[$i]["tieu_de"];
            $tieu_de_khong_dau=bo_dau_tieng_viet($tieu_de);
            $tieu_de_khong_dau=str_replace(" ", "-", $tieu_de_khong_dau);

            $mang[]=array('id_slide'=>$m[$i]["id_slide"], 
                'id_danh_muc'=>$m[$i]["id_danh_muc"], 
                'anh'=>$m[$i]["anh"], 
                'tinh_trang'=>$m[$i]["tinh_trang"], 
                'tieu_de'=>$m[$i]["tieu_de"], 
                'tieu_de_khong_dau'=>$tieu_de_khong_dau,
                'duong_dan_web'=>$m[$i]["duong_dan_web"],
                'ten_tinh_trang'=>$ten_tinh_trang
            );
        }
    }
    $kt=count($mang);
    $n=0;
    $dem=$kt;
    while($kt < 8){
        $mang[]=$mang[$n];
        $kt++;
        $n++;
        if($n >= $dem)
            $n=0;
    }
    $tg=array();
    $tg["data"]=$mang;
    echoResponse(200, $tg);
});


function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}


$app->run();
?>