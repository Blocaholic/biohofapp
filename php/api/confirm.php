<?php

require_once __DIR__ . '/../Device.php';

$deviceid = $_GET['deviceid'];
$confirmationpassword = $_GET['confirmationpassword'];

$confirm_device_result = Device::confirm(
  $deviceid,
  $confirmationpassword
);

if ($confirm_device_result['status'] === 'error') {
  header("Location: https://biohofapp.de/index.php?page=confirm&status=error&message=" . urlencode($confirm_device_result['message']));
  die();
}

if (empty($confirm_device_result['userid'])) {
  header("Location: https://biohofapp.de/index.php?page=confirm&status=error&message=" . urlencode("\'userid\' nicht gefunden."));
  die();
}

$userid = $confirm_device_result['userid'];

header("Location: https://biohofapp.de/index.php?page=confirm&status=success&userid=" . $userid);
die();

//if (!User::confirmed($userid)) { User::confirm($userid);}
