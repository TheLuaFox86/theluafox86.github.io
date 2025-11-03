/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Health extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("health0", "./Health/costumes/health0.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health1", "./Health/costumes/health1.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health2", "./Health/costumes/health2.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health3", "./Health/costumes/health3.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health4", "./Health/costumes/health4.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health5", "./Health/costumes/health5.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health6", "./Health/costumes/health6.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health7", "./Health/costumes/health7.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health8", "./Health/costumes/health8.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health9", "./Health/costumes/health9.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health10", "./Health/costumes/health10.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health11", "./Health/costumes/health11.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health12", "./Health/costumes/health12.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health13", "./Health/costumes/health13.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health14", "./Health/costumes/health14.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health15", "./Health/costumes/health15.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health16", "./Health/costumes/health16.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health17", "./Health/costumes/health17.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health18", "./Health/costumes/health18.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health19", "./Health/costumes/health19.png", {
        x: 162,
        y: 18,
      }),
      new Costume("health20", "./Health/costumes/health20.png", {
        x: 162,
        y: 18,
      }),
    ];

    this.sounds = [
      new Sound("hurt", "./Health/sounds/hurt.wav"),
      new Sound("fallsmall", "./Health/sounds/fallsmall.wav"),
      new Sound("fallbig1", "./Health/sounds/fallbig1.wav"),
      new Sound("fallbig2", "./Health/sounds/fallbig2.wav"),
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
      new Trigger(Trigger.BROADCAST, { name: "go" }, this.whenIReceiveGo),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Update Health" },
        this.whenIReceiveUpdateHealth
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.lasthealth = 0;
    this.vars.l = 19;
  }

  *whenIReceiveAnimate() {
    if (this.compare(this.stage.vars.Creative, 1) < 0) {
      if (
        this.toNumber(this.stage.vars.Mode) === 0 ||
        this.toString(this.stage.vars.Mode) === "S"
      ) {
        if (this.compare(this.stage.vars.HealthS, 4) > 0) {
          this.goto(-101, -124);
        } else {
          this.goto(-101 + this.random(-1, 1), -124 + this.random(-1, 1));
        }
        this.visible = true;
      } else {
        this.visible = false;
      }
    } else {
      if (this.compare(this.stage.vars.HealthS, -9999) > 0) {
        this.stage.vars.HealthS = 20;
      }
      this.visible = false;
    }
  }

  *updateHealth(health) {
    if (this.compare(health, 0) > 0) {
      this.costume = this.toNumber(health) + 1;
    } else {
      this.costume = "health0";
    }
  }

  *whenIReceiveGo() {
    yield* this.wait(1);
    this.moveAhead();
    yield* this.updateHealth(this.stage.vars.HealthS);
    this.visible = true;
  }

  *whenIReceiveUpdateHealth() {
    this.vars.l = this.vars.lasthealth;
    this.vars.lasthealth = this.stage.vars.HealthS;
    if (this.compare(this.vars.lasthealth, this.vars.l) < 0) {
      if (this.compare(this.stage.vars.Sound, 0) > 0) {
        this.audioEffects.volume = 100;
        yield* this.startSound("hurt");
      }
      if (this.toString(this.stage.vars.Mode) === "S") {
        this.stage.vars.Mode = "";
      }
      for (let i = 0; i < 3; i++) {
        yield* this.updateHealth(this.stage.vars.HealthS);
        yield* this.wait(0.15);
        yield* this.updateHealth(this.vars.l);
        yield* this.wait(0.15);
        yield;
      }
    }
    yield* this.updateHealth(this.stage.vars.HealthS);
  }

  *whenIReceiveGreenFlag() {
    this.vars.lasthealth = 0;
    this.goto(-101, -124);
    this.visible = false;
  }
}
