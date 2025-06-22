// Array para armazenar os caminhões (levando alimento)
let caminhoes = [];
// Objeto para o carro voltando para o campo
let carroVolta;

let limiteCampo; // Ponto de transição entre campo e cidade

// Array para armazenar os brilhos
let brilhos = [];

function setup() {
  createCanvas(1000, 550); // Tela um pouco maior para mais detalhes

  // Inicializa os dois caminhões
  caminhoes.push({ x: 0, velocidade: 1.5, cor: [0, 100, 200], tipo: 'caminhao' }); // Azul
  caminhoes.push({ x: -200, velocidade: 1.8, cor: [200, 50, 0], tipo: 'caminhao' }); // Laranja

  // Inicializa o carro de volta para o campo
  carroVolta = { x: width + 50, velocidade: -2, cor: [150, 50, 150], tipo: 'carro' }; // Roxo, velocidade negativa para ir pra esquerda

  limiteCampo = width / 2 + 70; // Onde o campo termina e a cidade começa
}

function draw() {
  // Desenha o fundo e o céu
  background(135, 206, 235); // Céu azul claro

  // --- Desenha a área do Campo ---
  desenhaCampo(0, 0, limiteCampo, height);

  // --- Desenha a área da Cidade ---
  desenhaCidade(limiteCampo, 0, width - limiteCampo, height);

  // --- Desenha a Estrada ---
  desenhaEstrada();

  // --- Desenha e move os Caminhões ---
  for (let i = 0; i < caminhoes.length; i++) {
    desenhaVeiculo(caminhoes[i]);
    moveVeiculo(caminhoes[i]);
  }

  // --- Desenha e move o Carro de Volta ---
  desenhaVeiculo(carroVolta);
  moveVeiculo(carroVolta);

  // --- Desenha e move os Brilhos ---
  for (let i = brilhos.length - 1; i >= 0; i--) {
    desenhaBrilho(brilhos[i]);
    moveBrilho(brilhos[i]);
    if (brilhos[i].y > height) { // Remove brilhos que saíram da tela
      brilhos.splice(i, 1);
    }
  }
}

// Função para adicionar um brilho ao pressionar a tecla 'a'
function keyPressed() {
  if (key === 'a' || key === 'A') {
    for (let i = 0; i < 15; i++) { // Adiciona 15 brilhos de uma vez
      brilhos.push({
        x: random(width),
        y: random(-50, 0), // Começa acima da tela
        velocidade: random(1, 3),
        tamanho: random(4, 8),
        cor: [random(200, 255), random(200, 255), random(150, 255), random(150, 255)] // Cores claras com transparência
      });
    }
  }
}

// Função para desenhar um brilho
function desenhaBrilho(brilho) {
  noStroke();
  fill(brilho.cor);
  ellipse(brilho.x, brilho.y, brilho.tamanho, brilho.tamanho);
}

// Função para mover um brilho
function moveBrilho(brilho) {
  brilho.y += brilho.velocidade;
}


function desenhaCampo(x, y, w, h) {
  // Grama
  fill(124, 252, 0); // Verde grama
  rect(x, y + h * 0.7, w, h * 0.3);

  // Montanhas (para dar profundidade)
  fill(100, 150, 50);
  triangle(x, y + h * 0.7, x + w * 0.3, y + h * 0.3, x + w * 0.6, y + h * 0.7);
  triangle(x + w * 0.4, y + h * 0.7, x + w * 0.7, y + 0.2 * h, x + w, y + h * 0.7);

  // Plantações
  desenhaPlantacao(w * 0.1, h * 0.72, 100, 50);
  desenhaPlantacao(w * 0.45, h * 0.78, 80, 40);
  desenhaPlantacao(w * 0.25, h * 0.85, 120, 60);

  // Árvores no campo
  desenhaArvore(w * 0.15, h * 0.6);
  desenhaArvore(w * 0.4, h * 0.55);
  desenhaArvore(w * 0.05, h * 0.65);
  desenhaArvore(w * 0.6, h * 0.58);

  // Casas no campo
  desenhaCasaRural(w * 0.3, h * 0.68);
  desenhaCasaRural(w * 0.5, h * 0.6);
}

