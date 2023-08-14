<?php

class User {
  public static function add($email) {

    require_once __DIR__ . '/Database.php';

    if (empty($email)) {
      return '{"status": "error", "message": "\'email\' is required."}';
    }

    try {
      $pdo = Database::connect();
      $query = "INSERT INTO unconfirmed_users (email) VALUES(:email);";
      $data = ["email" => $email];
      $statement = $pdo->prepare($query);
      $statement->execute($data);
      $userid = $pdo->lastInsertId();
      $pdo = null;
      return '{"status": "success", "userid": "' . $userid . '"}';
    } catch (Exception $e) {
      if (str_starts_with(
        $e->getMessage(),
        "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry"
      )) {
        return '{"status": "error", "message": "E-Mail ist bereits vergeben."}';
      }
      return '{"status": "error", "message": "' . $e->getMessage() . '"}';
    };

  }

  public static function confirm($userid) {

    require_once __DIR__ . '/Database.php';

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

  public static function confirmed($userid) {

    require_once __DIR__ . '/Database.php';

    $pdo = Database::connect();
    $query = "SELECT COUNT(*) FROM users WHERE userid = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$userid]);
    $number_of_rows = $statement->fetchColumn();

    return ($number_of_rows > 0);

  }
}
