"use strict";

//import Blob from 'components/Blob.js';

window.onload = function() {
  const SPEED = 200;
  const GRAVITY = 0;
  const JET = 420;
  const OPENING = 200;
  const SPAWN_RATE = 5;
  var ocean;
  var player;
  let downKey;
  let upkey;
  let spaceKey;
  var blobs = [];
  //let blobGroup;
  //let blob;
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
                  ocean = game.load.image('background', 'assets/ocean.png');
                  game.load.image('wall', 'assets/walls.png');
                  this.load.image('blob', 'assets/krabbypatty.png');
                  this.load.spritesheet('player', 'assets/polarBear.png', 200, 300);
                },
                create: function(){
                  //ocean.scale.setTo(.5,.3);
                  this.physics.startSystem(Phaser.Physics.ARCADE);
                  this.physics.arcade.gravity.y = GRAVITY;
                  this.background = this.add.tileSprite(0,0,this.world.width, this.world.height, 'background');
                  this.walls = this.add.group();
                  this.player = this.add.sprite(0,0, 'player');
                  //this.blob = this.add.sprite(0,0, 'blob');
                  // register the keys
                  
                  this.blobGroup = this.add.group();
                  let b;
                  //var blobs = [];
                  for(let i = 0; i < 10; i++){
                    b = new Blob(this.game);  
                    b.create();
                    this.blobGroup.add(b.getSprite());
                    blobs.push(b);
                  }
                  
                  //this.blob = this.blobGroup.getFirstExists(false);
                  this.blob = blobs[0];
                  this.blob.spawn(128, 120 - 32, "red");
                  //this.blob = this.blobGroup.getFirstExists(false);
                  this.blob = blobs[1];
                  this.blob.spawn(128, 120 + 32, "yellow");
                  
                  this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
                  this.upkey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
                  this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                  // stop the following keys from propagating up to the browser
                  this.input.keyboard.addKeyCapture([ Phaser.Keyboard.DOWN, Phaser.Keyboard.UP, Phaser.Keyboard.SPACEBAR ]);
                  //this.player.animations.add('fly', [0,1,2], 10, true);
                  this.physics.arcade.enableBody(this.player);
                  this.player.body.bounce.y = .2;
                  this.player.body.gravity.y = GRAVITY;
                  this.player.body.collideWorldBounds = true;
                  this.player.animations.add('left', [0,1,2,3], 10, true);
                  this.player.animations.add('right', [5,6,7,8], 10, true);
                  //                 this.player.anchor.setTo(.5,.5);
                  
                  
 //this.krabby = this.add.group();
   //               this.krabby.enableBody = true;
                  /*for(var i = 0; i <12; i++){
                      var k = this.krabby.create(i*70, 0, 'krabby');
                      this.krabby.body.gravity.y = 6;
                      this.krabby.body.bounce.y = .7 + Math.random()*.2;
                  } */                
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
                  //this.spawnWall(300);
                  
                  this.reset();
                },
                update: function(){
                 //this.player.body.velocity.x = 150;
                  this.background.tilePosition.x += -2;
                   
                  //this.player.body.velocity.y = 0;
                  //this.physics.arcade.overlap(this.player, this.krabby, this.collectKrabby, null, this); 
                  if(this.downKey.isDown){
                    //this.player.scale.x = 1;
                    this.player.body.velocity.y = 200;
                    this.player.animations.play('left');
                  }
                  if(this.upkey.isDown){
                    //this.player.scale.x *= -1; 
                    this.player.body.velocity.y = -200;
                    this.player.animations.play('right');
                  }
                  if(this.spaceKey.isDown){
                    this.player.body.velocity.y = 0;
                  }

                },
  
    /*collectKrabby: function(){
                      this.krabby.kill();
                  this.score +=10;
                  this.scoreText.text='Score: ' + score;
  
              },*/

                reset: function(){
                  this.gameStarted =false;
                  this.gameOver = false;
                  this.score =0;
                  this.player.body.allowGravity = false;
                  this.player.reset(this.world.width / 4, this.world.centerY);
                  this.player.animations.play('fly');
                  //this.background.autoScroll(-SPEED*.8, 0);
                  this.scoreText.setText("Touch To\nStart Game");
                  this.walls.removeAll();
                },
                setGameOver: function(){
                  this.gameOver = true;
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
