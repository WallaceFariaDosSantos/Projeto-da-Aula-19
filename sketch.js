//variáveis
//torre e auxiliar de torre para imagem
var tower, towerImg;
//fogo, fogogrupo, auxiliar para imagem
var fogoImg, fogo, fireGroup, boomImg;
//asteroide, auxiliar de imagem, asteroidegrupo
var asteroideImg, asteroide, asteroideGroup;
//foguete, auxiliar de imagem
var foguete, fogueteImg, fogueteImg2;
//bloco invisível, e grupo de bloco invisível
var invisibleBlockGroup, invisibleBlock;
//variável de som
var spookyS;
//estado de jogo
var gameState = 1;
var play = 1;
var end = 0;

function preload() {
  //imagens
  towerImg = loadImage("tower.png");
  fogoImg = loadImage("fogo.png");
  asteroideImg = loadImage("asteroide.png");
  fogueteImg = loadImage("foguete2.png");
  boomImg = loadImage("boom.png");
  fogueteImg2 = loadImage("foguete.png");
  
  //som
  spookyS = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  //colocar o som para tocar 
  spookyS.loop();

  //sprite da torre e suas características
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 3;

  //sprite do fantasma e suas características 
  foguete = createSprite(300, 200, 50, 50);
  foguete.scale = 0.6;
  foguete.setCollider("rectangle", 8,-40,50,140);

  //criação de grupos
  fireGroup = new Group();
  asteroideGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background("black");
  edges = createEdgeSprites();

  foguete.addImage("fog", fogueteImg);
  
  // verificação dos estados de jogo 
  // gameState === "play"
  if(gameState === play) {
    if(keyDown("left_arrow")) {
      foguete.x = foguete.x - 6;
    }

    // direita
    if(keyDown("right_arrow")) {
      foguete.x = foguete.x + 6;
    }

    // se apertar espaço tem que pular
    if(keyDown("space")) {
      foguete.velocityY = -8;
      foguete.addImage("fog",fogueteImg2);
    }

    // gravidade
    foguete.velocityY = foguete.velocityY + 0.8;

    // recarregamento da imagem da torre
    if(tower.y > 600){
      tower.y = 0;
    }

    // chamar a função de criar asteroides aqui
    Asteroides();

    // verificação de fim de jogo aqui
    if(fireGroup.isTouching(foguete)){
      gameState = end;
      fogo.addImage("fogoI", boomImg);
      fogo.velocityY = 0;
    }

    if(foguete.y <= -70 || foguete.y >= 670 || foguete.x <= -70 || foguete.x >= 670){
      gameState = end;
    }
  }

  // tudo que acontece quando gameState === "end"
  if(gameState === end){
    asteroideGroup.destroyEach();
    foguete.velocityY = 0;
    tower.velocityY = 0;

    textSize(20);
    fill(255);
    text("Press Down Arrow to restart the game!", 500, 200);

    if(keyDown("down_arrow")){
      reset();
    }
  }

  // código para desenhar qualquer sprite
  drawSprites();
}

//função para criar portas 
function Asteroides(){
  //escreva aqui o código para gerar as portas na torre
  if (frameCount % 240 === 0) {
    //SPRITES PORTA, GRADE, TIJOLO INVISÍVEL
    fogo = createSprite(200, -50);
    fogo.scale = 0.5;
    fogo.setCollider("circle", 0, 30, 200);

    asteroide = createSprite(200, 10);
    asteroide.scale = 0.5;

    invisibleBlock = createSprite(200, 15);
    invisibleBlock.visible = false;
    //TIJOLO ACOMPANHA A GRADE E TEM UMA "ALTURAZINHA"
    invisibleBlock.width = asteroide.width;
    invisibleBlock.height = 2;

    //POSIÇÃO DA PORTA DURANTE O JOGO
    fogo.x = Math.round(random(120, 400));
    //GRADE ACOMPANHA ESSA ALEÁTORIEDADE 
    asteroide.x = fogo.x;
    //TIJOLO INVISÍVEL TAMBÉM ACOMPANHA ISSO
    invisibleBlock.x = fogo.x;

    //ADC IMAGENS 
    fogo.addImage("fogoI", fogoImg);
    asteroide.addImage(asteroideImg);

    //ADC VELOCIDADE
    fogo.velocityY = 3;
    asteroide.velocityY = 3;
    invisibleBlock.velocityY = 3;

    //ELE RECEBE A PROFUNDIDADE DA PORTA PARA APARECER DEPOIS DA PORTA 
    foguete.depth = fogo.depth;
    foguete.depth += 1;

    //tempo de vida a variável
    fogo.lifetime = 800;
    asteroide.lifetime = 800;
    invisibleBlock.lifetime = 800;

    //adicione cada porta ao grupo
    fireGroup.add(fogo);
    asteroideGroup.add(asteroide);
    invisibleBlockGroup.add(invisibleBlock);

  }
}

function reset() {
  gameState = play;
  fireGroup.destroyEach();
  invisibleBlockGroup.destroyEach();
  foguete.x = 300;
  foguete.y = 200;
  tower.velocityY = 3;
}
