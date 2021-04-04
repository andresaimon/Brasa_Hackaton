let currentStage, player, player2, boundaries,
  showHelp, hud, timeReference,
  colors, initialMenu, gameStates, currentState, helpMenu, Story, gameOver;

let enemies = [],
  playerBullets = [],
  player2Bullets = [],
  enemyBullets = [],
  upgrades = [];

let upgradeTimeout = 0,
  gameOverSaid = false,
  ready = false,
  debug = false,
  running = false;