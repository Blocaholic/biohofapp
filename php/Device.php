<?php
class Device {
  public static function add(
    $userid,
    $devicename,
    $devicepassword,
    $confirmationpassword
  ) {

    require_once __DIR__ . '/Database.php';

    if (empty($userid)) {
      return '{"status": "error", "message": "Add device: no \'userid\'."}';
    }

    if (empty($devicepassword)) {
      return '{"status": "error", "message": "Add device: no \'devicepassword\'."}';
    }

    if (empty($confirmationpassword)) {
      return '{"status": "error", "message": "Add device: no \'confirmationpassword\'."}';
    }

    if (strlen($devicepassword) !== 32) {
      return '{"status": "error", "message": "Add device: \'devicepassword\' must be 32 characters."}';
    }

    if (strlen($confirmationpassword) !== 32) {
      return '{"status": "error", "message": "Add device: \'confirmationpassword\' must be 32 characters."}';
    }

    $devicehash = password_hash($devicepassword, PASSWORD_DEFAULT);
    $confirmationhash = password_hash($confirmationpassword, PASSWORD_DEFAULT);

    try {
      $pdo = Database::connect();
      $query = "INSERT INTO unconfirmed_devices (
        userid,
        devicehash,
        devicename,
        confirmationhash
      ) VALUES(
        :userid,
        :devicehash,
        :devicename,
        :confirmationhash
      );";
      $data = ["userid" => $userid, "devicehash" => $devicehash, "devicename" => $devicename, "confirmationhash" => $confirmationhash];
      $statement = $pdo->prepare($query);
      $statement->execute($data);
      $deviceid = $pdo->lastInsertId();
      $pdo = null;
      return '{"status": "success", "deviceid": "' . $deviceid . '"}';
    } catch (Exception $e) {
      return '{"status": "error", "message": "' . $e->getMessage() . '"}';
    };

  }

  public static function confirm($deviceid, $confirmationpassword) {}
}
