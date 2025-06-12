let logoImg;
let carrinhoIcon; // Para o ícone do carrinho (se você tiver uma imagem)
let nomeFeirinha = "Feirinha do Produtor";
let logoLarguraReduzida = 20; // Largura desejada para a logo
let logoAlturaReduzida; // Altura calculada para manter a proporção da logo
let carrinhoTamanho = 30; // Tamanho do ícone do carrinho
let produtos = [
  {
    id: 1,
    nome: "Maçãs Frescas",
    descricao: "Maçãs crocantes e doces, direto do pomar.",
    beneficios: "Ricas em fibras e vitaminas, auxiliam na digestão e na saúde cardiovascular.",
    preco: 11.98,
    imagem: 'maca.jpeg'
  },
  {
    id: 2,
    nome: "Tomates Orgânicos",
    descricao: "Tomates vermelhos e saborosos, cultivados sem agrotóxicos.",
    beneficios: "Excelentes fontes de licopeno, um antioxidante poderoso que contribui para a saúde da pele e prevenção de doenças.",
    preco: 10.98,
    imagem: 'tomate.jpeg'
  },
  {
    id: 3,
    nome: "Pão Artesanal",
    descricao: "Pão de fermentação natural, feito com ingredientes selecionados.",
    beneficios: "Sua fermentação lenta facilita a digestão e melhora a absorção de nutrientes.",
    preco: 22.35,
    imagem: 'pao.jpeg'
  },
  {
    id: 4,
    nome: "Morangos Maduros",
    descricao: "Morangos doces e suculentos, perfeitos para sobremesas.",
    beneficios: "Ricos em vitamina C e antioxidantes, fortalecem o sistema imunológico e combatem o envelhecimento celular.",
    preco: 12.00,
    imagem: 'morango.jpeg'
  },
  {
    id: 5,
    nome: "Alface Crespa",
    descricao: "Alface fresca e crocante, ideal para saladas.",
    beneficios: "Excelente fonte de vitaminas A e K, além de fibras, que contribuem para a saúde digestiva e a hidratação.",
    preco: 5.50,
    imagem: 'alface.jpeg'
  },
  {
    id: 6,
    nome: "Queijo Minas Artesanal",
    descricao: "Queijo suave e delicioso, produzido localmente.",
    beneficios: "Boa fonte de cálcio e proteínas, essenciais para a saúde dos ossos e músculos.",
    preco: 45.00,
    imagem: 'queijo.jpeg'
  }
  // Adicione mais produtos aqui...
];
let produtoImagens = [];
let produtoDivs = [];
let carrinho = []; // Array para armazenar os itens do carrinho

function preload() {
  // Carrega a imagem da logo. Certifique-se de que 'feira.jpeg' está na mesma pasta.
  logoImg = loadImage('feira.jpeg');
  // Se você tiver uma imagem para o ícone do carrinho, descomente a linha abaixo e ajuste o nome do arquivo
  // carrinhoIcon = loadImage('carrinho_icon.png');

  // Carrega todas as imagens dos produtos
  for (let i = 0; i < produtos.length; i++) {
    produtoImagens[i] = loadImage(produtos[i].imagem);
  }
}

