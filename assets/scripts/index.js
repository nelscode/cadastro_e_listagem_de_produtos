// Capturando elementos necessários
const btnEnviar = document.querySelector('#btnEnviar');
const btnCadastro = document.querySelector("#btnCadastro");
const formAviso = document.querySelector("#formAviso");
const corpoTabela = document.querySelector('#corpoTabela');

// Capturando inputs necessários
const nomeProduto = document.querySelector("#nomeProduto");
const valorProduto = document.querySelector("#valorProduto");

// Evento no botão "Enviar"
btnEnviar.addEventListener("click", (e) => {
    e.preventDefault();

    // Capturando valores dos inputs 
    const nomeProdutoValue = nomeProduto.value.trim();
    const valorProdutoValue = valorProduto.value.trim();
    const inputRadioSelecionado = document.querySelector("input[name='disponivel']:checked"); // Valor do input radio

    const aviso = document.querySelector("#aviso");

    if(nomeProdutoValue === "" || valorProdutoValue === "" || !inputRadioSelecionado){ // verificando se os campos foram preenchidos
        if(!aviso){ // Verificando se o aviso é existente
            const aviso = document.createElement("p"); // Criando elemento de aviso
            aviso.id = "aviso";
            aviso.innerHTML = "Preencha os campos necessários!";
            formAviso.appendChild(aviso);
        }
        return;
    }

    // removendo um aviso, se ele existir
    if(aviso){
        aviso.remove();
    }

    // Adicionando elementos a tabela
    const linhaTabela = document.createElement('tr');

    // Nome do produto
    const nomeProdutoTd = document.createElement('td');
    nomeProdutoTd.innerHTML = nomeProdutoValue;
    linhaTabela.appendChild(nomeProdutoTd);

    // Valor do Produto 
    const valorProdutoTd = document.createElement('td');
    valorProdutoTd.innerHTML = valorProdutoValue;
    linhaTabela.appendChild(valorProdutoTd);

    // Adicioando elementos ao corpo
    corpoTabela.appendChild(linhaTabela);

    // Ordenando tabela
    ordenarTabela();

    // Ocultando formulário e exibindo tabela e o botão de cadastrar
    document.querySelector("#formCadastro").style.display = "none";
    document.querySelector("#secTabela").style.display = "flex";
    document.querySelector("#secBotaoCadastro").style.display = "flex";
})

// Evento no botão de cadastro
btnCadastro.addEventListener("click", () => {
    // capturando o aviso
    const aviso = document.querySelector("#aviso");

    if(aviso){ // Removendo o aviso se ele existir
        aviso.remove();
    }

    // Limpando o formulário
    nomeProduto.value = "";
    valorProduto.value = "";
    document.querySelectorAll("input[name='disponivel']").forEach(radio => {radio.checked = false;});

    // Retornando ao formulário
    document.querySelector("#formCadastro").style.display = "flex";
    document.querySelector("#secTabela").style.display = "none";
    document.querySelector("#secBotaoCadastro").style.display = "none";
})

// Função para ordenar a tabela de acordo com o valor do produto
const ordenarTabela = () => {
    const linhas = Array.from(corpoTabela.querySelectorAll('tr')); // capturando as linhas da tabela

    linhas.sort((a, b) =>{ // ordenando as linhas pelo valor
        const valorA = parseFloat(a.children[1].innerText); 
        const valorB = parseFloat(b.children[1].innerText);
        return valorA - valorB;
    });

    // Limpando e ordenando
    corpoTabela.innerHTML = ""; 
    linhas.forEach(linha => corpoTabela.appendChild(linha))
}