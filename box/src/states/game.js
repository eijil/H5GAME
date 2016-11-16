import Box from '../prefabs/box';
const devicePixelRatio = window.devicePixelRatio;
const scaleRatio = devicePixelRatio / 3;
class Game extends Phaser.State {

  constructor() {
    super();
    this.score = 0;
    this.taller = 0;
    this.success = false;
    this.count = 1;
  }
  
  create() {

    let _this = this;
    this.centerX = this.game.world.centerX;
    this.centerY = this.game.world.centerY;

    
    //add physics sysem
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y =1000 * devicePixelRatio;
    this.game.physics.p2.sleepMode = 2;

    this.boxHeight = Math.floor(this.game.camera.height / 6);
    this.score = this.boxHeight;
    this.lineHeight = this.boxHeight;

    this.createContactMaterial();

    this.createLine();
    this.createBox();
   
    
    this.game.input.onDown.add(function() {
        _this.box.body.static = false;
      
    })

   
  }
  createBox(){
    let _this = this;
    this.box = new Box(this.game,this.centerX,0,this.boxMaterial).sprite;

    this.lastBox = new Box(this.game,this.centerX,this.game.world.height - this.boxHeight / 2,this.boxMaterial).sprite;

    this.lastMetter =  this.lastBox.y - this.boxHeight;
    //check 
    this.box.body.onBeginContact.add((body, bodyB, shapeA, shapeB, equation)=>{
     
      let time = 1000;
      setTimeout(()=>{
        if(body){
          _this.score  = _this.box.y;
          if(Phaser.Math.difference(this.lastMetter,_this.box.y)<3){
              _this.lastBox = _this.box;
              _this.lastBox.body.mass =50;
              _this.box = new Box(_this.game,_this.centerX,0).sprite;
              _this.lastMetter -= _this.boxHeight;
              _this.count++;
              //_this.setBounds();
              _this.game.camera.view.y=100;
              
          }else{

          }
        }
      },time);
    },this)
    
  }
 
  onsuccess(){

  }

  createContactMaterial() {
     let  _this =this;
     this.boxMaterial = this.game.physics.p2.createMaterial('boxMaterial');
     this.game.physics.p2.createContactMaterial(_this.boxMaterial, _this.boxMaterial, {
          stiffness :1e8,
          restitution: 0, //损耗
          friction: 5, //摩擦
          surfaceVelocity: 0 //平面速度
         
      });
  }


  setBounds(){
    let _this = this;
    _this.game.world.setBounds(0,100,_this.game.world.width, _this.game.world.bounds.height + _this.boxHeight)
  }

  //
  createLine(){
     
    let _this = this;    
    let x = this.centerX,  
        y = 0,
        width = 10,
        height = this.boxHeight,
        angle = 30;

    this.lineSprite = this.game.add.sprite(x, y, 'background');
    this.lineSprite.width = width;
    this.lineSprite.height = height;
    this.lineSprite.angle = angle;

    this.lineTween = this.game.add.tween(_this.lineSprite).to({angle:-angle},2000,"Linear",true,0,-1);
    this.lineTween.yoyo(true);

    
  }
  update() {
    
    this.updateBoxPos();
   
  }
  updateBoxPos(){
    let _this = this;
    let angle = this.lineSprite.angle;
    let height = this.boxHeight;
    //求出线结束点的位置
    let endY = Math.cos(angle * (Math.PI/180) ) * height;
    let endX = Math.sin(angle * (Math.PI/180) ) * height;

    if(this.box && this.box.body.static == true){
      this.box.body.x = this.lineSprite.x  - endX;
      this.box.body.y = this.lineSprite.y + endY ;
      this.box.body.angle = this.lineSprite.angle;
    }
  }

  endGame() {
   
  }
  render(){
    let _this = this;
    this.game.debug.text(_this.score, 32, 32, '', '25px Arial');

    this.game.debug.text(_this.lastMetter, 32, 62, '', '25px Arial');
    this.game.debug.bodyInfo(_this.box,50,50);
    this.game.debug.cameraInfo(_this.game.camera, 500, 32);
  }

}

export default Game;
