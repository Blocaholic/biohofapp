<?php

require_once __DIR__ . '/../Database.php';
require_once __DIR__ . '/../Utils.php';

header('Content-Type: application/json');

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
$confirmationpassword = Utils::randomString(32);
$confirmationhash = password_hash($confirmationpassword, PASSWORD_DEFAULT);

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
  $data = ["email" => $_POST['email'], "confirmationhash" => $confirmationhash, "devicehash" => $devicehash, "devicename" => $_POST['devicename']];
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