function desenhaCidade(x, y, w, h) {
  // Asfalto da cidade
  fill(100); // Cinza escuro
  rect(x, y + h * 0.7, w, h * 0.3);

  // Prédios da cidade
  desenhaPredio(x + w * 0.05, h * 0.7, 70, 150);
  desenhaPredio(x + w * 0.2, h * 0.7, 50, 100);
  desenhaPredio(x + w * 0.35, h * 0.7, 90, 200);
  desenhaPredio(x + w * 0.55, h * 0.7, 60, 130);
  desenhaPredio(x + w * 0.7, h * 0.7, 80, 170);

  // Mercado na cidade
  desenhaMercado(x + w * 0.15, h * 0.7 - 80);

  // Loja de Roupa
  desenhaLojaRoupa(x + w * 0.65, h * 0.7 - 70);

  // Agropecuária
  desenhaAgropecuaria(x + w * 0.4, h * 0.7 - 70);

  // Árvores na cidade (menores, mais urbanas)
  desenhaArvore(x + w * 0.1, h * 0.68, true);
  desenhaArvore(x + w * 0.8, h * 0.68, true);
}

function desenhaArvore(x, y, isUrbana = false) {
  // Tronco
  fill(139, 69, 19); // Marrom
  rect(x, y, 10, 30);

  // Folhagem
  if (isUrbana) {
    fill(50, 150, 50); // Verde mais escuro para árvores urbanas
    ellipse(x + 5, y, 40, 40);
  } else {
    fill(34, 139, 34); // Verde floresta
    ellipse(x + 5, y - 10, 50, 50);
    ellipse(x - 5, y, 50, 50);
    ellipse(x + 15, y, 50, 50);
  }
}

function desenhaPlantacao(x, y, largura, altura) {
  fill(85, 107, 47); // Verde oliva para a terra
  rect(x, y, largura, altura);

  // Pequenas hastes para simular plantas
  stroke(34, 139, 34); // Verde folha
  strokeWeight(2);
  for (let i = 0; i < largura; i += 5) {
    line(x + i, y + altura, x + i, y + altura - 10 - (i % 3) * 2); // Variações de altura
  }
  noStroke(); // Desativa o contorno
}

function desenhaCasaRural(x, y) {
  // Parede
  fill(255, 222, 173); // Creme
  rect(x, y - 50, 60, 50);

  // Telhado
  fill(178, 34, 34); // Vermelho telha
  triangle(x - 10, y - 50, x + 30, y - 90, x + 70, y - 50);

  // Porta e Janela
  fill(139, 69, 19); // Marrom
  rect(x + 25, y - 20, 10, 20); // Porta
  fill(173, 216, 230); // Azul claro
  rect(x + 10, y - 40, 15, 15); // Janela esquerda
  rect(x + 40, y - 40, 15, 15); // Janela direita
}

function desenhaPredio(x, y, largura, altura) {
  // Corpo do prédio
  fill(150); // Cinza claro
  rect(x, y - altura, largura, altura);

  // Janelas (quadrados menores)
  fill(255, 255, 0, 180); // Amarelo para simular luzes
  for (let i = 0; i < altura - 20; i += 20) {
    for (let j = 0; j < largura - 20; j += 20) {
      rect(x + 10 + j, y - altura + 10 + i, 10, 10);
    }
  }
}

function desenhaMercado(x, y) {
  // Base do mercado
  fill(200, 200, 200); // Cinza claro
  rect(x, y, 120, 70);

  // Teto do mercado (verde para remeter a "frescos")
  fill(0, 128, 0); // Verde escuro
  triangle(x - 10, y, x + 60, y - 40, x + 130, y);

  // Placa "Mercado"
  fill(255); // Branco
  rect(x + 30, y + 10, 60, 20);
  fill(0); // Preto
  textSize(12);
  textAlign(CENTER, CENTER);
  text("MERCADO", x + 60, y + 20);

  // Porta e janelas
  fill(139, 69, 19);
  rect(x + 50, y + 40, 20, 30); // Porta

  fill(173, 216, 230); // Azul claro
  rect(x + 10, y + 40, 20, 20); // Janela esquerda
  rect(x + 90, y + 40, 20, 20); // Janela direita
}

