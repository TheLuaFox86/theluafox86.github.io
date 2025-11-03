/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class SteveArm extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Arm4", "./SteveArm/costumes/Arm4.png", { x: 2, y: 4 }),
      new Costume("Arm_cp_2", "./SteveArm/costumes/Arm_cp_2.png", {
        x: 4,
        y: 5,
      }),
      new Costume("Arm_cp_3", "./SteveArm/costumes/Arm_cp_3.png", {
        x: 4,
        y: 5,
      }),
      new Costume("Arm_cp_4", "./SteveArm/costumes/Arm_cp_4.png", {
        x: 5,
        y: 5,
      }),
      new Costume("Alex1", "./SteveArm/costumes/Alex1.png", { x: 2, y: 3 }),
      new Costume("Arm_cp_5", "./SteveArm/costumes/Arm_cp_5.png", {
        x: 4,
        y: 5,
      }),
      new Costume("Arm_cp_6", "./SteveArm/costumes/Arm_cp_6.png", {
        x: 4,
        y: 5,
      }),
      new Costume("Arm_cp_7", "./SteveArm/costumes/Arm_cp_7.png", {
        x: 4,
        y: 5,
      }),
    ];

    this.sounds = [new Sound("meow", "./SteveArm/sounds/meow.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "go" }, this.whenIReceiveGo),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Arm To Front" },
        this.whenIReceiveArmToFront
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Lighting Mode Change" },
        this.whenIReceiveLightingModeChange
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.light = -1;
    this.vars.backarm = 0;
    this.vars.offset = 1;
  }

  *whenIReceiveGo() {
    if (this.toNumber(this.vars.backarm) === 0) {
      yield* this.wait(1);
      this.moveAhead();
    } else {
      this.moveAhead();
      yield* this.wait(1);
      this.moveBehind(2);
    }
  }

  *whenIReceiveAnimate() {
    if (this.compare(this.stage.vars.HealthS, 0) > 0) {
      yield* this.saPosition(this.stage.vars.X, this.stage.vars.Y);
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveArmToFront() {
    if (this.toNumber(this.vars.backarm) === 0) {
      this.moveAhead();
    } else {
      null;
    }
  }

  *whenIReceiveLightingModeChange() {
    if (this.toNumber(this.stage.vars.Lighting) === 1) {
      this.vars.light = -1;
    } else {
      this.effects.brightness = 0;
    }
  }

  *saPositionExact(x, y) {
    this.goto(this.toNumber(x), this.toNumber(y));
    if (this.compare(x, this.x) === 0 && this.compare(y, this.y) === 0) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *saPositionExact2(x, y) {
    this.goto(this.toNumber(x), this.toNumber(y));
    if (this.toNumber(this.vars.backarm) === 0) {
      yield* this.angleArm(this.stage.vars.Armframe);
    } else {
      yield* this.angleArm(120 + this.toNumber(this.stage.vars.Walkframe) * 15);
    }
  }

  *angleArm(a) {
    if (this.compare(this.stage.vars.Lastdir, 0) > 0) {
      if (this.toNumber(this.stage.vars.Fast) === 0) {
        yield* this.angleArmExact(a);
      } else {
        yield* this.angleArmExact(Math.round(this.toNumber(a) / 22.5) * 22.5);
      }
    } else {
      if (this.toNumber(this.stage.vars.Fast) === 0) {
        yield* this.angleArmExact(0 - this.toNumber(a));
      } else {
        yield* this.angleArmExact(
          Math.round((0 - this.toNumber(a)) / 22.5) * 22.5
        );
      }
    }
  }

  *saSetcostume(costumeid) {
    if (!(this.compare(costumeid, this.costumeNumber) === 0)) {
      this.costume = costumeid;
    }
  }

  *saPosition(x, y) {
    this.vars.offset = this.itemOf(this.stage.vars.Inv, 74);
    if (this.toString(this.vars.offset) === "#") {
      this.vars.offset = 1;
    } else {
      this.vars.offset =
        1 +
        this.toNumber(
          this.itemOf(
            this.vars.undefined,
            this.toNumber(this.vars.offset) *
              this.toNumber(this.stage.vars.Dmul) +
              15
          )
        );
    }
    yield* this.saSetcostume(
      this.toNumber(this.vars.offset) + this.toNumber(this.stage.vars.Skin) * 4
    );
    if (this.toNumber(this.stage.vars.Mode) === 0) {
      yield* this.saPositionExact2(
        Math.floor(
          (this.toNumber(x) - this.toNumber(this.stage.vars.Scrx)) * 40
        ),
        15 +
          Math.floor(
            (this.toNumber(y) - this.toNumber(this.stage.vars.Scry)) * 40
          )
      );
      this.visible = true;
    } else {
      if (this.toString(this.stage.vars.Mode) === "i") {
        yield* this.saPositionExact2(-104, 75);
        this.visible = true;
      } else {
        this.visible = false;
      }
    }
  }

  *angleArmExact(a) {
    if (!(this.compare(this.direction, a) === 0)) {
      this.direction = this.toNumber(a);
    }
    if (
      !(this.compare(this.stage.vars.Stevelight, this.vars.light) === 0) &&
      this.toNumber(this.stage.vars.Lighting) === 1
    ) {
      this.vars.light = this.stage.vars.Stevelight;
      this.effects.brightness = this.toNumber(
        this.itemOf(this.stage.vars.Gamma, this.toNumber(this.vars.light))
      );
    }
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
    this.size = 210;
    this.direction = 90;
    this.costume = "Arm4";
    this.vars.light = -1;
    this.vars.backarm = 1;
    this.createClone();
    this.vars.backarm = 0;
  }
}
