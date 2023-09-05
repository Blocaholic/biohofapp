<?php

class Users {

  public static function add($email) {

    require_once __DIR__ . '/Database.php';

    $pdo = Database::connect();
    $query = "INSERT INTO users (email) VALUES(?);";
    $statement = $pdo->prepare($query);
    $statement->execute([$email]);
    $userid = $pdo->lastInsertId() ?: throw new Exception('Fehler beim Erstellen der \'userid\'.');

    $pdo = null;
    return (int) $userid;
  }

  public static function get_id($email) {

    require_once __DIR__ . '/Database.php';

    $pdo = Database::connect();
    $query = "SELECT userid FROM users WHERE email = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$email]);

    $number_of_users = $statement->rowCount();
    if ($number_of_users > 1) {throw new Exception("Internal Database Error.");}
    if ($number_of_users < 1) {return null;}

    $user = $statement->fetch(PDO::FETCH_ASSOC);
    $userid = $user['userid'] ?: throw new Exception('Fehler: \'userid\' konnte nicht aus der Datenbank geholt werden.');

    $pdo = null;
    return $userid;
  }

}
