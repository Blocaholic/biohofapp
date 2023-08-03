<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">
  <meta name="theme-color"
        content="#52a130">
  <title>Biohof App</title>
  <style>
    @font-face {
      font-family: 'Inter';
      src: url('./Inter-VariableFont_slnt\,wght.ttf');
    }
  </style>
  <link rel="stylesheet"
        href="./style.css">
  <link rel="icon"
        href="./icon.svg"
        type="image/svg+xml">
  <link rel="manifest"
        href="./manifest.webmanifest">
</head>
<body>
  <nav></nav>
  <main>
    <?php
      
      ini_set('display_errors', 1);
      ini_set('display_startup_errors', 1);
      error_reporting(E_ALL);

      function files_in_directory($dir) {
        return array_diff(scandir($dir), ['.', '..']);
      }

      function wrap_content_of($files) {
        $result = '';
        foreach($files as $file) {
          $result .= '<section id="'.pathinfo($file, PATHINFO_FILENAME).'">'
            . file_get_contents( './templates/main/'.$file)
            .'</section>';
        }
        return $result;
      }

      echo wrap_content_of(files_in_directory('./templates/main'));

    ?>
  </main>
  <script type="module"
          src="app.mjs"></script>
</body>
</html>