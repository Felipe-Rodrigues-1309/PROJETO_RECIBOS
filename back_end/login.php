<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


session_start();
require_once __DIR__ . '/../conexao.php';

// pega dados do formulario
$email = trim($_POST['email'] ?? '');
$senha = $_POST['senha'] ?? '';

//validaçao 
if ($email === '' || $senha === '') {
    echo "<script>alert('E-mail e senha são obrigatórios'); window.history.back();</script>";
    exit();
}

// busca usuário no banco
$sql = "SELECT id, nome, senha FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();
$usuario = $result->fetch_assoc();


// verifica usuário
if ($usuario && password_verify($senha, $usuario['senha'])) {

    // cria sessão
    $_SESSION['id'] = $id['id'];
    $_SESSION['nome'] = $usuario['nome'];

    // redireciona
    header("Location: http://localhost:8000/index.php");
    exit();

} else {
    echo "<script>alert('E-mail ou senha inválidos'); window.history.back();</script>";
}

$stmt->close();
$conn->close();
?>