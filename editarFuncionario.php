<?php
// MOSTRA LOG DE ERROS
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once __DIR__ . '/back_end/conexao.php';

$id = $_POST['id'] ?? '';
$nome = $_POST['nome'] ?? '';

$stmt = $conn->prepare("UPDATE funcionarios SET nome = ? WHERE id = ?");
$stmt->bind_param("si", $nome, $id);

if($stmt->execute()){
    header("Location: index.php");
}else{
    echo "erro";
}

$stmt->close();
$conn->close();

?>