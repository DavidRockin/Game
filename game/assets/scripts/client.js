var Client = function(game, host, gameMenu, callback) {
	this.game = game;
	this.callback = callback;
	this.gameMenu = gameMenu;
	
	this.loading = true;
	
	try {
		this.socket = io.connect(host);
	} catch (ex) {
		console.log(ex);
		callback();
		return;
	}
	
	this.init();
};

Client.prototype.init = function() {
	var $ = this;
	
	console.log("registering events");
	
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
	
	this.socket.on("sendWorld", function(data) {
		console.log("Server sent world data ");
		$.gameMenu.setStatus("building the world");
		$.game.setMap(new Map(data.world, $.game, $.game.getPhaser()));
	});
	
	this.socket.on("spawn", function(data) {
		$.gameMenu.setStatus("spawning you in!");
		$.gameMenu.changeScreen("game");
	});
	
	this.socket.on("sendTile", function(data) {
		$.game.getMap().setTile(data.location.x, data.location.y, data.location.z, data.tile);
	});
	
	this.socket.emit("join", {
		type : 1
	});
	
	//this.socket.on('error', function(data) {
		//$.callback();
	//	console.log(data);
	//});
	/*socket.on('connect', function(){
		console.log('Connected');
	});
	socket.on('disconnect', function () {
		console.log('Disconnected');
	});*/
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
