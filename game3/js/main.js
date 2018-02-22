"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        //game.load.image( 'logo', 'assets/football.png' );
        
        game.load.image('background', 'assets/ocean.png');
        game.load.image('goodFish', 'assets/goodfish.png');
}
    
    var ocean;
    var goodfish; 
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        ocean = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        goodfish = game.add.sprite(game.world.centerX+300, game.world.centerY+140, 'goodFish');

        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        ocean.scale.setTo(.5, .3);
        ocean.anchor.setTo(.5, .5 );
        goodfish.scale.setTo(.16,.16);        
        //goodfish.anchor.setTo(0, 0 );
        // Turn on the arcade physics engine for this sprite.
        //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //bouncy.body.collideWorldBounds = false;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        /*var text = game.add.text( game.world.centerX, 15, "Let's play football!", style );
        text.anchor.setTo( 0.5, 0.0 );*/
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 200, 200, 200 );
    }
};
