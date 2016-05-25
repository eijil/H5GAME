class GameOver extends Phaser.State {

	create() {
		console.log("gameover");
	}

	restartGame() {
		//this.game.state.start("Main");
	}

}

export default GameOver;
