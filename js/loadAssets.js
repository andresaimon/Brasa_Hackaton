const ASSETS = {
  images: {
    menus: {
      mainMenu: 'assets/images/menus/mainMenu1.jpg',
      storyBG: 'assets/images/menus/storyBG2.gif',
      gameOver: 'assets/images/menus/gameOver2.gif',
      gameBG: 'assets/images/menus/galaxyBG2.jpg'
      
    },
    ships: {
      greenShip: 'assets/images/ships/greenShip2.png',
      p1Ship: 'assets/images/ships/p1Ship.png',
      p2Ship: 'assets/images/ships/p2Ship.png',
      bullet: 'assets/images/ships/bullet.png',
      shieldBarrier: 'assets/images/ships/shieldBarrier.png',
      blueFire: 'assets/images/ships/blueFire.png',
    },
    upgrades: {
      barrier: 'assets/images/upgrades/Shield_Bonus.png',
      multiCannons: 'assets/images/upgrades/triple_shot.png',
      heal: 'assets/images/upgrades/heart-png.png',
      damage: 'assets/images/upgrades/damage_reduction.png',
      invencible: 'assets/images/upgrades/Invencible_DOOM.png',
    },
    explosion: 'assets/images/explosion.png',
    enemies: {
      enemyRed5: 'assets/images/enemies/fase1/nave1.png',
      enemyRed4: 'assets/images/enemies/fase1/nave4.png',
      enemyRed3: 'assets/images/enemies/fase1/nave3.png',
      enemyRed2: 'assets/images/enemies/fase1/nave2.png',
      enemyRed1: 'assets/images/enemies/fase1/nave1.png',
      enemyBlue5: 'assets/images/enemies/fase2/nave4.png',
      enemyBlue4: 'assets/images/enemies/fase2/nave3.png',
      enemyBlue3: 'assets/images/enemies/fase2/nave2.png',
      enemyBlue2: 'assets/images/enemies/fase2/nave1.png',
      enemyBlack5: 'assets/images/enemies/fase3/nave4.png',
      enemyBlack4: 'assets/images/enemies/fase3/nave3.png',
      enemyBlack3: 'assets/images/enemies/fase3/nave2.png',
      enemyBlack2: 'assets/images/enemies/fase3/nave1.png',
      bullet: 'assets/images/enemies/laserRed16.png',
      greenFire: 'assets/images/enemies/greenFire.png',
    },
    stages: {
      first: 'assets/backgrounds/purple.png'
    },
  },
  sounds: {
    menu: 'assets/sounds/menu.mp3',
    gameOver: 'assets/sounds/game-over.mp3',
    shieldDisabled: 'assets/sounds/end_shield.mp3',
    upgradeAdded: 'assets/sounds/upgradeAdded.ogg',
    buttonClicked: 'assets/sounds/buttonClicked.mp3',
    inGame: 'assets/sounds/Durante_o_jogo.mp3',
    bullet: 'assets/sounds/bullet.mp3',
    explosion: 'assets/sounds/explosion.mp3',
    life: 'assets/sounds/life.mp3',
    story: 'assets/sounds/historia.mp3',
  },
  fonts: {
    guardians: 'assets/fonts/Guardians.ttf',
    orbitron: 'assets/fonts/Gameplay.ttf',
    starwars: 'assets/fonts/StarWars.ttf',
    gameplay: 'assets/fonts/Gameplay.ttf'
  }
};

function recursiveLoad(o, method) {
  for (let key in o) {
    if (typeof o[key] == "string") {
      o[key] = method(o[key]);
    } else {
      recursiveLoad(o[key], method);
    }
  }
}

function preload() {
  recursiveLoad(ASSETS.images, loadImage);
  recursiveLoad(ASSETS.sounds, loadSound);
  recursiveLoad(ASSETS.fonts, loadFont);
}