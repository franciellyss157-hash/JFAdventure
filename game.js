let game;

function startGame() {
  document.getElementById('menu').style.display = 'none';

  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: {
      preload,
      create,
      update
    }
  };

  game = new Phaser.Game(config);
}

let player;
let cursors;
let bullets;
let zombies;
let lives = 3;
let lifeText;

function preload() {
  this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
  this.load.image('zombie', 'https://labs.phaser.io/assets/sprites/robot.png');
  this.load.image('bullet', 'https://labs.phaser.io/assets/sprites/bullets/bullet11.png');
}

function create() {

  player = this.physics.add.image(400, 300, 'player');
  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();

  bullets = this.physics.add.group();
  zombies = this.physics.add.group();

  lifeText = this.add.text(20,20,'❤️ Vidas: ' + lives, {
    fontSize:'32px',
    fill:'#fff'
  });

  this.time.addEvent({
    delay: 1200,
    callback: () => {
      let x = Phaser.Math.Between(0, window.innerWidth);

      let zombie = zombies.create(x,0,'zombie');
      zombie.setVelocityY(100);
    },
    loop:true
  });

  this.time.addEvent({
    delay: 300,
    callback: () => {
      let bullet = bullets.create(player.x, player.y - 20, 'bullet');
      bullet.setVelocityY(-500);
    },
    loop:true
  });

  this.physics.add.overlap(bullets, zombies, (bullet,zombie)=>{
    bullet.destroy();
    zombie.destroy();
  });

  this.physics.add.overlap(player, zombies, (player,zombie)=>{
    zombie.destroy();

    lives--;
    lifeText.setText('❤️ Vidas: ' + lives);

    if(lives <= 0){
      alert('GAME OVER');
      window.location.reload();
    }
  });
}

function update() {

  player.setVelocity(0);

  if(cursors.left.isDown){
    player.setVelocityX(-300);
  }

  if(cursors.right.isDown){
    player.setVelocityX(300);
  }

  if(cursors.up.isDown){
    player.setVelocityY(-300);
  }

  if(cursors.down.isDown){
    player.setVelocityY(300);
  }
}