<?php

class Database {

  private static function connect() {
    require_once __DIR__ . '/Config.php';

    $pdo = new PDO(
      "mysql:dbname=" . Config::$dbname . ";host=" . Config::$dbhost,
      Config::$dbuser,
      Config::$dbpassword
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $pdo;
  }

  public static function is_confirmed_user($userid) {
    $pdo = self::connect();

    $query = "SELECT * FROM users WHERE userid = ? AND confirmed IS NOT NULL;";
    $statement = $pdo->prepare($query);
    $statement->execute([$userid]);
    return boolval($statement->fetchAll());
  }

  public static function get_device($deviceid) {

    $pdo = self::connect();

    $query = "SELECT * FROM devices WHERE deviceid = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$deviceid]);
    $number_of_devices = $statement->rowCount();

    if ($number_of_devices < 1) {return null;}

    $device = $statement->fetch(PDO::FETCH_ASSOC);

    return $device;
  }

  public static function get_user($userid) {

    $pdo = self::connect();

    $query = "SELECT * FROM users WHERE userid = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$userid]);
    $number_of_users = $statement->rowCount();

    if ($number_of_users < 1) {return null;}

    $user = $statement->fetch(PDO::FETCH_ASSOC);

    return $user;
  }

  public static function get_userid($email) {

    $pdo = self::connect();
    $query = "SELECT userid FROM users WHERE email = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$email]);
    $number_of_users = $statement->rowCount();

    if ($number_of_users < 1) {return null;}

    $user = $statement->fetch(PDO::FETCH_ASSOC);

    return $user['userid'];
  }

  public static function add_device(
    $userid,
    $devicename,
    $devicehash,
    $confirmationhash
  ) {

    $pdo = self::connect();
    $query = "INSERT INTO devices (
      userid,
      devicehash,
      devicename,
      confirmationhash
    ) VALUES (
      :userid,
      :devicehash,
      :devicename,
      :confirmationhash
    );";
    $data = [
      "userid" => $userid,
      "devicehash" => $devicehash,
      "devicename" => $devicename,
      "confirmationhash" => $confirmationhash,
    ];
    $statement = $pdo->prepare($query);
    $statement->execute($data);
    $deviceid = $pdo->lastInsertId() ?: exit_with_error(500,
      "Failed to create deviceid."
    );

    return (int) $deviceid;
  }

  public static function add_user($email) {

    $pdo = self::connect();
    $query = "INSERT INTO users (email) VALUES(?);";
    $statement = $pdo->prepare($query);
    $statement->execute([$email]);
    $userid = $pdo->lastInsertId() ?: exit_with_error(500,
      "Failed to create userid."
    );

    return (int) $userid;
  }

  public static function confirm_device($deviceid) {

    $pdo = self::connect();
    $query = "UPDATE devices SET confirmed = now() WHERE deviceid = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$deviceid]);
    $updated_rows = $statement->rowCount();

    if ($updated_rows < 1) {exit_with_error(500, "No device affected.");}
    if ($updated_rows > 1) {exit_with_error(500, "Multiple devices affected.");}

    return true;
  }

  public static function confirm_user($userid) {

    $pdo = self::connect();
    $query = "UPDATE users SET confirmed = now() WHERE userid = ?;";
    $statement = $pdo->prepare($query);
    $statement->execute([$userid]);
    $updated_rows = $statement->rowCount();

    if ($updated_rows < 1) {exit_with_error(500, "No user affected.");}
    if ($updated_rows > 1) {exit_with_error(500, "Multiple users affected.");}

    return true;
  }

