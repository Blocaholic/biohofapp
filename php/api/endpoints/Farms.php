<?php

class Farms {
  public static function POST() {
    require_once __DIR__ . '/../Token.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

    $token = apache_request_headers()['Token'] ?? exit_with_error(401, [
      "message" => "Token is required.",
    ]);

    $token_payload = Token::verify($token) ?: exit_with_error(401, [
      "message" => "Invalid token.",
    ]);

    $farm = self::validate_post_input($_POST);

    if ($farm['owner'] !== $token_payload['userid']) {
      exit_with_error(401, [
        "message" => "Token does not belong to owner.",
      ]);
    }

    // $farmid = add_farm_to_database() or exit_with_error();

    http_response_code(201);
    return $farm;

  }

  private static function validate_post_input($input) {

    $input['farmname'] ?? exit_with_error(400, [
      "message" => '"farmname" is required.',
    ]);

    $input['owner'] ?? exit_with_error(400, [
      "message" => '"owner" is required.',
    ]);

    $input['module_chicken'] ?? exit_with_error(400, [
      "message" => '"module_chicken" is required.',
    ]);

    $input['module_marketgarden'] ?? exit_with_error(400, [
      "message" => '"module_marketgarden" is required.',
    ]);

    $input['module_goats'] ?? exit_with_error(400, [
      "message" => '"module_goats" is required.',
    ]);

    $input['module_bees'] ?? exit_with_error(400, [
      "message" => '"module_bees" is required.',
    ]);

    if ($input['farmname'] < 3) {
      exit_with_error(400, [
        "message" => "Farmname must be at least 3 characters.",
      ]);
    }

    if ($input['module_chicken'] !== 0 && $input['module_chicken'] !== 1) {
      exit_with_error(400, [
        "message" => "module_chicken must be either, 0 or 1.",
      ]);
    }

    if ($input['module_marketgarden'] !== 0 && $input['module_marketgarden'] !== 1) {
      exit_with_error(400, [
        "message" => "module_marketgarden must be either, 0 or 1.",
      ]);
    }

    if ($input['module_goats'] !== 0 && $input['module_goats'] !== 1) {
      exit_with_error(400, [
        "message" => "module_goats must be either, 0 or 1.",
      ]);
    }

    if ($input['module_bees'] !== 0 && $input['module_bees'] !== 1) {
      exit_with_error(400, [
        "message" => "module_bees must be either, 0 or 1.",
      ]);
    }

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
