<?php

ini_set('max_execution_time',600);

if(isset($_POST['html'])) {
    $html = $_POST['html'];
    $width = $_POST['width'];
    $height = $_POST['height'];
    
    $tempname = md5(rand());
    //chmod("tmp/", 0777);
    $tempHTML = 'tmp/' . $tempname . '.html';
    $tempPNG = 'tmp/' . $tempname . '.png';
    file_put_contents('file.html',$html);


    //exec('phantomjs --progress save.js $tempHTML $tempPNG $width $height',$output,$error);
    //echo $error;
    
    
    //header('Content-type: image/png');
    //header('Content-Disposition: attachment; filename="base.png"');
    //echo file_get_contents($tempPNG);
    
}

?>
