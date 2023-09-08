<?php

class Database {
  private static $dbhost = '127.0.0.1';
  private static $dbname = 'd03db2e1';
  private static $dbuser = 'd03db2e1';
  private static $dbpassword = 'MEkkrvrT2KeLhcg2rM5B';

  public static function connect() {

    $pdo = new PDO(
      "mysql:dbname=" . self::$dbname . ";host=" . self::$dbhost,
      self::$dbuser,
      self::$dbpassword
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
