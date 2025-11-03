/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class PseudorandomCycle extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./PseudorandomCycle/costumes/costume1.svg", {
        x: 62,
        y: 62,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Fill Random" },
        this.whenIReceiveFillRandom
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.lastrand = -1413411491;
    this.vars.randval = -1413411491;
    this.vars.lastdigits = 2637663117;
    this.vars.ok = 1;
    this.vars.count = 1000;
    this.vars.sequence = [];
  }

  *initialisePseudorandomCycleWithSeed(seed) {
    this.vars.lastrand = seed;
  }

  *randvalPseudorandomCycleWithSeed(seed) {
    if (!(this.toNumber(seed) === 0)) {
      this.vars.lastrand = seed;
      if (this.compare(seed, 2147483645) > 0) {
        this.vars.lastrand = 0;
      }
    }
    if (this.toNumber(this.vars.lastrand) === 0) {
      this.vars.randval = Math.round(this.timer * 10000);
      this.vars.randval =
        (this.toNumber(this.vars.randval) * 44831 + 3099) % 4294967311;
      this.vars.randval =
        (this.toNumber(this.vars.randval) * 1430713 + 1240931) % 4294967291;
      this.vars.randval =
        ((this.toNumber(this.vars.randval) * 29036779 + 60899) % 4294967291) -
        2147483645;
      this.vars.lastrand = this.vars.randval;
    }
    if (this.toNumber(this.vars.lastrand) === -1812431566) {
      this.vars.lastrand = 0;
    }
    yield* this.randvalMultiplyByAddMod(
      this.toNumber(this.vars.lastrand) + 2147483645,
      1430713,
      1240931,
      4294967291
    );
    yield* this.randvalMultiplyByAddMod(
      this.vars.randval,
      29036779,
      60899,
      4294967291
    );
    this.vars.randval -= 2147483645;
    this.vars.lastrand = this.vars.randval;
    if (this.toNumber(this.vars.lastrand) === 0) {
      this.vars.lastrand = -1812431566;
    }
    this.vars.randval = this.vars.lastrand;
  }

  *randvalPickRandomFromToWithSeed(start, end, seed) {
    yield* this.randvalPseudorandomCycleWithSeed(seed);
    if (
      this.compare(Math.round(this.toNumber(end)), end) === 0 &&
      this.compare(Math.round(this.toNumber(start)), start) === 0
    ) {
      this.vars.randval = Math.floor(
        (Math.abs(this.toNumber(this.vars.randval)) - 1) *
          ((this.toNumber(end) - this.toNumber(start) + 1) / 2147483645) +
          this.toNumber(start)
      );
    } else {
      this.vars.randval =
        (Math.abs(this.toNumber(this.vars.randval)) - 1) *
          ((this.toNumber(end) - this.toNumber(start)) / 2147483644) +
        this.toNumber(start);
    }
  }

  *okCheckNumericInRangeTo(string, start, end) {
    this.vars.ok = 0;
    if (this.compare(start, 0) < 0) {
      if (this.letterOf(string, 0) === "-") {
        this.vars.ok++;
      }
    }
    for (let i = 0; i < string.length - this.toNumber(this.vars.ok); i++) {
      this.vars.ok++;
      if (
        this.compare(this.letterOf(string, this.vars.ok - 1), 9) > 0 ||
        this.compare(this.letterOf(string, this.vars.ok - 1), 0) < 0
      ) {
        return;
      }
      yield;
    }
    this.vars.ok = 0;
    if (this.compare(string, end) > 0) {
      this.vars.ok = -2;
    } else {
      if (this.compare(string, start) < 0) {
        this.vars.ok = -1;
      }
    }
  }

  *randvalMultiplyByAddMod(num1, num2, num3, num4) {
    if (this.compare(num1.length + num2.length, 14) < 0) {
      this.vars.randval =
        (this.toNumber(num1) * this.toNumber(num2) + this.toNumber(num3)) %
        this.toNumber(num4);
    } else {
      if (this.compare(num1.length, num2.length) > 0) {
        this.vars.lastdigits = this.toNumber(num1) % 1000000;
        this.vars.randval = Math.floor(this.toNumber(num1) / 1000000);
        this.vars.lastdigits =
          (this.toNumber(this.vars.lastdigits) * this.toNumber(num2) +
            this.toNumber(num3)) %
          this.toNumber(num4);
        this.vars.randval =
          (this.toNumber(this.vars.randval) * this.toNumber(num2)) %
          this.toNumber(num4);
        for (let i = 0; i < 6; i++) {
          this.vars.randval =
            (this.toNumber(this.vars.randval) * 10) % this.toNumber(num4);
          yield;
        }
        this.vars.randval =
          (this.toNumber(this.vars.randval) +
            this.toNumber(this.vars.lastdigits)) %
          this.toNumber(num4);
      } else {
        this.vars.lastdigits = this.toNumber(num2) % 1000000;
        this.vars.randval = Math.floor(this.toNumber(num2) / 1000000);
        this.vars.lastdigits =
          (this.toNumber(this.vars.lastdigits) * this.toNumber(num1) +
            this.toNumber(num3)) %
          this.toNumber(num4);
        this.vars.randval =
          (this.toNumber(this.vars.randval) * this.toNumber(num1)) %
          this.toNumber(num4);
        for (let i = 0; i < 6; i++) {
          this.vars.randval =
            (this.toNumber(this.vars.randval) * 10) % this.toNumber(num4);
          yield;
        }
        this.vars.randval =
          (this.toNumber(this.vars.randval) +
            this.toNumber(this.vars.lastdigits)) %
          this.toNumber(num4);
      }
    }
  }

  *whenIReceiveFillRandom() {
    yield* this.fillRandom(this.stage.vars.Randomseed);
    this.stage.vars.Randomseed = 0;
  }

  *whenGreenFlagClicked() {}

  *fillRandom(seed) {
    if (this.compare(seed, 0) > 0) {
      yield* this.initialisePseudorandomCycleWithSeed(seed);
      this.stage.vars.Random = [];
    }
    while (!(this.compare(this.stage.vars.Random.length, 10000) > 0)) {
      yield* this.randvalPseudorandomCycleWithSeed(0);
      this.stage.vars.Random.push(this.vars.randval);
      yield;
    }
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
  }
}
