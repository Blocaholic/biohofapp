<?php

class Database {

  private static function connect() {
    require_once __DIR__ . '/Config.php';

    $pdo = new PDO(
      "mysql:dbname=" . Config::$dbname . ";host=" . Config::$dbhost,
      Config::$dbuser,
      Config::$dbpassword
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $pdo;
  }

  public static function get_device($deviceid) {

    $pdo = self::connect();

    $query = "SELECT * FROM devices WHERE deviceid = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$deviceid]);
    $number_of_devices = $statement->rowCount();

    if ($number_of_devices < 1) {return null;}

    $device = $statement->fetch(PDO::FETCH_ASSOC);

    $pdo = null;
    return $device;
  }

  public static function get_user($userid) {

    $pdo = self::connect();

    $query = "SELECT * FROM users WHERE userid = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$userid]);
    $number_of_users = $statement->rowCount();

    if ($number_of_users < 1) {return null;}

    $user = $statement->fetch(PDO::FETCH_ASSOC);

    $pdo = null;
    return $user;
  }

  public static function get_userid($email) {

    $pdo = self::connect();
    $query = "SELECT userid FROM users WHERE email = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$email]);
    $number_of_users = $statement->rowCount();

    if ($number_of_users < 1) {return null;}

    $user = $statement->fetch(PDO::FETCH_ASSOC);

    $pdo = null;
    return $user['userid'];
  }

  public static function add_device(
    $userid,
    $devicename,
    $devicehash,
    $confirmationhash
  ) {

    $pdo = self::connect();
    $query = "INSERT INTO devices (
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
    $data = [
      "userid" => $userid,
      "devicehash" => $devicehash,
      "devicename" => $devicename,
      "confirmationhash" => $confirmationhash,
    ];
    $statement = $pdo->prepare($query);
    $statement->execute($data);
    $deviceid = $pdo->lastInsertId() ?: throw new Exception(
      "Failed to create deviceid."
    );

    $pdo = null;
    return (int) $deviceid;
  }

  public static function add_user($email) {

    $pdo = self::connect();
    $query = "INSERT INTO users (email) VALUES(?);";
    $statement = $pdo->prepare($query);
    $statement->execute([$email]);
    $userid = $pdo->lastInsertId() ?: throw new Exception(
      "Failed to create userid."
    );

    $pdo = null;
    return (int) $userid;
  }

  public static function confirm_device($deviceid) {

    $pdo = self::connect();
    $query = "UPDATE devices SET confirmed = now() WHERE deviceid = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$deviceid]);
    $updated_rows = $statement->rowCount();

    if ($updated_rows < 1) {throw new Exception("No device affected.");}
    if ($updated_rows > 1) {throw new Exception("Multiple devices affected.");}

    return true;
  }

  public static function confirm_user($userid) {

    $pdo = self::connect();
    $query = "UPDATE users SET confirmed = now() WHERE userid = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$userid]);
    $updated_rows = $statement->rowCount();

    if ($updated_rows < 1) {throw new Exception("No user affected.");}
    if ($updated_rows > 1) {throw new Exception("Multiple users affected.");}

    return true;
  }

}
