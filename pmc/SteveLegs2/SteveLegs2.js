/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class SteveLegs2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("leg", "./SteveLegs2/costumes/leg.png", { x: 4, y: -1 }),
      new Costume("Alex1", "./SteveLegs2/costumes/Alex1.png", { x: 4, y: -1 }),
      new Costume("Legs4_2", "./SteveLegs2/costumes/Legs4_2.png", {
        x: 4,
        y: -1,
      }),
      new Costume("Legs4_4", "./SteveLegs2/costumes/Legs4_4.png", {
        x: 4,
        y: -1,
      }),
      new Costume("Legs4_3", "./SteveLegs2/costumes/Legs4_3.png", {
        x: 4,
        y: -1,
      }),
    ];

    this.sounds = [new Sound("meow", "./SteveLegs2/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "lighting mode change" },
        this.whenIReceiveLightingModeChange
      ),
      new Trigger(Trigger.BROADCAST, { name: "go" }, this.whenIReceiveGo),
      new Trigger(
        Trigger.BROADCAST,
        { name: "green flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.light = -1;
    this.vars.offset = 1;
    this.vars.backleg = 0;
  }

  *slPositionExactAngle(x, y, dir) {
    this.goto(this.toNumber(x), this.toNumber(y));
    if (!(this.compare(dir, this.direction) === 0)) {
      this.direction = this.toNumber(dir);
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
    if (this.compare(x, this.x) === 0 && this.compare(y, this.y) === 0) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *slPosition(x, y) {
    if (this.toNumber(this.stage.vars.Mode) === 0) {
      if (this.toNumber(this.vars.backleg) === 0) {
        this.warp(this.slPositionExactAngle)(
          Math.floor(
            (this.toNumber(x) - this.toNumber(this.stage.vars.Scrx)) * 40
          ),
          Math.floor(
            (this.toNumber(y) - this.toNumber(this.stage.vars.Scry)) * 40 - 5
          ),
          150 - this.toNumber(this.stage.vars.Walkframe) * 15
        );
      } else {
        this.warp(this.slPositionExactAngle)(
          Math.floor(
            (this.toNumber(x) - this.toNumber(this.stage.vars.Scrx)) * 40
          ),
          Math.floor(
            (this.toNumber(y) - this.toNumber(this.stage.vars.Scry)) * 40 - 5
          ),
          30 + this.toNumber(this.stage.vars.Walkframe) * 15
        );
      }
    } else {
      if (this.toString(this.stage.vars.Mode) === "i") {
        this.warp(this.slPositionExactAngle)(-104, 55, 90);
      } else {
        this.visible = false;
      }
    }
    this.vars.offset = this.itemOf(this.stage.vars.Inv, 76);
    if (this.toString(this.vars.offset) === "#") {
      this.vars.offset = this.toNumber(this.stage.vars.Skin) + 1;
    } else {
      this.vars.offset =
        2 +
        this.toNumber(
          this.itemOf(
            this.vars.undefined,
            this.toNumber(this.vars.offset) *
              this.toNumber(this.stage.vars.Dmul) +
              15
          )
        );
    }
    this.warp(this.slSetcostume)(this.vars.offset);
  }

  *whenIReceiveAnimate() {
    if (this.compare(this.stage.vars.HealthS, 0) > 0) {
      yield* this.slPosition(this.stage.vars.X, this.stage.vars.Y);
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveLightingModeChange() {
    if (this.toNumber(this.stage.vars.Lighting) === 1) {
      this.vars.light = -1;
    } else {
      this.effects.brightness = 0;
    }
  }

  *slSetcostume(costumeid) {
    if (!(this.compare(costumeid, this.costumeNumber) === 0)) {
      this.costume = costumeid;
    }
  }

  *whenIReceiveGo() {
    if (this.toNumber(this.vars.backleg) === 0) {
      yield* this.wait(0.3);
      this.moveAhead();
    } else {
      this.moveAhead();
      yield* this.wait(0.4);
      this.moveBehind(2);
    }
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
    this.size = 210;
    this.direction = 90;
    this.costume = "leg";
    this.vars.light = -1;
    this.vars.backleg = 1;
    this.createClone();
    this.vars.backleg = 0;
  }
}
