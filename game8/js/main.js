"use strict";

//import Blob from 'components/Blob.js';

window.onload = function() {

  const SPEED = 200;
  const GRAVITY = 9.8;
  const JET = 420;
  const OPENING = 200;
  const SPAWN_RATE = 5;
  let finalScore;
  var worldWidth;
  var worldCenterY;
  let oneKey;
  let twoKey;
  let threeKey;
  let gameStarted = false;
  var gameBackground;
  var bins = [];
  let boss;
  let rightKey;
  let leftKey;
  let spaceKey;
  var blobs = [];
  let arcade;
  var time_til_spawn = Math.random()*3000 + 2000;  //Random time between 2 and 5 seconds.
  //var last_spawn_time = this.game.time; 
  var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
 
            function resetPlayer(player, index){
                    player.body.allowGravity = false;
                    player.reset(worldWidth / 4, worldCenterY);
                    player.animations.play('fly')
              } 
  
              function callOverlap(player, blob){
                   console.log('overlap');
                  arcade.overlap(player, blob.getSprite(), state.caught(), null, this); 
              }
            
              


  var state = {
                
                
              jet: function(){
                this.reset();
              },
              
              start: function(){
                  bins.forEach(function(player){
                    player.body.allowGravity = true;
                  });
                  this.scoreText.setText("SCORE\n"+this.score);
                  this.gameStarted = true;
                  //this.wallTimer = this.game.time.events.loop(Phaser.Timer.SECOND*SPAWN_RATE, this.spawnJob, this);
                  //this.wallTimer.timer.start();

                },
                
                preload: function(){
                  gameBackground = game.load.image('background', 'assets/matrix.png');
                  game.load.image('wall', 'assets/walls.png');
                  this.load.image('blob', 'assets/chicken.png');
                  this.load.spritesheet('bins', 'assets/bucket.png', 200, 300);
                  this.load.spritesheet('bin2', 'assets/bucket2.png', 200, 300);
                  this.load.spritesheet('bin3', 'assets/bucket3.png', 200, 300);

                },
                create: function(){
                  this.wallTimer = this.game.time.events.loop(Phaser.Timer.SECOND*SPAWN_RATE, this.spawnJob, this);
                  this.gameTimer = this.game.time.events.loop(Phaser.Timer.SECOND*60, this.setGameOver, this);

                  worldWidth = this.world.width;
                  worldCenterY = this.world.centerY;
                  this.physics.startSystem(Phaser.Physics.ARCADE);
                  arcade = this.physics.arcade;
                  this.physics.arcade.gravity.y = GRAVITY;
                  this.background = this.add.tileSprite(0,0,this.world.width, this.world.height, 'background');
                  this.walls = this.add.group();
                  bins.push(this.add.sprite(0,0, 'bins'));
                  bins.push(this.add.sprite(50, 50, 'bin2'));
                  bins.push(this.add.sprite(150, 150, 'bin3'));
                   
                  
                  this.blobGroup = this.add.group();
                
                  boss = new Blob(game);  
                  boss.create();
                  this.blobGroup.add(boss.getSprite());
                  blobs.push(boss);
                
                  this.oneKey = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
                  this.twoKey = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
                  this.threeKey = this.input.keyboard.addKey(Phaser.Keyboard.THREE);
                  this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                  this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                  this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                  // stop the following keys from propagating up to the browser
                  this.input.keyboard.addKeyCapture([ Phaser.Keyboard.ONE, Phaser.Keyboard.TWO, Phaser.Keyboard.THREE, Phaser.Keyboard.RIGHT, Phaser.Keyboard.LEFT, Phaser.Keyboard.SPACEBAR ]);
                  //this.player.animations.add('fly', [0,1,2], 10, true);
                  
                  this.physics.arcade.enableBody(bins[0]);
                  this.physics.arcade.enableBody(bins[1]);
                  this.physics.arcade.enableBody(bins[2]);
                  bins.forEach(function(player){ 
                    player.scale.setTo(.5,.5);
                    player.body.bounce.y = .2;
                    player.body.gravity.y = GRAVITY;
                    player.body.collideWorldBounds = true;
                  });

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
                  this.input.onDown.add(this.jet, this);
                  this.reset();
                },
                update: function(){
                  if(this.gameStarted){ 
                    this.scoreText.text='Score: ' + this.score;   
                    var current_time = game.time.time;
                    
                   
                    
                    this.background.tilePosition.y += -2;
                    let bin_that_caught_job = null; 
                    for(let i =0; i < blobs.length; i++){
                      blobs[i].update()
                      //let bin_that_caught_job = null;   
                      bin_that_caught_job = bins.forEach(function(player) {
                        if(Math.abs(Math.floor(player.body.y) - Math.floor(blobs[i].getY())) <= 7  && Math.abs(Math.floor(player.body.x) - Math.floor(blobs[i].getX())) <= 100){
                          console.log('for each collision');
                          callOverlap(player, blobs[i]);
                          blobs[i].setY(-100);

                          
                        }
                      
                      });
                      /*if (bin_that_caught_job != null){
                        console.log('collision');
                        this.physics.arcade.overlap(bin_that_caught_job, blobs[i].getSprite(), this.caught, null, this); 
                      }*/
                    }
                  
                   
                    if(this.rightKey.isDown){
                    
                      
                      bins[this.whichBin()].body.velocity.x = 200;
                      console.log(bins[this.whichBin()].body.y);
                      //console.log(this.boss.body.y);
                      bins[this.whichBin()].animations.play('right');
                    }
                    if(this.leftKey.isDown){
                     
                      bins[this.whichBin()].body.velocity.x = -200;
                      bins[this.whichBin()].animations.play('left');
                    }
                    if(this.spaceKey.isDown){
                      bins.forEach(function(player){
                        player.body.velocity.x = 0;
                      });
                    }
                  }

                },

              spawnJob: function(){

                boss = new Blob(game);  
                boss.create();
                this.blobGroup.add(boss.getSprite());
                blobs.push(boss);
                console.log('spawn job');
              },

              whichBin: function(){
                if(this.oneKey.isDown){ return 0; }
                else if(this.twoKey.isDown) { return 1; }
                else{ return 2; }
              },

              caught: function(){
                  //this.krabby.kill();
                  this.score +=10;
                  this.scoreText.text='Score: ' + this.score;
                  console.log(this.score); 
              },
              
                reset: function(){
                  this.gameStarted = true;
                 // this.gameOver = false;
                  this.score =0;
                  bins.forEach(function(player, index){  
                  resetPlayer(player, index);
                    
                  });
                    //this.background.autoScroll(-SPEED*.8, 0);
                  this.scoreText.setText("Touch To\nStart Game");
                  this.walls.removeAll();
                },
                setGameOver: function(){
                  //this.gameOver = true;
                  this.gameStarted = false;
                  this.walls.forEachAlive(function (wall){
                    wall.body.velocity.x = wall.body.velocity.y = 0;
                  });
                  this.wallTimer.timer.stop();
                  //this.gameTimer.timer.stop(); 
                  finalScore = this.score;
                  bins.forEach(function(player){
                    player.body.velocity.x = 0;
                  });
                  this.scoreText.setText("FINAL SCORE\n" + this.score+"\n\nCLICK TO\n TRY AGAIN");
                  //this.input.onDown.add(this.reset(), this);
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
 
  return finalScore;
 
};
