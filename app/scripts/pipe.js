window.Pipe = (function(){
	'use strict';

	var SPEED = 0.7;
	var INIT_X_POS = 120;
	var HOLE_SIZE = 210;

	var Pipe = function(el, xpos) {
		this.el = el;
		this.pos = { x: xpos, y: 0 };
		this.startPos = xpos;
		this.holeTop = Math.floor((Math.random() * 300) + 5);

		this.atTop = this.el.find('.atTop');
		this.atBottom = this.el.find('.atBottom');
		this.atTop.css('height', this.holeTop);
		this.atBottom.css('top', HOLE_SIZE);
	};

	Pipe.prototype.reset = function() {
		this.pos.x = this.startPos;
		this.holeTop = Math.floor((Math.random() * 300) + 5);
		this.atTop.css('height', this.holeTop);
		this.atBottom.css('top', HOLE_SIZE);
	};

	Pipe.prototype.repeat = function() {
		this.pos.x = INIT_X_POS;
		this.holeTop = Math.floor((Math.random() * 300) + 15);
		this.atTop.css('height', this.holeTop);
		this.atBottom.css('top', HOLE_SIZE);
	};

	Pipe.prototype.onFrame = function() {
		this.pos.x = this.pos.x - SPEED;
		if (this.pos.x < -15) {
			this.repeat();
		}

		// Update UI
		this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y +  'em, 0)');
	};

	return Pipe;
})();