var GameMenu = function() {

	$("a").on("click", function(e) {
		var target = $(this).attr("data-target");
		
		if (target === null || target == undefined)
			return;
			
		e.preventDefault();
		
		$("div.section").removeClass("show");
		$("div.section#" + target).addClass("show");
	});

};
