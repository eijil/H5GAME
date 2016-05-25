class Boot extends Phaser.State {

    preload() {

    }
    init() {
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = false;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        this.game.time.advancedTiming = true;
        this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
    }
    create() {

        this.game.state.start("Preload");
    }
    enterIncorrectOrientation() {
        document.getElementById('orientation').style.display = 'block';
    }
    leaveIncorrectOrientation() {
        document.getElementById('orientation').style.display = 'none';

    }

}

export default Boot;
