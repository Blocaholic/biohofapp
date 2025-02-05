<?php

require_once __DIR__ . '/../ValidateInput.php';
require_once __DIR__ . '/../Token.php';
require_once __DIR__ . '/../Database.php';
require_once __DIR__ . '/../Farms/PATCH/authorizations.php';
require_once __DIR__ . '/../Farms/PATCH/validations.php';

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

  public static function GET() {
    $token_payload = Token::verify_payload_from_header();

    $userid = $token_payload['userid'];

    $farms = Database::get_farms($userid);

    http_response_code(200);
    return $farms;
  }

  public static function PATCH() {
    $_POST = json_decode(file_get_contents('php://input'), true);
    $operation = $_POST['operation'];

    $valid_input = function_exists('Farms\PATCH\validations\\' . $operation)
    ? ('Farms\PATCH\validations\\' . $operation)($_POST)
    : exit_with_error(405, ["message" => "Invalid operation (1)."]);

    $authorized_input = function_exists('Farms\PATCH\authorizations\\' . $operation)
    ? ('Farms\PATCH\authorizations\\' . $operation)($valid_input)
    : exit_with_error(405, ["message" => "Invalid operation (2)."]);

    $success = method_exists('Database', 'farm_' . $operation)
    ? ('Database::farm_' . $operation)($authorized_input)
    : exit_with_error(405, ["message" => "Invalid operation (3)."]);

    http_response_code(200);
    return ["success" => "success"];

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
    return ["success" => "success"];
  }
}
