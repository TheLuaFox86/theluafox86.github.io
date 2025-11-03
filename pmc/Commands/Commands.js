/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Commands extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("dot", "./Commands/costumes/dot.png", { x: 0, y: 0 }),
      new Costume("commands", "./Commands/costumes/commands.svg", {
        x: 226,
        y: 165,
      }),
    ];

    this.sounds = [new Sound("meow", "./Commands/sounds/meow.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Talk" }, this.whenIReceiveTalk),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.newtime = 1300;
    this.vars.i = 6;
    this.vars.token = "s";
    this.vars.break = 1;
  }

  *readToken() {
    this.vars.token = "";
    while (
      !(
        this.compare(this.vars.i, this.answer.length) > 0 ||
        !(this.toNumber(this.letterOf(this.answer, this.vars.i - 1)) === 0)
      )
    ) {
      this.vars.i++;
      yield;
    }
    while (
      !(
        this.compare(this.vars.i, this.answer.length) > 0 ||
        this.toNumber(this.letterOf(this.answer, this.vars.i - 1)) === 0
      )
    ) {
      this.vars.token =
        this.toString(this.vars.token) +
        this.letterOf(this.answer, this.vars.i - 1);
      this.vars.i++;
      yield;
    }
  }

  *doGameMode() {
    yield* this.readToken();
    if (this.toNumber(this.vars.token) === 0) {
      this.stage.vars.Speak = "";
    } else {
      if (
        !(
          this.toNumber(this.stage.vars.Locked) === 0 ||
          this.compare(this.stage.vars.Locked, /* no username */ "") === 0
        )
      ) {
        this.stage.vars.Speak = "This Map is Locked to ";
      } else {
        if (
          this.toNumber(this.vars.token) === 2 ||
          this.toString(this.vars.token) === "a" ||
          this.toString(this.vars.token) === "adventure"
        ) {
          this.stage.vars.Creative = -1;
          this.stage.vars.Survival = 1;
        } else {
          if (
            this.toNumber(this.vars.token) === 1 ||
            this.toString(this.vars.token) === "c" ||
            this.toString(this.vars.token) === "creative"
          ) {
            this.stage.vars.Creative = 1;
            this.stage.vars.Survival = 1;
          } else {
            if (
              this.toNumber(this.vars.token) === 0 ||
              this.toString(this.vars.token) === "s" ||
              this.toString(this.vars.token) === "survival"
            ) {
              this.stage.vars.Creative = 0;
              this.stage.vars.Survival = 1;
            } else {
              if (
                this.toNumber(this.vars.token) === 4 ||
                this.toString(this.vars.token) === "p" ||
                this.toString(this.vars.token) === "peaceful"
              ) {
                this.stage.vars.Creative = 0;
                this.stage.vars.Survival = 0;
              } else {
                this.stage.vars.Speak =
                  "Sorry, Unknown Game Mode: " + this.toString(this.vars.token);
                return;
              }
            }
          }
        }
      }
    }
    if (this.toNumber(this.stage.vars.Creative) === 1) {
      this.stage.vars.Speak =
        this.toString(this.stage.vars.Speak) + "Creative Mode";
    } else {
      if (this.toNumber(this.stage.vars.Creative) === -1) {
        this.stage.vars.Speak =
          this.toString(this.stage.vars.Speak) + "Adventure Mode";
      } else {
        if (this.toNumber(this.stage.vars.Survival) === 1) {
          this.stage.vars.Speak =
            this.toString(this.stage.vars.Speak) + "Survival Mode";
        } else {
          this.stage.vars.Speak =
            this.toString(this.stage.vars.Speak) + "Peaceful Mode";
        }
      }
    }
    this.broadcast("Game Mode Changed");
    return;
  }

  *doTimeCommand() {
    yield* this.readToken();
    if (this.toNumber(this.vars.token) === 0) {
      this.stage.vars.Speak = "Current Time is ";
    } else {
      if (!(this.toString(this.vars.token) === "set")) {
        this.stage.vars.Speak =
          "Unknown Time commnad: " + this.toString(this.vars.token);
        return;
      }
      if (!(this.toNumber(this.stage.vars.Locked) === 0)) {
        this.stage.vars.Speak = 'Map is locked (type "/lock 0" to unlock)';
        return;
      }
      this.stage.vars.Speak = "Time changed to ";
      yield* this.readToken();
      if (
        this.toString(this.vars.token) === "day" ||
        this.toString(this.vars.token) === "d"
      ) {
        this.vars.token = 0;
      } else {
        if (
          this.toString(this.vars.token) === "night" ||
          this.toString(this.vars.token) === "n"
        ) {
          this.vars.token = 12500;
        } else {
          if (
            !(this.toNumber(this.vars.token) === 0) &&
            this.toNumber(this.vars.token) + 0 === 0
          ) {
            this.stage.vars.Speak =
              "Unrecognised Time: " + this.toString(this.vars.token);
            return;
          }
        }
      }
      this.vars.token = this.toNumber(this.vars.token) / 1000;
      this.vars.newtime =
        Math.floor(this.toNumber(this.stage.vars.Timereal) / 1200) * 1200;
      this.vars.newtime += (300 + this.toNumber(this.vars.token) * 50) % 1200;
      if (this.compare(this.vars.newtime, this.stage.vars.Time) < 0) {
        this.vars.newtime += 1200;
      }
      this.stage.vars.Time = this.vars.newtime;
    }
    this.vars.token = (this.toNumber(this.stage.vars.Time) - 300) / 50;
    this.vars.token = Math.round(
      (this.toNumber(this.vars.token) * 1000) % 24000
    );
    this.stage.vars.Speak =
      this.toString(this.stage.vars.Speak) + this.toString(this.vars.token);
    return;
  }

  *clearInventory() {
    this.vars.token = 1;
    for (let i = 0; i < 40; i++) {
      this.stage.vars.Inv.splice(this.vars.token - 1, 1, "#");
      this.vars.token++;
      this.stage.vars.Inv.splice(this.vars.token - 1, 1, 0);
      this.vars.token++;
      yield;
    }
    this.stage.vars.Nextselid = this.stage.vars.Heldinvid;
    this.broadcast("Update Inventory");
    this.stage.vars.Speak = "Inventory Cleared";
  }

  *setSpawn() {
    if (!(this.toNumber(this.stage.vars.Locked) === 0)) {
      this.stage.vars.Speak = 'Map is locked (type "/lock 0" to unlock)';
      return;
    }
    this.stage.vars.Respawnidx =
      Math.floor(this.toNumber(this.stage.vars.X)) +
      Math.floor(this.toNumber(this.stage.vars.Y)) *
        this.toNumber(this.stage.vars.Lsx) +
      1;
    this.stage.vars.Respawnseed = this.stage.vars.ChunkSeed;
    this.stage.vars.Speak = "Spawn Position has been set";
  }

  *killAll() {
    if (!(this.toNumber(this.stage.vars.Locked) === 0)) {
      this.stage.vars.Speak = 'Map is locked (type "/lock 0" to unlock)';
      return;
    }
    this.vars.token = 1;
    while (!(this.compare(this.vars.token, this.stage.vars.Mob.length) > 0)) {
      this.stage.vars.Mob.splice(this.toNumber(this.vars.token) + 8, 1, 1000);
      this.stage.vars.Mob.splice(this.toNumber(this.vars.token) + 9, 1, 1);
      this.stage.vars.Mob.splice(this.toNumber(this.vars.token) + 11, 1, 0);
      this.vars.token += this.toNumber(this.stage.vars.Mobmul);
      yield;
    }
    this.stage.vars.Speak = "Killing All Mobs...";
  }

  *whenIReceiveTalk() {
    this.vars.break = 0;
    this.costume = "commands";
    this.visible = true;
    this.moveAhead();
    while (!(this.compare(this.vars.break, 0) > 0)) {
      yield* this.askAndWait("");
      if (this.answer === "/?" || this.answer === "/help") {
        null;
      } else {
        this.vars.break = 1;
      }
      yield;
    }
    this.costume = "dot";
    this.visible = false;
    if (!(this.letterOf(this.answer, 0) === "/")) {
      this.stage.vars.Speak = this.answer;
      return;
    }
    this.vars.i = 1;
    yield* this.readToken();
    if (
      this.toString(this.vars.token) === "/gamemode" ||
      this.toString(this.vars.token) === "/gm"
    ) {
      yield* this.doGameMode();
      return;
    }
    if (this.toString(this.vars.token) === "/time") {
      yield* this.doTimeCommand();
      return;
    }
    if (this.toString(this.vars.token) === "/kill") {
      this.stage.vars.HealthS = -9999;
      this.broadcast("Update Health");
      return;
    }
    if (this.toString(this.vars.token) === "/delay") {
      yield* this.readToken();
      if (
        this.toNumber(this.vars.token) === 0 ||
        this.toNumber(this.vars.token) === 1 ||
        this.toNumber(this.vars.token) === 2
      ) {
        this.stage.vars.Forcedelay = this.vars.token;
        this.stage.watchers.Forcedelay.visible = true;
        this.stage.watchers.fps.visible = true;
        this.stage.vars.Speak =
          "Forced Delay set to " + this.toString(this.stage.vars.Forcedelay);
      } else {
        if (this.toNumber(this.vars.token) === 0) {
          this.stage.vars.Speak =
            "Forced Delay set to " + this.toString(this.stage.vars.Forcedelay);
        } else {
          this.stage.vars.Speak = "Unsupported Force Delay Mode";
        }
      }
      return;
    }
    if (this.toString(this.vars.token) === "/lighting") {
      yield* this.readToken();
      if (
        this.toNumber(this.vars.token) === 0 ||
        this.toNumber(this.vars.token) === 1
      ) {
        this.stage.vars.Lighting = this.vars.token;
        this.stage.vars.Speak =
          "Lighting Mode " + this.toString(this.vars.token);
        this.broadcast("Lighting Mode Change");
        return;
      } else {
        this.stage.vars.Speak = "Unsupported Lighting Mode";
      }
      return;
    }
    if (this.toString(this.vars.token) === "/xray") {
      if (!(this.toNumber(this.stage.vars.Locked) === 0)) {
        this.stage.vars.Speak = 'Map is locked (type "/lock 0" to unlock)';
        return;
      }
      yield* this.readToken();
      if (
        this.toNumber(this.vars.token) === 0 ||
        this.toNumber(this.vars.token) === 1
      ) {
        this.stage.vars.Xray = this.vars.token;
      } else {
        if (this.toNumber(this.vars.token) === 0) {
          this.stage.vars.Xray = 1 - this.toNumber(this.stage.vars.Xray);
        } else {
          this.stage.vars.Speak = "Unsupported XRay Mode";
          return;
        }
      }
      this.stage.vars.Speak =
        "XRay Mode set to " + this.toString(this.stage.vars.Xray);
      this.broadcast("Lighting Mode Change");
      return;
    }
    if (this.toString(this.vars.token) === "/debug") {
      this.broadcast("Toggle Debug");
      return;
    }
    if (this.toString(this.vars.token) === "/setspawn") {
      yield* this.setSpawn();
      return;
    }
    if (this.toString(this.vars.token) === "/clear") {
      yield* this.clearInventory();
      return;
    }
    if (this.toString(this.vars.token) === "/killall") {
      yield* this.killAll();
      return;
    }
    if (this.toString(this.vars.token) === "/lock") {
      yield* this.readToken();
      if (this.toNumber(this.vars.token) === 0) {
        if (this.toNumber(this.stage.vars.Locked) === 0) {
          this.stage.vars.Speak = "This map is not locked";
        } else {
          this.stage.vars.Speak =
            "Map locked by " + this.toString(this.stage.vars.Locked);
        }
        return;
      }
      if (this.toNumber(this.vars.token) === 0) {
        this.stage.vars.Locked = "";
        this.stage.vars.Speak = "Map successfully unlocked";
        return;
      }
      if (this.toNumber(this.vars.token) === 1) {
        this.stage.vars.Locked = /* no username */ "";
        this.stage.vars.Speak = "Map successfully locked";
        return;
      }
    }
    if (this.toString(this.vars.token) === "/sound") {
      yield* this.readToken();
      if (
        this.toNumber(this.vars.token) === 1 ||
        this.toNumber(this.vars.token) === 0
      ) {
        this.stage.vars.Sound = this.vars.token;
      } else {
        if (!(this.toNumber(this.vars.token) === 0)) {
          this.stage.vars.Speak = "Only Sound 0 or 1 are supported";
          return;
        }
      }
      if (this.toNumber(this.stage.vars.Sound) === 0) {
        this.stage.vars.Speak = "Sound Off";
      } else {
        this.stage.vars.Speak = "Sound On";
      }
      return;
    }
    if (
      this.toString(this.vars.token) === "/keylag" ||
      this.toString(this.vars.token) === "/kl"
    ) {
      yield* this.readToken();
      if (
        this.toNumber(this.vars.token) === 1 ||
        this.toNumber(this.vars.token) === 0
      ) {
        this.stage.vars.Keydelaytrick = this.vars.token;
      } else {
        if (!(this.toNumber(this.vars.token) === 0)) {
          this.stage.vars.Speak = "Only Key Lag 0 or 1 are supported";
          return;
        }
      }
      if (this.toNumber(this.stage.vars.Keydelaytrick) === 0) {
        this.stage.vars.Speak = "Key Lag Trick Off";
      } else {
        this.stage.vars.Speak = "Key Lag Trick On";
      }
      return;
    }
    if (this.toString(this.vars.token) === "/skin") {
      this.stage.vars.Skin = 1 - this.toNumber(this.stage.vars.Skin);
      return;
    }
    if (this.toString(this.vars.token) === "/weather") {
      yield* this.readToken();
      if (this.toString(this.vars.token) === "snow") {
        this.broadcast("snow");
      } else {
        if (this.toString(this.vars.token) === "blizzard") {
          this.broadcast("blizard");
        } else {
          if (this.toString(this.vars.token) === "rain") {
            this.broadcast("rain");
          } else {
            if (this.toString(this.vars.token) === "clear") {
              this.broadcast("clear weather");
            } else {
              this.broadcast("clear weather");
              this.stage.vars.Speak = "Unknown weather command";
            }
          }
        }
      }
      return;
    }
    this.stage.vars.Speak = "Unknown command: " + this.answer;
  }

  *whenIReceiveGreenFlag() {
    this.goto(0, 0);
    this.costume = "dot";
    this.visible = false;
    this.stage.vars.Speak = "";
    this.stage.vars.Xray = 0;
  }
}
