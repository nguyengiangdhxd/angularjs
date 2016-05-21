<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';
include_once 'common.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();


$app->get('/tinbai', function() { 
    global $db;
    //$rows = $db->select("danh_muc","id_danh_muc,ten_danh_muc,tieu_de,anh,tinh_trang,danh_muc_cha",array());
    $rows = $db->query("select * from tin_bai where tinh_trang=1");
    $mang=array();
    if($rows["status"]=="success"){
        
        $m=$rows["data"];
        for($i=0;$i<count($m);$i++){
            $ten_dm=$db->lookup("danh_muc","ten_danh_muc","id_danh_muc='".$m[$i]["id_danh_muc"]."'");
            $tt=$m[$i]["tinh_trang"];
            if($tt=="1")
                $ten_tinh_trang="Enable";
            else
                $ten_tinh_trang="Disable";
            
            $tieu_de=$m[$i]["tieu_de"];
            $tieu_de_khong_dau=bo_dau_tieng_viet($tieu_de);
            $tieu_de_khong_dau=str_replace(" ", "-", $tieu_de_khong_dau);

            $mang[]=array('id_tin_bai'=>$m[$i]["id_tin_bai"], 
                'id_danh_muc'=>$m[$i]["id_danh_muc"], 
                'ten_bai'=>$m[$i]["ten_bai"], 
                'ma_bai'=>$m[$i]["ma_bai"], 
                'trich_yeu'=>$m[$i]["trich_yeu"], 
                'chi_tiet'=>$m[$i]["chi_tiet"], 
                'tong_quan'=>$m[$i]["tong_quan"],
                'ho_tro'=>$m[$i]["ho_tro"],
                'anh_slide'=>$m[$i]["anh_slide"], 
                'anh_lon'=>$m[$i]["anh_lon"], 
                'anh_nho'=>$m[$i]["anh_nho"], 
                'tinh_trang'=>$m[$i]["tinh_trang"], 
                'run_slide'=>$m[$i]["run_slide"], 
                'tieu_de'=>$m[$i]["tieu_de"], 
                'tieu_de_khong_dau'=>$tieu_de_khong_dau,
                'ngay_cap_nhat'=>$m[$i]["ngay_cap_nhat"], 
                'khuyen_mai'=>$m[$i]["khuyen_mai"], 
                'hang_moi'=>$m[$i]["hang_moi"], 
                'so_luong'=>$m[$i]["so_luong"], 
                'gia_thanh'=>$m[$i]["gia_thanh"], 
                'tinh_nang'=>$m[$i]["tinh_nang"],
                'ten_danh_muc'=>$ten_dm,
                'ten_tinh_trang'=>$ten_tinh_trang
            );
        }
    }
    $tg=array();
    $tg["data"]=$mang;
    echoResponse(200, $tg);
});

$app->post('/tinbai', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array();
    global $db;

    $them = $db->insert("tin_bai", $data, $mandatory);
    $rows = $db->query("select * from tin_bai where id_tin_bai=".$them['data']);
    $mang=array();
    if($rows["status"]=="success"){
        
        $m=$rows["data"];
        for($i=0;$i<count($m);$i++){
            $ten_dm=$db->lookup("danh_muc","ten_danh_muc","id_danh_muc='".$m[$i]["id_danh_muc"]."'");
            $tt=$m[$i]["tinh_trang"];
            if($tt=="1")
                $ten_tinh_trang="Enable";
            else
                $ten_tinh_trang="Disable";
            
            $mang=array('id_tin_bai'=>$m[$i]["id_tin_bai"], 
                'id_danh_muc'=>$m[$i]["id_danh_muc"], 
                'ten_bai'=>$m[$i]["ten_bai"], 
                'ma_bai'=>$m[$i]["ma_bai"], 
                'trich_yeu'=>$m[$i]["trich_yeu"], 
                'chi_tiet'=>$m[$i]["chi_tiet"], 
                'tong_quan'=>$m[$i]["tong_quan"], 
                'ho_tro'=>$m[$i]["ho_tro"], 
                'anh_slide'=>$m[$i]["anh_slide"], 
                'anh_lon'=>$m[$i]["anh_lon"], 
                'anh_nho'=>$m[$i]["anh_nho"], 
                'tinh_trang'=>$m[$i]["tinh_trang"], 
                'run_slide'=>$m[$i]["run_slide"], 
                'tieu_de'=>$m[$i]["tieu_de"], 
                'ngay_cap_nhat'=>$m[$i]["ngay_cap_nhat"], 
                'khuyen_mai'=>$m[$i]["khuyen_mai"], 
                'hang_moi'=>$m[$i]["hang_moi"], 
                'so_luong'=>$m[$i]["so_luong"], 
                'gia_thanh'=>$m[$i]["gia_thanh"], 
                'tinh_nang'=>$m[$i]["tinh_nang"],
                'ten_danh_muc'=>$ten_dm,
                'vi_tri'=>$m[$i]["vi_tri"],
                'menu_trai'=>$m[$i]["menu_trai"],
                'anh_menu_trai'=>$m[$i]["anh_menu_trai"]
            );
        }
    }
    $tg=array();
    $tg["data"]=$mang;
    echoResponse(200, $tg);
});

