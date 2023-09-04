<?php

class Users {

  public static function add($email) {
    $id = 666;
    return $id;
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
    $userid = $user['userid'];

    return $userid;

  }

}
