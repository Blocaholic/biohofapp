<?php

class Farms {
  public static function POST() {
    require_once __DIR__ . '/../Token.php';
    require_once __DIR__ . '/../Database.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

    $token = apache_request_headers()['Token'] ?? exit_with_error(401, [
      "message" => "Token is required.",
    ]);

    $token_payload = Token::verify($token) ?: exit_with_error(401, [
      "message" => "Invalid token.",
    ]);

    $farm = self::validate_post_input($_POST);

    if ((int) $farm['owner'] !== $token_payload['userid']) {
      exit_with_error(401, [
        "message" => "Token does not belong to owner.",
      ]);
    }

    $farmid = Database::add_farm($farm);

    http_response_code(201);
    return ['farmid' => $farmid];

  }

  private static function validate_post_input($input) {

    $input['farmname'] ?? exit_with_error(400, [
      "message" => '"farmname" is required.',
    ]);

    $input['owner'] ?? exit_with_error(400, [
      "message" => '"owner" is required.',
    ]);

    if ($input['farmname'] < 3) {
      exit_with_error(400, [
        "message" => "Farmname must be at least 3 characters.",
      ]);
    }

    $modules = self::validate_modules_input($input);

    return array_merge(
      [
        "farmname" => $input['farmname'],
        "owner" => $input['owner'],
      ],
      $modules);
  }

  private static function validate_modules_input($input) {

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
      "module_chicken" => $input['module_chicken'],
      "module_marketgarden" => $input['module_marketgarden'],
      "module_goats" => $input['module_goats'],
      "module_bees" => $input['module_bees'],
    ];
  }

  private static function validate_update_modules_input($input) {
    $modules = self::validate_modules_input($input);

    $farmid = $input['farmid'] ?? exit_with_error(400, [
      "message" => '"farmid" is required.',
    ]);

    if (!is_numeric($farmid) || $farmid < 1 || $farmid != round($farmid)) {
      exit_with_error(400, ["message" => '"farmid" must be an integer greater than 0']);
    }

    return array_merge(["farmid" => $farmid], $modules);
  }

  public static function GET() {
    require_once __DIR__ . '/../Token.php';
    require_once __DIR__ . '/../Database.php';

    $token = apache_request_headers()['Token'] ?? exit_with_error(401, [
      "message" => "Token is required.",
    ]);

    $token_payload = Token::verify($token) ?: exit_with_error(401, [
      "message" => "Invalid token.",
    ]);

    $userid = $token_payload['userid'];

    $farms = Database::get_farms($userid);

    http_response_code(200);
    return $farms;
  }

  public static function PATCH() {
    require_once __DIR__ . '/../Token.php';
    require_once __DIR__ . '/../Database.php';

    $validations = [
      "update_modules" => [__CLASS__, 'validate_update_modules_input'],
    ];

    $operations = [
      "update_modules" => ['Database', 'update_farm_modules'],
    ];

    $_POST = json_decode(file_get_contents('php://input'), true);

    $operation = $_POST['operation'];

    $token = apache_request_headers()['Token'] ?? exit_with_error(401, [
      "message" => "Token is required.",
    ]);

    $token_payload = Token::verify($token) ?: exit_with_error(401, [
      "message" => "Invalid token.",
    ]);

    $valid_input = (isset($validations[$operation]))
    ? $validations[$operation]($_POST)
    : exit_with_error(405, ["message" => "Invalid operation."]);

    $userid = $token_payload['userid'];
    $farmid = $valid_input['farmid'];
    $role = Database::get_farm_role($farmid, $userid);
    $allowed_roles = ["owner"];
    if (!in_array($role, $allowed_roles)) {
      exit_with_error(401, ["message" => "No permission to change modules."]);
    }

    $success = isset($operations[$operation])
    ? $operations[$operation]($valid_input)
    : exit_with_error(405, ["message" => "Invalid operation."]);

    http_response_code(200);
    return [];

  }
}
