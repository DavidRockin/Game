var PlayerEntity = function(game) {
	this.game = game;
};

// inherit the base entity
inherit(PlayerEntity, Entity);

PlayerEntity.prototype.init = function(x, y, z) {
	Entity.prototype.init.call();
	
	this.maxHealth = 30;
	this.health    = 30;
	
	this.sprite = this.game.getPhaser().add.isoSprite(x, y, z, "entity01", 0, this.game.getIsoEntities());
	this.sprite.frameName = "S1";
	this.sprite.anchor.set(0.5, 1.5);
	this.sprite.scale.setTo(1);
	
	this.sprite.animations.add("N", ["N1", "N2", "N3"], 10, true);
	this.sprite.animations.add("E",  ["E1", "E2", "E3"], 10, true);
	this.sprite.animations.add("S", ["S1", "S2", "S3"], 10, true);
	this.sprite.animations.add("W",  ["W1", "W2", "W3"], 10, true);
	this.sprite.animations.add("NE", ["NE1", "N2E", "NE3"], 10, true);
	this.sprite.animations.add("SE",  ["SE1", "SE2", "SE3"], 10, true);
	this.sprite.animations.add("SW", ["SW1", "SW2", "SW3"], 10, true);
	this.sprite.animations.add("NW",  ["N1", "N2", "N3"], 10, true);
	
	this.sprite.smoothed = false;

	this.game.getPhaser().physics.isoArcade.enable(this.sprite);
	this.sprite.body.bounce.set(0, 0, 0.69); // 0.43854845);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.gravity.z = -400;
	this.waveAngle = 0;
	//this.sprite.isoZ = 50;    
	this.id = -1;

this.waveAngle = 0;

	this.easystar = new EasyStar.js();
};

PlayerEntity.prototype.update = function() {
	if (!this.ai)
		return;
	
	 if (this.waveAngle > 360)
			this.waveAngle = 0;
		
		var tz = 0.5 * ( Math.sin(this.waveAngle - 45) + (this.waveAngle/Math.PI)*-0.05);
				this.waveAngle += Math.PI*2 / 100;

	this.sprite.tint = 0xEEFF00 * tz;

	if (this.getZ() < -55 && randNum(1,100)<30)
		this.setVelocity(0, 0, 100 * randNum(0.5, 2));

	var easystar = this.easystar;
	easystar.setGrid(this.game.map.levels);
	easystar.setAcceptableTiles([0]);
	easystar.setIterationsPerCalculation(1000);
	easystar.enableDiagonals();

	x1 = Math.floor(this.sprite.isoPosition.x / 38);
	y1 = Math.floor(this.sprite.isoPosition.y / 38);
	x2 = Math.floor(this.game.player.sprite.isoPosition.x / 38);
	y2 = Math.floor(this.game.player.sprite.isoPosition.y / 38);

	//console.log(x1 + "," + y1 + " " + x2 + "," + y2);
	//console.log(easystar);

	var t = this;

	easystar.findPath(x1, y1, x2, y2, function(path) {
		if (path === null) {
			console.log("The path to the destination point was not found.");
			return;
		}
	
		stop = false;

		currentNextPointX = x1;
		currentNextPointY = y1;

		if (path !=null && path[1]) {
			currentNextPointX = path[1].x;
			currentNextPointY = path[1].y;
		}
	
		currentXTile = x2;
		currentYTile = y2;
		
		// moving up left
		if (currentNextPointX < currentXTile && currentNextPointY < currentYTile) {
			enemyDirection = "SE";
		}
		
		// moving up
		else if (currentNextPointX == currentXTile && currentNextPointY < currentYTile) {
			enemyDirection = "S";
		}
		
		// move up right
		else if (currentNextPointX > currentXTile && currentNextPointY < currentYTile) {
			enemyDirection = "SW";
		}
		
		// move left
		else if (currentNextPointX < currentXTile && currentNextPointY == currentYTile) {
			enemyDirection = "E";
		}
		
		// move right
		else if (currentNextPointX > currentXTile && currentNextPointY == currentYTile) {
			enemyDirection = "W";
		}
		
		// move down right
		else if (currentNextPointX > currentXTile && currentNextPointY > currentYTile) {
			enemyDirection = "NW";
		}
	
		// move down
		else if (currentNextPointX == currentXTile && currentNextPointY > currentYTile) {
			enemyDirection = "N";
		}
		
		// move down left
		else if (currentNextPointX < currentXTile && currentNextPointY > currentYTile) {
			enemyDirection = "NE";
		}
		
		// stop movement
		else {
			stop = true;
			enemyDirection = t.getDirection();
		}
		
		speed     = 6.9;
		isMoving  = (!stop || t.sprite.body.velocity.x > 0 || t.sprite.body.velocity.y >0);
		direction = enemyDirection;
		
		if (direction == "W" || direction == "NW") {
			t.sprite.body.velocity.x -= speed;
		} else if (direction == "E" || direction == "SE") {
			direction = "E";
			t.sprite.body.velocity.x += speed;
		} else {
			t.sprite.body.velocity.x = 0;
		}
		
		if (direction == "N" || direction == "NE" || direction == "NE") {
			t.sprite.body.velocity.y -= speed;
		} else if (direction == "S" || direction == "SE" || direction == "SW") {
			t.sprite.body.velocity.y += speed;
		} else {
			t.sprite.body.velocity.y = 0;
		}
		
		
		if (isMoving) {
			if (t.getDirection() !== enemyDirection)
				t.sprite.animations.play(enemyDirection, speed *3.5, true);
			t.setDirection(enemyDirection);
		} else
			t.sprite.frameName = (enemyDirection == "" ? t.getDirection() : enemyDirection) + "1";
	});

	easystar.calculate();

/*
	Entity.prototype.update.call();
	if (this.waveAngle > 360)
		this.waveAngle = 0;
	this.sprite.isoZ = 45*Math.sin(this.waveAngle) + (this.waveAngle/Math.PI)*-10;
	this.waveAngle += Math.PI*2 / 100;*/
};
