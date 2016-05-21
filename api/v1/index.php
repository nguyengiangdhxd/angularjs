<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/
$app->get('/header3', function() { 
    global $db;
    $rows = $db->query("select id_danh_muc,ten_danh_muc,danh_muc_cha,vi_tri,tinh_trang from danh_muc where tinh_trang=1 and (danh_muc_cha is null or danh_muc_cha=0) order by vi_tri");
    $mang=array();
    
    if($rows["status"]=="success"){
        $k=0;
        $m=$rows["data"];
        for($i=0;$i<count($m);$i++){
            $id_dm=md5($m[$i]["id_danh_muc"]);
            $ten_dm=$m[$i]["ten_danh_muc"];
            $vi_tri=$m[$i]["vi_tri"];
            $dm_con='';

            $mang[]=array("id_danh_muc"=>$id_dm,"ten_danh_muc"=>$ten_dm,"vi_tri"=>$vi_tri,"danh_muc_con"=>$dm_con);
        }
    }
    $tg=array();
    $tg["data"]=$mang;
    echoResponse(200, $tg);
});
$app->get('/header2', function() { 
    global $db;
    $rows = $db->select("danh_muc","id_danh_muc,ten_danh_muc,danh_muc_cha,vi_tri,tinh_trang",array());
    echoResponse(200, $rows);
});


function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>