/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Menu2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "World-Options-text",
        "./Menu2/costumes/World-Options-text.png",
        { x: 172, y: 40 }
      ),
      new Costume("Fly Mode", "./Menu2/costumes/Fly Mode.svg", {
        x: 127,
        y: 10,
      }),
    ];

    this.sounds = [new Sound("meow", "./Menu2/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Clicked" },
        this.whenIReceiveStartClicked
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "World Options" },
        this.whenIReceiveWorldOptions
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Arm To Front" },
        this.whenIReceiveArmToFront
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.showflymode = 0;
  }

  *whenbackdropswitchesto() {
    this.visible = false;
  }

  *whenIReceiveStartClicked() {
    this.visible = false;
  }

  *whenIReceiveAnimate() {
    if (this.toNumber(this.stage.vars.Mode) === 0) {
      if (this.compare(this.sprites["Steve"].vars.isflymode, 0) > 0) {
        if (
          this.compare(this.vars.showflymode, 30) > 0 ||
          this.compare(this.toNumber(this.vars.showflymode) % 7, 4) < 0
        ) {
          this.costume = "Fly Mode";
          this.goto(0, 163);
          this.visible = true;
          this.moveAhead();
        } else {
          this.visible = false;
        }
        this.vars.showflymode++;
      } else {
        if (this.compare(this.vars.showflymode, 0) > 0) {
          this.vars.showflymode = 0;
          this.visible = false;
        }
      }
    }
  }

  *whenIReceiveWorldOptions() {
    this.costume = "World-Options-text";
    this.visible = true;
    this.moveAhead();
  }

  *whenIReceiveArmToFront() {}

  *whenIReceiveGreenFlag() {
    this.goto(0, 0);
    this.vars.showflymode = 0;
    this.visible = false;
  }
}
