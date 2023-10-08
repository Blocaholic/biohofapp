<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">
  <meta name="theme-color"
        content="#52a230">
  <title> </title>
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
  <div id="error" class="error" style="display:none;"></div>
  <nav class="mainNav__nav">
    <div class="mainNav__home" id="mainNav__home" tabindex="0">Biohof App
      <img src="./icon/reload.svg" alt="" class="mainNav__svg">
    </div>
    <ul class="mainNav__ul">
      <li class="mainNav__li link" data-target="documentation">
        <span class="hidden">Dokumentation</span>
        <img src="./icon/documentation.svg" alt="" class="mainNav__svg">
      </li>
      <li class="mainNav__li link" data-target="reports">
      <span class="hidden">Auswertungen</span>
        <img src="./icon/reports.svg" alt="" class="mainNav__svg">
      </li>
      <li class="mainNav__li link" data-target="planning">
      <span class="hidden">Planung</span>
        <img src="./icon/planning.svg" alt="" class="mainNav__svg">
      </li>
      <li class="mainNav__li link" data-target="settings">
      <span class="hidden">Einstellungen</span>
        <img src="./icon/settings.svg" alt="" class="mainNav__svg">
      </li>
    </ul>
  </nav>
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
  foreach ($files as $file) {
    $result .= '<section id="'
    . pathinfo($file, PATHINFO_FILENAME)
    . '" class="mainSection" style="display:none;">'
    . file_get_contents('./templates/main/' . $file)
      . '</section>';
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