  public static function add_farm($farm) {
    $pdo = self::connect();
    $query = "INSERT INTO farms (
      farmname,
      module_chicken,
      module_marketgarden,
      module_goats,
      module_bees
    ) VALUES (
      :farmname,
      :module_chicken,
      :module_marketgarden,
      :module_goats,
      :module_bees
    );";
    $statement = $pdo->prepare($query);
    $statement->execute([
      "farmname" => $farm['farmname'],
      "module_chicken" => $farm['module_chicken'],
      "module_marketgarden" => $farm['module_marketgarden'],
      "module_goats" => $farm['module_goats'],
      "module_bees" => $farm['module_bees'],
    ]);
    $farmid = $pdo->lastInsertId() ?: exit_with_error(500,
      "Failed to add farm to database."
    );
    $farmmember = [
      "farmid" => $farmid,
      "userid" => $farm['owner'],
      "role" => "owner",
    ];
    self::farm_add_member($farmmember);
    return $farmid;
  }

  public static function farm_add_member($member) {
    $pdo = self::connect();
    $query = "INSERT INTO farmmembers (
      farmid,
      userid,
      role
    ) VALUES (
      :farmid,
      :userid,
      :role
    );";
    $statement = $pdo->prepare($query);
    $statement->execute([
      "farmid" => $member['farmid'],
      "userid" => $member['userid'],
      "role" => $member['role'],
    ]);
    $row_count = $statement->rowCount();
    if ($row_count !== 1) {exit_with_error(500, "Could not set user role.");}
    return true;
  }

  public static function get_farm_role($farmid, $userid) {
    $pdo = self::connect();
    $query = "SELECT role
      FROM farmmembers
      WHERE farmid = :farmid
      AND userid = :userid;";
    $statement = $pdo->prepare($query);
    $statement->execute([
      "farmid" => $farmid,
      "userid" => $userid,
    ]);
    $role = $statement->fetchColumn();
    return $role;
  }

  public static function get_farms($userid) {
    $pdo = self::connect();
    $query = "SELECT farms.*, farmmembers.role
      FROM farms
      LEFT JOIN farmmembers
      ON farms.farmid = farmmembers.farmid
      WHERE farmmembers.userid = :userid;";
    $statement = $pdo->prepare($query);
    $statement->execute(["userid" => $userid]);
    $farms = $statement->fetchAll(PDO::FETCH_ASSOC);
    foreach ($farms as $key => $farm) {
      $farms[$key]["members"] = self::get_farmmembers($farm["farmid"]);
    }
    return $farms;
  }

  private static function get_farmmembers($farmid) {
    $pdo = self::connect();
    $query = "SELECT farmmembers.userid, farmmembers.role, users.email
      FROM farmmembers
      LEFT JOIN users
      ON farmmembers.userid = users.userid
      WHERE farmmembers.farmid = :farmid;";
    $statement = $pdo->prepare($query);
    $statement->execute(["farmid" => $farmid]);
    $farmmembers = $statement->fetchAll(PDO::FETCH_ASSOC);
    return $farmmembers;
  }

  public static function farm_update_modules($farm) {
    $pdo = self::connect();
    $query = "UPDATE farms
      SET
        module_chicken = :module_chicken,
        module_marketgarden = :module_marketgarden,
        module_goats = :module_goats,
        module_bees = :module_bees
      WHERE farmid = :farmid;";
    $statement = $pdo->prepare($query);
    return $statement->execute([
      "farmid" => $farm['farmid'],
      "module_chicken" => $farm['module_chicken'],
      "module_marketgarden" => $farm['module_marketgarden'],
      "module_goats" => $farm['module_goats'],
      "module_bees" => $farm['module_bees'],
    ]);
  }

  public static function farm_rename($farm) {
    $pdo = self::connect();
    $query = "UPDATE farms
      SET
        farmname = :farmname
      WHERE farmid = :farmid;";
    $statement = $pdo->prepare($query);
    return $statement->execute([
      "farmid" => $farm['farmid'],
      "farmname" => $farm['farmname'],
    ]);
  }

  public static function remove_all_farmmembers($farmid) {
    $pdo = self::connect();
    $query = "DELETE FROM farmmembers
      WHERE farmid = :farmid;";
    $statement = $pdo->prepare($query);
    return $statement->execute([
      "farmid" => $farmid,
    ]);
  }

  public static function farm_update_member($member) {
    $pdo = self::connect();
    if ($member['role'] === 'owner') {
      $query = "UPDATE farmmembers
        SET
          role = :new_role
        WHERE farmid = :farmid
          AND role = :old_role";
      $statement = $pdo->prepare($query);
      $statement->execute([
        "old_role" => "owner",
        "new_role" => "admin",
        "farmid" => $member['farmid'],
      ]);
    }
    $query = "UPDATE farmmembers
      SET
        role = :role
      WHERE farmid = :farmid
        AND userid = :userid";
    $statement = $pdo->prepare($query);
    return $statement->execute([
      "role" => $member['role'],
      "farmid" => $member['farmid'],
      "userid" => $member['userid'],
    ]);
  }

  public static function farm_remove_member($input) {
    $pdo = self::connect();
    $query = 'DELETE FROM farmmembers
      WHERE farmid = :farmid
        AND userid = :userid';
    $statement = $pdo->prepare($query);
    return $statement->execute([
      "farmid" => $input['farmid'],
      "userid" => $input['userid'],
    ]);
  }

}
