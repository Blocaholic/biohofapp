<?php

class ValidateInput {

  public static function email($input) {
    $email = $input['email'] ?? exit_with_error(400, [
      "message" => "Email is required.",
    ]);

    if ($email === "") {
      exit_with_error(400, [
        "message" => "Email is required.",
      ]);
    }

    filter_var($email, FILTER_VALIDATE_EMAIL) || exit_with_error(400, [
      "message" => "Invalid email.",
    ]);

    return $email;
  }

  public static function farmid($input) {
    $farmid = $input['farmid'] ?? exit_with_error(400, [
      "message" => '"farmid" is required.',
    ]);

    if (!is_numeric($farmid)) {
      exit_with_error(400, ["message" => '"farmid" must be numeric']);
    }
    if ($farmid < 1) {
      exit_with_error(400, ["message" => '"farmid" must be greater than 0']);
    }

    if ($farmid != round($farmid)) {
      exit_with_error(400, ["message" => '"farmid" must be an integer']);
    }

    return $farmid;
  }

  public static function userid($input) {
    $userid = $input['userid'] ?? exit_with_error(400, [
      "message" => '"userid" is required.',
    ]);

    if (!is_numeric($userid)) {
      exit_with_error(400, ["message" => '"userid" must be numeric']);
    }
    if ($userid < 1) {
      exit_with_error(400, ["message" => '"userid" must be greater than 0']);
    }

    if ($userid != round($userid)) {
      exit_with_error(400, ["message" => '"userid" must be an integer']);
    }

    return $userid;
  }

  public static function owner($input) {
    $owner = $input['owner'] ?? exit_with_error(400, [
      "message" => '"owner" is required.',
    ]);

    if (!is_numeric($owner)) {
      exit_with_error(400, ["message" => '"owner" must be numeric']);
    }
    if ($owner < 1) {
      exit_with_error(400, ["message" => '"owner" must be greater than 0']);
    }

    if ($owner != round($owner)) {
      exit_with_error(400, ["message" => '"owner" must be an integer']);
    }

    return $owner;
  }

  public static function farmname($input) {
    $farmname = $input['farmname'] ?? exit_with_error(400, [
      "message" => '"farmname" is required.',
    ]);

    if (strlen($farmname) < 3) {
      exit_with_error(400, [
        "message" => "Farmname must be at least 3 characters.",
      ]);
    }

    return $farmname;
  }

  public static function role($input) {
    $role = $input['role'] ?? exit_with_error(400, [
      "message" => '"role" is required.',
    ]);

    $allowed_roles = ["owner", "admin", "employee", "visitor"];
    if (!in_array($role, $allowed_roles)) {
      exit_with_error(400, ["message" => 'Role "' . $role . '" not excepted. Accepted Roles: ' . implode(", ", $allowed_roles)]);
    }

    return $role;
  }

  public static function modules($input) {

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

}
