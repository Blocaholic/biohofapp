<?php
class Device {

  public static function confirm($deviceid, $confirmationpassword) {

    require_once __DIR__ . '/Database.php';

    $pdo = Database::connect();

    $get_query = "SELECT * FROM unconfirmed_devices WHERE deviceid = ? LIMIT 1;";
    $get_statement = $pdo->prepare($get_query);
    $get_statement->execute([$deviceid]);
    $unconfirmed_device = $get_statement->fetch(PDO::FETCH_ASSOC);

    $unconfirmed_device['userid'] || throw new Exception();

    password_verify(
      $confirmationpassword,
      $unconfirmed_device['confirmationhash']
    ) || throw new Exception('confirmation error');

    $device = [
      "deviceid" => $deviceid,
      "userid" => $unconfirmed_device['userid'],
      "devicehash" => $unconfirmed_device['devicehash'],
      "devicename" => $unconfirmed_device['devicename'],
    ];

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
    $set_statement = $pdo->prepare($set_query);
    $set_statement->execute($device);

    $delete_query = "DELETE FROM unconfirmed_devices WHERE deviceid = ?;";
    $delete_statement = $pdo->prepare($delete_query);
    $delete_statement->execute([$deviceid]);

    $pdo = null;
    return $device;

  }

  public static function unconfirmed($deviceid) {

    require_once __DIR__ . '/Database.php';

    $pdo = Database::connect();
    $query = "SELECT COUNT(*) FROM unconfirmed_devices WHERE deviceid = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$deviceid]);
    $number_of_rows = $statement->fetchColumn();

    return ($number_of_rows > 0);

  }
}
