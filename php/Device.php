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
      ) VALUES (
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

  public static function confirm($deviceid, $confirmationpassword) {

    try {

      require_once __DIR__ . '/Database.php';

      $pdo = Database::connect();

      $get_query = "SELECT * FROM unconfirmed_devices WHERE deviceid = ? LIMIT 1;";
      $get_statement = $pdo->prepare($get_query);
      $get_statement->execute([$deviceid]);
      $unconfirmed_device = $get_statement->fetch(PDO::FETCH_ASSOC);

      if (!password_verify(
        $confirmationpassword,
        $unconfirmed_device['confirmationhash']
      )) {
        throw new Exception('confirmation error');
      }

      $set_query = "INSERT INTO devices (
          deviceid,
          userid,
          devicehash,
          devicename
        ) VALUES (
          :deviceid,
          :userid,
          :devicehash,
          :devicename
        );";
      $set_data = [
        "deviceid" => $deviceid,
        "userid" => $unconfirmed_device['userid'],
        "devicehash" => $unconfirmed_device['devicehash'],
        "devicename" => $unconfirmed_device['devicename'],
      ];
      $set_statement = $pdo->prepare($set_query);
      $set_statement->execute($set_data);

      $delete_query = "DELETE FROM unconfirmed_devices WHERE deviceid = ?;";
      $delete_statement = $pdo->prepare($delete_query);
      $delete_statement->execute([$deviceid]);

      $pdo = null;
      return ["status" => "success", "userid" => $unconfirmed_device['userid']];

    } catch (Exception $e) {

      return ["status" => "error", "message" => $e->getMessage()];

    }
  }
}