function setup() {
  // Cria o canvas principal do p5.js e o anexa ao div 'p5-container' no HTML
  let canvas = createCanvas(windowWidth, calcularAlturaTotal());
  canvas.parent('p5-container');


  // Loop para criar os elementos HTML para cada produto
  for (let i = 0; i < produtos.length; i++) {
    let produto = produtos[i];
    let produtoDiv = createDiv(''); // Cria um div para cada produto
    produtoDiv.class('produto-container'); // Adiciona a classe CSS para estilização
    produtoDiv.parent('p5-container'); // Anexa o div do produto ao 'p5-container'

    // Cria a imagem do produto usando o caminho do array 'produtos'
    let img = createImg(produto.imagem, produto.nome);
    img.class('produto-imagem'); // Adiciona classe CSS para a imagem
    img.parent(produtoDiv); // Anexa a imagem ao div do produto

    let infoDiv = createDiv(''); // Cria um div para as informações do produto
    infoDiv.class('produto-info'); // Adiciona classe CSS
    infoDiv.parent(produtoDiv); // Anexa ao div do produto

    createElement('h3', produto.nome).parent(infoDiv); // Adiciona o nome do produto (H3)
    createElement('p', produto.descricao).parent(infoDiv); // Adiciona a descrição do produto (P)
    // Adiciona a descrição dos benefícios logo abaixo da descrição principal
    createElement('p', `Benefícios: ${produto.beneficios}`).class('produto-beneficios').parent(infoDiv);
    createElement('p', `Preço: R$ ${produto.preco.toFixed(2)}`).class('produto-preco').parent(infoDiv); // Adiciona o preço (P)

    let quantidadeDiv = createDiv(''); // Cria um div para o seletor de quantidade
    quantidadeDiv.class('quantidade-container'); // Adiciona classe CSS
    quantidadeDiv.parent(infoDiv); // Anexa às informações do produto
    createElement('label', 'Quantidade: ').class('quantidade-label').parent(quantidadeDiv); // Rótulo da quantidade
    let selectQtde = createSelect(); // Cria o seletor (dropdown) de quantidade
    for (let j = 1; j <= 10; j++) { // Opções de 1 a 10
      selectQtde.option(j);
    }
    selectQtde.parent(quantidadeDiv); // Anexa o seletor ao div de quantidade
    selectQtde.id(`qtde-${produto.id}`); // Adiciona um ID único para o seletor (útil para referenciar)

    let comprarButton = createButton('Adicionar ao Carrinho'); // Cria o botão "Adicionar ao Carrinho"
    comprarButton.class('comprar-button'); // Adiciona classe CSS
    comprarButton.parent(infoDiv); // Anexa às informações do produto
    // Define a ação ao clicar no botão: chama adicionarAoCarrinho com o ID do produto e a quantidade selecionada
    comprarButton.mousePressed(() => adicionarAoCarrinho(produto.id, selectQtde.value()));

    produtoDivs.push(produtoDiv); // Adiciona o div do produto ao array de divs de produtos
  }

  // Cria a seção do carrinho de compras (inicialmente escondida)
  let carrinhoDiv = createDiv('<h2>Carrinho de Compras</h2><ul id="lista-carrinho"></ul><p>Total: R$ <span id="total-carrinho">0.00</span></p><button id="finalizar-compra">Finalizar Compra</button>');
  carrinhoDiv.id('carrinho-container'); // Define o ID para o container do carrinho
  carrinhoDiv.style('position', 'fixed'); // Posicionamento fixo na tela
  carrinhoDiv.style('top', '120px');
  carrinhoDiv.style('right', '20px');
  carrinhoDiv.style('background-color', '#f9f9f9');
  carrinhoDiv.style('border', '1px solid #ccc');
  carrinhoDiv.style('padding', '15px');
  carrinhoDiv.style('border-radius', '5px');
  carrinhoDiv.style('width', '300px');
  carrinhoDiv.style('display', 'none'); // Inicialmente escondido
  carrinhoDiv.parent('body'); // Anexa o container do carrinho ao corpo do HTML

  // Cria o botão para exibir/ocultar o carrinho
  let mostrarCarrinhoButton = createButton('Ver Carrinho');
  // Posiciona o botão no canto superior direito do canvas
  mostrarCarrinhoButton.position(width - 20 - 100, 120);
  mostrarCarrinhoButton.mousePressed(() => {
    let carrinhoContainer = select('#carrinho-container');
    // Alterna a visibilidade do container do carrinho
    carrinhoContainer.style('display', carrinhoContainer.style('display') === 'none' ? 'block' : 'none');
    atualizarCarrinhoVisual(); // Atualiza a exibição do carrinho
  });
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(produtoId, quantidade) {
  let produtoSelecionado = produtos.find(p => p.id === produtoId); // Encontra o produto pelo ID
  if (produtoSelecionado && parseInt(quantidade) > 0) {
    let itemExistente = carrinho.find(item => item.id === produtoId); // Verifica se o item já está no carrinho
    if (itemExistente) {
      itemExistente.quantidade += parseInt(quantidade); // Se sim, apenas atualiza a quantidade
    } else {
      carrinho.push({ ...produtoSelecionado, quantidade: parseInt(quantidade) }); // Se não, adiciona o novo item
    }
    console.log('Item adicionado ao carrinho:', { nome: produtoSelecionado.nome, quantidade: parseInt(quantidade) });
    atualizarCarrinhoVisual(); // Atualiza a exibição do carrinho
  }
}

// Função para remover um produto do carrinho
function removerDoCarrinho(produtoId) {
  carrinho = carrinho.filter(item => item.id !== produtoId); // Filtra o array, removendo o item com o ID especificado
  atualizarCarrinhoVisual(); // Atualiza a exibição do carrinho
}

// Função para atualizar a exibição visual do carrinho
function atualizarCarrinhoVisual() {
  let listaCarrinho = select('#lista-carrinho');
  listaCarrinho.html(''); // Limpa a lista atual do carrinho

  let total = 0;
  carrinho.forEach(item => {
    // Cria um item de lista para cada produto no carrinho
    let listItem = createElement('li', `${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)} `);
    let removerButton = createButton('Remover'); // Botão para remover o item
    removerButton.mousePressed(() => removerDoCarrinho(item.id)); // Ação ao clicar no botão remover
    listItem.child(removerButton); // Anexa o botão ao item da lista
    listaCarrinho.child(listItem); // Anexa o item da lista à lista do carrinho
    total += item.preco * item.quantidade; // Soma ao total do carrinho
  });

  select('#total-carrinho').html(total.toFixed(2)); // Atualiza o valor total no HTML
}

function draw() {
  background(220); // Define a cor de fundo do canvas

  // Cabeçalho
  fill(255);
  rect(0, 0, width, 100);

  // Desenha a logo alinhada à esquerda
  // A condição 'if (logoImg)' garante que a imagem só será desenhada se tiver sido carregada
  if (logoImg) {
    image(logoImg, 20, height / 2 - logoAlturaReduzida / 2, logoLarguraReduzida, logoAlturaReduzida);
  }

  // Desenha o nome da feirinha (centralizado)
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  text(nomeFeirinha, width / 2, height / 2);

  // Desenha o ícone do carrinho à direita (usando texto por simplicidade)
  let carrinhoX = width - 50;
  let carrinhoY = height / 2;
  textAlign(CENTER, CENTER);
  textSize(carrinhoTamanho);
  fill(0);
  text("🛒", carrinhoX, carrinhoY);

  // Posiciona os divs de produto abaixo do cabeçalho
  let yOffset = 150; // Posição inicial Y para os produtos
  for (let i = 0; i < produtoDivs.length; i++) {
    produtoDivs[i].position(20, yOffset); // Define a posição de cada div de produto
    yOffset += produtoDivs[i].elt.offsetHeight + 20; // Atualiza o Y para o próximo produto (considerando a altura do div)
  }

  // Redimensiona o canvas para garantir que todo o conteúdo seja visível
  resizeCanvas(windowWidth, Math.max(yOffset + 50, 300));
}

// Função para calcular a altura total necessária para o canvas
function calcularAlturaTotal() {
  let alturaProdutos = 0;
  // Soma a altura de todos os divs de produto mais o espaçamento
  for (let i = 0; i < produtoDivs.length; i++) {
    alturaProdutos += produtoDivs[i].elt.offsetHeight + 20;
  }
  // Retorna a altura do cabeçalho + altura dos produtos + margem inferior
  return 100 + alturaProdutos + 50;
}

// Função chamada quando a janela do navegador é redimensionada
function windowResized() {
  // Recalcula a altura da logo para manter a proporção
  if (logoImg) {
    logoAlturaReduzida = (logoLarguraReduzida * logoImg.height) / logoImg.width;
  }
  resizeCanvas(windowWidth, calcularAlturaTotal()); // Redimensiona o canvas
  // Reposiciona o botão "Ver Carrinho" ao redimensionar a janela
  let mostrarCarrinhoButton = select('.p5Canvas + button');
  if (mostrarCarrinhoButton) {
    mostrarCarrinhoButton.position(width - 20 - 100, 120);
  }
}
