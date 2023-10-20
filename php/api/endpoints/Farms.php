<?php

class Farms {
  public static function POST() {

    $_POST = json_decode(file_get_contents('php://input'), true);
    $headers = apache_request_headers();

    $farm = self::validate_post_input($_POST, $headers);

    // $farmid = add_farm_to_database() or exit_with_error();

    http_response_code(201);
    return $farm;

  }

  private static function validate_post_input($input, $headers) {
    require_once __DIR__ . '/../Token.php';

    if (!isset($input['farmname'])) {
      exit_with_error(400, [
        "message" => '"farmname" is required.',
      ]);
    }

    if (!isset($input['owner'])) {
      exit_with_error(400, [
        "message" => '"owner" is required.',
      ]);
    }

    if (!isset($input['module_chicken'])) {
      exit_with_error(400, [
        "message" => '"module_chicken" is required.',
      ]);
    }

    if (!isset($input['module_marketgarden'])) {
      exit_with_error(400, [
        "message" => '"module_marketgarden" is required.',
      ]);
    }

    if (!isset($input['module_goats'])) {
      exit_with_error(400, [
        "message" => '"module_goats" is required.',
      ]);
    }

    if (!isset($input['module_bees'])) {
      exit_with_error(400, [
        "message" => '"module_bees" is required.',
      ]);
    }

    $token = $headers['Token'] ?? exit_with_error(401, [
      "message" => "Token is required.",
    ]);

    $token_payload = Token::verify($token) ?: exit_with_error(401, [
      "message" => "Invalid token.",
      "headers" => $headers,
    ]);

    if ($input['owner'] !== $token_payload['userid']) {
      exit_with_error(401, [
        "message" => "Token does not belong to owner.",
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
