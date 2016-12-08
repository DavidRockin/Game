var GameMenu = function() {

	var _ = this;


	this.GameEngine = new ShitGame()
	//	GameClient = new Client(GameEngine, "http://devops-davidrockin.c9users.io:8080/")
	;
	this.GameEngine.init();

	this.loadGame = function(serverIP) {
		this.changeScreen("loading");
		this.GameClient = new Client(this.GameEngine, serverIP, this, function(ex) {
			console.log(ex);
			$("#status").text("failed to establish connection to server!");
		});
	};

	this.changeScreen = function(screen) {
		$("div.section").removeClass("show");
		$("div.section#" + screen).addClass("show");
	};

	this.setStatus = function(status) {
		$("#status").text(status);
	};

	$("a").on("click", function(e) {
		var target = $(this).attr("data-target");
		
		if (target === null || target == undefined)
			return;
			
		e.preventDefault();
		_.changeScreen(target);
	});

	$("form[name='connect']").on("submit", function(e) {
		e.preventDefault();
		_.loadGame($("input[name='serverAddress']").val()); // hope that this is a valid IP
	});

};
