const produtos = [
    { id: 1, nome: "Baldinho de Pipoca 1L", preco: "R$ 4,50" },
    { id: 2, nome: "Tubete 8cm", preco: "R$ 2,00" },
    { id: 3, nome: "Revistinha de colorir com mini giz", preco: "R$ 4,20" },
    { id: 4, nome: "Caixinha acrílica 5x5", preco: "R$ 2,50" },
    { id: 5, nome: "Caneca acrílica com rosca", preco: "R$ 5,50" },
    { id: 6, nome: "Centro de mesa", preco: "R$ 4,50" },
    { id: 7, nome: "Pirulito personalizado", preco: "R$ 1.30 a unidade" },
    { id: 8, nome: "Maletinha plástica", preco: "R$ 4,70" },
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
  