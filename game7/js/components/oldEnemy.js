class Enemy extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, "sprites"); // sets up  Phaser.sprite
    this.exist = false; // when an enemy is instantiated it is not staged right away
    this.anchor.setTo(.5, .5);
    // body
    this.game.physics.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
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
    let anim = this.animations.add("deathAnimation", ["boom0", "boom1", "boom2"], 15, false);
    anim.onComplete.add(this.death, this);
  }

  stdReset(x, y){
    this.reset(x, y);
    this.frozen = false;
    this.energy = this.maxHealth;
    this.exists = true;
    this.dying = false;
    this.sleeping = true; // enemy is sleeping and will cancel it's update
  }

  stdUpdate(){
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
  }

  hit(bullet){
    if(this.dying){
      return;
    }
    if (bullet.type == "ice" && !this.frozen){
      this.frozen = true;
      this.play("frozen");
    } else {
      this.frozen = false;
      this.health -= this.vulnerabilities[bullet.type];
      if(this.vulnerabilities[bullet.type] === 0){
        this.game.sound.play('ricochetShort');
      }
    }
      if(this.health < 1){
        this.dying = true;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.allowGravity = false;
        this.play("deathAnimation");
      }
  }

  death(){
    this.game.pickups.createNew(this.x, this.y, "random");
    this.exists = false;
  }
}

export default Enemy;




