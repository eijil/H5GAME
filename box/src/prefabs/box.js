//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Box {

  //initialization code in the constructor
  constructor(game,x,y,mat) {

    this.game = game;
    this.sprite = this.game.add.sprite(x, y, '');
    
    this.game.physics.p2.enable(this.sprite,true);
    this.sprite.body.setRectangle(this.game.camera.height/6,this.game.camera.height/6);
    this.sprite.body.allowSleep  = true;
    this.sprite.body.sleepSpeedLimit  = 1;
    this.sprite.body.sleepTimeLimit   = 1;
    this.sprite.body.mass = 1;
    this.sprite.body.damping =0;
    this.sprite.body.static = true;
    this.sprite.body.setMaterial(mat);


  }
 

}

export default Box;
