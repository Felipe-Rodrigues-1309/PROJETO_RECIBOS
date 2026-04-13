<?php
require_once __DIR__ . '/../conexao.php';

$usuario = trim($_POST['usuario'] ?? '');
$email = trim($_POST['email'] ?? '');
$senha = $_POST['senha'] ?? '';


if ($usuario === '' || $email === '' || $senha === ''){
    echo "<script>alert('Usuário, e-mail e senha são obrigatórios.'); window.history.back();</script>";
    exit();

}

