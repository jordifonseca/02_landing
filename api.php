<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents('php://input'), true);

// Obtener credenciales (desde variables de entorno o hardcoded)
$MAILERLITE_API_KEY = getenv('MAILERLITE_API_KEY') ?: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjFjNmRmNjc5ZTdjNzM4YTNkMTg0NTA0MmZkZWI0ZGFhZTQyODc5MWM1MWVlOTYwMzc4MTJjZGVkNmMzYTA4OTYzN2IxMTQ1ZDdjYzA5MGIiLCJpYXQiOjE3Nzg3MDM4ODQuMjgyNjgyLCJuYmYiOjE3Nzg3MDM4ODQuMjgyNjg1LCJleHAiOjQ5MzQzNzc0ODQuMjc1NTY3LCJzdWIiOiIyMzY0MjI4Iiwic2NvcGVzIjpbXX0.vETvMlwHci0NGA0NybUVFoz0XTEhvPDTdzYi9SKQC_oMVMRjN8aY8hun9vvgjxHFc7hn7O1j7WkKIc3htcSAPiWtHTrG93xIFxTUH9iOOfEYe1Wwcklm4ZDWV3EzFAILBxUVMwZCKHFFwf_pwHsT34YlP8MbKSWef8qphgIPUZjYf915AwMdaKAueOw8VjzFss5QVjq8opseym7N0ekeEwm8T0Bxso_tQOMg7hFzYg2THDcTi6v6hpa3QnfJws8kyhSaPNI0YmnUnbJTfXIqF9XlaXCUR-FRRtvhe3hHyv6V12ORkbrwfRBilQrzIMyFWm_8vpuOTCgv_y6N3BzjnVBDHP3mkN1sc9QKu3NBBjyMgR0_jSFkrB6NyWyPHUZIbhhhdQ4S5w-BPRs5PbtUgY6wdScQpCT9nKe4nNwEDVt0X-ikJg2esC0vak0cG9iFl8eDDSfpn4LpMCioEkChE6RzS-M0YW0pY0V2Ov9CXE4RbUtYRVARVSiAxFhITC7H7TAyDcAjx0lcWP2QIORjQihUJ1No9CNg6vBx7V61JeXHCIKwILHS7nCZb5PElGVMZT_bv-wN72l5v6grnOm29jfjdeIHcs3DOMiRvcOILF_WhhfRnCofyKjG6WhLBiPpgoQ2l5XsJD5eoZQsKIYxjmeoQtCqP-96DHL8ns3QHPc';

if ($action === 'subscribe') {
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';

    if (empty($name) || empty($email)) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos incompletos']);
        exit();
    }

    $payload = json_encode([
        'email' => $email,
        'fields' => ['name' => $name]
    ]);

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\nAuthorization: Bearer {$MAILERLITE_API_KEY}",
            'content' => $payload,
            'timeout' => 10
        ]
    ]);

    $response = @file_get_contents('https://connect.mailerlite.com/api/subscribers', false, $context);

    if ($response === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al conectar con Mailerlite']);
        exit();
    }

    echo $response;
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Acción no válida']);
}
?>
