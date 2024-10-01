<?php

require_once __DIR__ . '/../ValidateInput.php';
require_once __DIR__ . '/../Token.php';
require_once __DIR__ . '/../Database.php';

class Farms {
  public static function POST() {
    $token_payload = Token::verify_payload_from_header();
    $_POST = json_decode(file_get_contents('php://input'), true);

    $farm = array_merge(
      [
        "farmname" => ValidateInput::farmname($_POST),
        "owner" => ValidateInput::owner($_POST),
      ],
      ValidateInput::modules($_POST)
    );

    if ((int) $farm['owner'] !== $token_payload['userid']) {
      exit_with_error(401, [
        "message" => "Token does not belong to owner.",
      ]);
    }

    $farmid = Database::add_farm($farm);

    http_response_code(201);
    return ['farmid' => $farmid];

  }

  private static function validate_update_modules_input($input) {
    $farmid = ValidateInput::farmid($input);
    $modules = ValidateInput::modules($input);

    return array_merge(["farmid" => $farmid], $modules);
  }

  private static function validate_add_member_input($input) {
    $email = ValidateInput::email($input);
    $farmid = ValidateInput::farmid($input);
    $role = ValidateInput::role($input);
    if ($role === "owner") {
      exit_with_error(400, [
        "message" => 'Role "owner" can not be added.',
      ]);
    }

    $userid = Database::get_userid($email) ?? throw new Exception("No user found with this email adress.");

    $farms = Database::get_farms($userid);

    foreach ($farms as $farm) {
      if ($farm['farmid'] == $farmid) {
        throw new Exception("User is already member.");
      }
    }

    return compact('userid', 'farmid', 'role');
  }

  private static function validate_rename_farm_input($input) {
    $farmname = ValidateInput::farmname($input);
    $farmid = ValidateInput::farmid($input);
    return compact('farmname', 'farmid');
  }

  public static function GET() {
    $token_payload = Token::verify_payload_from_header();

    $userid = $token_payload['userid'];

    $farms = Database::get_farms($userid);

    http_response_code(200);
    return $farms;
  }

  public static function PATCH() {
    $token_payload = Token::verify_payload_from_header();
    $_POST = json_decode(file_get_contents('php://input'), true);

    $validations = [
      "update_modules" => [__CLASS__, 'validate_update_modules_input'],
      "add_member" => [__CLASS__, 'validate_add_member_input'],
      "rename" => [__CLASS__, 'validate_rename_farm_input'],
    ];

    $operations = [
      "update_modules" => ['Database', 'update_farm_modules'],
      "add_member" => ['Database', 'add_farmmember'],
      "rename" => ['Database', 'rename_farm'],
    ];

    $operation = $_POST['operation'];

    $valid_input = (isset($validations[$operation]))
    ? $validations[$operation]($_POST)
    : exit_with_error(405, ["message" => "Invalid operation."]);

    $userid = $token_payload['userid'];
    $farmid = $valid_input['farmid'];
    $role = Database::get_farm_role($farmid, $userid);
    $allowed_roles = ["owner", "admin"];
    if (!in_array($role, $allowed_roles)) {
      exit_with_error(401, ["message" => "No permission to change settings."]);
    }

    $success = isset($operations[$operation])
    ? $operations[$operation]($valid_input)
    : exit_with_error(405, ["message" => "Invalid operation."]);

    http_response_code(200);
    return [];

  }

  public static function DELETE($farmid) {
    $token_payload = Token::verify_payload_from_header();
    $userid = $token_payload['userid'];
    $role = Database::get_farm_role($farmid, $userid);
    $allowed_roles = ["owner"];
    if (!in_array($role, $allowed_roles)) {
      exit_with_error(401, ["message" => "No permission to delete farm."]);
    }
    Database::remove_all_farmmembers($farmid);
    http_response_code(200);
    return [];
  }
}
