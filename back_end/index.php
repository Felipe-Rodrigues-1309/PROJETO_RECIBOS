<?php
// ===============================
// CONEXÃO COM O BANCO
// ===============================
$host = "127.0.0.1";
$usuario = "root";
$senha = "";
$banco = "recibos";

$conn = new mysqli($host, $usuario, $senha, $banco);

// Verificar conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// ===============================
// RECEBER DADOS DO FORMULÁRIO
// ===============================
$nome = $_POST['nome'] ?? '';

// Validação simples
if (empty($nome)) {
    echo "
    <!DOCTYPE html>
    <html lang='pt-br'>
    <head>
        <meta charset='UTF-8'>
        <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    </head>
    <body>
        <script>
            Swal.fire({
                icon: 'warning',
                title: 'Campo obrigatório',
                text: 'O nome não pode estar vazio.',
                confirmButtonColor: '#0d6efd'
            }).then(() => {
                window.history.back();
            });
        </script>
    </body>
    </html>";
    exit;
}

// ===============================
// INSERÇÃO NO BANCO
// ===============================
$sql = "INSERT INTO cadastro (nome) VALUES (?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $nome);

// ===============================
// RESPOSTA VISUAL CORPORATIVA
// ===============================
if ($stmt->execute()) {

    echo "
    <!DOCTYPE html>
    <html lang='pt-br'>
    <head>
        <meta charset='UTF-8'>
        <title>Cadastro</title>
        <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    </head>
    <body>
        <script>
            Swal.fire({
                icon: 'success',
                title: 'Cadastro concluído',
                text: 'O usuário foi cadastrado com sucesso no sistema.',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#1a1357ff',
                background: '#ffffff',
                color: '#212529',
                timer: 5000,
                timerProgressBar: true
            }).then(() => {
                window.location.href = 'http://localhost/PROJETO_RECIBOS/index.html';
            });
        </script>
    </body>
    </html>";

} else {

    $erro = addslashes($conn->error);

    echo "
    <!DOCTYPE html>
    <html lang='pt-br'>
    <head>
        <meta charset='UTF-8'>
        <title>Erro</title>
        <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    </head>
    <body>
        <script>
            Swal.fire({
                icon: 'error',
                title: 'Falha no cadastro',
                text: 'Não foi possível concluir a operação.',
                confirmButtonText: 'Voltar',
                confirmButtonColor: '#dc3545',
                background: '#ffffff',
                color: '#212529'
            }).then(() => {
                window.history.back();
            });
        </script>
    </body>
    </html>";
}

// ===============================
$conn->close();
?>
