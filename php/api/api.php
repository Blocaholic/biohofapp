<?php
require_once __DIR__ . '/Utils.php';
require_once __DIR__ . '/endpoints/Auth.php';
require_once __DIR__ . '/endpoints/Devices.php';
require_once __DIR__ . '/endpoints/Farms.php';
require_once __DIR__ . '/endpoints/Bedblock.php';

Utils::configure_error_handling();

header("Content-type: application/json; charset=UTF-8");

function exit_with_error($code, $body) {
  http_response_code($code);
  exit(json_encode($body));
}

$valid_endpoints = [
  'devices' => ['PATCH', 'POST'],
  'auth' => ['POST'],
  'farms' => ['POST', 'PATCH', 'GET', 'DELETE'],
  'bedblock' => ['POST', 'GET'],
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
  exit_with_error(404, [
    "message" => "Unknown endpoint '$endpoint'",
    "validEndpoints" => array_keys($valid_endpoints),
  ]);
}

if (!in_array($method, $http_methods)) {
  exit_with_error(501, [
    "message" => "Unknown http request method '$method'",
    "validHttpRequestMethods" => $http_methods,
  ]);
}

if (!in_array($method, $valid_endpoints[$endpoint])) {
  exit_with_error(405, [
    "message" => "Http request method '$method' not allowed for endpoint '$endpoint'",
    "validMethods" => $valid_endpoints[$endpoint],
  ]);
}

try {
  $result = $class::$method($parts[3] ?? null);
  if (!$result) {
    exit_with_error(500, ["message" => "Something went wrong."]);
  }
  echo json_encode($result);
} catch (\Throwable $e) {
  exit_with_error(500, ["message" => json_encode(["message" => $e->getMessage(), "code" => $e->getCode(), "file" => $e->getFile(), "line" => $e->getLine(), "trace" => $e->getTrace()])]);
}
