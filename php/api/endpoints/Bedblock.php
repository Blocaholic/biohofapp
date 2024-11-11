<?php

require_once __DIR__ . '/../ValidateInput.php';
require_once __DIR__ . '/../Token.php';
require_once __DIR__ . '/../Database.php';

class Bedblock {
  public static function POST() {
    $token_payload = Token::verify_payload_from_header();

    $_POST = json_decode(file_get_contents('php://input'), true);

    $farmid = ValidateInput::farmid($_POST);
    $userrole = Database::get_farm_role($farmid, $token_payload['userid']);
    if (!in_array($userrole, ["owner", "admin"])) {
      exit_with_error(401, ["message" => "No permission to add bedblock."]);
    }

    $name = ValidateInput::defaultName($_POST, 'name');
    $bedwidth = ValidateInput::defaultPositiveInteger($_POST, 'bedwidth');
    $bedlength = ValidateInput::defaultPositiveInteger($_POST, 'bedlength');
    $number = ValidateInput::defaultPositiveInteger($_POST, 'number');
    $gap = ValidateInput::defaultPositiveInteger($_POST, 'gap');
    $x = ValidateInput::defaultInteger($_POST, 'x');
    $y = ValidateInput::defaultInteger($_POST, 'y');
    $orientation = ValidateInput::bedblockOrientation($_POST);
    $start = ValidateInput::defaultDate($_POST, 'start');
    $end = $_POST['end'] === ''
    ? ''
    : ValidateInput::defaultDate($_POST, 'end');

    $bedblock = compact(
      'name',
      'farmid',
      'bedwidth',
      'bedlength',
      'number',
      'gap',
      'x',
      'y',
      'orientation',
      'start',
      'end',
    );
    $bedblockid = Database::bedblock_add($bedblock);

    http_response_code(201);
    return compact('bedblockid');
  }

  public static function GET() {
    $token_payload = Token::verify_payload_from_header();

    $userid = $token_payload['userid'];

    $farms = Database::get_farms($userid);

    function get_farmid_from_farm($farm) {
      return $farm['farmid'];
    }

    $farmids = array_map('get_farmid_from_farm', $farms);
    $bedblocks = array_combine($farmids, array_map('Database::get_bedblocks', $farmids));

    http_response_code(200);
    return $bedblocks;
  }
}
