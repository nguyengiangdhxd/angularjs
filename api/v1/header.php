<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';
include_once 'common.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();


$app->get('/header', function() { 
    global $db;
    $rows = $db->query("select * from danh_muc where tinh_trang=1 and (danh_muc_cha is null or danh_muc_cha=0) order by vi_tri");
    $mang=array();
    if($rows["status"]=="success"){
    	$k=0;
    	$m=$rows["data"];
    	for($i=0;$i<count($m);$i++){
    		$id_dm=$m[$i]["id_danh_muc"];
    		$ten_dm=$m[$i]["ten_danh_muc"];
    		$vi_tri=$m[$i]["vi_tri"];
            $anh=$m[$i]["anh"];
            $tieu_de=$m[$i]["tieu_de"];
            $tieu_de_khong_dau=bo_dau_tieng_viet($tieu_de);
            $tieu_de_khong_dau=str_replace(" ", "-", $tieu_de_khong_dau);
            $dm_cha=$m[$i]["danh_muc_cha"];
    		
            $dm_con=get_danh_muc_con($id_dm);
            $mang[]=array("da_cap"=>$m[$i]['da_cap'],
                "danh_muc_cha"=>$dm_cha,
                "id_danh_muc"=>$id_dm,
                "ten_danh_muc"=>$ten_dm,
                "anh"=>$anh,
                "vi_tri"=>$vi_tri,
                "tieu_de_khong_dau"=>$tieu_de_khong_dau,
                "tieu_de"=>$tieu_de,
                "danh_muc_con"=>$dm_con
            );
    	}
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

function get_danh_muc_con($id){
    global $db;
    $r=$db->query("select * from danh_muc where tinh_trang=1 and danh_muc_cha=".$id." order by vi_tri");
    $mang=array();
    if($r["status"]=="success"){
        $k=0;
        $m=$r["data"];
        for($i=0;$i<count($m);$i++){
            $id_dm=$m[$i]["id_danh_muc"];
            $ten_dm=$m[$i]["ten_danh_muc"];
            $vi_tri=$m[$i]["vi_tri"];
            $anh=$m[$i]["anh"];
            $tieu_de=$m[$i]["tieu_de"];
            $tieu_de_khong_dau=bo_dau_tieng_viet($tieu_de);
            $tieu_de_khong_dau=str_replace(" ", "-", $tieu_de_khong_dau);
            $dm_cha=$m[$i]["danh_muc_cha"];
            
            $dm_con=get_danh_muc_con($id_dm);
            $mang[]=array("da_cap"=>$m[$i]['da_cap'],
                "danh_muc_cha"=>$dm_cha,
                "id_danh_muc"=>$id_dm,
                "ten_danh_muc"=>$ten_dm,
                "anh"=>$anh,
                "vi_tri"=>$vi_tri,
                "tieu_de_khong_dau"=>$tieu_de_khong_dau,
                "tieu_de"=>$tieu_de,
                "danh_muc_con"=>$dm_con
            );
            
        }
        return $mang;
    }else
        return "";
    
}

$app->run();
?>