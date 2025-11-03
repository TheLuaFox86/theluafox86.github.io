/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Oxygen extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("bubbles0", "./Oxygen/costumes/bubbles0.png", {
        x: 480,
        y: 360,
      }),
      new Costume("bubbles1", "./Oxygen/costumes/bubbles1.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles2", "./Oxygen/costumes/bubbles2.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles3", "./Oxygen/costumes/bubbles3.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles4", "./Oxygen/costumes/bubbles4.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles5", "./Oxygen/costumes/bubbles5.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles6", "./Oxygen/costumes/bubbles6.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles7", "./Oxygen/costumes/bubbles7.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles8", "./Oxygen/costumes/bubbles8.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles9", "./Oxygen/costumes/bubbles9.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles10", "./Oxygen/costumes/bubbles10.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles11", "./Oxygen/costumes/bubbles11.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles12", "./Oxygen/costumes/bubbles12.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles13", "./Oxygen/costumes/bubbles13.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles14", "./Oxygen/costumes/bubbles14.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles15", "./Oxygen/costumes/bubbles15.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles16", "./Oxygen/costumes/bubbles16.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles17", "./Oxygen/costumes/bubbles17.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles18", "./Oxygen/costumes/bubbles18.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles19", "./Oxygen/costumes/bubbles19.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles21", "./Oxygen/costumes/bubbles21.png", {
        x: 82,
        y: 8,
      }),
      new Costume("bubbles22", "./Oxygen/costumes/bubbles22.png", {
        x: 82,
        y: 8,
      }),
    ];

    this.sounds = [new Sound("meow", "./Oxygen/sounds/meow.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "init3" }, this.whenIReceiveInit3),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.lastair = -1;
  }

  *whenIReceiveInit3() {
    yield* this.wait(1);
    this.moveAhead();
  }

  *whenIReceiveAnimate() {
    if (this.compare(this.stage.vars.Creative, 1) < 0) {
      yield* this.updateAir(
        Math.floor(this.toNumber(this.sprites["Steve"].vars.Airlevel))
      );
    } else {
      this.visible = false;
    }
  }

  *updateAir(airval) {
    if (
      this.compare(airval, 1) < 0 ||
      this.compare(airval, 21) > 0 ||
      !(this.toNumber(this.stage.vars.Mode) === 0)
    ) {
      this.visible = false;
      this.vars.lastair = -1;
    } else {
      if (!(this.compare(airval, this.vars.lastair) === 0)) {
        this.costume = airval;
        this.vars.lastair = airval;
      }
      this.goto(100, -103);
      this.visible = true;
    }
  }

  *whenIReceiveGreenFlag() {
    this.size = 200;
    this.direction = -90;
    this.visible = false;
    this.vars.lastair = -1;
  }
}
