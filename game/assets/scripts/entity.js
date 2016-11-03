var Entity = function(game) {
    this.game = game;
};

Entity.prototype.init = function() {
    this.moving = false;
    this.facing = "SE";
    
    this.maxHealth = 20;
    this.health    = 20;
    
    this.sprite = null;
};

Entity.prototype.setId = function(id) {
    console.log("aaaa " +  id);
    this.id = id;
};

Entity.prototype.getId = function() {
    return this.id;
};

Entity.prototype.setDirection = function(direction) {
    this.facing = direction;
};

Entity.prototype.getDirection = function() {
    return this.facing;
};

Entity.prototype.update = function() {
    console.log("updato");
};

Entity.prototype.getHealth = function() {
    return this.health;
};

Entity.prototype.setHealth = function(health) {
  this.health = health;
  if (health < 0) {
    // bitch boi is ded
  }
};

Entity.prototype.move = function(x, y, z) {
    this.sprite.isoPosition.setTo(x, y, z);
};

Entity.prototype.getX = function() {
    return this.sprite.isoX;
};

Entity.prototype.getY = function() {
    return this.sprite.isoY;
};

Entity.prototype.getZ = function() {
    return this.sprite.isoZ;
};

Entity.prototype.setVelocity = function(x, y, z) {
    this.sprite.body.velocity.setTo(x, y, z);
};

Entity.prototype.getSprite = function() {
    return this.sprite;
};
