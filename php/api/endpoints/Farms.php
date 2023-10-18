<?php

class Farms {
  public static function POST() {

    http_response_code(201);
    return ['farmid' => 666];
  }
}
