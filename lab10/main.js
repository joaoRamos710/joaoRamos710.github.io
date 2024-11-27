document.addEventListener("DOMContentLoaded", () => {
    fetchProdutos();
    atualizaCesto();
});

let produtos = [];

function fetchProdutos() {
    fetch("https://deisishop.pythonanywhere.com/products/")
        .then(response => {
            if (!response.ok) throw new Error("Erro ao acessar a API: " + response.status);
            return response.json();
        })
        .then(data => {
            produtos = data;
            carregarProdutos(produtos);
        })
        .catch(error => {
            console.error("Erro ao obter produtos:", error);
            document.getElementById("lista-produtos").innerHTML = `<li>Erro ao carregar os produtos.</li>`;
        });
}

function carregarProdutos(produtos) {
    const listaProdutos = document.getElementById("lista-produtos");
    listaProdutos.innerHTML = "";
    produtos.forEach(produto => {
        const artigo = criarProduto(produto);
        listaProdutos.appendChild(artigo);
    });
}

function criarProduto(produto) {
    const artigo = document.createElement("article");
    artigo.innerHTML = `
        <img src="${produto.image}" alt="${produto.title}">
        <h3>${produto.title}</h3>
        <p><strong>Preço:</strong> $${produto.price.toFixed(2)}</p>
        <p>${produto.description}</p>
        <button data-id="${produto.id}">+ Adicionar ao Cesto</button>
    `;
    artigo.querySelector("button").addEventListener("click", () => {
        adicionarAoCarrinho(produto);
    });
    return artigo;
}

document.getElementById("filtrar").addEventListener("change", () => {
    const categoriaSelecionada = document.getElementById("filtrar").value;
    filtrarProdutos(categoriaSelecionada);
});

function filtrarProdutos(categoria) {
    if (categoria === "Todas as categorias") {
        carregarProdutos(produtos);
    } else {
        const produtosFiltrados = produtos.filter(produto => produto.category === categoria);
        carregarProdutos(produtosFiltrados);
    }
}

document.getElementById("ordenar").addEventListener("change", () => {
    const ordem = document.getElementById("ordenar").value;
    ordenarProdutos(ordem);
});

function ordenarProdutos(ordem) {
    let produtosOrdenados = [...produtos];
    if (ordem === "crescente") {
        produtosOrdenados.sort((a, b) => a.price - b.price);
    } else if (ordem === "decrescente") {
        produtosOrdenados.sort((a, b) => b.price - a.price);
    }
    carregarProdutos(produtosOrdenados);
}

document.getElementById("pesquisa").addEventListener("input", () => {
    const textoPesquisa = document.getElementById("pesquisa").value.toLowerCase();
    pesquisarProdutos(textoPesquisa);
});

function pesquisarProdutos(textoPesquisa) {
    const produtosFiltrados = produtos.filter(produto => 
        produto.title.toLowerCase().includes(textoPesquisa)
    );
    carregarProdutos(produtosFiltrados);
}

function adicionarAoCarrinho(produto) {
    let produtosSelecionados = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    produtosSelecionados.push(produto);
    localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));
    atualizaCesto();
}

function atualizaCesto() {
    const listaCesto = document.getElementById("lista-cesto");
    listaCesto.innerHTML = "";
    const produtosSelecionados = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    produtosSelecionados.forEach(produto => {
        const artigo = criaProdutoCesto(produto);
        listaCesto.appendChild(artigo);
    });
    atualizaPrecoTotal();
}

function criaProdutoCesto(produto) {
    const artigo = document.createElement("article");
    artigo.innerHTML = `
        <h3>${produto.title}</h3>
        <img src="${produto.image}" alt="${produto.title}">
        <p><strong>Preço:</strong> $${produto.price.toFixed(2)}</p>
    `;
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "- Remover do cesto";
    botaoRemover.addEventListener("click", () => {
        removerProdutoDoCesto(produto.id);
    });
    artigo.appendChild(botaoRemover);
    return artigo;
}

function removerProdutoDoCesto(produtoID) {
    let produtosSelecionados = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    const indice = produtosSelecionados.findIndex(produto => produto.id === produtoID);
    if (indice !== -1) {
        produtosSelecionados.splice(indice, 1);
    }
    localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));
    atualizaCesto();
}

function atualizaPrecoTotal() {
    const produtosSelecionados = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
    const precoTotal = produtosSelecionados.reduce((total, produto) => total + produto.price, 0);
    document.getElementById("custo-total").textContent = `Custo Total: $${precoTotal.toFixed(2)}`;
}


document.getElementById("botao-comprar").addEventListener("click", realizarCompra);


function realizarCompra() {
    const estudanteDeisi = document.getElementById("estudante_deisi").checked;
    const cupaoDesconto = document.getElementById("cupao").value.trim();

   
    const produtosSelecionados = obterProdutosDoCesto();
    if (produtosSelecionados.length === 0) {
        exibirErro("Nenhum produto no cesto.");
        return;
    }

   
    const dadosCompra = prepararDadosCompra(produtosSelecionados, estudanteDeisi, cupaoDesconto);

    
    enviarCompra(dadosCompra);
}


function obterProdutosDoCesto() {
    return JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
}


function prepararDadosCompra(produtosSelecionados, estudante, cupao) {
    return {
        products: produtosSelecionados.map(produto => produto.id),
        student: estudante,
        coupon: cupao,
    };
}


function enviarCompra(dadosCompra) {
    fetch("https://deisishop.pythonanywhere.com/buy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCompra),
    })
        .then(response => tratarResposta(response))
        .then(data => processarResultadoCompra(data))
        .catch(error => {
            console.error("Erro ao processar a compra:", error.message);
            exibirErro(error.message);
        });
}


function tratarResposta(response) {
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 400) {
        throw new Error("Erro de validação: Dados inválidos ou produtos não fornecidos.");
    } else if (response.status === 405) {
        throw new Error("Erro: Método HTTP inválido. Use POST.");
    } else {
        throw new Error("Erro inesperado no servidor.");
    }
}


function processarResultadoCompra(data) {
    if (data.error) {
        exibirErro(data.error);
    } else {
        exibirResultado(data.totalCost, data.reference);
    }
}


function exibirResultado(total, referencia) {
    document.getElementById("valor-final").textContent = `Valor Final (com eventuais descontos): ${total} €`;
    document.getElementById("ref-bancaria").textContent = `Referência Bancária: ${referencia}`;
}


function exibirErro(mensagem) {
    document.getElementById("valor-final").textContent = "Erro:";
    document.getElementById("ref-bancaria").textContent = mensagem;
}
