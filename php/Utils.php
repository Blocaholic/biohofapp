<?php

class Utils {
  public static function randomString($length) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
      $randomString .= $chars[random_int(0, strlen($chars) - 1)];
    }
    return $randomString;
  }
}
