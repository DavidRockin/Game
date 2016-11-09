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
		alert("sink da ship");
	});
	
	this.socket.on("welcome", function(data) {
		console.log("Server welcomed us " + data.test);
	});
	
	setInterval(Client.prototype.sendData, 50);
};

Client.prototype.getSocket = function() {
	return this.socket;
};

Client.prototype.sendData = function() {
	console.log(this);
	this.socket.emit("sync", {
		x : this.game.getPlayer().getX()
	});
};
