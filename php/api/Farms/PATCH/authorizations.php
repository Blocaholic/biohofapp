<?php
namespace Farms\PATCH\authorizations {
  require_once __DIR__ . '/../../Database.php';
  require_once __DIR__ . '/../../Token.php';

  function user_has_role_of($roles, $farmid) {
    $userid = \Token::verify_payload_from_header()['userid'];
    $userrole = \Database::get_farm_role($farmid, $userid);
    return in_array($userrole, $roles);
  }

  function add_member($input) {
    $farmid = $input['farmid'];
    $member_role = $input['role'];
    $member_email = $input['email'];
    $member_id = \Database::get_userid($member_email) ?? exit_with_error(400, ["message" => "No user found with this email adress."]);
    $member_farms = \Database::get_farms($member_id);

    if (!user_has_role_of(["owner", "admin"], $farmid)) {
      exit_with_error(401, ["message" => "No permission to change settings."]);
    }

    if ($member_role === "owner") {
      exit_with_error(401, [
        "message" => 'Role "owner" must not be added.',
      ]);
    }

    foreach ($member_farms as $farm) {
      if ($farm['farmid'] == $farmid) {
        exit_with_error(400, ["message" => "User is already member."]);
      }
    }

    return array_merge(["userid" => $member_id], $input);
  }

  function update_modules($input) {
    $farmid = $input['farmid'];

    if (!user_has_role_of(["owner", "admin"], $farmid)) {
      exit_with_error(401, ["message" => "No permission to change settings."]);
    }

    return $input;
  }

  function rename($input) {
    $farmid = $input['farmid'];

    if (!user_has_role_of(["owner", "admin"], $farmid)) {
      exit_with_error(401, ["message" => "No permission to change settings."]);
    }

    return $input;
  }

  function update_member($input) {
    $farmid = $input['farmid'];
    $userid = \Token::verify_payload_from_header()['userid'];
    $userrole = \Database::get_farm_role($farmid, $userid);

    $member_id = $input['userid'];
    $member_role_old = \Database::get_farm_role($farmid, $member_id);
    $member_role_new = $input['role'];

    if (!in_array($userrole, ["owner", "admin"])) {
      exit_with_error(401, ["message" => "No permission to change settings."]);
    }

    if (
      $userrole === 'admin'
      && $member_role_old === 'admin'
      && $userid !== $member_id
    ) {
      exit_with_error(401, ["message" => "Admin may not change other admins role."]);
    }

    if (
      $member_role_new === 'owner'
      && $userrole !== 'owner'
    ) {
      exit_with_error(401, ["message" => "Only owner can set another owner."]);
    }

    return $input;
  }
}
