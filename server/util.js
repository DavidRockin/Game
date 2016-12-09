var Util =  {};

Util.randNum = function(min, max, maxDec) {
    maxDec = maxDec || 0;
    return (Math.random() * (max - min) + min).toFixed(maxDec)
};

module.exports = Util;
