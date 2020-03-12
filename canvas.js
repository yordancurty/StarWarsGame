
// IMAGES SOURCE

let xWingImg = new Image();
xWingImg.src = "./MIDIA/IMAGENS/xwing ship obj.png";

let milFalconImg = new Image();
milFalconImg.src = "./MIDIA/IMAGENS/mill. falc obj.png";

let tieFighterImg = new Image();
tieFighterImg.src = "./MIDIA/IMAGENS/tie ship obj.gif";

let heartsImg = new Image()
heartsImg.src ="./MIDIA/IMAGENS/heart.png"

let explosionImg = new Image();
explosionImg.src = "./MIDIA/IMAGENS/explosion.png"

let gameOverImg = new Image();
gameOverImg.src = "./MIDIA/IMAGENS/gameOver4.png"

let laserRedImg = new Image();
laserRedImg.src = "./MIDIA/IMAGENS/laser red png.png"

let backgroundImg = new Image();
backgroundImg.src = "./MIDIA/IMAGENS/space background.gif"



//AUDIOS SOURCE 
let laserShoot = new Audio();
laserShoot.src = "./MIDIA/SONS/Rifle Shoot (mp3cut.net) (2).mp3"

let introSong = new Audio();
introSong.src ="./MIDIA/SONS/Star Wars Intro HD 1080p.mp3"

let middleSong = new Audio();
middleSong.src ="./MIDIA/SONS/middleSong.mp3"

let gameOverSong = new Audio();
gameOverSong.src ="./MIDIA/SONS/Star Wars  The Imperial March (Darth Vader's Theme).mp3"


// CANVAS BASIC DEFINITIONS

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.getAttribute("width");
let canvasHeight = canvas.getAttribute("height");

// - FONTE DAS IMAGENS
window.onload = () => {
  
}




//  CLASSES DEFINITIONS

//  - ENEMIES

class TieFighter {
  constructor(x,y){
    this.image = tieFighterImg;
    this.life = 1;
    this.x = x;
    this.y = y;
    this.minX = this.x + 20
    this.widthMax = this.x + 50;
    this.heightMax = this.y + 50; 
  }

  left(){
    return this.x ;
  }

  right() {
    return this.x +50;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + 20;
  }
}

//  - PLAYER

class Player {
  constructor (){
    this.ship = xWingImg
    this.life = 1;
    this.x = (canvasWidth/2) - 100;
    this.y = canvasHeight-100;
    this.widthMax = this.x + 100;
    this.heightMax = this.y + 100; 
    this.speedX = 0;
    this.speedY = 0;
  }

  left(){
    return this.x;
  }

  right() {
    return this.x + 90;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + 90;
  }
  
  attackLeft(){
    addPlayerLeftShoot();
    laserShoot.play();
  }
  
  attackRight(){
    addPlayerRightShoot();
    laserShoot.play();
  }
}


// SHOOTS

class Shoot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  left(){
    return this.x;
  }

  right() {
    return this.x + 70;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + 70;
  }
}



// OBJECTS DEFINITIONS

// - - -PLAYER
let player = new Player;


// - - -ENEMIES
let listOfEnemies = []
let lastEnemy = null;
const addTieFighter = () => {
  let randomX = Math.abs(Math.floor(Math.random() * canvasWidth -50)) ;
  let tieFighter = new TieFighter(randomX, 0)
  lastEnemy = listOfEnemies[0];
  listOfEnemies.push(tieFighter);
  return console.log("enemy added");
  }


// - - -SHOOTS

let lstOfPlayerLeftShoots = [];
let lstOfPlayerRightShoots = [];

function addPlayerLeftShoot() {
  let playerShoot = new Shoot(player.x + 10, player.y);
  lstOfPlayerLeftShoots.push(playerShoot);
  lstOfPlayerLeftShoots.forEach(function(elem){
    if(elem.y < -20){
      lstOfPlayerLeftShoots.shift();
    }
  })
}

function addPlayerRightShoot() {
  let playerShoot = new Shoot((player.x + 85), player.y);
  lstOfPlayerRightShoots.push(playerShoot);
  lstOfPlayerRightShoots.forEach(function(elem){
    if(elem.y < -20){
      lstOfPlayerRightShoots.shift();
    }
  })
}

// RECEIVER OF KEY PRESSED
document.addEventListener('keydown', function(e){
  movePlayer(e.keyCode);
});


//CANCEL MOVEMENT AT KEY RELEASE
const cancelMove = (keycode) => {
  player.speedX = 0;
  player.speedY = 0;

}
document.onkeyup = function(e){
  cancelMove(e.keyCode);
}




// MOVEMENT FUNCTION

// - PLAYER


const movePlayer = (keycode) => {
  switch (keycode){

    //A
    case 65: 
      if(player.x > 5){
        player.speedX = -10; 
      }
    break;

    //W
    case 87: 
      if(player.y > 0){
        player.speedY = -10;
      }
    break;

    //S
    case 83: 
      if(player.y < 400){
        player.speedY = 10;
      }
    break;

    //D
    case 68:
      if(player.x < 800){
        player.speedX = 10;
      }  
    break;

    //1
    case 97:
      player.attackLeft();
    break;

    //2
    case 98:
      player.attackRight();
    break;
  }
}


function movePlayerSmoother() {
  player.x += player.speedX;
  player.y += player.speedY;
}



//GAME OVER FUNCTION

