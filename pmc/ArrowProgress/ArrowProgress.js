/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ArrowProgress extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Arrow0", "./ArrowProgress/costumes/Arrow0.png", {
        x: 22,
        y: 14,
      }),
      new Costume("Arrow1", "./ArrowProgress/costumes/Arrow1.png", {
        x: 22,
        y: 16,
      }),
      new Costume("Arrow2", "./ArrowProgress/costumes/Arrow2.png", {
        x: 22,
        y: 16,
      }),
      new Costume("Arrow3", "./ArrowProgress/costumes/Arrow3.png", {
        x: 22,
        y: 16,
      }),
      new Costume("Arrow4", "./ArrowProgress/costumes/Arrow4.png", {
        x: 22,
        y: 16,
      }),
      new Costume("Arrow5", "./ArrowProgress/costumes/Arrow5.png", {
        x: 22,
        y: 16,
      }),
      new Costume("Arrow6", "./ArrowProgress/costumes/Arrow6.png", {
        x: 22,
        y: 16,
      }),
      new Costume("Arrow7", "./ArrowProgress/costumes/Arrow7.png", {
        x: 22,
        y: 16,
      }),
      new Costume("Arrow8", "./ArrowProgress/costumes/Arrow8.png", {
        x: 22,
        y: 16,
      }),
      new Costume("Arrow9", "./ArrowProgress/costumes/Arrow9.png", {
        x: 22,
        y: 16,
      }),
      new Costume("Arrow10", "./ArrowProgress/costumes/Arrow10.png", {
        x: 22,
        y: 16,
      }),
      new Costume("Arrow11", "./ArrowProgress/costumes/Arrow11.png", {
        x: 22,
        y: 16,
      }),
    ];

    this.sounds = [new Sound("meow", "./ArrowProgress/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
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
      new Trigger(
        Trigger.BROADCAST,
        { name: "init1b" },
        this.whenIReceiveInit1b
      ),
    ];

    this.vars.idx = 0;
    this.vars.progress = 1;
    this.vars.nxtprogress = 1;
  }

  *whenIReceiveAnimate() {
    if (this.toString(this.stage.vars.Mode) === "f") {
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
        this.vars.idx = this.itemOf(
          this.stage.vars.Refdata,
          this.toNumber(this.vars.idx) + 3
        );
        this.vars.nxtprogress = Math.round(
          12 - (this.toNumber(this.vars.idx) - this.timer) * 1.1
        );
        if (this.compare(this.vars.nxtprogress, 1) < 0) {
          this.vars.nxtprogress = 1;
        }
        if (this.compare(this.vars.nxtprogress, 12) > 0) {
          this.vars.nxtprogress = 12;
        }
      }
      if (!(this.compare(this.vars.nxtprogress, this.vars.progress) === 0)) {
        this.vars.progress = this.vars.nxtprogress;
        this.costume = this.vars.nxtprogress;
      }
    } else {
      null;
    }
  }

  *whenIReceiveSwitchMode() {
    if (this.toString(this.stage.vars.Mode) === "i") {
      this.goto(40, 64);
      this.costume = "Arrow0";
      this.visible = true;
    } else {
      if (this.toString(this.stage.vars.Mode) === "c") {
        this.goto(40, 64);
        this.costume = "Arrow0";
        this.visible = true;
      } else {
        if (this.toString(this.stage.vars.Mode) === "f") {
          this.vars.progress = 1;
          this.goto(0, 64);
          this.costume = "Arrow0";
          this.visible = true;
        } else {
          this.visible = false;
        }
      }
    }
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
    this.size = 130;
  }

  *whenIReceiveInit1b() {
    yield* this.wait(2);
    this.moveAhead();
  }
}
