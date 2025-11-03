/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Counts extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Counts/costumes/1.png", { x: -18, y: 16 }),
      new Costume("2", "./Counts/costumes/2.png", { x: -16, y: 16 }),
      new Costume("3", "./Counts/costumes/3.png", { x: -16, y: 16 }),
      new Costume("4", "./Counts/costumes/4.png", { x: -14, y: 16 }),
      new Costume("5", "./Counts/costumes/5.png", { x: -16, y: 16 }),
      new Costume("6", "./Counts/costumes/6.png", { x: -16, y: 16 }),
      new Costume("7", "./Counts/costumes/7.png", { x: -16, y: 16 }),
      new Costume("8", "./Counts/costumes/8.png", { x: -16, y: 16 }),
      new Costume("9", "./Counts/costumes/9.png", { x: -16, y: 16 }),
      new Costume("10", "./Counts/costumes/10.png", { x: 0, y: 16 }),
      new Costume("11", "./Counts/costumes/11.png", { x: -2, y: 16 }),
      new Costume("12", "./Counts/costumes/12.png", { x: 0, y: 16 }),
      new Costume("13", "./Counts/costumes/13.png", { x: 0, y: 16 }),
      new Costume("14", "./Counts/costumes/14.png", { x: 0, y: 16 }),
      new Costume("15", "./Counts/costumes/15.png", { x: 0, y: 16 }),
      new Costume("16", "./Counts/costumes/16.png", { x: 0, y: 16 }),
      new Costume("17", "./Counts/costumes/17.png", { x: 0, y: 16 }),
      new Costume("18", "./Counts/costumes/18.png", { x: 0, y: 16 }),
      new Costume("19", "./Counts/costumes/19.png", { x: 0, y: 16 }),
      new Costume("20", "./Counts/costumes/20.png", { x: 2, y: 16 }),
      new Costume("21", "./Counts/costumes/21.png", { x: 2, y: 16 }),
      new Costume("22", "./Counts/costumes/22.png", { x: 2, y: 16 }),
      new Costume("23", "./Counts/costumes/23.png", { x: 2, y: 16 }),
      new Costume("24", "./Counts/costumes/24.png", { x: 2, y: 16 }),
      new Costume("25", "./Counts/costumes/25.png", { x: 2, y: 16 }),
      new Costume("26", "./Counts/costumes/26.png", { x: 2, y: 16 }),
      new Costume("27", "./Counts/costumes/27.png", { x: 2, y: 16 }),
      new Costume("28", "./Counts/costumes/28.png", { x: 2, y: 16 }),
      new Costume("29", "./Counts/costumes/29.png", { x: 2, y: 16 }),
      new Costume("30", "./Counts/costumes/30.png", { x: 2, y: 16 }),
      new Costume("31", "./Counts/costumes/31.png", { x: 2, y: 16 }),
      new Costume("32", "./Counts/costumes/32.png", { x: 2, y: 16 }),
      new Costume("33", "./Counts/costumes/33.png", { x: 2, y: 16 }),
      new Costume("34", "./Counts/costumes/34.png", { x: 2, y: 16 }),
      new Costume("35", "./Counts/costumes/35.png", { x: 2, y: 16 }),
      new Costume("36", "./Counts/costumes/36.png", { x: 2, y: 16 }),
      new Costume("37", "./Counts/costumes/37.png", { x: 2, y: 16 }),
      new Costume("38", "./Counts/costumes/38.png", { x: 2, y: 16 }),
      new Costume("39", "./Counts/costumes/39.png", { x: 2, y: 16 }),
      new Costume("40", "./Counts/costumes/40.png", { x: 4, y: 16 }),
      new Costume("41", "./Counts/costumes/41.png", { x: 4, y: 16 }),
      new Costume("42", "./Counts/costumes/42.png", { x: 4, y: 16 }),
      new Costume("43", "./Counts/costumes/43.png", { x: 4, y: 16 }),
      new Costume("44", "./Counts/costumes/44.png", { x: 4, y: 16 }),
      new Costume("45", "./Counts/costumes/45.png", { x: 4, y: 16 }),
      new Costume("46", "./Counts/costumes/46.png", { x: 4, y: 16 }),
      new Costume("47", "./Counts/costumes/47.png", { x: 4, y: 16 }),
      new Costume("48", "./Counts/costumes/48.png", { x: 4, y: 16 }),
      new Costume("49", "./Counts/costumes/49.png", { x: 4, y: 16 }),
      new Costume("50", "./Counts/costumes/50.png", { x: 2, y: 16 }),
      new Costume("51", "./Counts/costumes/51.png", { x: 2, y: 16 }),
      new Costume("52", "./Counts/costumes/52.png", { x: 2, y: 16 }),
      new Costume("53", "./Counts/costumes/53.png", { x: 2, y: 16 }),
      new Costume("54", "./Counts/costumes/54.png", { x: 2, y: 16 }),
      new Costume("55", "./Counts/costumes/55.png", { x: 2, y: 16 }),
      new Costume("56", "./Counts/costumes/56.png", { x: 2, y: 16 }),
      new Costume("57", "./Counts/costumes/57.png", { x: 2, y: 16 }),
      new Costume("58", "./Counts/costumes/58.png", { x: 2, y: 16 }),
      new Costume("59", "./Counts/costumes/59.png", { x: 2, y: 16 }),
      new Costume("60", "./Counts/costumes/60.png", { x: 2, y: 16 }),
      new Costume("61", "./Counts/costumes/61.png", { x: 2, y: 16 }),
      new Costume("62", "./Counts/costumes/62.png", { x: 2, y: 16 }),
      new Costume("63", "./Counts/costumes/63.png", { x: 2, y: 16 }),
      new Costume("64", "./Counts/costumes/64.png", { x: 2, y: 16 }),
      new Costume("Durability1", "./Counts/costumes/Durability1.png", {
        x: 32,
        y: 12,
      }),
      new Costume("Durability2", "./Counts/costumes/Durability2.png", {
        x: 32,
        y: 12,
      }),
      new Costume("Durability3", "./Counts/costumes/Durability3.png", {
        x: 32,
        y: 12,
      }),
      new Costume("Durability4", "./Counts/costumes/Durability4.png", {
        x: 32,
        y: 12,
      }),
      new Costume("Durability5", "./Counts/costumes/Durability5.png", {
        x: 32,
        y: 12,
      }),
      new Costume("Durability6", "./Counts/costumes/Durability6.png", {
        x: 32,
        y: 12,
      }),
      new Costume("Durability7", "./Counts/costumes/Durability7.png", {
        x: 32,
        y: 12,
      }),
      new Costume("Durability8", "./Counts/costumes/Durability8.png", {
        x: 32,
        y: 12,
      }),
      new Costume("Durability9", "./Counts/costumes/Durability9.png", {
        x: 28,
        y: 2,
      }),
    ];

    this.sounds = [new Sound("meow", "./Counts/sounds/meow.wav")];

    this.triggers = [
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
        { name: "Switch Mode" },
        this.whenIReceiveSwitchMode
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.count = -1;
    this.vars.x = -999;
    this.vars.y = -999;
    this.vars.tofront = 1;
    this.vars.iCo = 64;
    this.vars.tCo = 0;
  }

  *update(i) {
    if (
      this.compare(i, 1) < 0 ||
      (this.compare(i, 9) > 0 &&
        (this.toNumber(this.stage.vars.Mode) === 0 ||
          this.toString(this.stage.vars.Mode) === "S"))
    ) {
      this.visible = false;
    } else {
      this.vars.tCo = this.itemOf(
        this.stage.vars.Inv,
        this.toNumber(i) * 2 - 2
      );
      if (this.toString(this.vars.tCo) === "#") {
        this.vars.tCo = 0;
      } else {
        yield* this.getdurabilityof(this.vars.tCo);
        if (this.compare(this.vars.tCo, 0) > 0) {
          if (
            this.compare(
              this.vars.tCo,
              this.itemOf(this.stage.vars.Inv, this.toNumber(i) * 2 - 1)
            ) > 0
          ) {
            this.vars.tCo =
              64 +
              Math.ceil(
                (this.toNumber(
                  this.itemOf(this.stage.vars.Inv, this.toNumber(i) * 2 - 1)
                ) *
                  9) /
                  this.toNumber(this.vars.tCo)
              );
          } else {
            this.vars.tCo = 1;
          }
        } else {
          this.vars.tCo = this.itemOf(
            this.stage.vars.Inv,
            this.toNumber(i) * 2 - 1
          );
        }
      }
      if (this.compare(this.vars.tCo, 2) < 0) {
        this.visible = false;
      } else {
        if (!(this.compare(this.vars.tCo, this.vars.count) === 0)) {
          this.visible = false;
          this.costume = this.vars.tCo;
          this.vars.count = this.vars.tCo;
        }
        this.vars.tCo = this.itemOf(
          this.stage.vars.Invpos,
          this.toNumber(this.vars.iCo) * 3 - 2
        );
        if (!(this.compare(this.vars.tCo, this.vars.x) === 0)) {
          this.vars.x = this.vars.tCo;
          this.x = this.toNumber(this.vars.tCo) + 1;
          this.vars.tofront = 1;
        }
        this.vars.tCo = this.itemOf(
          this.stage.vars.Invpos,
          this.toNumber(this.vars.iCo) * 3 - 1
        );
        if (!(this.compare(this.vars.tCo, this.vars.y) === 0)) {
          this.vars.y = this.vars.tCo;
          this.y = this.toNumber(this.vars.tCo) - 13;
          this.vars.tofront = 1;
        }
        this.visible = true;
        if (this.toNumber(this.vars.tofront) === 1) {
          this.moveAhead();
          this.vars.tofront = 0;
        }
      }
    }
  }

  *init() {
    this.vars.iCo = 1;
    for (let i = 0; i < 63; i++) {
      this.createClone();
      this.vars.iCo++;
      yield;
    }
  }

  *whenIReceiveAnimate() {
    yield* this.update(
      this.itemOf(this.stage.vars.Invpos, this.toNumber(this.vars.iCo) * 3 - 3)
    );
  }

  *whenIReceiveInit1b() {
    yield* this.init();
  }

  *getdurabilityof(tileid) {
    this.vars.tCo = this.itemOf(
      this.vars.undefined,
      this.toNumber(tileid) * this.toNumber(this.stage.vars.Dmul) + 17
    );
  }

  *whenIReceiveSwitchMode() {
    this.vars.tofront = 1;
  }

  *startAsClone() {
    this.stage.vars.Spritecount++;
  }

  *whenIReceiveGreenFlag() {
    this.vars.count = -1;
    this.vars.x = -999;
    this.vars.y = -999;
    this.vars.tofront = 1;
    this.visible = false;
    this.size = 100;
  }
}
