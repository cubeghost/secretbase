<?php

if(isset($_POST['html'])) {
    $html = $_POST['html'];
    $write = file_put_contents('file.html', $html);
    if($write === false) {
        die('There was an error writing this file');
    }
    else {
        echo "$write bytes written to file";
    }
}
else {
   die('no post data to process');
}

?>
