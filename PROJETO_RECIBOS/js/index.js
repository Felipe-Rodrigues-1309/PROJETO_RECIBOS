// adicionar inputs 
// Função para adicionar um novo grupo de inputs e um novo recibo
function adicionarInputEntradas_novo() {
    const area = document.getElementById('inputsArea'); // Área onde ficam os grupos de inputs
    const grupos = area.querySelectorAll('.inputGroup'); // Todos os grupos de inputs atuais
    const original = grupos[grupos.length - 1]; // Pega o último grupo para clonar
    const clone = original.cloneNode(true); // Clona o grupo de inputs
    clone.querySelectorAll('input').forEach(input => input.value = ''); // Limpa os valores dos inputs clonados
    area.appendChild(clone); // Adiciona o clone na área de inputs

    // Máscara de moeda para o novo input .valor
    const novoInputValor = clone.querySelector('.valor');
    novoInputValor.addEventListener('input', function(e) {
        // Remove tudo que não for número, divide por 100 para centavos, formata e adiciona R$
        let v = e.target.value.replace(/\D/g, '');
        v = (v/100).toFixed(2) + '';
        v = v.replace('.', ',');
        v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        e.target.value = 'R$ ' + v;
    });

    // Clonar recibo
    const recibosArea = document.getElementById('recibosArea'); // Área dos recibos
    const recibos = recibosArea.querySelectorAll('.reciboGroup'); // Todos os recibos atuais
    const reciboOriginal = recibos[recibos.length - 1]; // Pega o último recibo para clonar
    const reciboClone = reciboOriginal.cloneNode(true); // Clona o recibo
    reciboClone.querySelectorAll('input').forEach(input => input.value = ''); // Limpa os campos do recibo clonado
    recibosArea.appendChild(reciboClone); // Adiciona o clone na área dos recibos
}

// Função para imprimir os recibos preenchendo os dados de cada grupo de inputs
function imprimir() {
    const grupos = document.querySelectorAll('.inputGroup'); // Todos os grupos de inputs
    const recibos = document.querySelectorAll('.reciboGroup'); // Todos os recibos
    grupos.forEach((grupo, idx) => {
        // Pega os valores preenchidos em cada grupo de inputs
        const nome = grupo.querySelector('.nome').value;
        const valorMascara = grupo.querySelector('.valor').value;
        const valor = getValorNumerico(valorMascara); // Converte o valor formatado para número
        const referente = grupo.querySelector('.referente').value;
        const data = grupo.querySelector('.data').value;

        // Preenche os campos do recibo correspondente
        const recibo = recibos[idx];
        recibo.querySelector('.Valor2').value = valorMascara;
        recibo.querySelector('.ValorExtenso').value = numeroPorExtenso(valor);
        recibo.querySelector('.Nome').value = nome;
        recibo.querySelector('.referente').value = referente;
        recibo.querySelector('.DataExtenso').value = dataPorExtenso(data); // Data por extenso
    });

    window.print(); // Abre a janela de impressão
}

// Função para converter número em valor por extenso (até 1 milhão)
function numeroPorExtenso(valor) {
    const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
    const especiais = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
    const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
    const centenas = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

    valor = Number(valor).toFixed(2).replace(",", "."); // Garante duas casas decimais e ponto como separador
    let partes = valor.split(".");
    let reais = parseInt(partes[0]);
    let centavos = parseInt(partes[1]);

    // Função interna para converter cada parte em texto
    function extenso(n) {
        let texto = "";
        if (n === 0) return "";
        if (n === 100) return "cem";
        if (n === 1000000) return "um milhão";
        if (n > 1000000) return "";

        if (n >= 1000000) {
            texto += "um milhão";
            n = n % 1000000;
            if (n > 0) texto += " e ";
        }
        if (n >= 1000) {
            if (n >= 2000) {
                texto += extenso(Math.floor(n / 1000)) + " mil";
            } else if (n >= 1000) {
                texto += "mil";
            }
            n = n % 1000;
            if (n > 0) texto += " e ";
        }
        if (n >= 100) {
            texto += centenas[Math.floor(n / 100)];
            n = n % 100;
            if (n > 0) texto += " e ";
        }
        if (n >= 20) {
            texto += dezenas[Math.floor(n / 10)];
            n = n % 10;
            if (n > 0) texto += " e ";
        }
        if (n >= 10 && n < 20) {
            texto += especiais[n - 10];
            n = 0;
        }
        if (n > 0 && n < 10) {
            texto += unidades[n];
        }
        return texto;
    }

    let texto = "";
    if (reais > 0) {
        texto += extenso(reais) + (reais === 1 ? " real" : " reais");
    }
    if (centavos > 0) {
        if (texto) texto += " e ";
        texto += extenso(centavos) + (centavos === 1 ? " centavo" : " centavos");
    }
    if (!texto) texto = "zero real";
    return texto;
}