$app->put('/tinbai/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id_tin_bai'=>$id);
    $mandatory = array();
    global $db;
    $mang=array('id_danh_muc' => $data->id_danh_muc,
        'tieu_de'=>$data->tieu_de,
        'ten_bai'=>$data->ten_bai,
        'tinh_trang'=>$data->tinh_trang,
        'anh_lon'=>$data->anh_lon,
        'chi_tiet'=>$data->chi_tiet );
    
    $rows = $db->update("tin_bai", $mang, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "danhmuc information updated successfully.";
    
    $rows = $db->query("select * from tin_bai where id_tin_bai=".$id);
    $mang=array();
    if($rows["status"]=="success"){
        
        $m=$rows["data"];
        for($i=0;$i<count($m);$i++){
            $ten_dm=$db->lookup("danh_muc","ten_danh_muc","id_danh_muc='".$m[$i]["id_danh_muc"]."'");
            $tt=$m[$i]["tinh_trang"];
            if($tt=="1")
                $ten_tinh_trang="Enable";
            else
                $ten_tinh_trang="Disable";
            
            $mang=array('id_tin_bai'=>$m[$i]["id_tin_bai"], 
                'id_danh_muc'=>$m[$i]["id_danh_muc"], 
                'ten_bai'=>$m[$i]["ten_bai"], 
                'ma_bai'=>$m[$i]["ma_bai"], 
                'trich_yeu'=>$m[$i]["trich_yeu"], 
                'chi_tiet'=>$m[$i]["chi_tiet"], 
                'tong_quan'=>$m[$i]["tong_quan"],
                'ho_tro'=>$m[$i]["ho_tro"],
                'anh_slide'=>$m[$i]["anh_slide"], 
                'anh_lon'=>$m[$i]["anh_lon"], 
                'anh_nho'=>$m[$i]["anh_nho"], 
                'tinh_trang'=>$m[$i]["tinh_trang"], 
                'run_slide'=>$m[$i]["run_slide"], 
                'tieu_de'=>$m[$i]["tieu_de"], 
                'ngay_cap_nhat'=>$m[$i]["ngay_cap_nhat"], 
                'khuyen_mai'=>$m[$i]["khuyen_mai"], 
                'hang_moi'=>$m[$i]["hang_moi"], 
                'so_luong'=>$m[$i]["so_luong"], 
                'gia_thanh'=>$m[$i]["gia_thanh"], 
                'tinh_nang'=>$m[$i]["tinh_nang"],
                'ten_danh_muc'=>$ten_dm,
                'ten_tinh_trang'=>$ten_tinh_trang
            );
        }
    }
    $tg=array();
    $tg["data"]=$mang;
    echoResponse(200, $tg);
});

$app->get('/tinbai/danhmuc/:id_danh_muc', function($id_danh_muc) { 
    global $db;
    //$rows = $db->select("danh_muc","id_danh_muc,ten_danh_muc,tieu_de,anh,tinh_trang,danh_muc_cha",array());
    //liet ket danh muc con chau
    $ds_dm=get_danh_muc_con($id_danh_muc);
    $rows = $db->query("select * from tin_bai where tinh_trang=1 and id_danh_muc in (".$ds_dm.")");
    $mang=array();
    if($rows["status"]=="success"){
        
        $m=$rows["data"];
        for($i=0;$i<count($m);$i++){
            $ten_dm=$db->lookup("danh_muc","ten_danh_muc","id_danh_muc='".$m[$i]["id_danh_muc"]."'");
            $tt=$m[$i]["tinh_trang"];
            if($tt=="1")
                $ten_tinh_trang="Enable";
            else
                $ten_tinh_trang="Disable";
            
            $tieu_de=$m[$i]["tieu_de"];
            $tieu_de_khong_dau=bo_dau_tieng_viet($tieu_de);
            $tieu_de_khong_dau=str_replace(" ", "-", $tieu_de_khong_dau);

            $mang[]=array('id_tin_bai'=>$m[$i]["id_tin_bai"], 
                'id_danh_muc'=>$m[$i]["id_danh_muc"], 
                'ten_bai'=>$m[$i]["ten_bai"], 
                'ma_bai'=>$m[$i]["ma_bai"], 
                'trich_yeu'=>$m[$i]["trich_yeu"], 
                'chi_tiet'=>$m[$i]["chi_tiet"], 
                'tong_quan'=>$m[$i]["tong_quan"],
                'ho_tro'=>$m[$i]["ho_tro"],
                'anh_slide'=>$m[$i]["anh_slide"], 
                'anh_lon'=>$m[$i]["anh_lon"], 
                'anh_nho'=>$m[$i]["anh_nho"], 
                'tinh_trang'=>$m[$i]["tinh_trang"], 
                'run_slide'=>$m[$i]["run_slide"], 
                'tieu_de'=>$m[$i]["tieu_de"], 
                'tieu_de_khong_dau'=>$tieu_de_khong_dau,
                'ngay_cap_nhat'=>$m[$i]["ngay_cap_nhat"], 
                'khuyen_mai'=>$m[$i]["khuyen_mai"], 
                'hang_moi'=>$m[$i]["hang_moi"], 
                'so_luong'=>$m[$i]["so_luong"], 
                'gia_thanh'=>$m[$i]["gia_thanh"], 
                'tinh_nang'=>$m[$i]["tinh_nang"],
                'ten_danh_muc'=>$ten_dm,
                'ten_tinh_trang'=>$ten_tinh_trang
            );
        }
    }
    $tg=array();
    $tg["data"]=$mang;
    echoResponse(200, $tg);
});

