<?php

class Farms {
  public static function POST() {
    require_once __DIR__ . '/../Token.php';
    require_once __DIR__ . '/../Config.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

    $token = $_POST['token'];
    $KEY = Config::$token_key;

    $payload = Token::verify($token, $KEY) ?: exit_with_error(401, [
      "message" => "Invalid token.",
    ]);

    $userid = $payload['userid'];

    // $farmid = add_farm_to_database() or exit_with_error();

    http_response_code(201);
    return $userid;

  }
}
