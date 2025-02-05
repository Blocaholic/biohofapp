<?php

class Utils {

  public static function configure_error_handling() {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);

    $exception_handler = function ($e) {
      exit_with_error(500, Utils::exception2json($e));
    };

    set_exception_handler($exception_handler);

    set_error_handler(function ($severity, $message, $file, $line) {
      if (!(error_reporting() & $severity)) {return;}
      try {throw new ErrorException($message, 0, $severity, $file, $line);} catch (ErrorException $e) {
        exit_with_error(500, Utils::exception2json($e));
      }
    });
  }

  public static function randomString($length) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
      $randomString .= $chars[random_int(0, strlen($chars) - 1)];
    }
    return $randomString;
  }

  public static function exception2json($e) {
    $error_array = [
      'error' => [
        'message' => $e->getMessage(),
        'code' => $e->getCode(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTrace(),
      ]];
    if (get_class($e) === "ErrorException") {
      $error_array['severity'] = intl_error_name($e->getSeverity());
    }
    return json_encode($error_array);
  }

  public static function equalsIntegerGreater0($int) {
    return ($int === (string) (int) $int || $int === (int) $int) && $int > 0;
  }
}
