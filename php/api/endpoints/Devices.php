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
    return $deviceid;
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

function isIntegerGreater0($int) {
  return $int === (string) (int) $int && $int > 0;
}
