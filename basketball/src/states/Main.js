import BasketBall from 'objects/basketball';

const devicePixelRatio = window.devicePixelRatio;
const scaleRatio = devicePixelRatio / 3;

//var basketball;
//keySpace,
//angleLine,
//rotateAngle = -6;
class Main extends Phaser.State {

    constructor() {
        super();
        this.basketball;
        this.basketballs = [];
        //篮框
        this.basketA;
        this.basketB;
        //篮板
        this.basketBoard;
        //世界材质
        this.worldMaterial;
        //篮球材质
        this.basketBallMaterial;
        //篮板/篮筐材质
        this.boardMaterial;
        //篮筐两点之间辅助线
        this.lineA;
        //是否可以添加篮球
        this.allowAddBaketBall;
        //手指滑动起点和终点
        this.pointerStart = new Phaser.Point();
        this.pointerEnd = new Phaser.Point();
        //力度
        this.force = 0;

    }

    create() {
            var _this = this;
            this.game.score = 0;
            //  Enable p2 physics
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.gravity.y = 1200;
            this.game.physics.p2.sleepMode = 2;

            this.createContactMaterial();
            this.createBasketBall();
            this.createBasketBoard();
            // angleLine = new Phaser.Line(basketball.x,basketball.y,basketball.x + 100 * devicePixelRatio,basketball.y);

            //注册按钮事件
            //this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            // this.spaceKey.onDown.add(function() {
            //     if (allowAddBaketBall) {
            //         _this.createBasketBall();
            //     }
            // });

            // this.spaceKey.onUp.add(function() {
            //     allowAddBaketBall = true;
            //     me.Shoot(basketball.sprite);
            // });

            this.lineA = new Phaser.Line(_this.basketA.x, _this.basketA.y, _this.basketB.x, _this.basketB.y);
            this.lineA.fromSprite(_this.basketA, _this.basketB, false);

            /*
             * 手指滑动松开后投篮
             */
            this.game.input.onDown.add(function() {
                if (_this.allowAddBaketBall) {
                    _this.createBasketBall();
                }
                let pointer = _this.game.input.activePointer;
                _this.pointerStart = new Phaser.Point(pointer.x, pointer.y);

            })
            this.game.input.onUp.add(function() {
                _this.allowAddBaketBall = true;
                _this.shoot(_this.basketball);
            })
        }
        //设置物理材质约束
    createContactMaterial() {
            let _this = this;
            this.worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');
            this.basketBallMaterial = this.game.physics.p2.createMaterial('basketBallMaterial');
            this.boardMaterial = this.game.physics.p2.createMaterial('boardMaterial');
            this.game.physics.p2.createContactMaterial(_this.basketBallMaterial, _this.worldMaterial, {
                restitution: 0.8, //损耗
                friction: 0.8, //摩擦
                surfaceVelocity: 0, //平面速度
            });
            //basketball Material
            this.game.physics.p2.createContactMaterial(_this.basketBallMaterial, _this.boardMaterial, {
                restitution: 0.4
            });
            this.game.physics.p2.createContactMaterial(_this.basketBallMaterial, _this.basketBallMaterial, {
                restitution: 0.6
            });
            //  setWorldMaterial
            //  4 trues = the 4 faces of the world in left, right, top, bottom order
            this.game.physics.p2.setWorldMaterial(_this.worldMaterial, true, true, true, true);
        }
        //basket
    createBasketBoard() {
        let _this = this;
        let centerX = this.game.world.centerX;
        let centerY = this.game.world.centerY;
        let boardHeight = this.game.height - 150;
        let basketball = _this.basketball;
        this.basketBoard = this.game.add.sprite(centerX + centerX / 1.5, boardHeight / 2 + 150, '');
        this.basketA = this.game.add.sprite(_this.basketBoard.x - (basketball.sprite.width * 1.6), _this.basketBoard.y / 2, '');
        this.basketB = this.game.add.sprite(_this.basketBoard.x, _this.basketBoard.y / 2);
        //开启物理效果
        this.game.physics.p2.enable([_this.basketBoard, _this.basketA, _this.basketB], true);
        //篮筐
        this.basketA.body.setRectangle(15 * devicePixelRatio, 10);
        this.basketA.body.static = true;
        this.basketB.body.setRectangle(30 * devicePixelRatio, 10);
        this.basketB.body.static = true;
        //篮板
        this.basketBoard.body.setRectangle(18 * devicePixelRatio, boardHeight);
        this.basketBoard.body.static = true;
        this.basketBoard.body.setMaterial(_this.boardMaterial);
        this.basketA.body.setMaterial(_this.boardMaterial);
        this.basketB.body.setMaterial(_this.boardMaterial);


    }

    createBasketBall() {
            let _this = this;
            this.basketball = new BasketBall(this.game);
            this.basketballs.push(_this.basketball);
            this.basketball.sprite.body.setMaterial(_this.basketBallMaterial);

        }
        /*
         * 投篮
         */
    shoot(basketball) {

        let _this = this;
        let sprite = _this.basketball.sprite;
        let pointer = _this.game.input.activePointer;
        _this.pointerEnd = new Phaser.Point(pointer.x, pointer.y);
        let x = _this.pointerEnd.x - _this.pointerStart.x;
        let y = _this.pointerEnd.y - _this.pointerStart.y;
        let duration = Math.round(pointer.duration);
        let length = Math.round(new Phaser.Line(_this.pointerStart.x, _this.pointerStart.y, _this.pointerEnd.x, _this.pointerEnd.y).length);
        _this.force = length / duration;
        sprite.body.velocity.x = x * _this.force;
        sprite.body.velocity.y = y * _this.force;
        sprite.body.static = false;
        sprite.body.velocity.x = x * _this.force;
        sprite.body.velocity.y = y * _this.force;
        sprite.body.angularVelocity = -5;
        //性能优化，定时将球从数组中删除
        setTimeout(() => {
            _this.basketballs.splice(0, 1);
        }, 12000);
    }
    update() {

        // if (this.spaceKey.isDown) {
        //     if( Math.abs(angleLine.angle) >= Math.PI/2 ){
        //         rotateAngle = rotateAngle * -1;
        //     }else if(angleLine.angle > 0){
        //         rotateAngle = rotateAngle * -1;
        //     }
        //     angleLine.rotateAround(basketball.x,basketball.y,rotateAngle,true);
        // }
        let _this = this;
        //判断是否进球
        this.basketballs.forEach(function(basketball) {
            if ((basketball.sprite.x > _this.lineA.start.x && basketball.sprite.x < _this.lineA.end.x) && Phaser.Math.difference(basketball.sprite.y, _this.lineA.end.y) < 5 * devicePixelRatio) {
                basketball.signal.dispatch();
            }
        });

    }

    render() {
        var _this = this;
        this.game.debug.text('FPS: ' + this.game.time.fps || '--', 20, 30, '', '35px Arial');
        //this.game.debug.text('按空格键投篮', 20, 32);
        this.game.debug.text('角度 :' + Math.round(_this.pointerEnd.angle(_this.pointerStart, true)), 20, 75, '', '35px Arial');
        this.game.debug.text('速度 :' + _this.force, 20, 122, '', '35px Arial');
        this.game.debug.geom(_this.lineA, 'rgb(255,255,255)');
        this.game.debug.text('得分 : ' + this.game.score, 800, 32, '', '35px Arial');

        //this.game.debug.geom(basketball.line, 'rgb(255,255,255)');
        //this.game.debug.geom(angleLine.end,'rgb(255,255,255)');
        this.game.debug.pointer(_this.game.input.activePointer, '', '35px Arial');



    }

}

export default Main;
