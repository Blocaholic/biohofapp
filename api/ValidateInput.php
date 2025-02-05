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

  public static function bedblockOrientation($input) {
    $integer = self::defaultInteger($input, 'orientation');
    if ($integer < -89) {
      exit_with_error(400, ["message" => 'orientation cannot be less than -89']);
    }
    if ($integer > 90) {
      exit_with_error(400, ["message" => 'orientation cannot be bigger than 90']);
    }
    return $integer;
  }

  public static function defaultDate($input, $varName) {
    if (!(bool) preg_match('/^\d{4}-\d{2}-\d{2}$/', $input[$varName])) {
      exit_with_error(400, ["message" => '"' . $varName . '": invalid date format']);
    }

    list($year, $month, $day) = explode('-', $input[$varName]);
    if (!checkdate($month, $day, $year)) {
      exit_with_error(400, ["message" => '"' . $varName . '": invalid date']);
    }

    return $input[$varName];
  }

  public static function defaultName($input, $varName) {
    $name = $input[$varName] ?? exit_with_error(400, [
      "message" => '"' . $varName . '" is required.',
    ]);

    if (strlen($name) < 1) {
      exit_with_error(400, [
        "message" => '"' . $varName . '" must be at least 1 character.',
      ]);
    }

    return $name;
  }

  public static function defaultInteger($input, $varName) {
    $integer = $input[$varName] ?? exit_with_error(400, [
      "message" => '"' . $varName . '" is required.',
    ]);

    if (!is_numeric($integer)) {
      exit_with_error(400, ["message" => '"' . $varName . '" must be numeric']);
    }

    if ($integer != round($integer)) {
      exit_with_error(400, ["message" => '"' . $varName . '" must be an integer']);
    }

    return $integer;
  }

  public static function defaultPositiveInteger($input, $varName) {
    $positiveInteger = self::defaultInteger($input, $varName);
    if ($positiveInteger < 1) {
      exit_with_error(400, ["message" => '"' . $varName . '" must be greater than 0']);
    }
    return $positiveInteger;
  }

}
