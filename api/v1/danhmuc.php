<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();


$app->get('/danhmuc', function() { 
    global $db;
    //$rows = $db->select("danh_muc","id_danh_muc,ten_danh_muc,tieu_de,anh,tinh_trang,danh_muc_cha",array());
    $rows = $db->query("select * from danh_muc where tinh_trang=1");
    $mang=array();
    if($rows["status"]=="success"){
        $k=0;
        $m=$rows["data"];
        for($i=0;$i<count($m);$i++){
            $id_dm=$m[$i]["id_danh_muc"];
            $ten_dm=$m[$i]["ten_danh_muc"];
            $vi_tri=$m[$i]["vi_tri"];
            $anh=$m[$i]["anh"];
            $dm_cha=$m[$i]["danh_muc_cha"];
            $ten_dm_cha=$db->lookup("danh_muc","ten_danh_muc","id_danh_muc='".$dm_cha."'");
            $tt=$m[$i]["tinh_trang"];
            if($tt=="1")
                $ten_tinh_trang="Enable";
            else
                $ten_tinh_trang="Disable";
            $tieu_de=$m[$i]["tieu_de"];
            $dm_con=array("danh_muc_cha"=>$dm_cha,"id_danh_muc"=>$id_dm,"ten_danh_muc"=>$ten_dm,"anh"=>$anh,"vi_tri"=>$vi_tri,"danh_muc_con"=>"");

            $mang[]=array("tieu_de"=>$tieu_de, 
                "ten_danh_muc_cha"=>$ten_dm_cha, 
                "tinh_trang"=>$tt,
                "ten_tinh_trang"=>$ten_tinh_trang, 
                "danh_muc_cha"=>$dm_cha,"id_danh_muc"=>$id_dm,"ten_danh_muc"=>$ten_dm,"anh"=>$anh,"vi_tri"=>$vi_tri,"danh_muc_con"=>$dm_con);
        }
    }
    $tg=array();
    $tg["data"]=$mang;
    echoResponse(200, $tg);
});

$app->post('/danhmuc', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array();
    global $db;
    $them = $db->insert("danh_muc", $data, $mandatory);
    if($them["status"]=="success")
        $them["message"] = "danhmuc added successfully.";
    //echoResponse(200, $rows);
    $rows = $db->query("select * from danh_muc where id_danh_muc=".$them['data']);
    $mang=array();
    if($rows["status"]=="success"){
        $k=0;
        $m=$rows["data"];
        for($i=0;$i<count($m);$i++){
            $id_dm=$m[$i]["id_danh_muc"];
            $ten_dm=$m[$i]["ten_danh_muc"];
            $vi_tri=$m[$i]["vi_tri"];
            $anh=$m[$i]["anh"];
            $dm_cha=$m[$i]["danh_muc_cha"];
            $ten_dm_cha=$db->lookup("danh_muc","ten_danh_muc","id_danh_muc='".$dm_cha."'");
            $tt=$m[$i]["tinh_trang"];
            if($tt=="1")
                $ten_tinh_trang="Enable";
            else
                $ten_tinh_trang="Disable";
            $tieu_de=$m[$i]["tieu_de"];
            $dm_con=array("danh_muc_cha"=>$dm_cha,"id_danh_muc"=>$id_dm,"ten_danh_muc"=>$ten_dm,"anh"=>$anh,"vi_tri"=>$vi_tri,"danh_muc_con"=>"");

            $mang=array("tieu_de"=>$tieu_de, "ten_danh_muc_cha"=>$ten_dm_cha, "tinh_trang"=>$tt,"ten_tinh_trang"=>$ten_tinh_trang, "danh_muc_cha"=>$dm_cha,"id_danh_muc"=>$id_dm,"ten_danh_muc"=>$ten_dm,"anh"=>$anh,"vi_tri"=>$vi_tri,"danh_muc_con"=>$dm_con);
        }
    }
    $tg=array();
    $tg["data"]=$mang;
    echoResponse(200, $tg);
});

