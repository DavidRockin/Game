var Client = function(game, host) {
	
	this.game = game;
	this.socket = io.connect(host);
	this.init();
	
};

Client.prototype.init = function() {
	var $ = this;
	
	this.socket.emit("test", {number : 420});
	
	this.socket.on("addPlayer", function(player) {
		$.game.addPlayer(player);
	});
	
	this.socket.on("removePlayer", function(player) {
		
	});
	
	this.socket.on("sync", function(data) {
		$.game.updatePlayers(data.players);
	});
	
	this.socket.on("welcome", function(data) {
		console.log("Server welcomed us " + data.test);
	});
	
//	setInterval(Client.prototype.sendData, 50);
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
	
	//console.log(client.game.getPlayer().getX());
	
	client.socket.emit("sync", {
		x : client.game.getPlayer().getX(),
		y : client.game.getPlayer().getY(),
		z : client.game.getPlayer().getZ(),
		d : client.game.getPlayer().getDirection()
	});
};
