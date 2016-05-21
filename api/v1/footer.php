<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';
include_once 'common.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();


$app->get('/footer', function() { 
	global $db;
	$rows = $db->query("select * from danhmuc_footer where tinh_trang=1 order by vi_tri");
    $mang=array();
    if($rows["status"]=="success"){
        
        $m=$rows["data"];
        
        for($i=0;$i<count($m);$i++){
            
            $id=$m[$i]["id"];
            
            $ten_danh_muc=$m[$i]["ten_danh_muc"];
            
            $r = $db->query("select * from tin_footer where tinh_trang=1 and id_danh_muc=".$id." order by vi_tri");
            $mang2=array();
            if($r["status"]=="success"){
                
                $m2=$r["data"];
                
                for($ii=0;$ii<count($m2);$ii++){
                    
                    $duong_dan=$m2[$ii]["duong_dan"];
                    if($duong_dan==null || $duong_dan=="null")
                        $duong_dan='';
                    $mang2[]=array('id'=>$m2[$ii]["id"], 
                        'ten_tin'=>$m2[$ii]["ten_tin"],
                        'duong_dan'=>$duong_dan,
                        'vi_tri'=>$m2[$ii]["vi_tri"]
                    );
                }
            }

            $mang[]=array('id'=>$m[$i]["id"], 
                'ten_danh_muc'=>$m[$i]["ten_danh_muc"], 
                'vi_tri'=>$m[$i]["vi_tri"],
                'mang_tin'=>$mang2
            );
        }
    }
    
    $tg=array();
    $tg["data"]=$mang;
    echoResponse(200, $tg);
});

$app->get('/footer/:id', function($id) { 
	global $db;
	$rows = $db->query("select * from tin_footer where tinh_trang=1 and id_danh_muc=".$id." order by vi_tri");
    $mang=array();
    if($rows["status"]=="success"){
        
        $m=$rows["data"];
        $n=count($m);
        if($n > 8) $n=8;
        for($i=0;$i<$n;$i++){
            
            
            $mang[]=array('id'=>$m[$i]["id"], 
                'ten_tin'=>$m[$i]["ten_tin"],
                'duong_dan'=>$m[$i]["duong_dan"],
                'vi_tri'=>$m[$i]["vi_tri"]
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


$app->run();

?>