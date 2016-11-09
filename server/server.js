var Server = function(options) {

	var _ = this;

	this.express = require("express");
	this.app     = this.express();
	
	var events  = require("events");
	this.events = new events.EventEmitter();
	
	this.app.use(this.express.static(__dirname));
	
	this.players = [];
	this.entities= [];
	this.entityId= 0;

	this.server = this.app.listen(options.port, function() {
		console.log("[!] Server running on port %s", this.address().port);
	});
	
	this.io = require("socket.io")(this.server);
	
	this.getSyncData = function() {
		var data = {
			players : []
		};
		
		for (var i = 0; i < _.players.length; ++i)
			data.players.push(_.players[i].getData());
		
		return data;
	};
	
	this.init = function() {
		this.io.on("connection", function(client) {
			console.log("[!] New connection");
			
			var player = new (require("./player"))(client);
			player.setEntityId(_.entityId);
			_.players.push(player);
			
			client.emit("welcome", {
				test: 6
			});
			
			client.on("test", function(data) {
				console.log("Client sent " + data.number);
			});

			client.on("join", function() {
				++_.entityId;
				
				console.log("[!] Player joined");
				
				player.setLocation(player.getLocation().set(
					(Math.random() * (200 - 5) + 5).toFixed(3),
					(Math.random() * (200 - 5) + 5).toFixed(3),
					(Math.random() * (10 - 5) + 5).toFixed(3)
				));
				
				client.emit("addPlayer", {
					id       : _.entityId,
					isLocal  : true,
					location : player.getData()
				});
				
				client.broadcast.emit("addPlayer", {
					id       : _.entityId,
					isLocal  : false,
					location : player.getData()
				});
				
			});
			
			client.on("sync", function(data) {
				this.players.forEach(function(player) {
					if (player.getEntityId() == data.entityId)
						player.getLocation().set(data.x, data.y, data.z);
				});
				
				client.emit("sync", _.getSyncData());
				client.broadcast.emit("sync", _.getSyncData());
			});
			
			client.on("disconnect", function() {
				var index = _.players.indexOf(client);
				_.players.splice(index, 1);
				console.log("[!] User disconnected, " + _.players.length + " clients connected");
			});
			
		});
	};
	
	this.init();

};


module.exports.Server = Server;