function gameOver() {
  player.image = "./MIDIA/IMAGENS/explosion.png"
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(gameOverImg, 400, 300 ,400,100);
  console.log("GAME OVER!!!");
  ctx.font = '30px Arial'
  ctx.fillStyle = "#BDC8ED"
  ctx.fillText(`SCORE : ${score}` ,515, 450);
  console.log(animation);
  middleSong.pause();
  middleSong.currentTime = 0;
  gameOverSong.play();
  return true;
}


let crashed;
function checkGameOver() {
  listOfEnemies.forEach(function(elem){
    crashed = crashWithPlayer(elem);
  });
  if(crashed){
    player.life -= 1;
    console.log("PERDEU 1 VIDA - N° DE VIDAS = " + player.life)
    if(player.life == 0){
      window.cancelAnimationFrame(animation);
      setInterval(gameOver, 1000)
      setInterval(function(){
        window.location.reload();
      }, 10000)
    }
    
  }
}








//COLLISIONs FUNCTIONs

// - - player collision
function crashWithPlayer(elem){
  return !(
    player.bottom() < elem.top() ||
    player.top() > elem.bottom() ||
    player.right() < elem.left() ||
    player.left() > elem.right() 
  );
}


// - - enemies collision
let tieFig = null;
let enemyIdx = null;
let shootIdx = null;
let enemySaw = null;
function checkTieFighterDiedRight(){
   listOfEnemies.forEach(function(enemy, idx){
    console.log("enemy = " + enemy);
    console.log("idx = " + idx);
    enemySaw = enemy;
    enemyIdx = idx
    lstOfPlayerRightShoots.forEach(function(shoot, elemIdx){
      if (enemy.x <= shoot.x && enemy.widthMax >= (shoot.x + 5)){
        console.log ("ROTA DE COLISÃO COM TIRO");
        console.log("enemy.y =" + enemySaw.y);
        console.log("shoot.y = " + shoot.y);
        if (enemySaw.y > shoot.y){
          console.log("enemy.y =" + enemySaw.y);
          console.log("shoot.y = " + shoot.y);
          console.log("BOOM!!!")
          listOfEnemies.splice(idx,1);
          lstOfPlayerRightShoots.splice(elemIdx, 1);
          score += 20;
        }
      }  

      
      
    })
  })
}

function checkTieFighterDiedLeft(){
  listOfEnemies.forEach(function(enemy, idx){
   console.log("enemy = " + enemy);
   console.log("idx = " + idx);
   enemySaw = enemy;
   enemyIdx = idx
   lstOfPlayerLeftShoots.forEach(function(shoot, elemIdx){
     if (enemy.x <= shoot.x && enemy.widthMax >= (shoot.x + 5)){
       console.log ("ROTA DE COLISÃO COM TIRO");
       console.log("enemy.y =" + enemySaw.y);
       console.log("shoot.y = " + shoot.y);
       if (enemySaw.y > shoot.y){
         console.log("enemy.y =" + enemySaw.y);
         console.log("shoot.y = " + shoot.y);
         console.log("BOOM!!!")
         listOfEnemies.splice(idx,1);
         lstOfPlayerLeftShoots.splice(elemIdx, 1);
         score += 20;
       }
     }  
   })
 })
}




//  ENGINE USING REQUEST FRAME AND STARTING ON CLICK
let animation = 0;
let counter = 0;
let score = 0;

if(counter >= 200){
  middleSong.play();
}

function startGame(){
  
  
  counter +=1;
  ctx.beginPath();
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // - MOVE PLAYER
  movePlayerSmoother();
 
  // - PRINT PLAYER
  ctx.drawImage(player.ship, player.x, player.y,100,100);
  
  // - PRINT ENEMIES
  

  // - -  number of ships in screen
  if(counter < 1000){
    if ( counter % 100 == 0 || counter == 0){
      addTieFighter();
    }
  }else if(counter > 900){
    if ( counter % 60 == 0){
      addTieFighter();
    }
  }else if(counter > 2000){
    if ( counter % 40 == 0){
      addTieFighter();
    }
  }
  
  // - -  print tieFighter enemeies and call collision function
  listOfEnemies.forEach(function(elem, idx){
    ctx.drawImage(elem.image, elem.x,elem.y,50,50)
    elem.y += 5;
    if (counter > 500){
      elem.y += 3
      if(counter > 1500) {
        elem.y += 4
      }
    }
    if (elem.y >= canvasHeight){
      listOfEnemies.shift()
    }
  });

  // PRINT SHOOTS
  lstOfPlayerLeftShoots.forEach(function(elem,idx) {
    ctx.drawImage(laserRedImg, elem.x, elem.y, 5, 20);
    elem.y -= 6
  })

  lstOfPlayerRightShoots.forEach(function(elem,idx) {
    ctx.drawImage(laserRedImg, elem.x, elem.y, 5, 20);
    elem.y -= 6
  })
  

  // PRINT SCORE

  score = Math.floor(counter/10)
  ctx.font = '30px Arial'
  ctx.fillStyle = "#BDC8ED"
  ctx.fillText(`SCORE : ${score}` ,10, 25);


  // recall the startgame function and check if collision happen in gameOver function
  animation = window.requestAnimationFrame(startGame);
  
  
  // check collision
  checkGameOver()
  checkTieFighterDiedRight()
  checkTieFighterDiedLeft()
  console.log("tieFig = "+ tieFig)
  
}

let logo = document.getElementById("logo");

//caller for the first call of startgame using a click command
document.getElementById('start-button').onclick = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  logo.style.display = "none"
  startGame();  
  middleSong.play();
  middleSong.loop = true;
  gameOverSong.pause();
  gameOverSong.currentTime = 0;
}