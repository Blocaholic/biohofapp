<?php

require_once __DIR__ . '/Database.php';

class User {
  public static function verify($email, $deviceid, $devicepassword) {

    $pdo = Database::connect();
    $query = "SELECT * FROM devices WHERE deviceid = ? LIMIT 1;";
    $statement = $pdo->prepare($query);
    $statement->execute([$deviceid]);
    $row = $statement->fetch(PDO::FETCH_ASSOC);
    if (!password_verify($devicepassword, $row['devicehash'])) {
      $pdo = null;
      return false;
    }
    $userid = $row['userid'];
    $query2 = "SELECT * FROM users WHERE userid = ? LIMIT 1;";
    $statement2 = $pdo->prepare($query2);
    $statement2->execute([$userid]);
    $row = $statement2->fetch(PDO::FETCH_ASSOC);
    if ($row['email'] !== $email) {
      $pdo = null;
      return false;
    }

    $pdo = null;
    return true;
  }
}
