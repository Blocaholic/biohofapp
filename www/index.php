<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">
  <meta name="theme-color"
        content="#52a230">
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
<nav class="mainNav__nav">
    <ul class="mainNav__ul">
      <li class="mainNav__li">
        <span class="hidden">Dokumentation</span>
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke-width="1.5"
             stroke="currentColor"
             class="mainNav__svg">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      </li>
      <li class="mainNav__li">
      <span class="hidden">Auswertungen</span>
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke-width="1.5"
             stroke="currentColor"
             class="mainNav__svg">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      </li>
      <li class="mainNav__li">
      <span class="hidden">Einstellungen</span>
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke-width="1.5"
             stroke="currentColor"
             class="mainNav__svg">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
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
    $result .= '<section id="' . pathinfo($file, PATHINFO_FILENAME) . '">'
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