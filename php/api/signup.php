<?php

require_once __DIR__ . '/../User.php';
require_once __DIR__ . '/../Device.php';
require_once __DIR__ . '/../Utils.php';

header('Content-Type: application/json');

$add_user_result = User::add($_POST['email']);
$add_user_result_array = json_decode($add_user_result, true);

if ($add_user_result_array['status'] !== 'success') {
  die($add_user_result);
}

if (empty($add_user_result_array['userid'])) {
  die('{"status": "error", "message": "Fehler beim Erstellen der \'userid\'."}');
}

$userid = $add_user_result_array['userid'];
$confirmationpassword = Utils::randomString(32);
$devicename = $_POST['devicename'];
$devicepassword = $_POST['password'];

$add_device_result = Device::add(
  $userid,
  $devicename,
  $devicepassword,
  $confirmationpassword
);
$add_device_result_array = json_decode($add_device_result, true);
$deviceid = $add_device_result_array['deviceid'];

if (!send_confirmation_mail($_POST['email'], $deviceid, $devicename, $confirmationpassword)) {
  die('{"status": "error", "message": "Bestätigungsmail konnte nicht versand werden."}');
}

echo '{"status": "success", "userid": "' . $userid . '", "deviceid": "' . $deviceid . '"}';

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
  $content .= '<p><a href="https://biohofapp.de/confirm.php?deviceid=' . $deviceid . '&confirmationpassword=' . $confirmationpassword . '">Bestätigen</a></p>';
  $header_array[] = 'MIME-Version: 1.0';
  $header_array[] = 'Content-type: text/html; charset=utf-8';
  $header_array[] = 'From: BiohofApp.de <kontakt@biohofapp.de>';
  $header = implode("\r\n", $header_array);
  $mailSent = mail($email, $title, $content, $header);
  return $mailSent;
}
