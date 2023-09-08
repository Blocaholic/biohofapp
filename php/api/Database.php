<?php

class Database {

  public static function connect() {
    require_once __DIR__ . '/Config.php';

    $pdo = new PDO(
      "mysql:dbname=" . Config::$dbname . ";host=" . Config::$dbhost,
      Config::$dbuser,
      Config::$dbpassword
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $pdo;
  }

  public static function confirm_device($deviceid) {

    $pdo = self::connect();
    $query = "UPDATE devices SET confirmed = now() WHERE deviceid = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$deviceid]);
    $updated_rows = $statement->rowCount();
    if ($updated_rows < 1) {http_response_exit(500, [
      "message" => "Could not update device in the database.",
      "deviceid" => $deviceid,
    ]);}
    if ($updated_rows > 1) {http_response_exit(500, [
      "message" => "Implausible number of devices affected in the database.",
      "deviceid" => $deviceid,
    ]);}

    return true;
  }

  public static function confirm_user($userid) {

    $pdo = self::connect();
    $query = "UPDATE users SET confirmed = now() WHERE userid = ? AND confirmed IS NULL;";
    $statement = $pdo->prepare($query);
    $statement->execute([$userid]);
    $updated_rows = $statement->rowCount();

    if ($updated_rows > 1) {http_response_exit(500, [
      "message" => "Implausible number of users affected in the database.",
      "userid" => $userid,
    ]);}

    return true;
  }

}
