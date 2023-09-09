<?php

require_once __DIR__ . '/Utils.php';

Utils::configure_error_handling();

spl_autoload_register(function ($class) {
  require __DIR__ . "/endpoints/$class.php";
});

header("Content-type: application/json; charset=UTF-8");

$valid_endpoints = [
  'devices' => ['PATCH', 'POST'],
  'auth' => ['POST'],
];

$http_methods = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'PATCH',
];

$parts = explode("/", $_SERVER["REQUEST_URI"]);
$endpoint = $parts[2] ?? null;
$class = ucfirst($endpoint);
$method = $_SERVER['REQUEST_METHOD'];

if (!key_exists($endpoint, $valid_endpoints)) {
  http_response_exit(404, [
    "message" => "Unknown endpoint '$endpoint'",
    "valid_endpoints" => array_keys($valid_endpoints),
  ]);
}

if (!in_array($method, $http_methods)) {
  http_response_exit(501, [
    "message" => "Unknown HTTP request method '$method'",
    "valid_http_request_methods" => $http_methods,
  ]);
}

if (!in_array($method, $valid_endpoints[$endpoint])) {
  http_response_exit(405, [
    "message" => "Http request method '$method' not allowed for endpoint '$endpoint'",
    "valid_methods" => $valid_endpoints[$endpoint],
  ]);
}

echo json_encode($class::$method($parts[3] ?? null));

function http_response_exit($code, $body) {
  http_response_code($code);
  exit(json_encode($body));
}
