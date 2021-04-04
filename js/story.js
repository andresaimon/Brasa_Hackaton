class StoryPage {
  constructor() {
    this.background = ASSETS.images.menus.storyBG;
    this.finalTextPosition = {
      x: width / 2,
      y: height / 3
    };
    this.currentTextPosition = this.finalTextPosition;
    this.createdButtons = false;
    this.alphaFade = 0;
    this.state = "name";
  }

  draw() {
    if (!ASSETS.sounds.menu.isPaused()) 
      ASSETS.sounds.menu.pause();
    ASSETS.sounds.story.loop();
    ASSETS.sounds.story.setVolume(0.03);
    textAlign(CENTER);
    if (this.background === undefined) this.background = this._getImage(this.class);
    image(this.background, 0, 0, width, height);
    let white = color(255, 255, 255);
    white.setAlpha(0);
    fill(white);
    rect(0, 0, width, height);
    strokeWeight(3);
    stroke(colors.BLACK);
    textSize(width / 15);
    textFont(ASSETS.fonts.starwars);
    if (this.finalTextPosition.y > this.currentTextPosition.y) {
      this.currentTextPosition.y += 5;
    }
    let fadeBlack = color(0, 0, 0);
    fadeBlack.setAlpha(128);
    noStroke();
    fill(fadeBlack);
    let offsetX = ((width - mouseX) / width * 5);
    let offsetY = ((height - mouseY) / height * 5);
    text("Era uma vez...", this.currentTextPosition.x + offsetX, this.currentTextPosition.y + offsetY);
    stroke(colors.BLACK);
    fill(colors.YELLOW);
    text("Era uma vez...", this.currentTextPosition.x, this.currentTextPosition.y);
    
    fill(color(255, 255, 255));
    textFont(ASSETS.fonts.orbitron);
    textSize(18);
    text("Apos um longo periodo de catastrofes virais na Terra,", width / 2, height - (height / 2));
        text("investigadores descobriram a fonte de todo o mal", width / 2, height - (height / 2.3));
    text("que estava ocorrendo no planeta: alienigenas!", width / 2, height - (height / 2.7));
    text("Junte-se a tropa! E detone toda ameaca de invasao que surgir!", width / 2, height - (height / 3.2));
    
    if (this.finalTextPosition.y <= this.currentTextPosition.y) {
      if (!this.createdButtons) {
        this.createButtons();
        this.createdButtons = true;
      }
    }
    if (this.state == "transitionStarted") {
      let fade = color(0, 0, 0);
      fade.setAlpha(this.alphaFade);
      fill(fade);
      rect(0, 0, width, height);
      if (this.alphaFade < 255) {
        this.alphaFade += 3;
      }
      if (this.alphaFade >= 255) {
        this.backToMenu();
      }
    }
  }

  createButtons() {
    this.backButton = createButton('CONTINUAR');
    this.backButton.center('horizontal')
    this.backButton.addClass('botao-tela-inicial')
    this.backButton.position(width / 2 - this.backButton.size().width / 2, height - (height / 4));
    this.backButton.mousePressed(() => this.transitionStart(this.backToMenu) );
  }

  transitionStart() {
    ASSETS.sounds.buttonClicked.play();
    
    this.backButton.remove();
    this.state = "transitionStarted"
  }

  backToMenu() {
    initialMenu = new Menu("initial");
    currentState = 1;
    ASSETS.sounds.story.stop();
    ASSETS.sounds.menu.setVolume(0.3);
    ASSETS.sounds.menu.loop();
  }
}