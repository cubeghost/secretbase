<?php

set_time_limit(0);

if (ob_get_level()==0) ob_start();
for ( $i = 0; $i < 450; $i++) {
    print($i."\n");
    ob_flush();
    flush();
    sleep(1);
    } 


if(isset($_POST['html'])) {
    $html = $_POST['html'];
    $width = $_POST['width'];
    $height = $_POST['height'];
    
    $tempname = md5(rand());
    //chmod("tmp/", 0777);
    $tempHTML = 'tmp/' . $tempname . '.html';
    $tempPNG = 'tmp/' . $tempname . '.png';
    file_put_contents($tempHTML,$html);


    exec('phantomjs save.js $tempHTML $tempPNG $width $height',$output,$error);
    
    
    header('Content-type: image/png');
    header('Content-Disposition: attachment; filename="base.png"');
    echo file_get_contents($tempPNG);
    
}

?>
