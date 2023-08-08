<?php

class Database {
  private static $dbhost = '127.0.0.1';
  private static $dbname = 'd03db2e1';
  private static $dbuser = 'd03db2e1';
  private static $dbpassword = 'MEkkrvrT2KeLhcg2rM5B';

  public static function connect() {
    try {
      $pdo = new PDO(
        "mysql:dbname=" . self::$dbname . ";host=" . self::$dbhost,
        self::$dbuser,
        self::$dbpassword
      );
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $pdo;
    } catch (PDOException $e) {
      throw new Exception(
        'Verbindung zur Datenbank fehlgeschlagen.',
        $e->getCode(),
        $e
      );
    }
  }
}
