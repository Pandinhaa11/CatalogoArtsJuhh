const produtos = [
    { id: 1, nome: "Produto 1", preco: "R$ 25,00" },
    { id: 2, nome: "Produto 2", preco: "R$ 40,00" },
    { id: 3, nome: "Produto 3", preco: "R$ 30,00" },
    { id: 4, nome: "Produto 4", preco: "R$ 50,00" },
    { id: 5, nome: "Produto 5", preco: "R$ 20,00" },
    { id: 6, nome: "Produto 6", preco: "R$ 15,00" },
    { id: 7, nome: "Produto 7", preco: "R$ 35,00" },
    { id: 8, nome: "Produto 8", preco: "R$ 45,00" },


  ];
  
  let carrinho = [];
  
  const produtosDiv = document.getElementById("produtos");
  const carrinhoUl = document.getElementById("carrinho");
  const searchInput = document.getElementById("search");
  const categoriaSelect = document.getElementById("categoria");
  const btnFinalizar = document.getElementById("finalizar");
  
  function renderizarProdutos() {
    const filtro = searchInput.value.toLowerCase();
    const categoria = categoriaSelect.value;
    produtosDiv.innerHTML = "";
  
    produtos
      .filter(
        (p) =>
          (categoria === "Todas" || p.categoria === categoria) &&
          p.nome.toLowerCase().includes(filtro)
      )
      .forEach((p) => {
        const div = document.createElement("div");
        div.className = "produto";
        div.innerHTML = `
          <h3>${p.nome}</h3>
          <p>${p.categoria}</p>
          <p>${p.preco}</p>
          <button onclick="adicionarAoCarrinho(${p.id})">Adicionar</button>
        `;
        produtosDiv.appendChild(div);
      });
  }
  
  function renderizarCarrinho() {
    carrinhoUl.innerHTML = "";
    carrinho.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.nome} - ${item.preco} <button onclick="removerDoCarrinho(${index})">Remover</button>`;
      carrinhoUl.appendChild(li);
    });
  }
  
  function adicionarAoCarrinho(id) {
    const produto = produtos.find((p) => p.id === id);
    carrinho.push(produto);
    renderizarCarrinho();
  }
  
  function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    renderizarCarrinho();
  }
  
  btnFinalizar.addEventListener("click", () => {
    const cartProducts = carrinho.map(item => `${item.nome} - ${item.preco}`).join(", ");
    const mensagem = encodeURIComponent(
      `Olá, tudo bem? Vim pelo app que tem para baixar no seu site\nOs produtos que escolhi foram: ${cartProducts}`
    );
    window.open(`https://wa.me/5511977158125?text=${mensagem}`, "_blank");
  });
  
  searchInput.addEventListener("input", renderizarProdutos);
  categoriaSelect.addEventListener("change", renderizarProdutos);
  
  renderizarProdutos();
  