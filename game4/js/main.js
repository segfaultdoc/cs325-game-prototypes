"use strict";

window.onload = function() {
  const SPEED = 200;
  const GRAVITY = 900;
     
  var ocean;
  var goodfish;
  
  var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
  
  var state = {
                preload: function(){
                  var ocean = game.load.image('background', 'assets/ocean.png');
                  //ocean.scale.x = .5;
                  game.load.spritesheet('goodFish', 'assets/goodfish.png', 48, 48);
                  
                },
                create: function(){
                  //ocean.scale.setTo(.5,.3);
                  this.physics.startSystem(Phaser.Physics.ARCADE);
                  this.physics.arcade.gravity.y = GRAVITY;
                  this.background = this.add.tileSprite(0,0,this.world.width, this.world.height, 'background');
                  //this.background.scale.x = .5
                  this.background.autoScroll(-SPEED, 0);
                  this.goodFish = this.add.sprite(0,0, 'goodFish');
                  this.player.animations.add('fly', [0,1,2], 10, true);
                  this.physics.arcade.enableBody(this.goodFish);
                  this.goodFish.body.collideWorldBounds = true;
                },
                update: function(){
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
