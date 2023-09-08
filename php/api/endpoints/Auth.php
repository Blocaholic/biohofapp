<?php

class Auth {
  public static function POST() {
    require_once __DIR__ . '/../Token.php';

    $key = '123456789';
    $payload = json_encode([
      "iat" => time(),
      "email" => "test@mail.com",
      "userid" => "69",
      "deviceid" => "88",
    ]);

    $token = Token::sign($payload, $key);

    http_response_code(201);
    return $token;
  }
}
