<?php

// mostra log de erros 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// conecta com o banco
$host = "127.0.0.1";
$usuario = "felipe";
$senha = "52461309";
$banco = "recibos";

$conn = new mysqli($host, $usuario, $senha, $banco);

// Verificar conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$nomes = $conn->query("SELECT * FROM funcionarios ORDER BY nome ASC ");

$funcionario = $conn->query("SELECT * FROM funcionarios ORDER BY nome ASC ");

?>
