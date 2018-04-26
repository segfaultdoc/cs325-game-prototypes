
function Blob(game){

    console.log('hi');
    this.game = game;
    this.enemy = new Enemy(this.game);
    console.log('hello from blob');
   // this.game = this.enemy.getGame(game);
    this.exists = false;
        
  this.vulnerabilities = {
      normal: 0,
      ice: 0,
      wave: 0,
      bomb: 0,
      missile: 0,
      screw:0

    };

  this.getY = function(){
    return this.enemy.getSprite().body.y;
  }

  this.spawn = function(x, y, type) {
    this.enemy.stdReset(x, y);
    this.color = type;
    if(this.color === "red"){
      this.vulnerabilities.missile = 1000;
      this.vulnerabilities.screw = 1000;
    }
    else{
      this.vulnerabilities.missile = 0;
      this.vulnerabilities.screw = 0;
    }
    // start in a random direction
    if (Math.random() < 500) {
      this.enemy.getSprite().body.velocity.x = 20;//-this.speed;
    } else {
      this.enemy.getSprite().body.velocity.x = 30;//this.speed;
    }
  }

  this.getSprite = function(){
    return this.enemy.getSprite();
  }

  Blob.prototype.create = function(){
    this.enemy.create('blob', 700, 0);
  }

/* The update method will be called automatically by Phaser, just as in the pure Phaser.Sprite class */
  Blob.prototype.update = function() {
    /*if(!this.enemy.stdUpdate()){
      //console.log('stdupdate sksk from blob update()'); 
      return;
    } */// Do a standard update from this.enemy class to check if update should even be done
    //console.log('stdupdate from blob update()')
    this.game.physics.arcade.collide(this, this.game.collisionLayer);
    if (this.enemy.getSprite().body.blocked.right) {
      this.scale.x = -1;
      this.enemy.getSprite().body.velocity.x = 100;//-this.speed;
    } else if (this.enemy.getSprite().body.blocked.left) {
      this.enemy.getSprite().scale.x = 1;
      this.enemy.getSprite().body.velocity.x = this.speed;
    }
  }
}
 

