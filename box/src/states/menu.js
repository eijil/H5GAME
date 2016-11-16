class Menu extends Phaser.State {

  constructor() {
    super();

  }
  
  create() {
    this.game.state.start('game');
  }

  update() {
    
  }

}

export default Menu;
