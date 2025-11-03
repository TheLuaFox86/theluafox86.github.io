/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class SplashSelect extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "Splash_select",
        "./SplashSelect/costumes/Splash_select.png",
        { x: 70, y: 18 }
      ),
    ];

    this.sounds = [new Sound("meow", "./SplashSelect/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "World Options" },
        this.whenIReceiveWorldOptions
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Refresh Menu" },
        this.whenIReceiveRefreshMenu
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Clicked" },
        this.whenIReceiveStartClicked
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.buttonid = 3;
    this.vars.buttonsel = 0;
    this.vars.buttonmax = 1;
    this.vars.nxtsel = 0;
  }

  *whenbackdropswitchesto() {
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveWorldOptions() {
    this.moveAhead();
    yield* this.wait(0.2);
    this.moveBehind(1);
    this.costume = "Splash_select";
    this.vars.buttonid = 0;
    this.vars.buttonmax = 2;
    this.createClone();
    this.vars.buttonid = 1;
    this.vars.buttonmax = 1;
    this.createClone();
    this.vars.buttonid = 2;
    this.vars.buttonmax = 1;
    this.createClone();
    this.vars.buttonid = 3;
    this.vars.buttonmax = 1;
    this.createClone();
  }

  *startAsClone() {
    this.vars.buttonsel = this.itemOf(
      this.stage.vars.Menu,
      this.toNumber(this.vars.buttonid)
    );
    this.goto(
      -58 + this.toNumber(this.vars.buttonsel) * 70,
      14 - 34 * this.toNumber(this.vars.buttonid)
    );
    this.visible = true;
  }

  *whenIReceiveRefreshMenu() {
    this.vars.nxtsel = this.itemOf(
      this.stage.vars.Menu,
      this.toNumber(this.vars.buttonid)
    );
    if (
      this.compare(this.vars.buttonsel, this.vars.nxtsel) === 0 ||
      this.compare(this.vars.nxtsel, 0) < 0 ||
      this.compare(this.vars.nxtsel, this.vars.buttonmax) > 0
    ) {
      this.stage.vars.Menu.splice(
        this.toNumber(this.vars.buttonid),
        1,
        this.vars.buttonsel
      );
    } else {
      this.vars.buttonsel = this.itemOf(
        this.stage.vars.Menu,
        this.toNumber(this.vars.buttonid)
      );
      this.goto(
        -58 + this.toNumber(this.vars.buttonsel) * 70,
        14 - 34 * this.toNumber(this.vars.buttonid)
      );
    }
  }

  *whenIReceiveStartClicked() {
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveGreenFlag() {
    this.goto(0, 0);
    this.visible = false;
  }
}
