<?php

class Auth {
  public static function POST($_deviceid) {
    require_once __DIR__ . '/../Token.php';
    require_once __DIR__ . '/../Config.php';
    require_once __DIR__ . '/../Database.php';

    $_POST = json_decode(file_get_contents('php://input'), true);
    $validated = self::validate_post_input($_POST, $_deviceid);

    $deviceid = $validated['deviceid'];
    $password = $validated['password'];

    $device = Database::get_device($deviceid) ?: http_response_exit(404, [
      "message" => "Could not find 'deviceid' in database.",
      "deviceid" => $deviceid,
    ]);

    $devicehash = $device['devicehash'];

    password_verify(
      $password,
      $devicehash
    ) || http_response_exit(401, [
      "message" => "'password' not accepted",
    ]);

    $userid = $device['userid'];
    $devicename = $device['devicename'];
    ['email' => $email] = Database::get_user($userid);

    $payload = json_encode([
      "iat" => time(),
      "email" => $email,
      "userid" => $userid,
      "deviceid" => $deviceid,
    ]);

    $token = Token::sign($payload, Config::$token_key);

    http_response_code(201);
    return [
      "deviceid" => $deviceid,
      "token" => $token,
    ];
  }

  private static function validate_post_input($input, $deviceid) {
    require_once __DIR__ . '/../Utils.php';

    Utils::equalsIntegerGreater0($deviceid) ?: http_response_exit(400, [
      "message" => "'deviceid' must be an integer greater than 0",
      "syntax" => "https://biohofapp.de/api/<endpoint>/<deviceid>",
      "example" => "https://biohofapp.de/api/auth/123",
      "deviceid" => $deviceid,
    ]);

    isset($input['password']) ?: http_response_exit(400, [
      "message" => "Password is required.",
    ]);

    strlen($input['password']) === 32 ?: http_response_exit(400, [
      "message" => "Password must be 32 characters.",
      "password" => $input['password'],
      "length" => strlen($input['password']),
    ]);

    return [
      "deviceid" => (int) $deviceid,
      "password" => $input['password'],
    ];
  }
}
