<?php

class Auth {
  public static function POST($_deviceid) {
    require_once __DIR__ . '/../Token.php';
    require_once __DIR__ . '/../Database.php';

    $_POST = json_decode(file_get_contents('php://input'), true);
    $validated = self::validate_post_input($_POST, $_deviceid);

    $deviceid = $validated['deviceid'];
    $password = $validated['password'];

    $device = Database::get_device($deviceid) ?: exit_with_error(404, [
      "message" => "Could not find deviceid.",
      "deviceid" => $deviceid,
    ]);

    $device['confirmed'] ?: exit_with_error(401, [
      "message" => "Device is not confirmed.",
    ]);

    $devicehash = $device['devicehash'];

    password_verify(
      $password,
      $devicehash
    ) || exit_with_error(401, [
      "message" => "Password not accepted.",
    ]);

    $userid = $device['userid'];
    $devicename = $device['devicename'];
    ['email' => $email] = Database::get_user($userid);

    $now = time();

    $payload = json_encode([
      "iat" => $now,
      "exp" => $now + 600,
      "email" => $email,
      "userid" => $userid,
      "deviceid" => $deviceid,
    ]);

    $token = Token::sign($payload);

    http_response_code(201);
    return [
      "deviceid" => $deviceid,
      "token" => $token,
    ];
  }

  private static function validate_post_input($input, $deviceid) {
    require_once __DIR__ . '/../Utils.php';

    Utils::equalsIntegerGreater0($deviceid) ?: exit_with_error(400, [
      "message" => "Deviceid must be an integer greater than 0.",
      "syntax" => "https://biohofapp.de/api/<endpoint>/<deviceid>",
      "example" => "https://biohofapp.de/api/auth/123",
      "deviceid" => $deviceid,
    ]);

    isset($input['password']) ?: exit_with_error(400, [
      "message" => "Password is required.",
    ]);

    strlen($input['password']) === 32 ?: exit_with_error(400, [
      "message" => "Password must be 32 characters.",
      "passwordLength" => strlen($input['password']),
    ]);

    return [
      "deviceid" => (int) $deviceid,
      "password" => $input['password'],
    ];
  }
}
