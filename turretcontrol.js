pc.script.attribute("speed", "number", 10);
pc.script.attribute("impulse", "number", 25)
pc.script.create('turretcontrols', function (context) {
    // Creates a new Turretcontrols instance
    var Turretcontrols = function (entity) {
        this.entity = entity;
        this.force = new pc.Vec3();
    };

    Turretcontrols.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.turret = this.entity.findByName("Tank_gun_turret");
            this.bullet = context.root.findByName("Bullet");
            this.barrel = context.root.findByName("Barrel");
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {

            // Rotate the turret left and right using A and D
            if (context.keyboard.isPressed(pc.input.KEY_A)) {
                this.turret.rotate(0, this.speed * dt, 0);
            } else if(context.keyboard.isPressed(pc.input.KEY_D)) {
                this.turret.rotate(0, -this.speed * dt, 0);
            }

            // Rotate the turret using arrows
            if (context.keyboard.isPressed(pc.input.KEY_LEFT)) {
                this.turret.rotate(0, this.speed * dt, 0);
            }
            if (context.keyboard.isPressed(pc.input.KEY_RIGHT)) {
                this.turret.rotate(0, -this.speed * dt, 0);
            }
            if (context.keyboard.isPressed(pc.input.KEY_UP)) {
                this.turret.rotate(0, 0, -this.speed * dt);
            }
            if (context.keyboard.isPressed(pc.input.KEY_DOWN)) {
                this.turret.rotate(0, 0, this.speed * dt);
            }

            if (context.keyboard.isPressed(pc.input.KEY_SPACE)){
                this.turret.setRotation(0, 1, 0, 0);
            }

            if (context.keyboard.wasPressed(pc.input.KEY_E)) {
                this.shoot();
            }
        },

        shoot: function () {
            var bullet = this.bullet.clone();
            context.root.addChild(bullet);
            bullet.setPosition(this.barrel.getPosition());
            bullet.enabled = true;

            this.force = new pc.Vec3();
            this.force.copy(this.turret.forward);
            this.force.scale(-this.impulse);

            bullet.rigidbody.applyImpulse(this.force);
        }
    };

    return Turretcontrols;
});