$app->put('/danhmuc/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id_danh_muc'=>$id);
    $mandatory = array();
    global $db;
    $mang=array('ten_danh_muc' => $data->ten_danh_muc,
        'danh_muc_cha'=>$data->danh_muc_cha,
        'tinh_trang'=>$data->tinh_trang,
        'anh'=>$data->anh,
        'tieu_de'=>$data->tieu_de,'vi_tri'=>$data->vi_tri );
    
    $rows = $db->update("danh_muc", $mang, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "danhmuc information updated successfully.";
    
    $rows = $db->query("select * from danh_muc where id_danh_muc=".$id);
    $mang=array();
    if($rows["status"]=="success"){
        $k=0;
        $m=$rows["data"];
        for($i=0;$i<count($m);$i++){
            $id_dm=$m[$i]["id_danh_muc"];
            $ten_dm=$m[$i]["ten_danh_muc"];
            $vi_tri=$m[$i]["vi_tri"];
            $anh=$m[$i]["anh"];
            $dm_cha=$m[$i]["danh_muc_cha"];
            $ten_dm_cha=$db->lookup("danh_muc","ten_danh_muc","id_danh_muc='".$dm_cha."'");
            $tt=$m[$i]["tinh_trang"];
            if($tt=="1")
                $ten_tinh_trang="Enable";
            else
                $ten_tinh_trang="Disable";
            $tieu_de=$m[$i]["tieu_de"];
            $dm_con=array("danh_muc_cha"=>$dm_cha,"id_danh_muc"=>$id_dm,"ten_danh_muc"=>$ten_dm,"anh"=>$anh,"vi_tri"=>$vi_tri,"danh_muc_con"=>"");

            $mang=array("tieu_de"=>$tieu_de, "ten_danh_muc_cha"=>$ten_dm_cha, "tinh_trang"=>$tt,"ten_tinh_trang"=>$ten_tinh_trang, "danh_muc_cha"=>$dm_cha,"id_danh_muc"=>$id_dm,"ten_danh_muc"=>$ten_dm,"anh"=>$anh,"vi_tri"=>$vi_tri,"danh_muc_con"=>$dm_con);
        }
    }
    $tg=array();
    $tg["data"]=$mang;
    echoResponse(200, $tg);
});

$app->get('/danhmuc/tinbai', function() { 
    global $db;
    //$rows = $db->select("danh_muc","id_danh_muc,ten_danh_muc,tieu_de,anh,tinh_trang,danh_muc_cha",array());
    $rows = $db->query("select * from danh_muc where id_danh_muc not in (select danh_muc_cha from danh_muc where danh_muc_cha is not null and danh_muc_cha<>0)");
    
    echoResponse(200, $rows);
});

$app->get('/danhmuc/:id_danh_muc', function($id_danh_muc) { 
    global $db;
    //$rows = $db->select("danh_muc","id_danh_muc,ten_danh_muc,tieu_de,anh,tinh_trang,danh_muc_cha",array());
    $rows = $db->query("select * from danh_muc where id_danh_muc =".$id_danh_muc);
    $mang=array();
    if($rows["status"]=="success"){
        $k=0;
        $m=$rows["data"];
        for($i=0;$i<count($m);$i++){
            $id_dm=$m[$i]["id_danh_muc"];
            $ten_dm=$m[$i]["ten_danh_muc"];
            $vi_tri=$m[$i]["vi_tri"];
            $anh=$m[$i]["anh"];
            $dm_cha=$m[$i]["danh_muc_cha"];
            $ten_dm_cha=$db->lookup("danh_muc","ten_danh_muc","id_danh_muc='".$dm_cha."'");
            
            $tt=$m[$i]["tinh_trang"];
            if($tt=="1")
                $ten_tinh_trang="Enable";
            else
                $ten_tinh_trang="Disable";
            $tieu_de=$m[$i]["tieu_de"];
            ////////////cung cap
            $r=$db->query("select * from danh_muc where danh_muc_cha <>0 and danh_muc_cha=".$dm_cha." and id_danh_muc <>".$id_danh_muc);
            $mang_cung=array();
            if($rows["status"]=="success"){
                $cung=$r["data"];
                for($j=0;$j<count($cung);$j++){
                    $id_dm_cung=$cung[$j]["id_danh_muc"];
                    $ten_dm_cung=$cung[$j]["ten_danh_muc"];
                    $tieu_de_cung=$cung[$j]["tieu_de"];
                    $mang_cung[]=array("id_danh_muc"=>$id_dm_cung,"ten_danh_muc"=>$ten_dm_cung,"tieu_de"=>$tieu_de);
                }
            }
            $mang=array("danh_muc_cung_cap"=>$mang_cung ,"tieu_de"=>$tieu_de, "ten_danh_muc_cha"=>$ten_dm_cha, "tinh_trang"=>$tt,"ten_tinh_trang"=>$ten_tinh_trang, "danh_muc_cha"=>$dm_cha,"id_danh_muc"=>$id_dm,"ten_danh_muc"=>$ten_dm,"anh"=>$anh,"vi_tri"=>$vi_tri);
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

$app->run();
?>