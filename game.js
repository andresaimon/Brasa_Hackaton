function reset() {
  timeReference = millis();
  hud.score = 0;
  hud2.score = 0;
  gameOverSaid = false;
  ready = false;
  enemies = [];
  enemyBullets = [];
  player.restart();
  player2.restart();
  currentStage.level = 0;
  enemyBullets = [];
  playerBullets = [];
  player2Bullets = [];
  upgrades = [];
  enemies = [];
  running = true;
  setTimeout(() => {
    ready = true;
  }, START_TIME * 1000);
}

function sayGameOverOnce() {
  if (!gameOverSaid)
    ASSETS.sounds.gameOver.play();
  gameOverSaid = true;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(ASSETS.images.ships.p1Ship);
  player2 = new Player2(ASSETS.images.ships.p2Ship);
  currentStage = new Stage(ASSETS.images.menus.gameBG);
  
  let white = color(255, 255, 255);
  white.setAlpha(100);
  fill(white);
  boundaries = {
    left: 0,
    right: width - player.size.width,
    top: 0,
    bottom: height - player.size.height,
  }
  ASSETS.sounds.story.setVolume(0.3);
  ASSETS.sounds.story.loop();
  ASSETS.sounds.bullet.setVolume(0.08);
  ASSETS.sounds.explosion.setVolume(0.1);
  hud = new HUD(player, 0);
  hud2 = new HUD2(player2, 0);
  colors = {
    BLACK: color(0, 0, 0),
    GREEN: color(50, 205, 50),
    BLUE: color(10,63,128),
    RED: color(255, 69, 0),
    YELLOW: color(255, 255, 124),
    GOLD: color(255, 223, 0),
    ORANGE: color(195,120,0),
    WHITE: color(255,255,255),
  };
  Story = new StoryPage();
  initialMenu = new Menu("initial");
  helpMenu = new HelpMenu();
  gameOver = new GameOver();

  currentState = 0;
  gameStates = {
    0: (() => {
      Story.draw();
    }),
    1: (() => {
      initialMenu.draw();
    }),
    2: () => {
      game();
    },
    3: () => {
      helpMenu.draw();
    },
    4: () => {
      gameOver.draw();
    } 
  };
}

function draw() {
  gameStates[currentState]();
}

function game() {
  currentStage.draw();
  if (!ready) {
    fill(colors.YELLOW);
    textAlign(CENTER);
    textSize(50);
    stroke(colors.GOLD);
    text(`${parseInt((START_TIME + 1) + (timeReference - millis())/1000)}`, width / 2, height / 2);
  } else {
    currentStage.generateNewEnemies();
  }
  enemyBullets = enemyBullets.filter((enemybullet) => {
    enemybullet.move();
    enemybullet.draw();
    if (player.collideWith(enemybullet)) {
      if (!player.invencible) player.damage(enemybullet.damageValue);
      return false;
    }
    if (player2.collideWith(enemybullet)) {
      if (!player2.invencible) player2.damage(enemybullet.damageValue);
      return false;
    }
    return !enemybullet.isOutOfXBoundaries();
  });

  playerBullets = playerBullets.filter((playerBullet) => {
    playerBullet.move();
    playerBullet.draw();
    return !playerBullet.isOutOfXBoundaries();
  });
  
  player2Bullets = player2Bullets.filter((player2Bullets) => {
    player2Bullets.move();
    player2Bullets.draw();
    return !player2Bullets.isOutOfXBoundaries();
  });

  upgrades = upgrades.filter((upgrade) => {
    upgrade.move();
    upgrade.draw();
    if (player.collideWith(upgrade)) {
      hud.score += 10;
      return !player.apply(upgrade);
    }
    if (player2.collideWith(upgrade)) {
      hud2.score += 10;
      return !player2.apply(upgrade);
    }
    return true;
  });

  enemies = enemies.filter((enemy) => {
    enemy.move();
    playerBullets = playerBullets.filter((playerBullet, index) => {
      if (enemy.collideWith(playerBullet)) {
        let drop = enemy.damage(playerBullet.damageValue);
        if (drop) upgrades.push(drop);
        hud.score += enemy.score;
        return false;
      }
      return true;
    });
    
    playerBullets2 = player2Bullets.filter((player2Bullets, index) => {
      if (enemy.collideWith(player2Bullets)) {
        let drop2 = enemy.damage(player2Bullets.damageValue);
        if (drop2) upgrades.push(drop2);
        hud2.score += enemy.score;
        return false;
      }
      return true;
    });
    
    if (player.collideWith(enemy)) {
      let drop = enemy.damage(player.damageValue * 3);
      if (!player.invencible) {
        player.damage(999);
      } else {
        if (drop) upgrades.push(drop);
      }
    }
    
    if (player2.collideWith(enemy)) {
      let drop = enemy.damage(player2.damageValue * 3);
      if (!player2.invencible) {
        player2.damage(999);
      } else {
        if (drop) upgrades.push(drop);
      }
    }
    
    return !enemy.isOutOfXBoundaries() && enemy.shouldContinue;
  });
  if (player.lifes >= 0) {
    player.draw();
  }
  if (player2.lifes >= 0) {
    player2.draw();
  }

  if ((player.lifes  < 0) && (player2.lifes < 0)) {
    sayGameOverOnce();
    currentState = 4;
  }

  hud.draw();
  hud2.draw();
  
  if (!running) {
    textSize(30);
    text("Pause", width/2, height/2);
  }
}