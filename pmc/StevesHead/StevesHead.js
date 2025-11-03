/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class StevesHead extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Right", "./StevesHead/costumes/Right.png", { x: 8, y: 16 }),
      new Costume("Left", "./StevesHead/costumes/Left.png", { x: 8, y: 0 }),
      new Costume("Head2r", "./StevesHead/costumes/Head2r.png", {
        x: 9,
        y: 18,
      }),
      new Costume("Head2l", "./StevesHead/costumes/Head2l.png", { x: 9, y: 0 }),
      new Costume("Head3r", "./StevesHead/costumes/Head3r.png", {
        x: 9,
        y: 18,
      }),
      new Costume("Head3l", "./StevesHead/costumes/Head3l.png", { x: 9, y: 0 }),
      new Costume("Head4r", "./StevesHead/costumes/Head4r.png", {
        x: 9,
        y: 18,
      }),
      new Costume("Head4l", "./StevesHead/costumes/Head4l.png", { x: 9, y: 0 }),
      new Costume("HeadPl", "./StevesHead/costumes/HeadPl.png", {
        x: 8,
        y: 16,
      }),
      new Costume("HeadPr", "./StevesHead/costumes/HeadPr.png", { x: 8, y: 0 }),
      new Costume("Crown_r", "./StevesHead/costumes/Crown_r.png", {
        x: 9,
        y: 19,
      }),
      new Costume("Crown_l", "./StevesHead/costumes/Crown_l.png", {
        x: 9,
        y: 0,
      }),
      new Costume("Alex4", "./StevesHead/costumes/Alex4.png", { x: 8, y: 16 }),
      new Costume("Alex5", "./StevesHead/costumes/Alex5.png", { x: 8, y: 0 }),
      new Costume("Alex2", "./StevesHead/costumes/Alex2.png", { x: 9, y: 18 }),
      new Costume("Head2l2", "./StevesHead/costumes/Head2l2.png", {
        x: 9,
        y: 0,
      }),
      new Costume("Head3r2", "./StevesHead/costumes/Head3r2.png", {
        x: 9,
        y: 18,
      }),
      new Costume("Head3r3", "./StevesHead/costumes/Head3r3.png", {
        x: 9,
        y: 0,
      }),
      new Costume("Head4r2", "./StevesHead/costumes/Head4r2.png", {
        x: 9,
        y: 18,
      }),
      new Costume("Head4r3", "./StevesHead/costumes/Head4r3.png", {
        x: 9,
        y: 0,
      }),
      new Costume("HeadPl2", "./StevesHead/costumes/HeadPl2.png", {
        x: 8,
        y: 16,
      }),
      new Costume("HeadPl3", "./StevesHead/costumes/HeadPl3.png", {
        x: 8,
        y: 0,
      }),
      new Costume("Crown_r2", "./StevesHead/costumes/Crown_r2.png", {
        x: 9,
        y: 19,
      }),
      new Costume("Crown_r3", "./StevesHead/costumes/Crown_r3.png", {
        x: 9,
        y: 0,
      }),
    ];

    this.sounds = [new Sound("meow", "./StevesHead/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Lighting Mode Change" },
        this.whenIReceiveLightingModeChange
      ),
      new Trigger(Trigger.BROADCAST, { name: "go" }, this.whenIReceiveGo),
      new Trigger(
        Trigger.BROADCAST,
        { name: "init1b" },
        this.whenIReceiveInit1b
      ),
      new Trigger(Trigger.BROADCAST, { name: "init2" }, this.whenIReceiveInit2),
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

    this.vars.light = -1;
    this.vars.endspeak = 0;
    this.vars.offset = 0;
  }

  *positionshowexactSh(x, y) {
    this.goto(this.toNumber(x), this.toNumber(y));
    if (this.compare(x, this.x) === 0 && this.compare(y, this.y) === 0) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *positionshowSh(x, y) {
    yield* this.positionshowexactSh(
      Math.floor((this.toNumber(x) - this.toNumber(this.stage.vars.Scrx)) * 40),
      Math.floor((this.toNumber(y) - this.toNumber(this.stage.vars.Scry)) * 40)
    );
  }

  *stevetick() {
    this.direction = this.radToScratch(
      Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
    );
    this.vars.offset = this.itemOf(this.stage.vars.Inv, 72);
    if (this.toString(this.vars.offset) === "#") {
      this.vars.offset = 0;
    } else {
      if (this.toNumber(this.vars.offset) === 54) {
        this.vars.offset = 8;
      } else {
        this.vars.offset = this.itemOf(
          this.vars.undefined,
          this.toNumber(this.vars.offset) *
            this.toNumber(this.stage.vars.Dmul) +
            15
        );
      }
    }
    this.vars.offset += this.toNumber(this.stage.vars.Skin) * 12;
    if (this.compare(this.direction, 0) < 0) {
      yield* this.setcostumeSh(2 + this.toNumber(this.vars.offset));
    } else {
      yield* this.setcostumeSh(1 + this.toNumber(this.vars.offset));
    }
    if (this.toNumber(this.stage.vars.Mode) === 0) {
      yield* this.positionshowSh(
        this.stage.vars.X,
        this.toNumber(this.stage.vars.Y) + 0.39 + 0.07
      );
      if (!(this.toNumber(this.stage.vars.Speak) === 0)) {
        this.say(this.stage.vars.Speak);
        this.vars.endspeak = this.timer + 2;
        this.stage.vars.Speak = "";
      }
    } else {
      if (this.toString(this.stage.vars.Mode) === "i") {
        yield* this.positionshowSh(
          this.toNumber(this.stage.vars.Scrx) - 2.6,
          this.toNumber(this.stage.vars.Scry) +
            1.5 +
            0.39 +
            this.toNumber(
              this.itemOf(this.vars.undefined, this.stage.vars.Walkframe - 1)
            ) /
              90
        );
      } else {
        this.visible = false;
      }
    }
    if (
      this.compare(this.vars.endspeak, 0) > 0 &&
      this.compare(this.timer, this.vars.endspeak) > 0
    ) {
      this.say("");
      this.vars.endspeak = 0;
    }
  }

  *whenIReceiveLightingModeChange() {
    if (this.toNumber(this.stage.vars.Lighting) === 1) {
      this.vars.light = -1;
    } else {
      this.effects.brightness = 0;
    }
  }

  *setcostumeSh(costume) {
    if (!(this.compare(this.costumeNumber, costume) === 0)) {
      this.costume = costume;
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

  *whenIReceiveGo() {
    yield* this.wait(0.4);
    this.moveAhead();
  }

  *whenIReceiveInit1b() {
    this.moveAhead();
  }

  *whenIReceiveInit2() {
    this.size = 200;
    this.visible = true;
  }

  *whenIReceiveAnimate() {
    if (this.compare(this.stage.vars.HealthS, 0) > 0) {
      yield* this.stevetick();
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
    this.direction = 90;
    this.costume = "Head";
    this.vars.endspeak = 0;
    this.vars.light = -1;
  }
}
