class GameTitle extends Phaser.State {

	create() {
		console.log(radius);
	}

	startGame() {
		this.game.state.start("Main");
	}

}

export default GameTitle;
