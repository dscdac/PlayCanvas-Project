pc.script.create('bullet', function (context) {
    // Creates a new Bullet instance
    var Bullet = function (entity) {
        this.entity = entity;
        this.timer = 0;
    };

    Bullet.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.collision.on("collisionstart", this.onCollision, this);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this.timer += dt;
            if (this.timer > 20) {
                console.log("deleting bullet");
                this.entity.destroy();
                return;
            }
        },

        onCollision: function (other) {
            console.log("hit something...");
        }
    };

    return Bullet;
});
