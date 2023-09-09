<?php

class Devices {
  public static function POST() {
    require_once __DIR__ . '/../Users.php';
    require_once __DIR__ . '/../Utils.php';

    $_POST = json_decode(file_get_contents('php://input'), true);
    $validated = self::validate_post_input($_POST);

    $email = $validated['email'];
    $userid = Users::get_id($email) ?: Users::add($email);
    $confirmationpassword = Utils::randomString(32);
    $devicename = $validated['devicename'];
    $devicepassword = $validated['devicepassword'];

    $deviceid = self::add(
      $userid,
      $devicename,
      $devicepassword,
      $confirmationpassword
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
    $validated = self::validate_patch_input($_PATCH, $id);

    if ($validated['operation'] === 'confirm') {
      return self::confirm($validated);
    }

    http_response_exit(400, [
      "message" => "Unknown operation.",
      "operation" => $validated['operation'],
    ]);

  }

  private static function validate_post_input($input) {

    $email = $input['email'] ?? throw new Exception('\'email\' is required.');
    filter_var($email, FILTER_VALIDATE_EMAIL) || throw new Exception(
      'Add device: \'email\' has invalid format.'
    );

    $devicename = $input['devicename'] ?? '';
    ($devicename === htmlspecialchars($devicename)) || throw new Exception(
      'Add device: \'devicename\' must not contain \'"<>&'
    );

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

  private static function validate_patch_input($input, $id) {
    require_once __DIR__ . '/../Utils.php';

    if (!isset($input['operation'])) {http_response_exit(400, [
      "message" => "'operation' must be defined",
    ]);}

    Utils::equalsIntegerGreater0($id) ?: http_response_exit(400, [
      "message" => "id must be an integer greater than 0",
      "syntax" => "https://biohofapp.de/api/<endpoint>/<id>",
      "example" => "https://biohofapp.de/api/devices/123",
      "id" => $id,
    ]);

    isset($input['confirmationpassword']) ?: http_response_exit(400, [
      "message" => "confirmationpassword is required.",
    ]);

    strlen($input['confirmationpassword']) === 32 ?: http_response_exit(400, [
      "message" => "confirmationpassword must be 32 characters.",
      "confirmationpassword" => $input['confirmationpassword'],
      "length" => strlen($input['confirmationpassword']),
    ]);

    return [
      "deviceid" => (int) $id,
      "confirmationpassword" => (string) $input['confirmationpassword'],
      "operation" => (string) $input['operation'],
    ];
  }

  private static function add(
    $userid,
    $devicename,
    $devicepassword,
    $confirmationpassword
  ) {
    require_once __DIR__ . '/../Database.php';

    $devicehash = password_hash($devicepassword, PASSWORD_DEFAULT);
    $confirmationhash = password_hash($confirmationpassword, PASSWORD_DEFAULT);

    $pdo = Database::connect();
    $query = "INSERT INTO devices (
      userid,
      devicehash,
      devicename,
      confirmationhash
    ) VALUES (
      :userid,
      :devicehash,
      :devicename,
      :confirmationhash
    );";
    $data = [
      "userid" => $userid,
      "devicehash" => $devicehash,
      "devicename" => $devicename,
      "confirmationhash" => $confirmationhash,
    ];
    $statement = $pdo->prepare($query);
    $statement->execute($data);
    $deviceid = $pdo->lastInsertId() ?: throw new Exception('Fehler beim Erstellen der \'deviceid\'.');

    $pdo = null;
    return (int) $deviceid;
  }

  private static function confirm($input) {
    require_once __DIR__ . '/../Database.php';

    $deviceid = (int) $input['deviceid'];
    $confirmationpassword = $input['confirmationpassword'];

    $device = Database::get_device($deviceid) ?: http_response_exit(404, [
      "message" => "Could not find 'deviceid' in database.",
      "deviceid" => $deviceid,
    ]);

    $userid = $device['userid'];
    $confirmationhash = $device['confirmationhash'];

    Utils::equalsIntegerGreater0($userid) || http_response_exit(400, [
      "message" => "Invalid 'userid'.",
      "userid" => $userid,
    ]);

    password_verify(
      $confirmationpassword,
      $confirmationhash
    ) || http_response_exit(401, [
      "message" => "'confirmationpassword' not accepted",
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
    ) ?: throw new Exception('Bestätigungsmail konnte nicht versand werden.');
    return true;
  }

}
