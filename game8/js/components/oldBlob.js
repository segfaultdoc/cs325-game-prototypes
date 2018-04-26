import Enemy from 'Enemy';

class Blob extends Enemy {

  constructor(game){ 
    super(game);
    this.animations.add("yellow", ["ripperYellow"]);
    this.animations.add("red". ["ripperRed"]);
    this.animations.add("frozen", ["ripperFrozen"]);

    this.vulnerabilities = {
      normal: 0,
      ice: 0,
      wave: 0,
      bomb: 0,
      missile: 0,
      screw:0

    };
  }

  spawn(x, y, type) {
    this.stdReset(x, y);
    this.color = type;
    if(this.color === "red"){
      this.vulnerabilities.missile = 1000;
      this.vulnerabilities.screw = 1000;
    }
    else{
      this.vulnerabilities.missile = 0;
      this.vulnerabilities.screw = 0;
    }
    this.play(this.color);
        // start in a random direction
    if (Math.random() < 0.5) {
      this.body.velocity.x = -this.speed;
    } else {
      this.body.velocity.x = this.speed;
    }
  }
 
/* The update method will be called automatically by Phaser, just as in the pure Phaser.Sprite class */
  update() {
    if(!this.stdUpdate()){return;}; // Do a standard update from Enemy class to check if update should even be done
    this.game.physics.arcade.collide(this, this.game.collisionLayer);
    if (this.body.blocked.right) {
      this.scale.x = -1;
      this.body.velocity.x = -this.speed;
    } else if (this.body.blocked.left) {
      this.scale.x = 1;
      this.body.velocity.x = this.speed;
    }
  }
}
 
export default Blob;
