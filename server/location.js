var Location = function(x, y, z, world) {
	this.x     = x || 0;
	this.y     = y || 0;
	this.z     = z || 0;
	this.world = world || "main";
};

Location.prototype.getX = function() {
	return this.x;
};

Location.prototype.getY = function() {
	return this.y;
};

Location.prototype.getZ = function() {
	return this.z;
};

Location.prototype.setX = function(x) {
	this.x = x;
	return this;
};

Location.prototype.setY = function(y) {
	this.y = y;
	return this;
};

Location.prototype.setZ = function(z) {
	this.z = z;
	return this;
};

Location.prototype.set  = function(x, y, z) {
	console.log("set to " + x + " " + y + " " + z);
	this.x = x;
	this.y = y;
	this.z = z;
	return this;
};

module.exports = Location;
