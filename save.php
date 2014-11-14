<?php

if(isset($_POST['html'])) {
    $html = $_POST['html'];
    $width = $_POST['width'];
    $height = $_POST['height'];
    
    $tempname = md5(rand());
    chmod("tmp/", 0777);
    $tempHTML = 'tmp/' . $tempname . '.html';
    //$tempPNG = 'tmp/' . $tempname . '.png';
    file_put_contents($tempHTML,$html);

    $png = 'http://api.phantomjscloud.com/single/browser/v1/664746476ad374f19647c2627b4b42d6b4a72dfe/?targetUrl=http://secret-base.herokuapp.com/tmp/' . $tempHTML . '&loadImages=true&resourceUrlBlacklist=[]&viewportSize={"width":' . $width . ',"height":' . $height . ',+"zoomFactor":1.0+}&clipRectangle={+top:+0,+left:+0,+width:+' . $width . ',+height:+' . $height . '+}&requestType=png';


    //exec('phantomjs --progress save.js $tempHTML $tempPNG $width $height',$output,$error);
    //echo $error;
    
    
    header('Content-type: image/png');
    header('Content-Disposition: attachment; filename="base.png"');
    echo file_get_contents($png);
    
}

?>
