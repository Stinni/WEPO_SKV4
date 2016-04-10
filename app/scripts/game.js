
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipe1 = new window.Pipe(this.el.find('#Pipe1'), 120);
		this.pipe2 = new window.Pipe(this.el.find('#Pipe2'), 200);
		this.heDeadSound = new Audio('audio/heDead.mp3');
		this.heDeadSound.volume = 0.8;
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000, delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.pipe1.onFrame(delta);
		this.pipe2.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Initialize the game.
	 */
	Game.prototype.init = function() {
		var that = this;
		var startbtnEl = this.el.find('.Startbtn');
		$('#Score').html(this.player.score);
		this.reset();

		startbtnEl
			.addClass('is-visible')
			.find('.Startbtn-start')
			.one('click', function() {
				startbtnEl.removeClass('is-visible');
				that.start();
			});
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		var ground = this.el.find('.Ground');
		var sky = this.el.find('.Sky');
		var wings = this.el.find('.Player-wings');
		this.reset();
		$('.Player').css('display','inline');
		$('.Pipe').css('display','inline');

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
		$('#Highscore').html(this.player.highScore);
		ground.css('animation-play-state', 'running');
		sky.css('animation-play-state', 'running');
		wings.css('animation-play-state', 'running');
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.pipe1.reset();
		this.pipe2.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		var ground = this.el.find('.Ground');
		var sky = this.el.find('.Sky');
		var wings = this.el.find('.Player-wings');

		this.heDeadSound.currentTime=0;
		this.heDeadSound.play();

		ground.css('animation-play-state', 'paused');
		sky.css('animation-play-state', 'paused');
		wings.css('animation-play-state', 'paused');

		if(this.player.score > this.player.highScore) {
			this.player.highScore = this.player.score;
			$('#Highscore').html(this.player.highScore);
		}

		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();

