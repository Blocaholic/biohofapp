<?php

class Devices {
  public static function POST() {
    require_once __DIR__ . '/../Users.php';

    $_POST = json_decode(file_get_contents('php://input'), true);
    $validated = self::validate_post_input($_POST);

    $email = $validated['email'];

    $userid = Users::get_id($email) ?: Users::add($email);

    // $userid = Users::add($email);
    // $confirmationpassword = Utils::randomString(32);
    // $devicename = $validated['devicename'];
    // $devicepassword = $validated['devicepassword'];

    $response = $userid;
    // $response['message'] = "Devices::POST() wurde ausgeführt";
    return $response;
  }

  public static function PATCH($id) {
    $_PATCH = json_decode(file_get_contents('php://input'));
    if (!isIntegerGreater0($id)) {
      http_response_exit(400, [
        "message" => "id must be an integer greater than 0",
        "syntax" => "https://biohofapp.de/api/<endpoint>/<id>",
        "example" => "https://biohofapp.de/api/devices/123",
        "id" => $id,
      ]);
    }
    $response = $_PATCH;
    // $response['message'] = "Devices::PATCH() wurde ausgeführt"; {
    return $response;
  }

  private static function validate_post_input($input) {
    // check email
    $email = $input['email'] ?? throw new Exception('\'email\' is required.');
    filter_var($email, FILTER_VALIDATE_EMAIL) || throw new Exception(
      'Add device: \'email\' has invalid format.'
    );
    // check devicename
    $devicename = $input['devicename'] ?? '';
    ($devicename === htmlspecialchars($devicename)) || throw new Exception(
      'Add device: \'devicename\' must not contain \'"<>&'
    );
    // check password
    $devicepassword = $input['password'] ?? throw new Exception(
      'Add device: no \'devicepassword\'.'
    );
    (strlen($devicepassword) === 32) || throw new Exception(
      'Add device: \'password\' must be 32 characters.'
    );
    return [
      "email" => $email,
      "devicename" => $devicename,
      "devicepassword" => $devicepassword,
    ];
  }

}

function isIntegerGreater0($int) {
  return $int === (string) (int) $int && $int > 0;
}
