/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class GuiInvsel extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("gui_invsel", "./GuiInvsel/costumes/gui_invsel.png", {
        x: 46,
        y: 46,
      }),
    ];

    this.sounds = [new Sound("meow", "./GuiInvsel/sounds/meow.wav")];

    this.triggers = [
      new Trigger(Trigger.KEY_PRESSED, { key: "1" }, this.whenKey1Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "2" }, this.whenKey2Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "3" }, this.whenKey3Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "4" }, this.whenKey4Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "5" }, this.whenKey5Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "6" }, this.whenKey6Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "7" }, this.whenKey7Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "8" }, this.whenKey8Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "9" }, this.whenKey9Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "0" }, this.whenKey0Pressed),
      new Trigger(
        Trigger.BROADCAST,
        { name: "init1b" },
        this.whenIReceiveInit1b
      ),
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

    this.vars.selidx = 1;
    this.vars.destx = -160;
  }

  *whenKey1Pressed() {
    this.stage.vars.Nextselid = -1;
  }

  *whenKey2Pressed() {
    this.stage.vars.Nextselid = -2;
  }

  *whenKey3Pressed() {
    this.stage.vars.Nextselid = -3;
  }

  *whenKey4Pressed() {
    this.stage.vars.Nextselid = -4;
  }

  *whenKey5Pressed() {
    this.stage.vars.Nextselid = -5;
  }

  *whenKey6Pressed() {
    this.stage.vars.Nextselid = -6;
  }

  *whenKey7Pressed() {
    this.stage.vars.Nextselid = -7;
  }

  *whenKey8Pressed() {
    this.stage.vars.Nextselid = -8;
  }

  *whenKey9Pressed() {
    this.stage.vars.Nextselid = -9;
  }

  *whenKey0Pressed() {}

  *whenIReceiveInit1b() {
    yield* this.wait(1.5);
    this.visible = true;
    this.moveAhead();
  }

  *whenIReceiveAnimate() {
    if (!(this.compare(this.vars.selidx, this.stage.vars.Heldinvid) === 0)) {
      this.vars.selidx = this.stage.vars.Heldinvid;
      this.vars.destx = (-5 + this.toNumber(this.vars.selidx)) * 40;
      this.x = this.toNumber(this.vars.destx);
    }
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
    this.goto(0, -158);
    this.vars.destx = (-5 + 1) * 40;
    this.x = this.toNumber(this.vars.destx);
    this.size = 100;
  }
}
