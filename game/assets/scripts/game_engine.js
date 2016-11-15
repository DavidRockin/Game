var ShitGame = function () {
    var phaser;
    

    /// <HACK> !!!
    var $            = this;
    /// </HACK> !!!


    $.entities    = [];
    $.player      = null;
    
    $.isoGroup    = null;
    $.isoEntities = null;
    
    $.debugging   = false;
    
    $.id          = 0;
    
    $.getPhaser = function() {
        return phaser;
    };
    
    $.getPlayer = function() {
        return $.player;
    };
    
    $.getMap = function() {
        return $.map;
    };

    $.getIsoGroup = function() {
        return $.isoGroup;
    };

    $.getIsoEntities = function() {
        return $.isoEntities;
    };

	$.init = function() {
        phaser = new Phaser.Game("100%", "100%", Phaser.CANVAS, "", {
            preload : $.preload,
            create  : $.create,
            update  : $.update,
            render  : $.render,
        });
        phaser._t = this;
	};
    
	$.preload = function() {
        phaser.time.advancedTiming = true;
        
        // load ploogs
        phaser.plugins.add(new Phaser.Plugin.Isometric(phaser));
        
        // setup physics
        phaser.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        
        // load some shitty spritesheets
        phaser.load.atlasJSONHash("tileset", "assets/images/world/tileset.png", "assets/json/world/tileset.json");
        phaser.load.image("wood", "assets/images/world/wood_block.png");
        phaser.load.image("mushy", "assets/images/item/mushy.png");
        phaser.load.atlas("entity01", "assets/images/entity/entity01.png", "assets/json/entity/entity01.json");
        
        // do more shit
        phaser.iso.anchor.setTo(0.5, 0.2);
	};

	$.create = function() {
        console.log("create");
        
        //phaser.physics.isoArcade.gravity.setTo(0, 0, -500);
        
        $.isoGroup = phaser.add.group();
        $.isoGroup.enableBody = true;
        $.isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

        $.isoEntities = phaser.add.group();
        $.isoEntities.enableBody = true;
        $.isoEntities.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

        $.map = new Map([
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 2, 2, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 3, 3, 9, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 3, 3, 3, 10, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 2, 2, 3, 3, 3, 3, 10, 3, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 9, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 9, 3, 3, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 9, 3, 3, 3, 3, 3, 3, 10, 3, 3, 3, 9, 3, 3, 3, 3, 2, 2],
            [1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 3, 3, 3, 2, 2],
            [1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1],
            [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 0, 0, 3, 3, 3, 3, 3, 9, 3, 3, 3, 3, 3, 3, 3, 2, 1, 1],
            [1, 1, 1, 1, 1, 2, 2, 2, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 9, 3, 3, 3, 3, 3, 2, 2, 1, 1],
            [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 0, 0, 3, 9, 9, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1],
            [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 0, 3, 3, 9, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 10, 3, 3, 3, 3, 3, 2, 2, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ], $, phaser);

        $.entities = [];
        
        GameClient.getSocket().emit("join", {type: 1});
        
        /*$.player = new PlayerEntity(GameEngine);
        $.player.setId($.id);
        $.player.ai = false;
        $.player.init(300, 200, 50);
        $.entities.push($.player);
*/
        $.id++;
        
        //phaser.camera.follow($.player.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	};
    
    $.addPlayer = function(options) {
        var player = new PlayerEntity(GameEngine);
        player.setId(options.id);
        player.ai = false;
        player.init(options.x, options.y, options.z);
        
        if (options.isLocal)
            $.player = player;
        
        $.entities.push(player);
    };
    
	$.update = function() {
        //if (phaser.input.keyboard.isDown(32) && $.player.getZ() < -18) {
        //    $.player.setVelocity(0, 0, 269);
        //}
        
        var speed = 4.8873;
        
        var direction = ""; // $.player.getDirection();
        var isMoving  = false;
        
        
        var ran = Math.floor((Math.random() * 100) + 1);

        if (phaser.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
            speed *= 1.666;
        
        if (phaser.input.keyboard.isDown(Phaser.Keyboard.D))
            $.debugging = !$.debugging;
        

        if (phaser.input.keyboard.isDown(Phaser.Keyboard.M)) {
            var ie = new ItemEntity($);
            ie.init(10 + randNum(0, 30), 10 + randNum(0, 30), 0)
        }
        
        if ($.player !== null) {
            if (phaser.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                direction = "W";
                $.player.getSprite().body.velocity.x -= speed;
            } else if (phaser.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                direction = "E";
                $.player.getSprite().body.velocity.x += speed;
            } else {
                $.player.getSprite().body.velocity.x = 0;
            }
            
            if (phaser.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                direction = "N" + direction;
                $.player.getSprite().body.velocity.y -= speed;
            } else if (phaser.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                direction = "S" + direction;
                $.player.getSprite().body.velocity.y += speed;
            } else {
                $.player.getSprite().body.velocity.y = 0;
            }
            
            // console.log(direction);
            
            if ($.player.getSprite().body.velocity.x != 0 || $.player.getSprite().body.velocity.y != 0)
                isMoving  = true;
            
            if (direction != "") {
                $.player.setDirection(direction);
            }
            
            if (isMoving)
                $.player.sprite.animations.play(direction, speed , true);
            else
                $.player.sprite.frameName = (direction == "" ? $.player.getDirection() : direction) + "1";
        }
        
        $.map.update();
        
        for (var i = 0; i < $.entities.length; ++i) {
            try {
                $.entities[i].update();
            } catch (ex) {
                console.log(ex);
            }
        }

        //$.isoGroup.add($.player.sprite);

        //phaser.physics.isoArcade.collide($.isoGroup, $.player.sprite);
        phaser.iso.simpleSort($.isoGroup);
    };

    $.render = function() {
        phaser.debug.text("Shitty Game v0.0.69", 2, 14, "#00ff00");

        if ($.debugging === false)
            return;

        $.isoGroup.forEach(function (tile) {
            //phaser.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
        });

        $.isoEntities.forEach(function (e) {
            //tile.scale.setTo(1.5);
            phaser.debug.body(e, 'rgba(200, 100, 222, 0.6)', false);
        });
        
        phaser.debug.text("FPS " + phaser.time.fps || '--', 2, 14 * 2.3, "#00ff00");
        phaser.debug.text("XYZ (" + Math.round($.player.sprite.isoX, 2) + "," + Math.round($.player.sprite.isoY, 2) + "," + Math.round($.player.sprite.isoZ,2)+")", 2, 14*3.3, "#00ff00");
        phaser.debug.text($.entities.length, 2, 14*6, "#00ff00");
        
    };
    
    $.updatePlayers = function(players) {
		players.forEach(function(player) {	
			var found = 0;
			
			$.player.forEach(function(clientPlayer) {
			    if (clientPlayer.getId() == player.id) {
			        clientPlayer.move(player.location.x, player.location.y, player.location.z);
			        found = true;
			    }
			});
			
			if (!found && ($.player == undefined || player.id != $.player.getId()))
			    $.addPlayer(player)
		});
    };
    
};
