var ItemEntity = function(game) {
    this.game = game;
};

// inherit the base entity
inherit(ItemEntity, Entity);

ItemEntity.prototype.init = function(x, y, z) {
    Entity.prototype.init.call();
    
    this.sprite = this.game.getPhaser().add.isoSprite(x, y, z, "mushy", 0, this.game.getIsoEntities());
    this.sprite.anchor.set(0.5, 1.5);
    this.sprite.scale.setTo(1);
    
    this.sprite.smoothed = false;

//    this.game.getPhaser().physics.isoArcade.enable(this.sprite);
//    this.sprite.body.bounce.set(0, 0, 0.69); // 0.43854845);
//    this.sprite.body.collideWorldBounds = true;
//    this.sprite.body.gravity.z = -400;
};

ItemEntity.prototype.update = function() {
};

ItemEntity.prototype.entityCollide = function(entity) {
  entity.sprite.iso += 100;
};
