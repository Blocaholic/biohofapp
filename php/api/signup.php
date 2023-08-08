<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

echo '{"status": "success"}';
