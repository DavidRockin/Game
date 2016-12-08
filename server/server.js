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
			
			_.entityId++;
			
			var player = new (require("./player"))(client);
			player.setEntityId(_.entityId);
			_.players.push(player);
			
			client.entityId = _.entityId;
			
			client.emit("welcome", {
				test: 6
			});
			
			client.on("test", function(data) {
				console.log("Client sent " + data.number);
			});

			client.on("join", function() {
				console.log("[!] Player joined");
				
				player.setLocation(player.getLocation().set(
					(Math.random() * (200 - 5) + 5).toFixed(3),
					(Math.random() * (200 - 5) + 5).toFixed(3),
					-49
				));
				
				client.emit("sendWorld", {
				    world : [
				        [1, 1, 1, 1, 1],
				        [1, 2, 1, 1, 1],
				        [1, 2, 2, 1, 1],
				        [1, 1, 1, 2, 1],
				        [1, 1, 1, 1, 1],
				    ]
				});
				
				client.emit("addPlayer", {
					entityId       : _.entityId,
					isLocal  : true,
					location : player.getData()
				});
				
				// needs stuff
				client.emit("spawn", {});
				
				/**client.broadcast.emit("addPlayer", {
					entityId       : _.entityId,
					isLocal  : false,
					location : player.getData()
				});*/
				
			});
			
			client.on("sync", function(data) {
				//console.log("Player syncing with us");
				
				console.log(_.players);
				
				_.players.forEach(function(player) {
					if (player.getEntityId() == client.entityId) {
					    if (data.x < 0 || data.y < 0 || data.x > 500 || data.y > 500 || data.z < -50 || data.z > 50)
					        return;
					    
					    player.getLocation().set(data.x, data.y, data.z);
						player.setDirection(data.d);
						
					}
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
