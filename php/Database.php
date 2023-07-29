<?php

class Database {
  private $host = 'localhost';
  private $dbname = 'd03db2e1';
  private $user = 'd03db2e1';
  private $password = 'MEkkrvrT2KeLhcg2rM5B';

  public static function connect() {
    try {

      $pdo = new PDO("mysql:dbname=$dbname;host=$host", $user, $password);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $pdo;
    } catch (PDOException $e) {
      throw new Exception (
        'Verbindung zur Datenbank fehlgeschlagen!',
        $e->getCode(),
        $e
      );
    }
  }
}

?>