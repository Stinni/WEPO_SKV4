window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var DOWNSPEED = 25; // * 10 pixels per second
	var UPSPEED = 60;
	var HEIGHT = 15;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.isRising = false;
		this.riseTime = (new Date()).getTime();
		this.score = 0;
		this.highScore = 0;
		this.flapSound = new Audio('audio/bat-flapping.wav');
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.score = 0;
	};

	Player.prototype.onFrame = function(delta) {

		if (Controls.keys.space) {
			if (!this.isRising) {
				this.riseTime = (new Date()).getTime() + 100;
				this.isRising = true;

				this.flapSound.currentTime = 0;
				this.flapSound.play();
			}

			this.pos.y -= delta * UPSPEED;
			Controls.keys.space = false;
		}

		if(this.isRising && this.riseTime <= (new Date()).getTime()) {
			this.isRising = false;
		}

		if(this.isRising){
			this.pos.y -= delta * UPSPEED;
		}
		else {
			this.pos.y += delta * DOWNSPEED;
		}

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;
})();
