var Player = function(socket) {
	this.socket   = socket;
	this.location = new (require("./location"))();
	this.entityId = 0;
	this.direction = null;
};

Player.prototype.getDirection = function() {
	return this.direction;
};

Player.prototype.setDirection = function (d) {
	this.direction = d;
}

Player.prototype.getSocket = function() {
	return this.socket;
};

Player.prototype.getLocation = function() {
	return this.location;
};

Player.prototype.setLocation = function(location) {
	this.location = location;
};

Player.prototype.getEntityId = function() {
	return this.entityId;
};

Player.prototype.setEntityId = function(entityId) {
	this.entityId = entityId;
};

Player.prototype.disconnect = function() {
	this.socket.disconnect();
};

Player.prototype.getData = function() {
	return {
		entityId : this.entityId,
		isLocal  : false,
		location : {
			x : this.location.getX(),
			y : this.location.getY(),
			z : this.location.getZ()
		}
	};
};

module.exports = Player;
