<?php
try {

  require_once __DIR__ . '/../User.php';
  require_once __DIR__ . '/../Device.php';
  require_once __DIR__ . '/../Utils.php';

  header('Content-Type: application/json');

  $userid = User::add($_POST['email']);
  $confirmationpassword = Utils::randomString(32);
  $devicename = $_POST['devicename'];
  $devicepassword = $_POST['password'];

  $deviceid = Device::add(
    $userid,
    $devicename,
    $devicepassword,
    $confirmationpassword
  );

  send_confirmation_mail(
    $_POST['email'],
    $deviceid,
    $devicename,
    $confirmationpassword
  );

  echo '{"status": "success", "userid": "' . $userid . '", "deviceid": "' . $deviceid . '"}';

} catch (Exception $e) {
  if (str_starts_with(
    $e->getMessage(),
    "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry"
  )) {
    echo '{"status": "error", "message": "E-Mail ist bereits vergeben."}';
  }
  echo '{"status": "error", "message": "' . $e->getMessage() . '"}';
};

function send_confirmation_mail(
  $email,
  $deviceid,
  $devicename,
  $confirmationpassword
) {
  $title = 'Bitte bestätige die Registrierung';
  $content = '<h1>Ein Neues Gerät wurde registriert</h1>';
  $content .= '<p>Geräte-ID: ' . $deviceid . '</p>';
  $content .= '<p>Geräte-Name: ' . $devicename . '</p>';
  $content .= '<p>E-Mail-Adresse: ' . $email . '</p>';
  $content .= '<p><a href="https://biohofapp.de/api/confirm.php?deviceid=' . $deviceid . '&confirmationpassword=' . $confirmationpassword . '">Bestätigen</a></p>';
  $header_array[] = 'MIME-Version: 1.0';
  $header_array[] = 'Content-type: text/html; charset=utf-8';
  $header_array[] = 'From: BiohofApp.de <kontakt@biohofapp.de>';
  $header = implode("\r\n", $header_array);
  $mailSent = mail($email, $title, $content, $header);
  $mailSent || throw new Exception('Bestätigungsmail konnte nicht versand werden.');
  return true;
}