// Formatar o input .valor como moeda BRL ao digitar (apenas para o primeiro input ao carregar a página)
const inputValor = document.querySelector('.valor');
if (inputValor) {
    inputValor.addEventListener('input', function(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = (v/100).toFixed(2) + '';
        v = v.replace('.', ',');
        v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        e.target.value = 'R$ ' + v;
    });
}

// Aplica a máscara de moeda ao primeiro input .valor ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    const primeiroInputValor = document.querySelector('.InputsRecibos1 .valor');
    if (primeiroInputValor) {
        primeiroInputValor.addEventListener('input', function(e) {
            let v = e.target.value.replace(/\D/g, '');
            v = (v/100).toFixed(2) + '';
            v = v.replace('.', ',');
            v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            e.target.value = 'R$ ' + v;
        });
    }
});

// Remover a máscara para pegar o valor numérico ao imprimir
function getValorNumerico(valor) {
    if (!valor) return 0;
    valor = valor.replace(/[^\d,]/g, '').replace(',', '.');
    if (valor === "") return 0;
    return parseFloat(valor);
}

// Função para remover o último grupo de inputs e recibo
function removerUltimoInput() {
    const area = document.getElementById('inputsArea');
    const grupos = area.querySelectorAll('.inputGroup');
    if (grupos.length > 1) { // Garante que sempre fique pelo menos um grupo
        grupos[grupos.length - 1].remove();

        // Também remove o último recibo correspondente
        const recibosArea = document.getElementById('recibosArea');
        const recibos = recibosArea.querySelectorAll('.reciboGroup');
        if (recibos.length > 1) {
            recibos[recibos.length - 1].remove();
        }
    }
}

