/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Selected extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("selected", "./Selected/costumes/selected.png", {
        x: 110,
        y: 22,
      }),
    ];

    this.sounds = [new Sound("meow", "./Selected/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Switch Mode" },
        this.whenIReceiveSwitchMode
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Switch Tabs" },
        this.whenIReceiveSwitchTabs
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];
  }

  *whenIReceiveSwitchMode() {
    if (this.letterOf(this.stage.vars.Mode, 0) === "x") {
      this.moveAhead();
      yield* this.positionSelected();
    } else {
      this.visible = false;
    }
  }

  *positionSelected() {
    if (
      this.compare(this.stage.vars.Creative, 0) > 0 &&
      this.compare(this.stage.vars.Creative, 10) < 0
    ) {
      this.x = -124 + 122 * ((this.toNumber(this.stage.vars.Creative) - 1) % 3);
      this.y =
        128 -
        21 * Math.floor((this.toNumber(this.stage.vars.Creative) - 1) / 3);
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveSwitchTabs() {
    yield* this.positionSelected();
  }

  *whenIReceiveGreenFlag() {
    this.goto(0, -21);
    this.visible = false;
  }
}
