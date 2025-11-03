/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class SmeltProgress extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("flame0", "./SmeltProgress/costumes/flame0.png", {
        x: 12,
        y: 12,
      }),
      new Costume("flame1", "./SmeltProgress/costumes/flame1.png", {
        x: 14,
        y: 14,
      }),
      new Costume("flame2", "./SmeltProgress/costumes/flame2.png", {
        x: 14,
        y: 14,
      }),
      new Costume("flame3", "./SmeltProgress/costumes/flame3.png", {
        x: 14,
        y: 14,
      }),
      new Costume("flame4", "./SmeltProgress/costumes/flame4.png", {
        x: 14,
        y: 14,
      }),
      new Costume("flame5", "./SmeltProgress/costumes/flame5.png", {
        x: 14,
        y: 14,
      }),
      new Costume("flame6", "./SmeltProgress/costumes/flame6.png", {
        x: 14,
        y: 14,
      }),
      new Costume("flame7", "./SmeltProgress/costumes/flame7.png", {
        x: 14,
        y: 14,
      }),
      new Costume("flame8", "./SmeltProgress/costumes/flame8.png", {
        x: 14,
        y: 14,
      }),
      new Costume("flame9", "./SmeltProgress/costumes/flame9.png", {
        x: 14,
        y: 14,
      }),
      new Costume("flame10", "./SmeltProgress/costumes/flame10.png", {
        x: 14,
        y: 14,
      }),
      new Costume("flame11", "./SmeltProgress/costumes/flame11.png", {
        x: 14,
        y: 14,
      }),
      new Costume("flame12", "./SmeltProgress/costumes/flame12.png", {
        x: 14,
        y: 12,
      }),
      new Costume("flame13", "./SmeltProgress/costumes/flame13.png", {
        x: 14,
        y: 14,
      }),
    ];

    this.sounds = [new Sound("meow", "./SmeltProgress/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Switch Mode" },
        this.whenIReceiveSwitchMode
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "init1b" },
        this.whenIReceiveInit1b
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.idx = 0;
    this.vars.progress = 1;
    this.vars.nxtprogress = 1;
    this.vars.duration = 80;
  }

  *whenIReceiveSwitchMode() {
    if (this.toString(this.stage.vars.Mode) === "f") {
      this.vars.progress = 1;
      this.goto(-40, 64);
      this.costume = "flame0";
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *doBurn() {
    this.vars.nxtprogress = 1;
    this.vars.idx = this.itemOf(
      this.stage.vars.Levelref,
      this.stage.vars.Cursor - 1
    );
    if (
      this.compare(this.vars.idx, 0) > 0 &&
      this.toString(
        this.itemOf(this.stage.vars.Refdata, this.toNumber(this.vars.idx))
      ) === "b"
    ) {
      this.vars.duration = this.itemOf(
        this.stage.vars.Refdata,
        this.toNumber(this.vars.idx) + 4
      );
      this.vars.idx = this.itemOf(
        this.stage.vars.Refdata,
        this.toNumber(this.vars.idx) + 2
      );
      if (this.compare(this.vars.idx, 0) > 0) {
        this.vars.nxtprogress = Math.round(
          1 +
            13.00000000023283 *
              ((this.toNumber(this.vars.idx) - this.timer) /
                this.toNumber(this.vars.duration))
        );
        if (this.compare(this.vars.nxtprogress, 1) < 0) {
          this.vars.nxtprogress = 1;
        }
        if (this.compare(this.vars.nxtprogress, 14) > 0) {
          this.vars.nxtprogress = 14;
        }
      } else {
        this.vars.nxtprogress = 1;
      }
    }
    if (!(this.compare(this.vars.nxtprogress, this.vars.progress) === 0)) {
      this.vars.progress = this.vars.nxtprogress;
      this.costume = this.vars.nxtprogress;
    }
  }

  *whenIReceiveAnimate() {
    if (this.toString(this.stage.vars.Mode) === "f") {
      yield* this.doBurn();
    } else {
      null;
    }
  }

  *whenIReceiveInit1b() {
    yield* this.wait(2);
    this.moveAhead();
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
    this.size = 172;
  }
}
