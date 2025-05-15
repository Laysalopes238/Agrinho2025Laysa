let logoImg;
let nomeFeirinha = "Feirinha do Produtor";
let produtos = [
  {
    nome: "Maçãs Frescas",
    descricao: "Maçãs crocantes e doces, direto do pomar.",
    preco: "R$ 5,00 / kg",
    imagem: 'maca.jpeg' // Substitua pelo caminho da imagem da maçã
  },
  {
    nome: "Tomates Orgânicos",
    descricao: "Tomates vermelhos e saborosos, cultivados sem agrotóxicos.",
    preco: "R$ 8,00 / kg",
    imagem: 'tomate.jpeg' // Substitua pelo caminho da imagem do tomate
  },
  {
    nome: "Pão Artesanal",
    descricao: "Pão de fermentação natural, feito com ingredientes selecionados.",
    preco: "R$ 12,00 / unidade",
    imagem: 'pao.jpeg' // Substitua pelo caminho da imagem do pão
  }
  // Adicione mais produtos aqui...
];
let produtoImagens = [];

function preload() {
  logoImg = loadImage('feira.jpeg');
  for (let i = 0; i < produtos.length; i++) {
    produtoImagens[i] = loadImage(produtos[i].imagem);
  }
}

function setup() {
  createCanvas(windowWidth, calcularAlturaTotal());
}

function draw() {
  background(220);

  // Cabeçalho
  fill(255);
  rect(0, 0, width, 100);

  // Desenha o logo
  if (logoImg) {
    image(logoImg, 20, 50
          - logoImg.height 1);
  }

  // Texto do cabeçalho
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  text(nomeFeirinha, width / 2, 50);

  // Seção de Produtos
  let yOffset = 150;
  for (let i = 0; i < produtos.length; i++) {
    desenharProduto(produtos[i], yOffset);
    yOffset += 150; // Espaçamento entre os produtos
  }
}

function desenharProduto(produto, y) {
  let x = 50;

  // Imagem do produto
  if (produtoImagens[produtos.indexOf(produto)]) {
    image(produtoImagens[produtos.indexOf(produto)], x, y, 100, 100);
    x += 120;
  }

  // Nome do produto
  textSize(18);
  textAlign(LEFT, TOP);
  fill(0);
  text(produto.nome, x, y);

  // Descrição do produto
  textSize(12);
  fill(100);
  text(produto.descricao, x, y + 25, 200, 50); // Limita a largura da descrição

  // Preço do produto
  textSize(16);
  fill(0, 100, 0);
  text(produto.preco, x, y + 80);

  // Botão "Comprar"
  fill(0, 100, 200);
  rect(x + 220, y + 75, 80, 30, 5);
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Comprar", x + 220 + 40, y + 75 + 15);
}

function calcularAlturaTotal() {
  return 100 + (produtos.length * 150) + 50; // Altura do cabeçalho + altura dos produtos + margem inferior
}

function windowResized() {
  resizeCanvas(windowWidth, calcularAlturaTotal());
}
