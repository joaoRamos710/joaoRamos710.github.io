document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos(produtos); 
    atualizaCesto(); 
});

function carregarProdutos(produtos) {
    const listaProdutos = document.getElementById("lista-produtos");
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
    const botaoAdicionar = artigo.querySelector("button");
    botaoAdicionar.addEventListener("click", () => {
        adicionarAoCarrinho(produto);
    });
    return artigo;
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
    const elementoPrecoTotal = document.getElementById("custo-total");
    elementoPrecoTotal.textContent = `Custo-Total: $${precoTotal.toFixed(2)}`;
}
