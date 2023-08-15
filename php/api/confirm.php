<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
try {

  require_once __DIR__ . '/../Device.php';
  require_once __DIR__ . '/../User.php';

  $deviceid = $_GET['deviceid'];
  $confirmationpassword = $_GET['confirmationpassword'];

  $device = Device::confirm(
    $deviceid,
    $confirmationpassword
  );
  $userid = $device['userid'];

  User::confirmed($userid) || User::confirm($userid) || throw new Exception(
    'Fehler beim Aktualisieren der Datenbank.'
  );

  header("Location: https://biohofapp.de/index.php?page=confirm&status=success&userid=" . $userid);
  die();

} catch (Exception $e) {
  header("Location: https://biohofapp.de/index.php?page=confirm&status=error&message=" . urlencode($e->getMessage()));
  die();
}
