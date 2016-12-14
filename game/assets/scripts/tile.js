var Tile = function(x, y, z, sprite) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	
	this.sprite = sprite || null;
	
	this.tileId = null;
};

Tile.prototype.getX = function() {
	return this.x;
};

Tile.prototype.getY = function () {
	return this.y;
};

Tile.prototype.getZ = function () {
	return this.z;
};

Tile.prototype.setSprite = function(sprite) {
	this.sprite = sprite;
};

Tile.prototype.getSprite = function() {
	return this.sprite;
};

Tile.prototype.setTileId = function(tileId) {
	this.tileId = tileId;
};

Tile.prototype.getTitleId = function() {
	return this.tileId;
};

Tile.prototype.destroy = function(map, game) {
	this.sprite.destroy();
	var index     = map.tilez.indexOf(this);
	if (index > -1) map.tilez.splice(index, 1);

	var index     = map.waterTiles.indexOf(this);
	if (index > -1) map.waterTiles.splice(index, 1);
	
	var index     = map.tiles.indexOf(this.sprite);
	if (index > -1) map.tiles.splice(index, 1);

};

Tile.prototype.update = function() {
};
