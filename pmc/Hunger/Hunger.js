/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Hunger extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Hunger_0", "./Hunger/costumes/Hunger_0.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_1", "./Hunger/costumes/Hunger_1.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_2", "./Hunger/costumes/Hunger_2.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_3", "./Hunger/costumes/Hunger_3.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_4", "./Hunger/costumes/Hunger_4.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_5", "./Hunger/costumes/Hunger_5.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_6", "./Hunger/costumes/Hunger_6.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_7", "./Hunger/costumes/Hunger_7.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_8", "./Hunger/costumes/Hunger_8.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_9", "./Hunger/costumes/Hunger_9.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_10", "./Hunger/costumes/Hunger_10.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_11", "./Hunger/costumes/Hunger_11.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_12", "./Hunger/costumes/Hunger_12.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_13", "./Hunger/costumes/Hunger_13.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_14", "./Hunger/costumes/Hunger_14.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_15", "./Hunger/costumes/Hunger_15.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_16", "./Hunger/costumes/Hunger_16.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_17", "./Hunger/costumes/Hunger_17.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_18", "./Hunger/costumes/Hunger_18.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_19", "./Hunger/costumes/Hunger_19.png", {
        x: 80,
        y: 8,
      }),
      new Costume("Hunger_20", "./Hunger/costumes/Hunger_20.png", {
        x: 80,
        y: 8,
      }),
    ];

    this.sounds = [
      new Sound("hurt", "./Hunger/sounds/hurt.wav"),
      new Sound("fallsmall", "./Hunger/sounds/fallsmall.wav"),
      new Sound("fallbig1", "./Hunger/sounds/fallbig1.wav"),
      new Sound("fallbig2", "./Hunger/sounds/fallbig2.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "go" }, this.whenIReceiveGo),
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

    this.vars.lasthunger = 0;
  }

  *whenIReceiveGo() {
    yield* this.wait(1);
    this.moveAhead();
    yield* this.updateHunger(Math.round(this.toNumber(this.stage.vars.Hunger)));
    this.visible = true;
  }

  *whenIReceiveAnimate() {
    if (this.compare(this.stage.vars.Creative, 1) < 0) {
      if (
        this.toNumber(this.stage.vars.Mode) === 0 ||
        this.toString(this.stage.vars.Mode) === "S"
      ) {
        if (this.compare(this.stage.vars.Hunger, 4) > 0) {
          this.goto(101, -123);
        } else {
          this.goto(101 + this.random(-1, 1), -124 + this.random(-1, 1));
          if (this.compare(this.stage.vars.Hunger, 0) < 0) {
            this.stage.vars.Hunger = 0;
          }
        }
        if (
          !(
            this.compare(
              Math.round(this.toNumber(this.stage.vars.Hunger)),
              this.vars.lasthunger
            ) === 0
          )
        ) {
          yield* this.updateHunger(
            Math.round(this.toNumber(this.stage.vars.Hunger))
          );
        }
        this.visible = true;
      } else {
        this.visible = false;
      }
    } else {
      if (this.compare(this.stage.vars.Hunger, -9999) > 0) {
        this.stage.vars.Hunger = 20;
      }
      this.visible = false;
    }
  }

  *updateHunger(hunger) {
    if (this.compare(hunger, 0) > 0) {
      this.costume = this.toNumber(hunger) + 1;
    } else {
      this.costume = "Hunger_0";
    }
    this.vars.lasthunger = this.stage.vars.Hunger;
  }

  *whenIReceiveGreenFlag() {
    this.vars.lasthunger = 0;
    this.goto(101, -123);
    this.size = 200;
    this.visible = false;
  }
}
