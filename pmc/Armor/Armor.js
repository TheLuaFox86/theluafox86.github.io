/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Armor extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("armour1", "./Armor/costumes/armour1.png", { x: 162, y: 18 }),
      new Costume("armour2", "./Armor/costumes/armour2.png", { x: 162, y: 18 }),
      new Costume("armour3", "./Armor/costumes/armour3.png", { x: 162, y: 18 }),
      new Costume("armour4", "./Armor/costumes/armour4.png", { x: 162, y: 18 }),
      new Costume("armour5", "./Armor/costumes/armour5.png", { x: 162, y: 18 }),
      new Costume("armour6", "./Armor/costumes/armour6.png", { x: 162, y: 18 }),
      new Costume("armour7", "./Armor/costumes/armour7.png", { x: 162, y: 18 }),
      new Costume("armour8", "./Armor/costumes/armour8.png", { x: 162, y: 18 }),
      new Costume("armour9", "./Armor/costumes/armour9.png", { x: 162, y: 18 }),
      new Costume("armour10", "./Armor/costumes/armour10.png", {
        x: 162,
        y: 18,
      }),
      new Costume("armour11", "./Armor/costumes/armour11.png", {
        x: 162,
        y: 18,
      }),
      new Costume("armour12", "./Armor/costumes/armour12.png", {
        x: 162,
        y: 18,
      }),
      new Costume("armour13", "./Armor/costumes/armour13.png", {
        x: 162,
        y: 18,
      }),
      new Costume("armour14", "./Armor/costumes/armour14.png", {
        x: 162,
        y: 18,
      }),
      new Costume("armour15", "./Armor/costumes/armour15.png", {
        x: 162,
        y: 18,
      }),
      new Costume("armour16", "./Armor/costumes/armour16.png", {
        x: 162,
        y: 18,
      }),
      new Costume("armour17", "./Armor/costumes/armour17.png", {
        x: 162,
        y: 18,
      }),
      new Costume("armour18", "./Armor/costumes/armour18.png", {
        x: 162,
        y: 18,
      }),
      new Costume("armour19", "./Armor/costumes/armour19.png", {
        x: 162,
        y: 18,
      }),
      new Costume("armour20", "./Armor/costumes/armour20.png", {
        x: 162,
        y: 18,
      }),
    ];

    this.sounds = [new Sound("meow", "./Armor/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Switch Mode" },
        this.whenIReceiveSwitchMode
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Update Inventory" },
        this.whenIReceiveUpdateInventory
      ),
      new Trigger(Trigger.BROADCAST, { name: "go" }, this.whenIReceiveGo),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
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

    this.vars.l = 81;
    this.vars.lastarmour = 0;
    this.vars.defensepoints = 0;
    this.vars.dur = 0;
  }

  *whenIReceiveSwitchMode() {
    yield* this.calculateDefensePoints(0);
    this.moveAhead();
  }

  *whenIReceiveUpdateInventory() {
    yield* this.calculateDefensePoints(0);
  }

  *whenIReceiveGo() {
    yield* this.wait(1);
    this.moveAhead();
    yield* this.calculateDefensePoints(0);
  }

  *calculateDefensePoints(damage) {
    this.vars.defensepoints = 0;
    this.vars.l = 73;
    for (let i = 0; i < 4; i++) {
      this.vars.dur = this.itemOf(
        this.stage.vars.Inv,
        this.toNumber(this.vars.l)
      );
      if (this.compare(damage, 0) > 0) {
        this.vars.dur += 0 - this.toNumber(damage);
        if (this.compare(this.vars.dur, 0) > 0) {
          this.stage.vars.Inv.splice(
            this.toNumber(this.vars.l),
            1,
            this.vars.dur
          );
        } else {
          this.stage.vars.Inv.splice(this.toNumber(this.vars.l) + -1, 1, "#");
          this.stage.vars.Inv.splice(this.toNumber(this.vars.l), 1, 0);
        }
      }
      if (this.compare(this.vars.dur, 0) > 0) {
        this.vars.defensepoints +=
          0 -
          this.toNumber(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(this.itemOf(this.stage.vars.Inv, this.vars.l - 1)) *
                this.toNumber(this.stage.vars.Dmul) +
                13
            )
          );
      }
      this.vars.l += 2;
      yield;
    }
    this.stage.vars.Defensemul =
      1 - this.toNumber(this.vars.defensepoints) * 0.04;
  }

  *whenIReceiveAnimate() {
    if (this.compare(this.stage.vars.Creative, 1) < 0) {
      if (
        this.compare(this.vars.defensepoints, 0) > 0 &&
        (this.toNumber(this.stage.vars.Mode) === 0 ||
          this.toString(this.stage.vars.Mode) === "S")
      ) {
        this.goto(-101, -104);
        if (
          !(this.compare(this.costumeNumber, this.vars.defensepoints) === 0)
        ) {
          this.costume = this.vars.defensepoints;
        }
        this.visible = true;
      } else {
        this.visible = false;
      }
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveUpdateHealth() {
    if (this.compare(this.vars.defensepoints, 0) > 0) {
      yield* this.calculateDefensePoints(this.stage.vars.Damagearmor);
    }
    this.stage.vars.Damagearmor = 0;
  }

  *whenIReceiveGreenFlag() {
    this.vars.lastarmour = 0;
    this.stage.vars.Defensemul = 1;
    this.stage.vars.Damagearmor = 1;
    this.goto(-101, -104);
    this.visible = false;
  }
}
