<?php

require __DIR__ . '/vendor/autoload.php';

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

$phantomjscloud_api_key = getenv('PHANTOMJSCLOUD_API_KEY');

function outputImage($image) {
  header('Content-type: image/png');
  header('Content-Disposition: attachment; filename="secretbase.png"');
  echo $image;
}

function generateImage() {
  global $phantomjscloud_api_key;

  if(isset($_POST['html'])) {
    $html = $_POST['html'];
    $width = $_POST['width'];
    $height = $_POST['height'];

    $json = array(
      'url' => 'about:blank',
      'content' => $html,
      'renderType' => 'png',
      'renderSettings' => array(
        'clipRectangle' => array(
          'top' => 0,
          'left' => 0,
          'height' => $height,
          'width' => $width
        )
      )
    );

    $options = array(
      'http' => array(
          'header'  => "Content-type: application/json\r\n",
          'method'  => 'POST',
          'content' => json_encode($json)
      )
    );

    $url = "http://api.phantomjscloud.com/api/browser/v2/{$phantomjscloud_api_key}/";

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    if ($result === FALSE) { /* Handle error */ }

    outputImage($result);

  } else {
    echo 'Missing payload';
  }
}

function unauthorized() {
  http_response_code(401);
  echo 'Unauthorized';
}

if (!isset($_SERVER['HTTP_REFERER'])) {
  unauthorized();
} else {

  $referer = parse_url($_SERVER['HTTP_REFERER']);
  $host = $referer['host'];

  if ($host === 'localhost' || $host === 'bldwn.co') {
    generateImage();
  } else {
    unauthorized();
  }

}

?>
