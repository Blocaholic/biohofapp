<?php
namespace Farms\PATCH\validations {
  require_once __DIR__ . '/../../ValidateInput.php';
  require_once __DIR__ . '/../../Database.php';

  function add_member($input) {
    $email = \ValidateInput::email($input);
    $farmid = \ValidateInput::farmid($input);
    $role = \ValidateInput::role($input);

    return compact('email', 'farmid', 'role');
  }

  function update_modules($input) {
    $farmid = \ValidateInput::farmid($input);
    $modules = \ValidateInput::modules($input);

    return array_merge(["farmid" => $farmid], $modules);
  }

  function rename($input) {
    $farmname = \ValidateInput::farmname($input);
    $farmid = \ValidateInput::farmid($input);

    return compact('farmname', 'farmid');
  }

  function update_member($input) {
    $email = \ValidateInput::email($input);
    $memberid = \ValidateInput::userid($input);
    $userid = \Database::get_userid($email) ?? exit_with_error(400, ["message" => "No user found with this email adress."]);
    if ($userid != $memberid) {
      exit_with_error(400, ["message" => "Userid does not fit email adress."]);
    }
    $role = \ValidateInput::role($input);
    $farmid = \ValidateInput::farmid($input);
    return compact('email', 'userid', 'role', 'farmid');
  }

  function remove_member($input) {
    $email = \ValidateInput::email($input);
    $memberid = \ValidateInput::userid($input);
    $userid = \Database::get_userid($email) ?? exit_with_error(400, ["message" => "No user found with this email adress."]);
    if ($userid != $memberid) {
      exit_with_error(400, ["message" => "Userid does not fit email adress."]);
    }
    $farmid = \ValidateInput::farmid($input);
    return compact('email', 'userid', 'farmid');
  }

}
