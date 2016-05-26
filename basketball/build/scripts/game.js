(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _statesBoot = require('states/Boot');

var _statesBoot2 = _interopRequireDefault(_statesBoot);

var _statesPreload = require('states/Preload');

var _statesPreload2 = _interopRequireDefault(_statesPreload);

var _statesGameTitle = require('states/GameTitle');

var _statesGameTitle2 = _interopRequireDefault(_statesGameTitle);

var _statesMain = require('states/Main');

var _statesMain2 = _interopRequireDefault(_statesMain);

//import GameOver from 'states/GameOver';

var container = document.getElementById('mobile');

var GameInit = false;

var Game = (function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        _classCallCheck(this, Game);

        _get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, container);

        this.state.add('Boot', _statesBoot2['default'], false);
        this.state.add('Preload', _statesPreload2['default'], false);
        this.state.add('GameTitle', _statesGameTitle2['default'], false);
        this.state.add('Main', _statesMain2['default'], false);
        //this.state.add('GameOver', GameOver, false);
        this.state.start('Boot');

        GameInit = true;
    }

    return Game;
})(Phaser.Game);

window.addEventListener('orientationchange', doOnOrientationChange);
window.onload = function () {
    // Initial execution if needed
    doOnOrientationChange();
};

function doOnOrientationChange() {
    if (!window.mobilecheck()) {

        document.getElementById('desktop').style.display = 'block';
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: window.location.href,
            width: 300,
            height: 300,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        return;
    } else {
        document.getElementById('desktop').style.display = 'none';
    }
    switch (window.orientation) {
        case -90:
            if (!GameInit) {
                document.getElementById('orientation').style.display = 'none';
                new Game();
            }
            break;
        case 90:
            if (!GameInit) {
                document.getElementById('orientation').style.display = 'none';
                new Game();
            }
            break;
        default:
            if (!GameInit) {
                document.getElementById('orientation').style.display = 'block';
            }
            break;
    }
}

