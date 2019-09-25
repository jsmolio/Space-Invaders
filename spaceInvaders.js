document.getElementById('gameOver').style.display = "none";
var hero = {
  top: 620,
  left: 550
};

var levels = ["url('images/background.jpg')", "url('images/level2.jpg')"]
var currentLevel = 1;
var score = 0;
var lives = 1;
var gameOver = false;
var enemies = [];
var missiles = [];

document.onkeydown = function(e){
  if (e.keyCode === 37) {
    hero.left = hero.left - 15;
    moveHero();
  }
  else if(e.keyCode === 39){
    hero.left = hero.left + 15;
    moveHero();
  }
  else if (e.keyCode === 32) {
    missiles.push({
      left: hero.left + 17,
      top: hero.top + 75
    })
    drawMissles();
  }
}

function moveHero(){
  document.getElementById("hero").style.left = hero.left + "px";
}

function createEnemy(currentLevel) {
  enemies.push({
    left: Math.floor((Math.random() * 1600) + 1),
    top: 10,
    level: Math.floor((Math.random() * 2 + 1))
  })
  drawEnemies();
}

function drawEnemies(currentLevel) {
  document.getElementById('enemies').innerHTML = "";
  for (var enemy = 0; enemy < enemies.length; enemy++) {
    if (currentLevel === 1){
      document.getElementById("enemies").innerHTML +=
      `<div class="enemy" style='left:${enemies[enemy].left}px; top:${enemies[enemy].top}px'></div>`;
    }
    else if (currentLevel === 2){
      if (enemies[enemy].level === 1){
        document.getElementById("enemies").innerHTML +=
        `<div class="enemy" style='left:${enemies[enemy].left}px; top:${enemies[enemy].top}px'></div>`;
      }
      else if(enemies[enemy].level === 2){
        document.getElementById("enemies").innerHTML +=
        `<div class="enemy2" style='left:${enemies[enemy].left}px; top:${enemies[enemy].top}px'></div>`;
      }
    }
  }
}

function moveEnemies() {
  for (var enemy = 0; enemy < enemies.length; enemy++) {
    enemies[enemy].top = enemies[enemy].top + 5;
  }
}

function drawMissles() {
  document.getElementById('missiles').innerHTML = "";
  for (var missile = 0; missile < missiles.length; missile++) {
    document.getElementById("missiles").innerHTML +=
    `<div class="missile" style='left:${missiles[missile].left}px; top:${missiles[missile].top}px'></div>`;
  }
}

function moveMissiles() {
  for (var missile = 0; missile < missiles.length; missile++) {
    missiles[missile].top = missiles[missile].top - 5;
  }
}

function checkHit(){
  for (enemy = 0; enemy < enemies.length; enemy++) {
    if(enemies[enemy].top+50 == 800){
      enemies.splice(enemy,1);
      lives--;
      if(lives === 0){
        gameOver();
      }
    }
    for (missile = 0; missile < missiles.length; missile++) {
      if((missiles[missile].top <= enemies[enemy].top + 50) &&
      (missiles[missile].top >= enemies[enemy].top) &&
      (missiles[missile].left >= enemies[enemy].left) &&
      (missiles[missile].left <= enemies[enemy].left+50
    )) {
        enemies.splice(enemy, 1);
        missiles.splice(missile, 1);
        score +=10;
        if(score === 100){
          currentLevel++;
          updateLevel(levels, currentLevel);
        }
      }
    }
  }
}

function updateLevel(levels, currentLevel){
  enemies.splice(0, enemies.length);
  missiles.splice(0, missiles.length);
  currentLevelGraphics = levels[currentLevel-1];
  switch (currentLevel) {
    case 2:
      document.body.style.backgroundImage = currentLevelGraphics;
      document.getElementById('level').innerHTML = "Level 2";
      break;
    default:
      document.body.backgroundImage = levels[0];
  }
}

function gameOver() {
  document.getElementById('gameOver').style.display = "";
  var playAgain = document.getElementById("restart");
  playAgain.addEventListener("click", function(event){
    console.log("here");
  });
}

function createEnemyLoop() {
  if (currentLevel === 1) {
    setTimeout(createEnemyLoop, 4000);
    createEnemy(currentLevel);
  }
  else if (currentLevel === 2) {
    setTimeout(createEnemyLoop, 2000);
    createEnemy(currentLevel);
  }
}

function gameLoop() {
  setTimeout(gameLoop, 100);
  moveMissiles();
  moveEnemies();
  drawEnemies(currentLevel);
  drawMissles();
  checkHit();
}

gameLoop();
createEnemyLoop();
