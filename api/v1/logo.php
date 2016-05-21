<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';
include_once 'common.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();


$app->get('/logo', function() { 
	global $db;
	$tg=$db->lookup("logo","anh","tinh_trang=1");
	global $app;
    $app->status(200);
    $app->contentType('application/json');
	//echo json_encode($tg,JSON_NUMERIC_CHECK);
	echo $tg;
});
$app->run();
?>