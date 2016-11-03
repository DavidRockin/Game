var inherit = function(child, parent)
{
    child.prototype = Object.create(parent.prototype);
};

var randNum = function(min, max, maxDec)
{
    maxDec = maxDec || 3;
    return (Math.random() * (max - min) + min).toFixed(maxDec)
};