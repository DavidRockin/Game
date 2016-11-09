function randNum(min, max, maxDec)
{
    maxDec = maxDec || 3;
    return (Math.random() * (max - min) + min).toFixed(maxDec)
}

(function() {
	
	var server = require("./server");

	var s = new server.Server({
		port : 666
	});

}());
