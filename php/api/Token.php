<?php
require_once __DIR__ . '/Config.php';

class Token {

  public static function sign($payload) {

    $header = json_encode([
      "alg" => "HS256",
      "typ" => "JWT",
    ]);

    $base64header = base64_encode($header);
    $base64payload = base64_encode($payload);

    $signature = hash_hmac(
      'SHA256',
      $base64header . $base64payload,
      Config::$token_key
    );

    $base64signature = base64_encode($signature);
    $token = $base64header . "." . $base64payload . "." . $base64signature;

    return $token;
  }

  public static function verify($token) {

    $token_parts = explode('.', $token);
    [$base64header, $base64payload, $base64signature] = $token_parts;
    [$header, $payload, $signature] = array_map('base64_decode', $token_parts);

    $hashed = hash_hmac(
      'SHA256',
      $base64header . $base64payload,
      Config::$token_key
    );

    if ($signature != $hashed) {
      return null;
    }

    $json = json_decode($payload, true);

    if (time() > $json['exp']) {
      return null;
    }

    return $json;
  }

  public static function verify_payload_from_header() {
    $token = apache_request_headers()['Token'] ?? exit_with_error(401, [
      "message" => "Token is required.",
    ]);

    $token_payload = self::verify($token) ?: exit_with_error(401, [
      "message" => "Invalid token.",
    ]);

    return $token_payload;
  }

}
