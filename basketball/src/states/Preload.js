class Preload extends Phaser.State {

	preload() {
		/* Preload required assets */
		this.game.load.image('basketball', 'assets/basketball.png');
	}

	create() {
		//NOTE: Change to GameTitle if required
		this.game.state.start("Main");
	}

}

export default Preload;
