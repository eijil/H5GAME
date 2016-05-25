const scaleRatio = window.devicePixelRatio / 3;
class Basketball {

	constructor(game){
		//Do something
		this.game = game;
		this.x = this.game.world.centerX - this.game.world.centerX / 2;
		this.y = this.game.world.centerY + this.game.world.centerY /3;
		this.sprite = this.game.add.sprite(this.x, this.y, 'basketball');
	    this.sprite.scale.set(scaleRatio * 0.6);

	    this.enablePhysic();
	  
	    this.updateScore();

	}
	enablePhysic(){

		var me = this;
		this.game.physics.p2.enable(me.sprite);
	    this.sprite.body.setCircle(me.sprite.width/2);
	    this.sprite.body.static = true;
	    this.sprite.body.damping = 0.2;
	    this.sprite.body.sleepSpeedLimit = 0.5; 

	}
	updateScore(){

		var _this = this;
		this.signal = new Phaser.Signal();
	    this.signal.addOnce(() => {
	        _this.game.score ++ ;

	    })
	}

}

export default Basketball;