//var Enemy extends Phaser.Sprite {

function Enemy(game){
  //constructor: function(game) {
    this.game = game;
    //this.p = new Phaser.Sprite(this.game, 0, 0, "sprites"); // sets up  Phaser.sprite
    
    this.exist = false; // when an enemy is instantiated it is not staged right away
    this.sprite = null; 
   let anim = null; 
    //this.p.anchor.setTo(.5, .5);
    // body
        // Vulnerabilities used to calculate damage when hit
    this.vulnerabilities = {
      normal: 1,
      ice: 1,
      wave: 1,
      bomb: 1,
      missile: 1000,
      screw: 1000
    };
    this.maxHealth = 1; // Health to set when spawned
    this.damage = 8;
      

  this.stdReset = function(x, y){
    this.sprite.reset(x, y);
    this.frozen = false;
    this.energy = this.maxHealth;
    this.exists = true;
    this.dying = false;
    this.sleeping = true; // enemy is sleeping and will cancel it's update
  }

  /*this.stdUpdate = function(){
    if(!this.exists && this.frozen){ 
      return false;
    }
    if(this.sleeping){
      if(this.inCamera){
        this.sleeping = false;
      }
      return false;
    }
    return true;
  }*/

  this.hit = function(bullet){
    if(this.dying){
      return;
    }
    if (bullet.type == "ice" && !this.frozen){
      this.frozen = true;
      this.game.sound.play("frozen");
    } else {
      this.frozen = false;
      this.health -= this.vulnerabilities[bullet.type];
      if(this.vulnerabilities[bullet.type] === 0){
        this.game.sound.play('ricochetShort');
      }
    }
      if(this.health < 1){
        this.dying = true;
        this.body.velocity.x = 100;//0;
        this.body.velocity.y = 100;//0;
        this.body.allowGravity = false;
        this.game.sound.play("deathAnimation");
      }
  }

  function death(){
    this.game.pickups.createNew(this.x, this.y, "random");
    this.exists = false;
  }
  this.getGame = function(){
    return this.game;
  }

  this.getSprite = function(){
    return this.sprite;
  }

  Enemy.prototype.create = function(sprite, x, y){
    this.sprite = this.game.add.sprite(Math.random()*x, Math.random()*y, sprite);
    //this.sprite.anchor.setTo(.5, .5);
    this.game.physics.enable(this.sprite);
    this.sprite.body.allowGravity = true;
    this.sprite.body.immovable = true;
    anim = this.sprite.animations.add("deathAnimation", ["boom0", "boom1", "boom2"], 15, false);
    anim.onComplete.add(death, this);
  }

}



