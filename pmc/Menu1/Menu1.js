/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Menu1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Help Text", "./Menu1/costumes/Help Text.svg", {
        x: 200,
        y: 36,
      }),
      new Costume("World-Options", "./Menu1/costumes/World-Options.png", {
        x: 374,
        y: 62,
      }),
      new Costume("Done", "./Menu1/costumes/Done.png", { x: 173, y: 35 }),
      new Costume("World-Options2", "./Menu1/costumes/World-Options2.png", {
        x: 374,
        y: 62,
      }),
    ];

    this.sounds = [new Sound("meow", "./Menu1/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "help screen" },
        this.whenIReceiveHelpScreen
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "world options" },
        this.whenIReceiveWorldOptions
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "start clicked" },
        this.whenIReceiveStartClicked
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "close help" },
        this.whenIReceiveCloseHelp
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "green flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];
  }

  *whenIReceiveHelpScreen() {
    this.costume = "Help Text";
    this.visible = true;
  }

  *whenIReceiveWorldOptions() {
    this.costume = "Done";
    this.goto(0, 0);
    this.createClone();
    this.costume = "World-Options";
    this.goto(0, 0);
    this.visible = true;
    while (true) {
      while (!this.mouse.down) {
        yield;
      }
      if (
        this.compare(Math.abs(this.mouse.x - 0), 85) < 0 &&
        this.compare(Math.abs(this.mouse.y - -135), 29) < 0
      ) {
        yield* this.doDone();
        return;
      } else {
        yield* this.optionClicked(
          Math.round((15 - this.mouse.y) / 34) + 1,
          Math.round((this.mouse.x - -58) / 72)
        );
      }
      while (!!this.mouse.down) {
        yield;
      }
      yield;
    }
  }

  *optionClicked(optid, choiceid) {
    if (
      this.compare(optid, 1) < 0 ||
      this.compare(optid, this.stage.vars.Menu.length) > 0
    ) {
      return;
    }
    this.stage.vars.Menu.splice(optid - 1, 1, choiceid);
    this.broadcast("refresh menu");
  }

  *doDone() {
    if (this.toNumber(this.itemOf(this.stage.vars.Menu, 0)) === 1) {
      this.stage.vars.Creative = 0;
      this.stage.vars.Survival = 0;
    } else {
      this.stage.vars.Survival = 1;
      if (this.toNumber(this.itemOf(this.stage.vars.Menu, 0)) === 0) {
        this.stage.vars.Creative = 0;
      } else {
        this.stage.vars.Creative = 1;
      }
    }
    this.stage.vars.Skin = this.itemOf(this.stage.vars.Menu, 2);
    this.broadcast("start clicked");
  }

  *whenIReceiveStartClicked() {
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveCloseHelp() {
    this.visible = false;
  }

  *whenIReceiveGreenFlag() {
    this.goto(0, 0);
    this.visible = false;
    this.stage.vars.Menu = [];
    this.stage.vars.Menu.push(0);
    this.stage.vars.Menu.push(0);
    this.stage.vars.Menu.push(0);
    this.stage.vars.Menu.push(0);
  }

  *startAsClone() {
    this.moveAhead(1);
    this.y = -137;
    this.visible = true;
    this.size = 70;
    while (true) {
      if (this.touching("mouse")) {
        this.size += (105 - this.size) * 0.2;
      } else {
        this.size += (100 - this.size) * 0.2;
      }
      this.effects.brightness = (this.size - 100) * 2;
      yield;
    }
  }
}
