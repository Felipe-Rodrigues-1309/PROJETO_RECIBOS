<?php
// Conectar ao banco
$host = "127.0.0.1";
$usuario = "root";
$senha = "";
$banco = "funcionarios";

$conn = new mysqli($host, $usuario, $senha, $banco);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Pegar dados do formulário
$nome = $_POST['nome'];


// Inserir no banco
$sql = "INSERT INTO cadastro 
(nome)
VALUES (?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "s", 
    $nome
);

if ($stmt->execute()) {
        $sucesso = htmlspecialchars($nome) . " Cadastrado com sucesso!";;
} else {
    echo "Erro: " . $stmt->error;
}

$conn->close();
?>





<!--inicio html !-->
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Alerta Customizado</title>
<style>
/* Fundo escuro transparente */
#overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: black; /* preto com transparência */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Caixa do alerta */
#alertBox {
    background-color: yellowgreen; /* preto */
    color: black;
    padding: 60px 90px;
    border-radius: 10px;
    text-align: center;
    font-family: Arial, sans-serif;
}

#alertBox button {
    margin-top: 15px;
    padding: 5px 15px;
    border: none;
    background-color: #000000ff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}
</style>
</head>
<body>

<div id="overlay" style="display:none;">
    <div id="alertBox">
        <p id="alertMessage"></p>
        <button onclick="closeAlert()">OK</button>
    </div>
</div>

<script>
function showAlert(msg) {
    document.getElementById('alertMessage').innerText = msg;
    document.getElementById('overlay').style.display = 'flex';
}

function closeAlert() {
    // Redireciona para a página principal ou formulário
    window.location.href = '../index.html';
}
</script>

<?php if (!empty($sucesso)) : ?>
    <script>showAlert("<?= $sucesso ?>");</script>
<?php elseif (!empty($erro)) : ?>
    <script>showAlert("<?= $erro ?>");</script>
<?php endif; ?>

</body>
</html>