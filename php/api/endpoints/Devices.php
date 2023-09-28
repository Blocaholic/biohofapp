<?php

class Devices {
  public static function POST() {
    require_once __DIR__ . '/../Database.php';
    require_once __DIR__ . '/../Utils.php';

    $_POST = json_decode(file_get_contents('php://input'), true);
    $validated = self::validate_post_input($_POST);

    $email = $validated['email'];
    $userid = Database::get_userid($email) ?: Database::add_user($email);
    $confirmationpassword = Utils::randomString(32);
    $devicename = $validated['devicename'];
    $devicepassword = $validated['devicepassword'];

    $devicehash = password_hash($devicepassword, PASSWORD_DEFAULT);
    $confirmationhash = password_hash($confirmationpassword, PASSWORD_DEFAULT);

    $deviceid = Database::add_device(
      $userid,
      $devicename,
      $devicehash,
      $confirmationhash
    );

    self::send_confirmation_mail(
      $email,
      $deviceid,
      $devicename,
      $confirmationpassword
    );

    http_response_code(201);
    return [
      'userid' => $userid,
      'deviceid' => $deviceid,
    ];
  }

  public static function PATCH($id) {

    $_PATCH = json_decode(file_get_contents('php://input'), true);

    if (!isset($_PATCH['operation'])) {exit_with_error(400, [
      "message" => "Operation must be defined.",
    ]);}

    if ($_PATCH['operation'] === 'confirm') {
      $validated = self::validate_confirmation_input($_PATCH, $id);
      return self::confirm($validated);
    }

    exit_with_error(400, [
      "message" => "Unknown operation.",
      "operation" => $_PATCH['operation'],
    ]);

  }

  private static function validate_post_input($input) {

    $email = $input['email'] ?? exit_with_error(400, [
      "message" => "Email is required.",
    ]);

    if ($email === "") {
      exit_with_error(400, [
        "message" => "Email is required.",
      ]);
    }

    filter_var($email, FILTER_VALIDATE_EMAIL) || exit_with_error(400, [
      "message" => "Invalid email.",
    ]);

    $devicename = $input['devicename'] ?? '';

    ($devicename === htmlspecialchars($devicename)) || exit_with_error(400, [
      "message" => "Invalid characters in devicename.",
      "invalidCharacters" => "\"'<>&",
      "devicename" => $devicename,
    ]);

    $devicepassword = $input['password'] ?? exit_with_error(400, [
      "message" => "Password is required.",
    ]);
    (strlen($devicepassword) === 32) || exit_with_error(400, [
      "message" => "Password must be 32 characters.",
      "passwordLength" => strlen($devicepassword),
    ]);

    return [
      "email" => $email,
      "devicename" => $devicename,
      "devicepassword" => $devicepassword,
    ];
  }

  private static function validate_confirmation_input($input, $id) {
    require_once __DIR__ . '/../Utils.php';

    Utils::equalsIntegerGreater0($id) ?: exit_with_error(400, [
      "message" => "Id must be an integer greater than 0.",
      "syntax" => "https://biohofapp.de/api/<endpoint>/<id>",
      "example" => "https://biohofapp.de/api/devices/123",
      "id" => $id,
    ]);

    isset($input['confirmationpassword']) ?: exit_with_error(400, [
      "message" => "Confirmationpassword is required.",
    ]);

    strlen($input['confirmationpassword']) === 32 ?: exit_with_error(400, [
      "message" => "Confirmationpassword must be 32 characters.",
      "passwordLength" => strlen($input['confirmationpassword']),
    ]);

    return [
      "deviceid" => (int) $id,
      "confirmationpassword" => (string) $input['confirmationpassword'],
      "operation" => (string) $input['operation'],
    ];
  }

  private static function confirm($input) {
    require_once __DIR__ . '/../Database.php';

    $deviceid = (int) $input['deviceid'];
    $confirmationpassword = $input['confirmationpassword'];

    $device = Database::get_device($deviceid) ?: exit_with_error(404, [
      "message" => "Could not find deviceid.",
      "deviceid" => $deviceid,
    ]);

    $userid = $device['userid'];
    $confirmationhash = $device['confirmationhash'];

    password_verify(
      $confirmationpassword,
      $confirmationhash
    ) || exit_with_error(401, [
      "message" => "Confirmationpassword not accepted.",
    ]);

    Database::confirm_device($deviceid);
    Database::confirm_user($userid);

    http_response_code(200);
    return ["deviceid" => $deviceid];
  }

  private static function send_confirmation_mail(
    $email,
    $deviceid,
    $devicename,
    $confirmationpassword
  ) {
    $title = 'Bitte bestätige die Registrierung';
    $content = '<h1>Ein Neues Gerät wurde registriert</h1>';
    $content .= '<p>Geräte-ID: ' . $deviceid . '</p>';
    $content .= '<p>Geräte-Name: ' . $devicename . '</p>';
    $content .= '<p>E-Mail-Adresse: ' . $email . '</p>';
    $content .= '<p><a href="https://biohofapp.de/confirm/' . $deviceid . '/' . $confirmationpassword . '">Bestätigen</a></p>';
    $header_array[] = 'MIME-Version: 1.0';
    $header_array[] = 'Content-type: text/html; charset=utf-8';
    $header_array[] = 'From: BiohofApp.de <kontakt@biohofapp.de>';
    $header = implode("\r\n", $header_array);
    $mailSent = mail(
      $email, $title, $content, $header
    ) ?: throw new Exception("Could not send email.");
    return true;
  }

}