$app->get('/tinbai/news/:id_tin_bai', function($id_tin_bai) { 
    global $db;
    //$rows = $db->select("danh_muc","id_danh_muc,ten_danh_muc,tieu_de,anh,tinh_trang,danh_muc_cha",array());
    //liet ket danh muc con chau
    
    $rows = $db->query("select * from tin_bai where tinh_trang=1 and id_tin_bai=".$id_tin_bai);
    $mang=array();
    if($rows["status"]=="success"){
        
        $m=$rows["data"];
        for($i=0;$i<count($m);$i++){
            $ten_dm=$db->lookup("danh_muc","ten_danh_muc","id_danh_muc='".$m[$i]["id_danh_muc"]."'");
            $tt=$m[$i]["tinh_trang"];
            if($tt=="1")
                $ten_tinh_trang="Enable";
            else
                $ten_tinh_trang="Disable";
            
            $tieu_de=$m[$i]["tieu_de"];
            $tieu_de_khong_dau=bo_dau_tieng_viet($tieu_de);
            $tieu_de_khong_dau=str_replace(" ", "-", $tieu_de_khong_dau);

            $mang[]=array('id_tin_bai'=>$m[$i]["id_tin_bai"], 
                'id_danh_muc'=>$m[$i]["id_danh_muc"], 
                'ten_bai'=>$m[$i]["ten_bai"], 
                'ma_bai'=>$m[$i]["ma_bai"], 
                'trich_yeu'=>$m[$i]["trich_yeu"], 
                'chi_tiet'=>$m[$i]["chi_tiet"], 
                'tong_quan'=>$m[$i]["tong_quan"],
                'ho_tro'=>$m[$i]["ho_tro"],
                'anh_slide'=>$m[$i]["anh_slide"], 
                'anh_lon'=>$m[$i]["anh_lon"], 
                'anh_nho'=>$m[$i]["anh_nho"], 
                'tinh_trang'=>$m[$i]["tinh_trang"], 
                'run_slide'=>$m[$i]["run_slide"], 
                'tieu_de'=>$m[$i]["tieu_de"], 
                'tieu_de_khong_dau'=>$tieu_de_khong_dau, 
                'ngay_cap_nhat'=>$m[$i]["ngay_cap_nhat"], 
                'khuyen_mai'=>$m[$i]["khuyen_mai"], 
                'hang_moi'=>$m[$i]["hang_moi"], 
                'so_luong'=>$m[$i]["so_luong"], 
                'gia_thanh'=>$m[$i]["gia_thanh"], 
                'tinh_nang'=>$m[$i]["tinh_nang"],
                'ten_danh_muc'=>$ten_dm,
                'ten_tinh_trang'=>$ten_tinh_trang
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
function get_danh_muc_con($id_danh_muc){
    global $db;
    $ds=$id_danh_muc;
    $kq=$id_danh_muc;
    
    while ($ds<>"") {
        $tg=$ds;
        $ds="";
        $rows=$db->query("select id_danh_muc from danh_muc where danh_muc_cha in (".$tg.")");
        if($rows["status"]=="success"){
        
            $m=$rows["data"];
            
            for($i=0;$i<count($m);$i++){
                if($ds<>"") $ds.=",";
                $ds.=$m[$i]["id_danh_muc"];
                if($kq<>"") $kq.=",";
                $kq.=$m[$i]["id_danh_muc"];
            }
            
        }
    }
    
    return $kq;
}

$app->run();
?>