// Função para converter a data do input em formato por extenso (ex: 26 de maio de 2025)
function dataPorExtenso(dataStr) {
    if (!dataStr) return '';
    const meses = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const [ano, mes, dia] = dataStr.split('-');
    if (!ano || !mes || !dia) return '';
    return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${ano}`;
}

// Adiciona funcionário ao localStorage
// Salva o nome digitado no input de cadastro no localStorage, se não existir ainda
function adicionarFuncionario() {
    const input = document.getElementById('novoFuncionario');
    let nome = input.value.trim();
    if (!nome) return;
    let lista = JSON.parse(localStorage.getItem('funcionarios') || '[]');
    if (!lista.includes(nome)) {
        lista.push(nome);
        localStorage.setItem('funcionarios', JSON.stringify(lista));
    }
    input.value = '';
    atualizarDatalistFuncionarios();
    alert(`${nome} Cadastrado Com Sucesso!`);
}

// Cria ou atualiza o datalist para autocomplete dos nomes dos funcionários
function atualizarDatalistFuncionarios() {
    let lista = JSON.parse(localStorage.getItem('funcionarios') || '[]');
    let datalist = document.getElementById('listaFuncionarios');
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = 'listaFuncionarios';
        document.body.appendChild(datalist);
    }
    datalist.innerHTML = '';
    lista.forEach(nome => {
        const option = document.createElement('option');
        option.value = nome;
        datalist.appendChild(option);
    });
    // Atualiza todos os inputs .nome para usar o datalist
    document.querySelectorAll('.nome').forEach(input => {
        input.setAttribute('list', 'listaFuncionarios');
    });


// Abrir o modal
document.getElementById('abrirModalFuncionario').onclick = function() {
    document.getElementById('modalCadastro').classList.add('ativo');
    document.getElementById('novoFuncionarioModal').value = '';
    document.getElementById('novoFuncionarioModal').focus();
    atualizarListaFuncionariosModal();
};
// Fechar o modal ao clicar no X
document.getElementById('fecharModalFuncionario').onclick = function() {
    document.getElementById('modalCadastro').classList.remove('ativo');
};

// Salvar funcionário
document.getElementById('btnSalvarFuncionario').onclick = function() {
    const input = document.getElementById('novoFuncionarioModal');
    let nome = input.value.trim();
    if (!nome) return alert('Digite um nome!');
    let lista = JSON.parse(localStorage.getItem('funcionarios') || '[]');
    if (!lista.includes(nome)) {
        lista.push(nome);
        localStorage.setItem('funcionarios', JSON.stringify(lista));
        atualizarDatalistFuncionarios();
        atualizarListaFuncionariosModal();
        alert(`${nome} Cadastrado com Sucesso!`);
    } else {
        alert('Funcionário já cadastrado!');
    }
    input.value = '';
    input.focus();
};

// Atualiza a lista de funcionários no modal com botões de editar e excluir
function atualizarListaFuncionariosModal() {
    let lista = JSON.parse(localStorage.getItem('funcionarios') || '[]');
    lista.sort((a, b) => a.localeCompare(b, 'pt-BR')); // Ordena alfabeticamente

    const ul = document.getElementById('listaFuncionariosModal');
    ul.innerHTML = '';
    lista.forEach((nome, idx) => {
        const li = document.createElement('li');

        // Nome
        const spanNome = document.createElement('span');
        spanNome.textContent = nome;

        // Botão Editar
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = function() {
            const inputEdit = document.createElement('input');
            inputEdit.type = 'text';
            inputEdit.value = nome;
            inputEdit.style.marginRight = '10px';
            li.insertBefore(inputEdit, spanNome);
            li.removeChild(spanNome);
            btnEditar.style.display = 'none';
            btnExcluir.style.display = 'none';

            // Botão Salvar
            const btnSalvar = document.createElement('button');
            btnSalvar.textContent = 'Salvar';
            btnSalvar.className = 'btn-salvar-func';
            btnSalvar.onclick = function() {
                const novoNome = inputEdit.value.trim();
                if (!novoNome) {
                    alert('Digite um nome!');
                    return;
                }
                if (lista.includes(novoNome) && novoNome !== nome) {
                    alert('Já existe um funcionário com esse nome!');
                    return;
                }
                lista[idx] = novoNome;
                localStorage.setItem('funcionarios', JSON.stringify(lista));
                atualizarDatalistFuncionarios();
                atualizarListaFuncionariosModal();
            };

            // Botão Cancelar
            const btnCancelar = document.createElement('button');
            btnCancelar.textContent = 'Cancelar';
            btnCancelar.onclick = function() {
                atualizarListaFuncionariosModal();
            };

            const botoesEdicao = document.createElement('span');
            botoesEdicao.className = 'botoes-func';
            botoesEdicao.appendChild(btnSalvar);
            botoesEdicao.appendChild(btnCancelar);

            li.appendChild(botoesEdicao);
        };

        // Botão Excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = function() {
            if (confirm(`Excluir ${nome}?`)) {
                // Precisa remover do localStorage usando o nome original, não o índice do array ordenado
                let listaOriginal = JSON.parse(localStorage.getItem('funcionarios') || '[]');
                const idxOriginal = listaOriginal.indexOf(nome);
                if (idxOriginal > -1) {
                    listaOriginal.splice(idxOriginal, 1);
                    localStorage.setItem('funcionarios', JSON.stringify(listaOriginal));
                }
                atualizarDatalistFuncionarios();
                atualizarListaFuncionariosModal();
            }
        };

        const botoes = document.createElement('span');
        botoes.className = 'botoes-func';

        btnEditar.className = 'btn-editar';
        btnExcluir.className = 'btn-excluir';

        botoes.appendChild(btnEditar);
        botoes.appendChild(btnExcluir);

        // Adiciona na ordem: nome, editar, excluir
        li.appendChild(spanNome);
        li.appendChild(botoes);

        ul.appendChild(li);
    });
}

// Ao abrir o modal, atualiza a lista de funcionários
document.getElementById('abrirModalFuncionario').onclick = function() {
    document.getElementById('modalCadastro').classList.add('ativo');
    document.getElementById('novoFuncionarioModal').value = '';
    document.getElementById('novoFuncionarioModal').focus();
    atualizarListaFuncionariosModal();
};

};

// Atualiza o datalist ao carregar a página
window.addEventListener('DOMContentLoaded', atualizarDatalistFuncionarios);

