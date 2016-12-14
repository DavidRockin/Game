function Map(tiles, ShitGame, game) {
	var tileArray = [];
	tileArray[1]  = 'tileset;water';
	tileArray[2]  = 'tileset;sand';
	tileArray[3]  = 'tileset;grass';
	tileArray[4]  = 'tileset;stone';
	tileArray[5]  = 'tileset;wood';
	tileArray[6]  = 'tileset;watersand';
	tileArray[7]  = 'tileset;grasssand';
	tileArray[8]  = 'tileset;sandstone';
	tileArray[9]  = 'tileset;bush1';
	tileArray[10]  = 'tileset;bush2';
	tileArray[11] = 'tileset;mushroom';
	tileArray[12] = 'tileset;wall';
	tileArray[13] = 'tileset;window';
	tileArray[14] = 'wood;0';
    
    this.rawTiles = tiles;
    this.ShitGame = ShitGame;
    this.game     = game;
    
    this.levels   = [];

    this.tiles     = [];
    this.tilez     = [];
    
    this.mapHeight = 0;
    this.mapWidth  = 0;
    
    this.waterTiles = [];
    
    this.waveAngle = 0;
    
    this.bounds = null;

	this.init = function(map) {
        var mapRow, mapTile;
        
        for (var y = 0; y < map.length; ++y) {
            mapRow = map[y];
            level = [];
            
            for (var x = 0; x < mapRow.length; ++x) {
                mapTile = mapRow[x];
                
                // level.push(0);

                // if this is an array of tiles
                if (mapTile instanceof Array) {
                    // loopy-loopy!
                    for (var z = 0; z < mapTile.length; ++z) {
                        this.parseTile(mapTile[z], x, y, z);
                    }
                    level.push(1);
                } else {
                    this.parseTile(mapTile, x, y);
                    level.push( (mapTile == 0 || mapTile == 1 ? 1 : 0) );
                }
            }

            this.levels.push(level);

        }

        // this.game.world.setBounds(0, 0, 38 * 50, 38 * 160);
        this.bounds = new Phaser.Plugin.Isometric.Cube(0, 0, 0, 38*50, 38*160, 38*5);
	};

	this.update = function() {
        if (this.waveAngle > 360)
            this.waveAngle = 0;
        
        var tile;
        
        //tile = this.tiles[29 * 2 + 4];
        //tile.isoZ = (Math.sin(0.5 * (this.waveAngle - 45*tile.isoY + tile.isoX)) + (this.waveAngle/Math.PI)*-0.15 );
        
        for (var i = 0; i < this.waterTiles.length; ++i) {
            tile       = this.waterTiles[i];
            tile.isoZ  = (Math.sin(this.waveAngle - 45*tile.isoY + tile.isoX) + (this.waveAngle/Math.PI)*-0.01 );
            //if (i == 0)
            //console.log(tile.isoZ);
            //tile.alpha = Phaser.Math.clamp(1 + (tile.isoZ * 0.11), 0.2, 1);
        }
        
        this.waveAngle += Math.PI*2 / 100;
	};
	
	this.setTile = function(x, y, z, id) {
		var tile = this.getTile(x, y, z)
		
		console.log(x,y,z, "to " + id);
		
		if (tile !== undefined) {
			tile.destroy(this, this.ShitGame);
			
		}
		
		if (!this.levels[y])
			this.levels[y] = [];
		this.levels[y][x] = this.parseTile(id, x, y, z);
		//}
	};
    
    this.parseTile = function(id, x, y, z) {
        z = z || 0;
        
        // if this is air, no beuno. :(
        if (id == 0)
            return;
        
        // make sure the tile exists?
        if (!tileArray[id])
            return;
        
        tileData = tileArray[id].split(";");

        // define tile sprite
        var tile = this.ShitGame.getPhaser().add.isoSprite(x * 38, y * 38, z, tileData[0], tileData[1], this.ShitGame.getIsoGroup());
        tile.anchor.set(0.5, 1);
        //tile.isoZ += id * 1.2;

            tile.body.immovable = true;
            tile.body.gravity.setTo(0, 0, 0);

        if (z > 0) {
        //    tile.isoZ += id * z;
        }
        
        // world information
        this.mapHeight = (x * tile.height) * 2;
        this.mapWidth  = (y * tile.width)  * 2;
        
        this.tiles.push(tile);

		this.tilez.push(new Tile(x, y, z, tile));

        if (id == 1)
            this.waterTiles.push(tile);
        
        return tile;
    };
    
    this.getLevel = function(level) {
    };
    
    this.getTile = function(x, y, z) {
    	var tile;
    	for (var i = 0; i < this.tilez.length; ++i) {
    		tile = this.tilez[i];
    		
    		if (tile.getX() == x && tile.getY() == y) { // && tile.getZ() == z) {
    			console.log(tile);
    			return tile;
    		}
    	}
    }
    
    this.getTiles = function() {
    	return this.tiles;
    };
    
    this.getTilez = function() {
    	return this.tilez;
    };
    
    this.init(tiles);
    return this;
};
