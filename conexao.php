<?php
// ===============================
// CONEXÃO COM O BANCO
// ===============================
$host = "127.0.0.1";
$usuario = "root";
$senha = "52461309";
$banco = "recibos";

$conn = new mysqli($host, $usuario, $senha, $banco);

// Verificar conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}
?>