/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Creativeoverlay extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "CreativeOverlay",
        "./Creativeoverlay/costumes/CreativeOverlay.png",
        { x: 340, y: 312 }
      ),
    ];

    this.sounds = [new Sound("meow", "./Creativeoverlay/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Switch Mode" },
        this.whenIReceiveSwitchMode
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
      this.visible = true;
      yield* this.wait(0.1);
      this.moveAhead();
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveGreenFlag() {
    this.goto(0, -22);
    this.visible = false;
  }
}
