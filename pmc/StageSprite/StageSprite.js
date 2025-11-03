/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class StageSprite extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./StageSprite/costumes/backdrop1.png", {
        x: 0,
        y: 0,
      }),
      new Costume("Splash-1b bak", "./StageSprite/costumes/Splash-1b bak.svg", {
        x: 265.540011,
        y: 188.28500899999997,
      }),
      new Costume("Splash-1b", "./StageSprite/costumes/Splash-1b.svg", {
        x: 265.54001,
        y: 188.28501139999995,
      }),
      new Costume("YouTube", "./StageSprite/costumes/YouTube.svg", {
        x: 51.6100834546144,
        y: 14.369999999999976,
      }),
      new Costume(
        "Spl1b-New Game",
        "./StageSprite/costumes/Spl1b-New Game.svg",
        { x: 86.86000000000001, y: 17.629999999999995 }
      ),
      new Costume(
        "Spl1b-Load Game",
        "./StageSprite/costumes/Spl1b-Load Game.svg",
        { x: 86.86000000000001, y: 17.629999999999995 }
      ),
      new Costume(
        "Spl1b-Example Worlds",
        "./StageSprite/costumes/Spl1b-Example Worlds.svg",
        { x: 86.86000000000001, y: 17.629999999999995 }
      ),
      new Costume("Spl1b-Help", "./StageSprite/costumes/Spl1b-Help.svg", {
        x: 86.86000000000001,
        y: 17.629999999999995,
      }),
      new Costume("Splash-2b", "./StageSprite/costumes/Splash-2b.png", {
        x: 480,
        y: 360,
      }),
      new Costume("Wait - World", "./StageSprite/costumes/Wait - World.png", {
        x: 480,
        y: 360,
      }),
      new Costume(
        "Wait - Flowing",
        "./StageSprite/costumes/Wait - Flowing.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Wait - Cloning",
        "./StageSprite/costumes/Wait - Cloning.png",
        { x: 480, y: 360 }
      ),
      new Costume(
        "Wait - Here we go",
        "./StageSprite/costumes/Wait - Here we go.png",
        { x: 480, y: 360 }
      ),
      new Costume("backdrop2", "./StageSprite/costumes/backdrop2.png", {
        x: 480,
        y: 360,
      }),
      new Costume("Pause", "./StageSprite/costumes/Pause.png", {
        x: 480,
        y: 360,
      }),
    ];

    this.sounds = [new Sound("meow", "./StageSprite/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "splash1" },
        this.whenIReceiveSplash1
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "l" }, this.whenKeyLPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "m" }, this.whenKeyMPressed),
      new Trigger(
        Trigger.BROADCAST,
        { name: "start after loaded" },
        this.whenIReceiveStartAfterLoaded
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "start clicked" },
        this.whenIReceiveStartClicked
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "change background" },
        this.whenIReceiveChangeBackground
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "paused" },
        this.whenIReceivePaused
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "menu - close" },
        this.whenIReceiveMenuClose
      ),
    ];
  }

  *whenIReceiveSplash1() {
    while (!!this.mouse.down) {
      yield;
    }
    this.stage.vars.Explode = [];
    this.costume = "YouTube";
    this.goto(159, 30);
    this.createClone();
    this.costumeNumber++;
    this.goto(-114, 25);
    this.createClone();
    this.costumeNumber++;
    this.y -= 40;
    this.createClone();
    this.costumeNumber++;
    this.y -= 40;
    this.createClone();
    this.costumeNumber++;
    this.y -= 50;
    this.createClone();
    this.costume = "Splash-1b";
    this.goto(0, 0);
    while (!(this.compare(this.stage.vars.Explode.length, 0) > 0)) {
      yield* this.wait(0);
      yield;
    }
    while (!!this.mouse.down) {
      yield;
    }
    if (this.keyPressed("c")) {
      this.stage.vars.Creative = 1;
    } else {
      this.stage.vars.Creative = 0;
    }
    if (
      this.toString(this.itemOf(this.stage.vars.Explode, 0)) ===
      "Spl1b-New Game"
    ) {
      this.stage.vars.Explode = [];
      this.costume = "Splash-2b";
      this.broadcast("world options");
      return;
    }
    if (
      this.toString(this.itemOf(this.stage.vars.Explode, 0)) ===
      "Spl1b-Load Game"
    ) {
      this.stage.vars.Explode = [];
      this.stage.vars.Survival = 0;
      this.broadcast("load game");
      return;
    }
    if (
      this.toString(this.itemOf(this.stage.vars.Explode, 0)) ===
      "Spl1b-Example Worlds"
    ) {
      this.stage.vars.Explode = [];
      this.stage.vars.Survival = 0;
      this.broadcast("load example");
      return;
    }
    if (
      this.toString(this.itemOf(this.stage.vars.Explode, 0)) === "Spl1b-Help"
    ) {
      this.stage.vars.Explode = [];
      this.costume = "Splash-2b";
      this.broadcast("help screen");
      while (!this.mouse.down) {
        yield;
      }
      this.stage.vars.X = this.mouse.x;
      this.stage.vars.Y = this.mouse.y;
      while (!!this.mouse.down) {
        yield;
      }
      this.broadcast("close help");
      this.costume = "Splash-1b";
      this.broadcast("splash1");
    }
  }

  *whenKeyLPressed() {
    if (this.toNumber(this.stage.vars.Forcedelay) === 0) {
      this.stage.vars.Forcedelay = 1;
      this.stage.vars.Speak = "Key Lag Delay On";
    } else {
      this.stage.vars.Forcedelay = 0;
      this.stage.vars.Speak = "Key Lag Delay Off";
    }
  }

  *whenKeyMPressed() {
    this.stage.vars.Sound = 1 - this.toNumber(this.stage.vars.Sound);
    if (this.toNumber(this.stage.vars.Sound) === 0) {
      this.stage.vars.Speak = "Sound Off";
    } else {
      this.stage.vars.Speak = "Sound On";
    }
  }

  *setup() {
    this.stage.vars.Inv = [];
    this.stage.vars.Invpos = [];
    for (let i = 0; i < 86; i++) {
      this.stage.vars.Inv.push("#");
      this.stage.vars.Inv.push(0);
    }
    for (let i = 0; i < 64; i++) {
      this.stage.vars.Invpos.push(0);
      this.stage.vars.Invpos.push(0);
      this.stage.vars.Invpos.push(0);
    }
  }

  *whenIReceiveStartAfterLoaded() {
    this.stage.vars.Timereal = this.stage.vars.Time;
    this.stage.vars.Lastsky = -1;
    this.costume = "Wait - Flowing";
    yield* this.broadcastAndWait("bring to life");
    this.costume = "Wait - Cloning";
    yield* this.wait(0.1);
    yield* this.broadcastAndWait("init1b");
    yield* this.wait(0.1);
    yield* this.broadcastAndWait("init2");
    yield* this.wait(0.1);
    yield* this.broadcastAndWait("init3");
    yield* this.wait(0.1);
    yield* this.broadcastAndWait("switch mode");
    yield* this.wait(0.1);
    this.costume = "backdrop1";
    this.visible = false;
    this.broadcast("go");
  }

  *whenIReceiveStartClicked() {
    this.costume = "Wait - World";
    this.stage.vars.Time = 6 * 50;
    this.stage.vars.Timereal = this.stage.vars.Time;
    this.stage.vars.Lastsky = -1;
    yield* this.broadcastAndWait("init");
    yield* this.wait(0.1);
    yield* this.broadcastAndWait("init1a");
    this.moveAhead();
    yield* this.wait(0.1);
    this.costume = "Wait - Flowing";
    this.moveAhead();
    yield* this.broadcastAndWait("bring to life");
    this.costume = "Wait - Cloning";
    this.moveAhead();
    yield* this.wait(1.0000000002328306);
    this.moveAhead();
    yield* this.broadcastAndWait("init1b");
    this.moveAhead();
    yield* this.wait(0.1);
    yield* this.broadcastAndWait("init2");
    this.moveAhead();
    yield* this.wait(0.1);
    this.costume = "Wait - Here we go";
    yield* this.broadcastAndWait("init3");
    this.moveAhead();
    yield* this.wait(0.1);
    yield* this.broadcastAndWait("switch mode");
    this.moveAhead();
    yield* this.wait(0.1);
    this.stage.vars.Ticks = 1;
    this.stage.vars.throttle = 999;
    yield* this.broadcastAndWait("animate");
    this.broadcast("go");
    this.moveAhead();
    yield* this.wait(0.3);
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 8;
      yield;
    }
    this.visible = false;
    this.effects.clear();
    this.costume = "backdrop1";
  }

  *whenIReceiveChangeBackground() {
    this.costume = this.stage.vars.Background;
    if (this.costumeNumber === 1) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.costume = "Splash-1b";
    this.visible = true;
    yield* this.broadcastAndWait("green flag");
    this.moveBehind(10000);
    this.stage.vars.debug = [];
    this.stage.watchers.fps.visible = false;
    this.stage.watchers.Forcedelay.visible = false;
    this.stage.vars.Refsize = 6;
    this.stage.vars.Dmul = 21;
    this.stage.vars.Glight = 0;
    this.stage.vars.Mode = "";
    this.stage.vars.Nextselid = 1;
    this.stage.vars.Spritecount = 0;
    this.stage.vars.Forcedelay = 0;
    this.stage.vars.Heldc = 0;
    this.stage.vars.Heldinvid = 0;
    this.stage.vars.Lighting = 1;
    this.stage.vars.Locked = "";
    this.stage.vars.Maxharvest = 10;
    if (/* no username */ "" === "griffpatch") {
      this.stage.vars.Sound = 1;
      this.stage.vars.Keydelaytrick = 0;
    }
    this.effects.clear();
    yield* this.setup();
    this.broadcast("splash1");
  }

  *whenIReceivePaused() {
    this.costume = "Pause";
    this.effects.ghost = 100;
    this.visible = true;
    this.moveAhead();
    for (let i = 0; i < 10; i++) {
      this.effects.ghost -= 8;
      yield;
    }
    while (!!this.keyPressed("p")) {
      yield;
    }
    while (!this.keyPressed("p")) {
      yield;
    }
    while (!!this.keyPressed("p")) {
      yield;
    }
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 8;
      yield;
    }
    this.visible = false;
    this.effects.clear();
    this.costume = "backdrop1";
  }

  *startAsClone() {
    this.size = 70;
    this.moveAhead(5);
    while (true) {
      if (this.touching("mouse")) {
        this.size += (105 - this.size) * 0.2;
        if (this.costume.name === "YouTube") {
          this.say("Hey I'm GRIFFPATCH - Find me on YouTube :D");
        } else {
          if (this.mouse.down) {
            this.stage.vars.Explode.push(this.costume.name);
            this.broadcast("menu - close");
          }
        }
      } else {
        this.size += (100 - this.size) * 0.2;
        this.say("");
      }
      this.effects.brightness = (this.size - 100) * 2;
      yield;
    }
  }

  *whenIReceiveMenuClose() {
    this.deleteThisClone();
  }
}