window.mobilecheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

},{"states/Boot":3,"states/GameTitle":4,"states/Main":5,"states/Preload":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var scaleRatio = window.devicePixelRatio / 3;

var Basketball = (function () {
	function Basketball(game) {
		_classCallCheck(this, Basketball);

		//Do something
		this.game = game;
		this.x = this.game.world.centerX - this.game.world.centerX / 2;
		this.y = this.game.world.centerY + this.game.world.centerY / 3;
		this.sprite = this.game.add.sprite(this.x, this.y, 'basketball');
		this.sprite.scale.set(scaleRatio * 0.6);

		this.enablePhysic();

		this.updateScore();
	}

	_createClass(Basketball, [{
		key: 'enablePhysic',
		value: function enablePhysic() {

			var me = this;
			this.game.physics.p2.enable(me.sprite);
			this.sprite.body.setCircle(me.sprite.width / 2);
			this.sprite.body['static'] = true;
			this.sprite.body.damping = 0.2;
			this.sprite.body.sleepSpeedLimit = 0.5;
		}
	}, {
		key: 'updateScore',
		value: function updateScore() {

			var _this = this;
			this.signal = new Phaser.Signal();
			this.signal.addOnce(function () {
				_this.game.score++;
			});
		}
	}]);

	return Basketball;
})();

exports['default'] = Basketball;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boot = (function (_Phaser$State) {
    _inherits(Boot, _Phaser$State);

    function Boot() {
        _classCallCheck(this, Boot);

        _get(Object.getPrototypeOf(Boot.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Boot, [{
        key: 'preload',
        value: function preload() {}
    }, {
        key: 'init',
        value: function init() {
            this.stage.disableVisibilityChange = true;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = false;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.game.time.advancedTiming = true;
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    }, {
        key: 'create',
        value: function create() {

            this.game.state.start("Preload");
        }
    }, {
        key: 'enterIncorrectOrientation',
        value: function enterIncorrectOrientation() {
            document.getElementById('orientation').style.display = 'block';
        }
    }, {
        key: 'leaveIncorrectOrientation',
        value: function leaveIncorrectOrientation() {
            document.getElementById('orientation').style.display = 'none';
        }
    }]);

    return Boot;
})(Phaser.State);

exports['default'] = Boot;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameTitle = (function (_Phaser$State) {
	_inherits(GameTitle, _Phaser$State);

	function GameTitle() {
		_classCallCheck(this, GameTitle);

		_get(Object.getPrototypeOf(GameTitle.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(GameTitle, [{
		key: "create",
		value: function create() {
			console.log(radius);
		}
	}, {
		key: "startGame",
		value: function startGame() {
			this.game.state.start("Main");
		}
	}]);

	return GameTitle;
})(Phaser.State);

exports["default"] = GameTitle;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectsBasketball = require('objects/basketball');

var _objectsBasketball2 = _interopRequireDefault(_objectsBasketball);

var devicePixelRatio = window.devicePixelRatio;
var scaleRatio = devicePixelRatio / 3;

//var basketball;
//keySpace,
//angleLine,
//rotateAngle = -6;

var Main = (function (_Phaser$State) {
    _inherits(Main, _Phaser$State);

    function Main() {
        _classCallCheck(this, Main);

        _get(Object.getPrototypeOf(Main.prototype), 'constructor', this).call(this);
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

    _createClass(Main, [{
        key: 'create',
        value: function create() {
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
            this.game.input.onDown.add(function () {
                if (_this.allowAddBaketBall) {
                    _this.createBasketBall();
                }
                var pointer = _this.game.input.activePointer;
                _this.pointerStart = new Phaser.Point(pointer.x, pointer.y);
            });
            this.game.input.onUp.add(function () {
                _this.allowAddBaketBall = true;
                _this.shoot(_this.basketball);
            });
        }

        //设置物理材质约束
    }, {
        key: 'createContactMaterial',
        value: function createContactMaterial() {
            var _this = this;
            this.worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');
            this.basketBallMaterial = this.game.physics.p2.createMaterial('basketBallMaterial');
            this.boardMaterial = this.game.physics.p2.createMaterial('boardMaterial');
            this.game.physics.p2.createContactMaterial(_this.basketBallMaterial, _this.worldMaterial, {
                restitution: 0.8, //损耗
                friction: 0.8, //摩擦
                surfaceVelocity: 0 });
            //basketball Material
            //平面速度
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
    }, {
        key: 'createBasketBoard',
        value: function createBasketBoard() {
            var _this = this;
            var centerX = this.game.world.centerX;
            var centerY = this.game.world.centerY;
            var boardHeight = this.game.height - 150;
            var basketball = _this.basketball;
            this.basketBoard = this.game.add.sprite(centerX + centerX / 1.5, boardHeight / 2 + 150, '');
            this.basketA = this.game.add.sprite(_this.basketBoard.x - basketball.sprite.width * 1.6, _this.basketBoard.y / 2, '');
            this.basketB = this.game.add.sprite(_this.basketBoard.x, _this.basketBoard.y / 2);
            //开启物理效果
            this.game.physics.p2.enable([_this.basketBoard, _this.basketA, _this.basketB], true);
            //篮筐
            this.basketA.body.setRectangle(15 * devicePixelRatio, 10);
            this.basketA.body['static'] = true;
            this.basketB.body.setRectangle(30 * devicePixelRatio, 10);
            this.basketB.body['static'] = true;
            //篮板
            this.basketBoard.body.setRectangle(18 * devicePixelRatio, boardHeight);
            this.basketBoard.body['static'] = true;
            this.basketBoard.body.setMaterial(_this.boardMaterial);
            this.basketA.body.setMaterial(_this.boardMaterial);
            this.basketB.body.setMaterial(_this.boardMaterial);
        }
    }, {
        key: 'createBasketBall',
        value: function createBasketBall() {
            var _this = this;
            this.basketball = new _objectsBasketball2['default'](this.game);
            this.basketballs.push(_this.basketball);
            this.basketball.sprite.body.setMaterial(_this.basketBallMaterial);
        }

        /*
         * 投篮
         */
    }, {
        key: 'shoot',
        value: function shoot(basketball) {

            var _this = this;
            var sprite = _this.basketball.sprite;
            var pointer = _this.game.input.activePointer;
            var x = pointer.x - _this.pointerStart.x;
            var y = pointer.y - _this.pointerStart.y;
            var duration = Math.round(pointer.duration);
            var length = Math.round(new Phaser.Line(_this.pointerStart.x, _this.pointerStart.y, pointer.x, pointer.y).length);
            _this.pointerEnd = new Phaser.Point(pointer.x, pointer.y);
            _this.force = length / duration;
            sprite.body['static'] = false;
            sprite.body.velocity.x = x * _this.force;
            sprite.body.velocity.y = y * _this.force;
            sprite.body.angularVelocity = -5;
            //性能优化，定时将球从数组中删除
            setTimeout(function () {
                _this.basketballs.splice(0, 1);
            }, 12000);
        }
    }, {
        key: 'update',
        value: function update() {

            // if (this.spaceKey.isDown) {
            //     if( Math.abs(angleLine.angle) >= Math.PI/2 ){
            //         rotateAngle = rotateAngle * -1;
            //     }else if(angleLine.angle > 0){
            //         rotateAngle = rotateAngle * -1;
            //     }
            //     angleLine.rotateAround(basketball.x,basketball.y,rotateAngle,true);
            // }
            var _this = this;
            //判断是否进球
            this.basketballs.forEach(function (basketball) {
                if (basketball.sprite.x > _this.lineA.start.x && basketball.sprite.x < _this.lineA.end.x && Phaser.Math.difference(basketball.sprite.y, _this.lineA.end.y) < 5 * devicePixelRatio) {
                    basketball.signal.dispatch();
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
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
    }]);

    return Main;
})(Phaser.State);

exports['default'] = Main;
module.exports = exports['default'];

},{"objects/basketball":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preload = (function (_Phaser$State) {
	_inherits(Preload, _Phaser$State);

	function Preload() {
		_classCallCheck(this, Preload);

		_get(Object.getPrototypeOf(Preload.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Preload, [{
		key: 'preload',
		value: function preload() {
			/* Preload required assets */
			this.game.load.image('basketball', 'assets/basketball.png');
		}
	}, {
		key: 'create',
		value: function create() {
			//NOTE: Change to GameTitle if required
			this.game.state.start("Main");
		}
	}]);

	return Preload;
})(Phaser.State);

exports['default'] = Preload;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=game.js.map
