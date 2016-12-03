var Client = function(game, host) {
	
	this.game = game;
	this.socket = io.connect(host);
	this.init();
	
};

Client.prototype.init = function() {
	var $ = this;
	
	this.socket.emit("test", {number : 420});
	
	this.socket.on("addPlayer", function(player) {
		console.log("add player");
		$.game.addPlayer(player);
	});
	
	this.socket.on("removePlayer", function(player) {
		console.log("remove player");
	});
	
	this.socket.on("sync", function(data) {
		console.log("sync");
		$.game.updatePlayers(data.players);
	});
	
	this.socket.on("welcome", function(data) {
		console.log("Server welcomed us " + data.test);
	});
};

Client.prototype.getGame = function() {
	return this.game;
};

Client.prototype.getSocket = function() {
	return this.socket;
};

Client.prototype.sendData = function(client) {
	if (client.game.getPlayer() == null)
		return;
	
	client.socket.emit("sync", {
		x : client.game.getPlayer().getX(),
		y : client.game.getPlayer().getY(),
		z : client.game.getPlayer().getZ(),
		d : client.game.getPlayer().getDirection()
	});
};
