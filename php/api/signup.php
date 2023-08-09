<?php

function randomString($length) {
  $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
    $randomString .= $chars[random_int(0, strlen($chars) - 1)];
  }
  return $randomString;
}

header('Content-Type: application/json');

require_once __DIR__ . '/../Database.php';

if (empty($_POST["email"])) {
  die('{"status": "error", "message": "Field \'email\' is required."}');
}

if (empty($_POST["password"])) {
  die('{"status": "error", "message": "Field \'password\' is required."}');
}

if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
  die('{"status": "error", "message": "Valid email is required."}');
}

if (strlen($_POST["password"]) !== 32) {
  die(
    '{"status": "error", "message": "Password must be 32 characters."}'
  );
}

$devicehash = password_hash($_POST["password"], PASSWORD_DEFAULT);
$confirmationhash = randomString(32);

try {
  $pdo = Database::connect();
  $query = "INSERT INTO unconfirmed_users (
    email,
    confirmationhash,
    devicehash,
    devicename
  ) VALUES(
    :email,
    :confirmationhash,
    :devicehash,
    :devicename
  );";
  $data = ["email" => $_POST['email'], "confirmationhash" => $confirmationhash, "devicehash" => $_POST['password'], "devicename" => $_POST['devicename']];
  $statement = $pdo->prepare($query);
  $statement->execute($data);
  // $insertedId = $pdo->lastInsertId();
  $pdo = null;
} catch (Exception $e) {
  if (str_starts_with(
    $e->getMessage(),
    "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry"
  )) {
    die('{"status": "error", "message": "E-Mail ist bereits vergeben."}');
  }
  die('{"status": "error", "message": "' . $e->getMessage() . '"}');
};

echo '{"status": "success"}';