function desenhaLojaRoupa(x, y) {
  // Base da loja
  fill(255, 192, 203); // Rosa claro
  rect(x, y, 100, 70);

  // Teto
  fill(128, 0, 128); // Roxo
  rect(x, y, 100, 15);

  // Placa "Moda"
  fill(255);
  rect(x + 20, y + 5, 60, 10);
  fill(0);
  textSize(10);
  text("MODA", x + 50, y + 10);

  // Vitrine
  fill(173, 216, 230); // Azul claro
  rect(x + 10, y + 25, 80, 40);

  // Porta
  fill(139, 69, 19);
  rect(x + 40, y + 40, 20, 30);
}

function desenhaAgropecuaria(x, y) {
  // Base da agropecuária
  fill(210, 180, 140); // Bege/Marrom claro
  rect(x, y, 110, 70);

  // Teto
  fill(139, 69, 19); // Marrom
  triangle(x - 10, y, x + 55, y - 30, x + 120, y);

  // Placa "Agro"
  fill(255);
  rect(x + 25, y + 5, 60, 20);
  fill(0);
  textSize(12);
  text("AGROPECUÁRIA", x + 55, y + 15);

  // Porta
  fill(139, 69, 19);
  rect(x + 45, y + 40, 20, 30);

  // Janelas (com grade para simular depósito)
  fill(173, 216, 230);
  rect(x + 10, y + 40, 20, 20);
  rect(x + 80, y + 40, 20, 20);
  stroke(0);
  strokeWeight(1);
  line(x + 20, y + 40, x + 20, y + 60);
  line(x + 90, y + 40, x + 90, y + 60);
  noStroke();
}

function desenhaEstrada() {
  fill(80); // Cinza escuro para a estrada
  rect(0, height * 0.75, width, 50); // Uma faixa central mais baixa

  // Linhas da estrada
  stroke(255, 255, 0); // Amarelo
  strokeWeight(3);
  for (let i = 0; i < width; i += 40) {
    line(i, height * 0.75 + 25, i + 20, height * 0.75 + 25);
  }
  noStroke(); // Desativa o contorno para os próximos desenhos
}

// Função genérica para desenhar veículos (caminhão ou carro)
function desenhaVeiculo(veiculo) {
  push(); // Salva o estado atual do desenho
  translate(veiculo.x, height * 0.75 - 15); // Move a origem para o veículo

  if (veiculo.tipo === 'caminhao') {
    // Corpo do caminhão
    fill(veiculo.cor);
    rect(0, 0, 80, 30); // Carroceria
    rect(60, -15, 30, 45); // Cabine

    // Rodas
    fill(50);
    ellipse(20, 30, 20, 20);
    ellipse(70, 30, 20, 20);

    // Representação da carga (alimentos)
    fill(255, 140, 0); // Laranja/amarelo para simular comida
    ellipse(40, 15, 20, 20);
  } else if (veiculo.tipo === 'carro') {
    // Corpo do carro
    fill(veiculo.cor);
    rect(0, 0, 60, 25); // Base do carro
    beginShape();
    vertex(10, 0);
    vertex(20, -20);
    vertex(40, -20);
    vertex(50, 0);
    endShape(CLOSE); // Teto do carro

    // Rodas
    fill(50);
    ellipse(15, 25, 15, 15);
    ellipse(45, 25, 15, 15);
  }

  pop(); // Restaura o estado anterior do desenho
}

// Função genérica para mover veículos
function moveVeiculo(veiculo) {
  veiculo.x += veiculo.velocidade;

  // Lógica de reinício para caminhões (indo para a direita)
  if (veiculo.tipo === 'caminhao' && veiculo.x > width) {
    veiculo.x = -150; // Volta para o início do campo
  }
  // Lógica de reinício para carro (indo para a esquerda)
  if (veiculo.tipo === 'carro' && veiculo.x < -80) {
    veiculo.x = width + 50; // Volta para o início da cidade
  }
}