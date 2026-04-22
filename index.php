<?php
// MOSTRA LOG DE ERROS
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once __DIR__ . '/back_end/conexao.php';

$nomes = $conn->query("SELECT * FROM funcionarios ORDER BY nome ASC ");

$funcionario = $conn->query("SELECT * FROM funcionarios ORDER BY nome ASC ");

?>

<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/recibos.css" />
    <script src="js/index.js"></script>
    <link
      rel="shortcut icon"
      href="img/favicon_io/favicon-16x16.png"
      type="image/x-icon"
    />

    <a href=""></a>
    <title>Recibo</title>
  </head>
  <body>
    <div class="TelaInicial">
      <h1 class="titulo">
        Recibos
      </h1>
      <div>
        <img
          src="img/minhalogotipo.gif"
          alt=""
          width="250px"
          class="logo"
          onclick="imprimir()"
        />
      </div>
      <button
        type="button"
        class="botao"
        onclick="adicionarInputEntradas_novo()"
      >
        <img src="img/adicionar-ficheiro.png" alt="" width="60px" />
      </button>
      <button type="button" onclick="removerUltimoInput()" class="botao">
        <img src="img/erro.png" alt="" width="60px" />
      </button>
      <button type="button" id="abrirModalFuncionario" class="caraPng">
        <img src="img/cara.png" alt="" width="60px" />
      </button>

      <div id="inputsArea">
        <div class="InputsRecibos1 inputGroup">
          
          <select class="nome" name="nome">
            <option value="">
              Selecione O Funcionário
            </option>
            <?php while ($row = $nomes->fetch_assoc()):?>
              <option value="<?=$row['id'] ?>">
                <?=$row['nome']?>
              </option>
            <?php endwhile; ?>
          </select>
          <input type="text" class="valor" placeholder="Valor" />
          <input type="text" class="referente" placeholder="Referente á"/>
          <input type="date" class="data"/>
        </div>
      </div>
    </div>
    <div id="recibosArea">
      <div class="formulario1 reciboGroup">
        <h1 class="recibostitulo">Recibo</h1>
        <h2 class="Valor1">Valor:<input type="text" class="Valor2" /></h2>
        <h2>Recebi(emos) de</h2>
        <h3>A quantia de: <input type="text" class="ValorExtenso" /></h3>
        <h3>
          Correspondente a:
          <input type="text" class="referente" id="referente2" />
        </h3>
        <h3 class="Espaco1">E para a clareza firmo(amos) o presente</h3>
        <h3 class="Sobral">
          Sobral, <input type="text" class="DataExtenso" />
        </h3>
        <h3>Nome: <input type="text" class="Nome" /></h3>
        <h3>Assinatura_______________________________________</h3>
        <br />
      </div>
    </div>

    <!-- Modal de Cadastro de Funcionário -->
    <form action="back_end/index.php" method="post">
      <div id="modalCadastro" class="modal-funcionario">
        <div class="modal-content-funcionario">
          <span class="close-modal" id="fecharModalFuncionario">&times;</span>
          <h2 class="tituloModal">Cadastrar Funcionário</h2>
          <input
            type="text"
            id="novoFuncionarioModal"
            placeholder="Nome do funcionário"
            required
            name="nome"
          />
          <button type="submit" id="botaoSalvar">
            <img src="img/disquete.png" alt="" width="60px" />
          </button>
    </form>
            <h3>Editar Funcionários</h3>
            <ul class="listaEditarFuncionarios">
              <?php while ($row = $funcionario->fetch_assoc()):?>
                <li>
                  <form action="editarFuncionario.php" method="post">
                    <input type="hidden" name="id" value="<?=$row['id']?>">
                    <input type="text" name="nome" value="<?=$row['nome']?>"> 
                    <button type="submit" class="btn-editar"><img src="img/editar.png" width="40px"></button>
                  </form>
                  <form action="excluirFuncionario.php" method="post">
                      <input type="hidden" name="id" value="<?=$row['id']?>">
                      <button type="submit" class="btn-excluir"><img src="img/excluir.png" width="40px"></button>
                  </form>
                </li>
              <?php endwhile; ?>
            </ul>
        </div>
      </div>


<!--proximo input ao apertar enter-->

<script>
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const campo = e.target;

    // só funciona em inputs e selects
    if (!campo.matches("input, select")) return;

    e.preventDefault();

    // se for campo de data
    if (campo.classList.contains("data")) {
      adicionarInputEntradas_novo();

      // foca no novo grupo
      setTimeout(() => {
        const grupos = document.querySelectorAll(".inputGroup");
        const ultimoGrupo = grupos[grupos.length - 1];
        const primeiroCampo = ultimoGrupo.querySelector("select, input");

        if (primeiroCampo) {
          primeiroCampo.focus();
        }
      }, 100);

    } else {
      // pega todos os campos visíveis
      const campos = Array.from(document.querySelectorAll("input, select"));
      const index = campos.indexOf(campo);
      const proximo = campos[index + 1];

      if (proximo) {
        proximo.focus();
      }
    }
  }
});
</script>

  </body>
</html>
