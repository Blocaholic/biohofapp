<?php

class Token {

  public static function sign($payload, $key) {

    $header = json_encode([
      "alg" => "HS256",
      "typ" => "JWT",
    ]);

    $base64header = base64_encode($header);
    $base64payload = base64_encode($payload);

    $signature = hash_hmac('SHA256', $base64header . $base64payload, $key);

    $base64signature = base64_encode($signature);
    $token = $base64header . "." . $base64payload . "." . $base64signature;

    return $token;
  }

}
