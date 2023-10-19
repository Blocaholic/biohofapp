<?php

class Farms {
  public static function POST() {

    $_POST = json_decode(file_get_contents('php://input'), true);

    $farm = self::validate_post_input($_POST);

    // $farmid = add_farm_to_database() or exit_with_error();

    http_response_code(201);
    return $farm;

  }

  private static function validate_post_input($input) {
    require_once __DIR__ . '/../Token.php';
    require_once __DIR__ . '/../Config.php';
    $KEY = Config::$token_key;

    $token = $input['token'] ?? exit_with_error(401, [
      "message" => "Token is required.",
    ]);

    $token_payload = Token::verify($token, $KEY) ?: exit_with_error(401, [
      "message" => "Invalid token.",
    ]);

    if ($input['owner'] !== $token_payload['userid']) {
      exit_with_error(401, [
        "message" => "Token does not belong to owner",
      ]);
    }

    if ($input['farmname'] < 3) {
      exit_with_error(400, [
        "message" => "Farmname must be at least 3 characters.",
      ]);
    }

    $userid = $token_payload['userid'];

    return [
      "farmname" => $input['farmname'],
      "owner" => $input['owner'],
      "module_chicken" => $input['module_chicken'],
      "module_marketgarden" => $input['module_marketgarden'],
      "module_goats" => $input['module_goats'],
      "module_bees" => $input['module_bees'],
    ];
  }
}
