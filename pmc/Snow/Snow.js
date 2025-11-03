/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Snow extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("snow", "./Snow/costumes/snow.png", { x: 232, y: 172 }),
      new Costume("rain", "./Snow/costumes/rain.png", { x: 480, y: 360 }),
      new Costume("small", "./Snow/costumes/small.png", { x: 0, y: 0 }),
    ];

    this.sounds = [new Sound("pop", "./Snow/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
      new Trigger(Trigger.BROADCAST, { name: "snow" }, this.whenIReceiveSnow),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "blizard" },
        this.whenIReceiveBlizard
      ),
      new Trigger(Trigger.BROADCAST, { name: "rain" }, this.whenIReceiveRain),
      new Trigger(
        Trigger.BROADCAST,
        { name: "clear weather" },
        this.whenIReceiveClearWeather
      ),
    ];

    this.vars.weatherType = 0;
    this.vars.wSx = 1;
    this.vars.wSy = -1;
    this.vars.x = 0;
    this.vars.y = 0;
    this.vars.wDir = 0.5083073173259449;
    this.vars.weatherTime = 0;
  }

  *whenIReceiveAnimate() {
    if (this.toNumber(this.stage.vars.Biomeid) === 8) {
      if (
        !(
          this.toNumber(this.vars.weatherType) === 1 ||
          this.toNumber(this.vars.weatherType) === 2
        )
      ) {
        this.vars.weatherType = 1;
        this.vars.weatherTime = this.stage.vars.Time;
        yield* this.setWeatherCostume(1);
      }
    } else {
      if (this.toNumber(this.stage.vars.Biomeid) === 4) {
        this.vars.weatherType = 0;
        this.vars.weatherTime = this.stage.vars.Time;
      } else {
        if (this.compare(this.stage.vars.Time, this.vars.weatherTime) > 0) {
          this.vars.weatherType = this.random(1, 10);
          if (
            this.toNumber(this.vars.weatherTime) === 1 &&
            !(this.toNumber(this.stage.vars.Biomeid) === 4)
          ) {
            if (this.random(1, 4) === 1) {
              this.vars.weatherType = 1;
              yield* this.setWeatherCostume(1);
            } else {
              this.vars.weatherType = 3;
              yield* this.setWeatherCostume(2);
            }
          } else {
            this.vars.weatherType = 0;
          }
          this.vars.weatherTime =
            this.toNumber(this.stage.vars.Time) + this.random(60, 240);
        }
      }
    }
    if (
      this.toNumber(this.vars.weatherType) === 1 ||
      this.toNumber(this.vars.weatherType) === 2
    ) {
      if (
        this.compare(
          this.itemOf(
            this.stage.vars.Light,
            Math.floor(this.toNumber(this.stage.vars.X)) +
              Math.floor(this.toNumber(this.stage.vars.Y)) *
                this.toNumber(this.stage.vars.Lsx)
          ),
          12
        ) > 0
      ) {
        this.vars.x += this.toNumber(this.vars.wSx);
        this.vars.y += this.toNumber(this.vars.wSy);
        this.goto(
          ((this.toNumber(this.vars.x) -
            this.toNumber(this.stage.vars.Scrx) * 40) %
            480) -
            240,
          ((this.toNumber(this.vars.y) -
            this.toNumber(this.stage.vars.Scry) * 40) %
            360) -
            180
        );
        this.visible = true;
        if (this.toNumber(this.vars.weatherType) === 1) {
          if (this.random(1, 60) === 1) {
            this.vars.wDir = this.random(-3.1, 3.1);
          }
          this.vars.wSx +=
            this.random(-0.1, 0.1) +
            (this.toNumber(this.vars.wDir) - this.toNumber(this.vars.wSx)) *
              0.01;
        } else {
          if (this.random(1, 30) === 1) {
            this.vars.wDir =
              this.random(6.1, 10.1) * (this.random(0, 1) * 2 - 1);
          }
          this.vars.wSx +=
            this.random(-0.1, 0.1) +
            (this.toNumber(this.vars.wDir) - this.toNumber(this.vars.wSx)) *
              0.1;
        }
      } else {
        this.visible = false;
      }
    } else {
      if (this.toNumber(this.vars.weatherType) === 3) {
        if (
          this.compare(
            this.itemOf(
              this.stage.vars.Light,
              Math.floor(this.toNumber(this.stage.vars.X)) +
                Math.floor(this.toNumber(this.stage.vars.Y)) *
                  this.toNumber(this.stage.vars.Lsx)
            ),
            12
          ) > 0
        ) {
          this.vars.y += this.toNumber(this.vars.wSy);
          this.goto(
            ((0 - this.toNumber(this.stage.vars.Scrx) * 40) % 480) - 240,
            ((this.toNumber(this.vars.y) -
              this.toNumber(this.stage.vars.Scry) * 40) %
              360) -
              180
          );
          this.visible = true;
          if (this.toNumber(this.vars.weatherType) === 1) {
            if (this.random(1, 60) === 1) {
              this.vars.wDir = this.random(-3.1, 3.1);
            }
            this.vars.wSx +=
              this.random(-0.1, 0.1) +
              (this.toNumber(this.vars.wDir) - this.toNumber(this.vars.wSx)) *
                0.01;
          } else {
            if (this.random(1, 30) === 1) {
              this.vars.wDir =
                this.random(6.1, 10.1) * (this.random(0, 1) * 2 - 1);
            }
            this.vars.wSx +=
              this.random(-0.1, 0.1) +
              (this.toNumber(this.vars.wDir) - this.toNumber(this.vars.wSx)) *
                0.1;
          }
        } else {
          this.visible = false;
        }
      } else {
        this.visible = false;
      }
    }
  }

  *whenIReceiveSnow() {
    this.vars.weatherType = 1;
    this.vars.weatherTime =
      this.toNumber(this.stage.vars.Time) + this.random(60, 240);
    yield* this.setWeatherCostume(1);
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
    this.costume = "small";
    this.size = 400;
    this.costume = "snow";
    this.goto(0, 0);
    this.moveAhead();
    this.vars.wSy = -1;
    this.vars.wSx = 1;
    this.vars.y = 0;
    this.vars.x = 0;
    this.vars.wDir = this.random(-3.1, 3.1);
    this.vars.weatherTime = 0;
    this.vars.weatherType = 0;
  }

  *whenIReceiveBlizard() {
    this.vars.weatherType = 2;
    this.vars.weatherTime =
      this.toNumber(this.stage.vars.Time) + this.random(60, 240);
    yield* this.setWeatherCostume(1);
  }

  *setWeatherCostume(costume) {
    if (!(this.compare(costume, this.costumeNumber) === 0)) {
      this.costume = "small";
      if (this.toNumber(costume) === 1) {
        this.size = 400;
      } else {
        this.size = 200;
      }
      this.costume = costume;
    }
    if (this.toNumber(this.vars.weatherType) === 1) {
      this.vars.wSy = -1;
      this.vars.wSx = this.random(-3.1, 3.1);
      this.vars.wDir = this.vars.wSx;
    } else {
      if (this.toNumber(this.vars.weatherType) === 2) {
        this.vars.wSy = -1;
        this.vars.wSx = this.random(6.1, 10.1) * (this.random(0, 1) * 2 - 1);
        this.vars.wDir = this.vars.wSx;
      } else {
        if (this.toNumber(this.vars.weatherType) === 3) {
          this.vars.wSy = -30;
          this.vars.wSx = 0;
          this.vars.wDir = this.vars.wSx;
        } else {
          null;
        }
      }
    }
  }

  *whenIReceiveRain() {
    this.vars.weatherType = 3;
    this.vars.weatherTime =
      this.toNumber(this.stage.vars.Time) + this.random(60, 240);
    yield* this.setWeatherCostume(2);
  }

  *whenIReceiveClearWeather() {
    this.vars.weatherType = 0;
    this.vars.weatherTime =
      this.toNumber(this.stage.vars.Time) + this.random(60, 240);
  }
}
