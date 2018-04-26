"use strict";

//import Blob from 'components/Blob.js';

window.onload = function() {
  const SPEED = 200;
  const GRAVITY = 9.8;
  const JET = 420;
  const OPENING = 200;
  const SPAWN_RATE = 5;
  let gameStarted = false;
  var gameBackground;
  var player;
  let boss;
  let rightKey;
  let leftKey;
  let spaceKey;
  var blobs = [];
  var time_til_spawn = Math.random()*3000 + 2000;  //Random time between 2 and 5 seconds.
  var last_spawn_time = this.game.time; 
  var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
  
  var state = {
                
                                
                start: function(){
                  this.player.body.allowGravity = true;
                  this.scoreText.setText("SCORE\n"+this.score);
                  this.gameStarted = true;
                  this.wallTimer = this.game.time.events.loop(Phaser.Timer.SECOND*SPAWN_RATE, this.spawnWalls, this);
                  this.wallTimer.timer.start();

                },
                
                preload: function(){
                  gameBackground = game.load.image('background', 'assets/matrix.png');
                  game.load.image('wall', 'assets/walls.png');
                  this.load.image('blob', 'assets/jellyfish.png');
                  this.load.spritesheet('player', 'assets/plane.png', 200, 300);
                },
                create: function(){
                  //ocean.scale.setTo(.5,.3);
                  this.physics.startSystem(Phaser.Physics.ARCADE);
                  this.physics.arcade.gravity.y = GRAVITY;
                  this.background = this.add.tileSprite(0,0,this.world.width, this.world.height, 'background');
                  this.walls = this.add.group();
                  this.player = this.add.sprite(0,0, 'player');
                  
                  this.blobGroup = this.add.group();
                
                  boss = new Blob(game);  
                  boss.create();
                  this.blobGroup.add(boss.getSprite());
                  blobs.push(boss);
                
                  this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                  this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                  this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                  // stop the following keys from propagating up to the browser
                  this.input.keyboard.addKeyCapture([ Phaser.Keyboard.RIGHT, Phaser.Keyboard.LEFT, Phaser.Keyboard.SPACEBAR ]);
                  //this.player.animations.add('fly', [0,1,2], 10, true);
                  this.physics.arcade.enableBody(this.player);
                  this.player.body.bounce.y = .2;
                  this.player.body.gravity.y = GRAVITY;
                  this.player.body.collideWorldBounds = true;

                  this.scoreText = this.add.text(
                      this.world.centerX,
                      this.world.height/5,
                      "",
                      {

                        size: "32px",
                        fill: "#FFF",
                        align: "center"

                      }
                  );
                  this.scoreText.anchor.setTo(.5,.5); 
                  this.reset();
                },
                update: function(){
                  if(this.gameStarted){ 
                    this.scoreText.text='Score: ' + this.score;   
                    var current_time = game.time.time;
                    
                    this.background.tilePosition.y += -2;
                    
                      
                    for(let i =0; i < blobs.length; i++){
                      blobs[i].update()
                      if (Math.floor(blobs[i].getY()) === Math.floor(this.player.body.y)){
                        console.log('collision');
                        this.physics.arcade.overlap(this.player, blobs[i].getSprite(), this.caught, null, this); 
                      }
                    }
                  
                   
                    if(this.rightKey.isDown){
                    
                      //if(!this.gameStarted){
                        //this.start();
                      //}
                      this.player.body.velocity.x = 200;
                      console.log(this.player.body.y);
                      //console.log(this.boss.body.y);
                      this.player.animations.play('right');
                    }
                    if(this.leftKey.isDown){
                     
                      this.player.body.velocity.x = -200;
                      this.player.animations.play('left');
                    }
                    if(this.spaceKey.isDown){
                      this.player.body.velocity.y = 0;
                    }
                  }

                },
  
              caught: function(){
                  //this.krabby.kill();
                  this.score +=10;
                  this.scoreText.text='Score: ' + this.score;
                  console.log(this.score); 
              },

                reset: function(){
                  this.gameStarted = true;
                  //this.gameOver = false;
                  this.score =0;
                  this.player.body.allowGravity = false;
                  this.player.reset(this.world.width / 4, this.world.centerY);
                  this.player.animations.play('fly');
                  //this.background.autoScroll(-SPEED*.8, 0);
                  this.scoreText.setText("Touch To\nStart Game");
                  this.walls.removeAll();
                },
                setGameOver: function(){
                  this.gameStarted = false;
                  this.walls.forEachAlive(function (wall){
                    wall.body.velocity.x = wall.body.velocity.y = 0;
                  });
                  this.wallTimer.timer.stop();
                  this.player.body.velocity.x = 0;
                  this.scoreText.setText("FINAL SCORE\n" + this.score+"\n\nTOUCH TO\n TRY AGAIN");
                  this.timeOver = this.time.now;
                },
                spawnWall: function(y, flipped){
                  flipped = false;
                  var wall = this.walls.create(
                    game.width,
                    y+(flipped ? -OPENING: OPENING-30)/2,
                    'wall'
                  );
                  this.physics.arcade.enableBody(wall);
                  wall.body.allowGravity = false;
                  wall.scored = false;
                  //wall.scored = false;
                  wall.body.immovable = true;
                  wall.body.velocity.x = -SPEED;
                  if(flipped){
                    wall.scale.y = -1;
                    wall.body.offset.y = -wall.body.height;
                  }
                  return wall;
                },
                spawnWalls: function(){
                  var wallY = this.rnd.integerInRange(game.height*.3, game.height*.7);
                  var botWall = this.spawnWall(wallY);
                  var topWall = this.spawnWall(wallY, true);

                },
                addScore: function(wall){
                  wall.scored = true;
                  this.score += .5;
                  this.scoreText.setText("SCORE\n"+this.score);

                }
  }
  
  var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    'game',
    state
   )
  
 
};
