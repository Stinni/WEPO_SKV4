window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var DOWNSPEED = 25; // * 10 pixels per second
	var UPSPEED = 60;
	var HEIGHT = 7;
	var WIDTH = 12;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var GROUND_HEIGHT = 8;
	var PIPE_WIDTH = 12; // same as $pipe-width in _pipes.scss file
	var HAS_SCORED = false;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.isRising = false;
		this.riseTime = (new Date()).getTime();
		this.scoreDelay = (new Date()).getTime();
		this.score = 0;
		this.highScore = 0;
		this.flapSound = new Audio('audio/bat-flapping.wav');
		this.scoredSound = new Audio('audio/scored.mp3');
		this.flapSound.volume = 0.8, this.scoredSound.volume = 0.8;
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

		if(Controls.keys.space) {
			if(!this.isRising) {
				this.riseTime = (new Date()).getTime() + 150;
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

		if(this.isRising) {
			this.pos.y -= delta * UPSPEED;
		}
		else {
			this.pos.y += delta * DOWNSPEED;
		}

		if(HAS_SCORED && this.scoreDelay <= (new Date()).getTime()) {
			HAS_SCORED = false;
			this.score++;
			this.scoredSound.currentTime = 0;
			this.scoredSound.play();
			$('#Score').html(this.score);
		}

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if(this.pos.y < 0 ||
			this.pos.y + HEIGHT + GROUND_HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}

		if(this.pos.x <= this.game.pipe1.pos.x + PIPE_WIDTH - WIDTH/2 && this.pos.x + WIDTH >= this.game.pipe1.pos.x)
		{
			if(this.pos.y + HEIGHT > (this.game.pipe1.holeTop + this.game.pipe1.holeSize)/10 + 2 ||
				this.pos.y < (this.game.pipe1.holeTop - 12)/10)
			{
				return this.game.gameover();
			}

			if(!HAS_SCORED) {
				HAS_SCORED = true;
				this.scoreDelay = (new Date()).getTime() + 1200;
			}
		}

		if(this.pos.x <= this.game.pipe2.pos.x + PIPE_WIDTH - WIDTH/2 && this.pos.x + WIDTH >= this.game.pipe2.pos.x)
		{
			if(this.pos.y + HEIGHT > (this.game.pipe2.holeTop + this.game.pipe2.holeSize)/10 + 2 ||
				this.pos.y < (this.game.pipe2.holeTop - 12)/10)
			{
				return this.game.gameover();
			}

			if(!HAS_SCORED) {
				HAS_SCORED = true
;				this.scoreDelay = (new Date()).getTime() + 1200;
			}
		}
	};

	return Player;
})();
