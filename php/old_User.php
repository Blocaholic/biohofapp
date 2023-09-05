<?php

class User {

  public static function confirm($userid) {

    require_once __DIR__ . '/Database.php';

    $pdo = Database::connect();
    $get_query = "SELECT * FROM unconfirmed_users WHERE userid = ? LIMIT 1;";
    $get_statement = $pdo->prepare($get_query);
    $get_statement->execute([$userid]);
    $user = $get_statement->fetch(PDO::FETCH_ASSOC);

    $userid = $user['userid'];
    $email = $user['email'];

    $set_query = "INSERT INTO users (userid, email) VALUES (:userid, :email);";
    $set_data = [
      "userid" => $userid,
      "email" => $email,
    ];
    $set_statement = $pdo->prepare($set_query);
    $set_statement->execute($set_data);

    $delete_query = "DELETE FROM unconfirmed_users WHERE userid = ?;";
    $delete_statement = $pdo->prepare($delete_query);
    $delete_statement->execute([$userid]);

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
