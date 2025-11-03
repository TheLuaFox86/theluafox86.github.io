/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Steve extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Body4", "./Steve/costumes/Body4.png", { x: 4, y: 17 }),
      new Costume("Sleep", "./Steve/costumes/Sleep.png", { x: 33, y: 8 }),
      new Costume("Body2", "./Steve/costumes/Body2.png", { x: 4, y: 17 }),
      new Costume("Sleep2", "./Steve/costumes/Sleep2.png", { x: 33, y: 8 }),
      new Costume("Body_cp_2", "./Steve/costumes/Body_cp_2.png", {
        x: 5,
        y: 18,
      }),
      new Costume("Body_cp_3", "./Steve/costumes/Body_cp_3.png", {
        x: 5,
        y: 18,
      }),
      new Costume("Body_cp_4", "./Steve/costumes/Body_cp_4.png", {
        x: 5,
        y: 18,
      }),
    ];

    this.sounds = [
      new Sound("grass1", "./Steve/sounds/grass1.wav"),
      new Sound("grass2", "./Steve/sounds/grass2.wav"),
      new Sound("grass3", "./Steve/sounds/grass3.wav"),
      new Sound("grass4", "./Steve/sounds/grass4.wav"),
      new Sound("gravel1", "./Steve/sounds/gravel1.wav"),
      new Sound("gravel2", "./Steve/sounds/gravel2.wav"),
      new Sound("gravel3", "./Steve/sounds/gravel3.wav"),
      new Sound("gravel4", "./Steve/sounds/gravel4.wav"),
      new Sound("sand1", "./Steve/sounds/sand1.wav"),
      new Sound("sand2", "./Steve/sounds/sand2.wav"),
      new Sound("sand3", "./Steve/sounds/sand3.wav"),
      new Sound("sand4", "./Steve/sounds/sand4.wav"),
      new Sound("stone1", "./Steve/sounds/stone1.wav"),
      new Sound("stone2", "./Steve/sounds/stone2.wav"),
      new Sound("stone3", "./Steve/sounds/stone3.wav"),
      new Sound("stone4", "./Steve/sounds/stone4.wav"),
      new Sound("wood1", "./Steve/sounds/wood1.wav"),
      new Sound("wood2", "./Steve/sounds/wood2.wav"),
      new Sound("wood3", "./Steve/sounds/wood3.wav"),
      new Sound("wood4", "./Steve/sounds/wood4.wav"),
    ];

    this.triggers = [
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "space" },
        this.whenKeySpacePressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "up arrow" },
        this.whenKeyUpArrowPressed
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "w" }, this.whenKeyWPressed),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Lighting Mode Change" },
        this.whenIReceiveLightingModeChange
      ),
      new Trigger(Trigger.BROADCAST, { name: "Sleep" }, this.whenIReceiveSleep),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Dig Sound" },
        this.whenIReceivePlayDigSound
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Mode Changed" },
        this.whenIReceiveGameModeChanged
      ),
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
        { name: "init1b" },
        this.whenIReceiveInit1b2
      ),
      new Trigger(Trigger.BROADCAST, { name: "go" }, this.whenIReceiveGo),
      new Trigger(Trigger.BROADCAST, { name: "init3" }, this.whenIReceiveInit3),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.audioEffects.volume = 20;

    this.vars.custumewalk = 1;
    this.vars.tileS = 1;
    this.vars.isblockS = 1;
    this.vars.walkframe = 8;
    this.vars.dirS = -1;
    this.vars.dojump = 286.41900000000004;
    this.vars.onfloor = 294.888;
    this.vars.refitS = 0;
    this.vars.stevenextwalkframe = 4;
    this.vars.iS = 12295;
    this.vars.light = 0;
    this.vars.inwater = "N";
    this.vars.onwall = 282.712;
    this.vars.onladder = 0;
    this.vars.fallheightS = 61.85;
    this.vars.tS = "N";
    this.vars.healthregen = 105;
    this.vars.inlava = 0;
    this.vars.stuckS = 0;
    this.vars.waterheight = 0;
    this.vars.isflymode = 0;
    this.vars.jumpheld = 99999999;
    this.vars.lastjumppress = 38.644;
    this.vars.lx = 94.75000000000014;
    this.vars.ly = 61.85;
    this.vars.sIbt = "P";
    this.vars.refidxIv = 13;
    this.vars.tact = 22;
    this.vars.isblockY = 0;
    this.vars.lastwalkstep = 9;
    this.vars.portaltime = 0;
    this.vars.refidxT = ".";
    this.vars.Sx = 0;
    this.vars.Sy = 0;
    this.vars.Airlevel = 22;
  }

  *gettileS(x, y) {
    this.vars.iS =
      Math.floor(this.toNumber(y)) * this.toNumber(this.stage.vars.Lsx) +
      Math.floor(this.toNumber(x)) +
      1;
    this.vars.tileS = this.itemOf(this.stage.vars.Level, this.vars.iS - 1);
  }

  *addSign(x, y, text) {
    this.vars.dirS = y;
    yield* this.gettileS(x, this.vars.dirS);
    yield* this.isblockS(this.vars.tileS, 0);
    while (!(this.compare(this.vars.isblockS, 0) > 0)) {
      this.vars.dirS--;
      yield* this.gettileS(x, this.vars.dirS);
      yield* this.isblockS(this.vars.tileS, 0);
      yield;
    }
    while (!(this.toNumber(this.vars.isblockS) === 0)) {
      this.vars.dirS++;
      yield* this.gettileS(x, this.vars.dirS);
      yield* this.isblockS(this.vars.tileS, 0);
      yield;
    }
    this.stage.vars.Level.splice(this.vars.iS - 1, 1, 117);
    this.stage.vars.Inside.push(this.vars.iS);
    this.stage.vars.Inside.push(0);
    this.stage.vars.Inside.push(text);
  }

  *pointtowardsmouseS(prevdir) {
    if (this.compare(this.mouse.x, this.x) < 0) {
      this.vars.dirS = -1;
    } else {
      this.vars.dirS = 1;
    }
    if (!(this.compare(this.vars.dirS, prevdir) === 0)) {
      this.direction = this.toNumber(this.vars.dirS) * 90;
    }
  }

  *deathTickS() {
    if (this.compare(this.stage.vars.HealthS, -10060) < 0) {
      yield* this.respawn(!null);
    } else {
      this.visible = false;
    }
  }

  *whenKeySpacePressed() {
    yield* this.jumpPressed();
  }

  *whenKeyUpArrowPressed() {
    yield* this.jumpPressed();
  }

  *jumpPressed() {
    if (this.toNumber(this.stage.vars.Mode) === 0) {
      if (
        this.compare(this.stage.vars.Creative, 0) > 0 &&
        this.compare(this.vars.jumpheld, this.timer) > 0
      ) {
        if (this.compare(this.vars.lastjumppress, this.timer) > 0) {
          this.vars.jumpheld = -10;
          this.vars.isflymode = 1 - this.toNumber(this.vars.isflymode);
        }
        this.vars.lastjumppress = this.timer + 0.3;
      }
      this.vars.dojump = this.timer + 0.05;
    }
  }

  *isblockS(typ, or) {
    this.vars.sIbt = this.itemOf(
      this.vars.undefined,
      this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 2
    );
    if (this.toString(this.vars.sIbt) === "Y") {
      this.vars.isblockS = 10;
    } else {
      if (this.toString(this.vars.sIbt) === "P") {
        if (!or || this.toNumber(this.vars.isblockS) === 0) {
          this.vars.isblockS = 1;
        }
      } else {
        if (!or) {
          this.vars.isblockS = 0;
        }
      }
    }
  }

  *respawn(reposition) {
    this.vars.Sx = 0;
    this.vars.Sy = 0;
    this.vars.dirS = 1;
    this.vars.dojump = 0;
    this.vars.onladder = 0;
    this.vars.onwall = 0;
    this.vars.onfloor = 0;
    this.vars.fallheightS = 0;
    this.vars.Airlevel = 22;
    this.vars.healthregen = 0;
    this.vars.inlava = 0;
    this.stage.vars.Knockback = 0;
    this.vars.isflymode = 0;
    this.vars.lastjumppress = 0;
    this.vars.jumpheld = 0;
    if (reposition) {
      this.stage.vars.HealthS = 20;
      this.stage.vars.Hunger = 20;
      this.stage.vars.Foodsaturation = 80;
      this.stage.vars.X =
        0.5 +
        ((this.toNumber(this.stage.vars.Respawnidx) - 1) %
          this.toNumber(this.stage.vars.Lsx));
      this.stage.vars.Y =
        0.85 +
        (this.toNumber(this.stage.vars.Respawnidx) - 1) /
          this.toNumber(this.stage.vars.Lsx);
      if (
        this.compare(this.stage.vars.Respawnseed, 0) > 0 &&
        !(
          this.compare(
            this.stage.vars.Respawnseed,
            this.stage.vars.ChunkSeed
          ) === 0
        )
      ) {
        yield* this.broadcastAndWait("Save Chunk");
        this.stage.vars.ChunkSeed = this.stage.vars.Respawnseed;
        yield* this.broadcastAndWait("Load Chunk");
      }
    }
    this.vars.lx = this.stage.vars.X;
    this.vars.ly = this.stage.vars.Y;
    this.stage.vars.Y =
      0.85 +
      (this.toNumber(this.stage.vars.Respawnidx) - 1) /
        this.toNumber(this.stage.vars.Lsx);
    this.broadcast("Update Health");
  }

  *whenKeyWPressed() {
    yield* this.jumpPressed();
  }

  *positionshowexactS(x, y) {
    this.goto(this.toNumber(x), this.toNumber(y));
    if (this.compare(x, this.x) === 0 && this.compare(y, this.y) === 0) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *positionshowS(x, y) {
    yield* this.positionshowexactS(
      Math.floor((this.toNumber(x) - this.toNumber(this.stage.vars.Scrx)) * 40),
      Math.floor((this.toNumber(y) - this.toNumber(this.stage.vars.Scry)) * 40)
    );
  }

  *setcostumeS(costume) {
    if (!(this.compare(this.costumeNumber, costume) === 0)) {
      this.costume = costume;
    }
    if (
      !(this.compare(this.stage.vars.Stevelight, this.vars.light) === 0) &&
      this.toNumber(this.stage.vars.Lighting) === 1
    ) {
      this.vars.light = this.stage.vars.Stevelight;
      this.effects.brightness = this.toNumber(
        this.itemOf(this.stage.vars.Gamma, this.toNumber(this.vars.light))
      );
    }
  }

  *checkkeys() {
    if (this.toNumber(this.stage.vars.Mode) === 0) {
      if (this.keyPressed("a") || this.keyPressed("left arrow")) {
        yield* this.setWalk(-1);
      } else {
        if (this.keyPressed("d") || this.keyPressed("right arrow")) {
          yield* this.setWalk(1);
        } else {
          this.vars.Sx = 0;
          this.vars.walkframe = 8;
          this.vars.lastwalkstep = 9;
        }
      }
      if (this.compare(this.vars.jumpheld, 0) < 0) {
        this.vars.jumpheld++;
      } else {
        if (
          this.keyPressed("w") ||
          this.keyPressed("space") ||
          this.keyPressed("up arrow")
        ) {
          this.vars.dojump = this.timer + 0.05;
          if (this.toNumber(this.vars.jumpheld) === 99999999) {
            this.vars.jumpheld = this.timer + 0.3;
          }
          this.stage.vars.keydelay = 1;
        } else {
          this.vars.jumpheld = 99999999;
        }
      }
    } else {
      this.vars.Sx = 0;
      this.vars.walkframe = 8;
      this.vars.lastwalkstep = 9;
    }
    if (
      this.compare(this.vars.waterheight, 4) > 0 ||
      this.compare(this.vars.onladder, 0) > 0 ||
      this.compare(this.vars.isflymode, 0) > 0
    ) {
      this.vars.fallheightS = this.vars.ly;
      if (
        this.toNumber(this.stage.vars.Mode) === 0 &&
        this.compare(this.vars.dojump, this.timer) > 0
      ) {
        this.vars.Sy = 0.15;
        if (
          this.compare(this.vars.onwall, this.timer) > 0 ||
          this.compare(this.vars.onfloor, this.timer) > 0
        ) {
          this.vars.Sy = 0.4;
        }
        this.vars.dojump = 0;
        this.stage.vars.Foodsaturation -= 0.004;
      } else {
        if (
          this.toNumber(this.stage.vars.Mode) === 0 &&
          (this.keyPressed("s") || this.keyPressed("down arrow"))
        ) {
          this.vars.Sy = -0.15;
          this.stage.vars.keydelay = 1;
          this.stage.vars.Foodsaturation -= 0.002;
        } else {
          if (
            this.compare(this.vars.onladder, 0) > 0 ||
            this.compare(this.vars.isflymode, 0) > 0
          ) {
            this.vars.Sy = 0;
          }
        }
      }
    } else {
      if (
        this.compare(this.vars.dojump, this.timer) > 0 &&
        this.compare(this.vars.onfloor, this.timer) > 0
      ) {
        this.vars.dojump = 0;
        this.vars.onfloor = 0;
        this.vars.Sy = 0.42;
        this.stage.vars.Foodsaturation -= 0.2;
      }
    }
  }

  *doSwitchTileidxTileid(tileidx, tileid) {
    yield* this.activateTileIv(tileidx, "r", 0, 0);
  }

  *getAvailableRefIndexIv() {
    if (this.stage.vars.Refpool.length === 0) {
      this.vars.refidxIv = this.stage.vars.Refdata.length + 1;
      for (let i = 0; i < this.toNumber(this.stage.vars.Refsize); i++) {
        this.stage.vars.Refdata.push("");
        yield;
      }
    } else {
      this.vars.refidxIv = this.itemOf(this.stage.vars.Refpool, 0);
      this.stage.vars.Refpool.splice(0, 1);
    }
  }

  *activateTileIv(idx, mode, force, data) {
    this.vars.refidxIv = this.itemOf(this.stage.vars.Levelref, idx - 1);
    if (this.toString(mode) === "r") {
      this.vars.tact = this.itemOf(this.stage.vars.Level, idx - 1);
      this.vars.tact = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.tact) * this.toNumber(this.stage.vars.Dmul) + 9
      );
      if (!(this.toNumber(this.vars.tact) === 22)) {
        return;
      }
    }
    if (force || 0 === this.toNumber(this.vars.refidxIv)) {
      if (0 === this.toNumber(this.vars.refidxIv)) {
        yield* this.getAvailableRefIndexIv();
        this.stage.vars.Levelref.splice(idx - 1, 1, this.vars.refidxIv);
        this.stage.vars.Refdata.splice(
          this.toNumber(this.vars.refidxIv) + -1,
          1,
          idx
        );
      } else {
        null;
      }
      this.stage.vars.Refdata.splice(
        this.toNumber(this.vars.refidxIv),
        1,
        mode
      );
      this.stage.vars.Refdata.splice(
        this.toNumber(this.vars.refidxIv) + 1,
        1,
        data
      );
    }
  }

  *checkHalfTileAt(px, py) {
    this.vars.iS =
      Math.floor(this.toNumber(py)) * this.toNumber(this.stage.vars.Lsx) +
      Math.floor(this.toNumber(px)) +
      1;
    this.vars.tileS = this.itemOf(this.stage.vars.Level, this.vars.iS - 1);
    this.vars.sIbt = this.itemOf(
      this.vars.undefined,
      this.toNumber(this.vars.tileS) * this.toNumber(this.stage.vars.Dmul) + 2
    );
    if (this.toString(this.vars.sIbt) === "Y") {
      this.vars.sIbt = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.tileS) * this.toNumber(this.stage.vars.Dmul) + 9
      );
      if (
        this.toNumber(this.vars.sIbt) === 30 ||
        this.toNumber(this.vars.sIbt) === 31
      ) {
        if (
          (this.toNumber(this.vars.sIbt) === 30 &&
            this.compare(this.toNumber(px) % 1, 0.5) < 0) ||
          (this.toNumber(this.vars.sIbt) === 31 &&
            !(this.compare(this.toNumber(px) % 1, 0.5) < 0))
        ) {
          this.vars.isblockY = 0.5;
          if (this.compare(this.toNumber(py) % 1, 0.5) < 0) {
            this.vars.isblockS = 10;
          } else {
            this.vars.isblockS = 0;
          }
        } else {
          this.vars.isblockS = 10;
          this.vars.isblockY = 1;
        }
      } else {
        this.vars.isblockS = 10;
        this.vars.isblockY = 1;
      }
    } else {
      this.vars.isblockY = 0;
      if (this.toString(this.vars.sIbt) === "P") {
        this.vars.isblockS = 1;
      } else {
        this.vars.isblockS = 0;
      }
    }
  }

  *addBonusChest(x, y) {
    this.vars.dirS = y;
    yield* this.gettileS(x, this.vars.dirS);
    yield* this.isblockS(this.vars.tileS, 0);
    while (!(this.compare(this.vars.isblockS, 0) > 0)) {
      this.vars.dirS--;
      yield* this.gettileS(x, this.vars.dirS);
      yield* this.isblockS(this.vars.tileS, 0);
      yield;
    }
    while (!(this.toNumber(this.vars.isblockS) === 0)) {
      this.vars.dirS++;
      yield* this.gettileS(x, this.vars.dirS);
      yield* this.isblockS(this.vars.tileS, 0);
      yield;
    }
    this.stage.vars.Level.splice(this.vars.iS - 1, 1, 12);
    this.stage.vars.Inside.push(this.vars.iS);
    this.stage.vars.Inside.push(27);
    this.stage.vars.Inside.push("Bonus Chest 'Press E to open'");
    this.stage.vars.Inside.push(88);
    this.stage.vars.Inside.push(251);
    this.stage.vars.Inside.push(87);
    this.stage.vars.Inside.push(251);
    this.stage.vars.Inside.push(93);
    this.stage.vars.Inside.push(251);
    this.stage.vars.Inside.push(107);
    this.stage.vars.Inside.push(251);
    this.stage.vars.Inside.push(130);
    this.stage.vars.Inside.push(251);
    this.stage.vars.Inside.push(131);
    this.stage.vars.Inside.push(64);
    this.stage.vars.Inside.push(110);
    this.stage.vars.Inside.push(30);
    this.stage.vars.Inside.push(20);
    this.stage.vars.Inside.push(32);
    this.stage.vars.Inside.push(18);
    this.stage.vars.Inside.push(8);
    this.stage.vars.Inside.push(90);
    this.stage.vars.Inside.push(2);
    this.stage.vars.Inside.push(59);
    this.stage.vars.Inside.push(2);
    this.stage.vars.Inside.push(95);
    this.stage.vars.Inside.push(1);
    this.stage.vars.Inside.push(82);
    this.stage.vars.Inside.push(1);
    this.stage.vars.Inside.push(42);
    this.stage.vars.Inside.push(4);
    this.stage.vars.Inside.push(43);
    this.stage.vars.Inside.push(4);
    this.stage.vars.Inside.push(44);
    this.stage.vars.Inside.push(4);
    this.stage.vars.Inside.push(45);
    this.stage.vars.Inside.push(4);
    this.stage.vars.Inside.push(46);
    this.stage.vars.Inside.push(4);
    this.stage.vars.Inside.push(54);
    this.stage.vars.Inside.push(4);
    this.stage.vars.Inside.push(96);
    this.stage.vars.Inside.push(2);
    this.stage.vars.Inside.push(52);
    this.stage.vars.Inside.push(8);
    this.stage.vars.Inside.push(111);
    this.stage.vars.Inside.push(1);
    this.stage.vars.Inside.push(55);
    this.stage.vars.Inside.push(16);
    this.stage.vars.Inside.push("#");
    this.stage.vars.Inside.push(0);
    this.stage.vars.Inside.push("#");
    this.stage.vars.Inside.push(0);
    this.stage.vars.Inside.push("#");
    this.stage.vars.Inside.push(0);
    this.stage.vars.Inside.push("#");
    this.stage.vars.Inside.push(0);
  }

  *whenIReceiveLightingModeChange() {
    if (this.toNumber(this.stage.vars.Lighting) === 1) {
      this.vars.light = -1;
    } else {
      this.effects.brightness = 0;
    }
  }

  *stevetick() {
    this.vars.lx = this.stage.vars.X;
    this.vars.ly = this.stage.vars.Y;
    if (this.toString(this.stage.vars.Mode) === "S") {
      this.direction = 90;
      yield* this.positionshowS(this.stage.vars.X, this.stage.vars.Y);
      yield* this.setcostumeS(2 + this.toNumber(this.stage.vars.Skin) * 2);
    } else {
      this.vars.iS = this.itemOf(this.stage.vars.Inv, 74);
      if (this.toString(this.vars.iS) === "#") {
        this.vars.iS = 1 + this.toNumber(this.stage.vars.Skin) * 2;
      } else {
        this.vars.iS =
          4 +
          this.toNumber(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(this.vars.iS) *
                this.toNumber(this.stage.vars.Dmul) +
                15
            )
          );
      }
      yield* this.setcostumeS(this.vars.iS);
      if (this.toNumber(this.stage.vars.Mode) === 0) {
        yield* this.positionshowS(this.stage.vars.X, this.stage.vars.Y);
      } else {
        if (this.toString(this.stage.vars.Mode) === "i") {
          yield* this.positionshowS(
            this.toNumber(this.stage.vars.Scrx) - 2.6,
            this.toNumber(this.stage.vars.Scry) + 1.5
          );
        } else {
          this.visible = false;
        }
      }
      yield* this.pointtowardsmouseS(this.vars.dirS);
      yield* this.gettileS(this.vars.lx, this.toNumber(this.vars.ly) - 0.15);
      if (this.toNumber(this.vars.tileS) === 193) {
        yield* this.doSwitchTileidxTileid(this.vars.iS, this.vars.tileS);
      }
      if (this.toNumber(this.vars.tileS) === 266) {
        if (this.compare(this.vars.portaltime, -1) > 0) {
          if (this.toNumber(this.vars.Sx) === 0) {
            this.vars.portaltime += this.toNumber(this.stage.vars.Ticks);
            if (this.compare(this.vars.portaltime, 110) > 0) {
              this.vars.portaltime = -1;
              yield* this.broadcastAndWait("Save Chunk");
              if (this.compare(this.stage.vars.ChunkSeed, 1000000) < 0) {
                this.stage.vars.ChunkSeed += 1000000;
              } else {
                this.stage.vars.ChunkSeed -= 1000000;
              }
              yield* this.broadcastAndWait("Load Chunk");
              yield* this.broadcastAndWait("TeleportToPortal");
              this.vars.lx = this.stage.vars.X;
              this.vars.ly = this.stage.vars.Y;
            }
          } else {
            this.vars.portaltime = 0;
          }
        }
      } else {
        this.vars.portaltime = 0;
      }
      this.vars.inwater = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.tileS) * this.toNumber(this.stage.vars.Dmul) + 6
      );
      this.vars.waterheight = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.tileS) * this.toNumber(this.stage.vars.Dmul) + 5
      );
      if (this.toNumber(this.vars.tileS) === 19) {
        this.vars.onladder = 1;
      } else {
        this.vars.onladder = 0;
      }
      yield* this.checkkeys();
      if (!(this.toString(this.vars.inwater) === "N")) {
        if (
          this.toString(this.vars.inwater) === "D" ||
          this.toString(this.vars.inwater) === "."
        ) {
          this.vars.refidxT = this.itemOf(
            this.stage.vars.Level,
            this.toNumber(this.vars.iS) - 2
          );
          this.vars.refidxT = this.itemOf(
            this.vars.undefined,
            this.toNumber(this.vars.refidxT) *
              this.toNumber(this.stage.vars.Dmul) +
              6
          );
          if (this.toString(this.vars.refidxT) === "L") {
            this.vars.inwater = "L";
          } else {
            this.vars.refidxT = this.itemOf(
              this.stage.vars.Level,
              this.toNumber(this.vars.iS)
            );
            this.vars.refidxT = this.itemOf(
              this.vars.undefined,
              this.toNumber(this.vars.refidxT) *
                this.toNumber(this.stage.vars.Dmul) +
                6
            );
            if (this.toString(this.vars.refidxT) === "R") {
              this.vars.inwater = "R";
            }
          }
        }
        if (this.toString(this.vars.inwater) === "L") {
          this.vars.Sx = this.toNumber(this.vars.Sx) * 0.6 - 0.05;
        } else {
          if (this.toString(this.vars.inwater) === "R") {
            this.vars.Sx = this.toNumber(this.vars.Sx) * 0.6 + 0.05;
          } else {
            this.vars.Sx = this.toNumber(this.vars.Sx) * 0.6;
          }
        }
      }
      if (!(this.toNumber(this.stage.vars.Knockback) === 0)) {
        this.vars.Sx += this.toNumber(this.stage.vars.Knockback);
        this.stage.vars.Knockback =
          this.toNumber(this.stage.vars.Knockback) * 0.85;
        if (this.compare(this.stage.vars.Ticks, 1) > 0) {
          this.stage.vars.Knockback =
            this.toNumber(this.stage.vars.Knockback) * 0.85;
          if (this.compare(this.stage.vars.Ticks, 2) > 0) {
            this.stage.vars.Knockback =
              this.toNumber(this.stage.vars.Knockback) * 0.85;
          }
        }
        if (
          this.compare(
            Math.abs(this.toNumber(this.stage.vars.Knockback)),
            0.05
          ) < 0
        ) {
          this.stage.vars.Knockback = 0;
        }
      }
      this.vars.stevenextwalkframe =
        this.toNumber(this.vars.custumewalk) +
        Math.abs((Math.floor(this.toNumber(this.vars.walkframe)) % 12) - 5);
      yield* this.checkHalfTileAt(
        this.vars.lx,
        this.toNumber(this.vars.ly) - 0.6
      );
      yield* this.inLava(this.vars.tileS);
      this.vars.stuckS = this.vars.isblockS;
      yield* this.gettileS(this.vars.lx, this.toNumber(this.vars.ly) + 0.4);
      yield* this.canBreath(this.vars.tileS);
      yield* this.isblockS(this.vars.tileS, !null);
      if (this.compare(this.vars.isblockS, 9) > 0) {
        if (
          11 ===
          this.toNumber(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(this.vars.tileS) *
                this.toNumber(this.stage.vars.Dmul) +
                9
            )
          )
        ) {
          this.vars.stuckS = 9;
        } else {
          this.vars.stuckS = this.vars.isblockS;
        }
      }
      if (this.compare(this.vars.stuckS, 10) < 0) {
        this.vars.lx +=
          this.toNumber(this.stage.vars.Ticks) * this.toNumber(this.vars.Sx);
        yield* this.gettileS(this.vars.lx, this.toNumber(this.vars.ly) + 0.4);
        yield* this.isblockS(this.vars.tileS, !null);
        if (this.compare(this.vars.isblockS, 9) < 0) {
          yield* this.checkHalfTileAt(
            this.vars.lx,
            this.toNumber(this.vars.ly) - 0.6
          );
          if (
            this.compare(this.vars.isblockS, 8) > 0 &&
            this.compare(this.vars.onfloor, this.timer) > 0
          ) {
            yield* this.checkHalfTileAt(
              this.vars.lx,
              this.toNumber(this.vars.ly) - 0.1
            );
            yield* this.gettileS(
              this.vars.lx,
              this.toNumber(this.vars.ly) + 0.9
            );
            yield* this.isblockS(this.vars.tileS, !null);
            if (this.compare(this.vars.isblockS, 9) < 0) {
              this.vars.ly += 0.5;
            }
          }
        }
        if (
          this.compare(this.vars.isblockS, 8) > 0 &&
          this.compare(this.vars.stuckS, 9) < 0
        ) {
          this.vars.lx = Math.floor(
            this.toNumber(this.vars.lx) -
              this.toNumber(this.stage.vars.Ticks) * this.toNumber(this.vars.Sx)
          );
          if (this.compare(this.vars.Sx, 0) < 0) {
            null;
          } else {
            this.vars.lx += 0.999;
          }
          this.vars.onwall = this.timer + 0.2;
        }
      }
      yield* this.loopticks();
    }
    yield* this.gettileS(this.vars.lx, this.vars.ly);
    this.stage.vars.Stevelight =
      this.toNumber(this.itemOf(this.stage.vars.Light, this.vars.iS - 1)) -
      this.toNumber(this.stage.vars.Glight);
    this.vars.refitS = this.itemOf(
      this.stage.vars.Light,
      this.toNumber(this.vars.iS) + this.stage.vars.Level.length - 1
    );
    if (this.compare(this.stage.vars.Stevelight, this.vars.refitS) < 0) {
      this.stage.vars.Stevelight = this.vars.refitS;
    }
    if (this.toNumber(this.stage.vars.Stevelight) === 0) {
      this.stage.vars.Stevelight = 1;
    }
    if (this.compare(this.stage.vars.Foodsaturation, 0) < 0) {
      this.stage.vars.Hunger--;
      this.stage.vars.Foodsaturation += 4;
    }
    this.vars.healthregen += this.toNumber(this.stage.vars.Ticks);
    if (this.compare(this.vars.healthregen, 120) > 0) {
      this.vars.healthregen -= 120;
      if (
        this.compare(this.stage.vars.HealthS, 20) < 0 &&
        (this.compare(this.stage.vars.Hunger, 17.5) > 0 ||
          this.toNumber(this.stage.vars.Survival) === 0)
      ) {
        this.stage.vars.HealthS++;
        this.broadcast("Update Health");
        if (this.compare(this.stage.vars.Survival, 0) > 0) {
          this.stage.vars.Foodsaturation -= 12;
        }
      } else {
        if (this.compare(this.stage.vars.Hunger, 0.5) < 0) {
          if (this.compare(this.stage.vars.HealthS, 2) > 0) {
            this.stage.vars.HealthS--;
            this.broadcast("Update Health");
          }
        }
      }
    }
  }

  *soundFootStep(tileid, volume) {
    if (this.compare(this.stage.vars.Sound, 0) > 0) {
      this.audioEffects.volume = this.toNumber(volume);
      if (this.toNumber(tileid) === 7) {
        yield* this.startSound(this.random(9, 12));
      } else {
        if (this.toNumber(tileid) === 5) {
          yield* this.startSound(this.random(5, 8));
        } else {
          this.vars.tS = this.letterOf(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(tileid) * this.toNumber(this.stage.vars.Dmul) + 4
            ),
            0
          );
          if (
            this.toString(this.vars.tS) === "S" ||
            this.toString(this.vars.tS) === "W"
          ) {
            yield* this.startSound(this.random(1, 4));
          } else {
            if (this.toString(this.vars.tS) === "A") {
              yield* this.startSound(this.random(17, 20));
            } else {
              yield* this.startSound(this.random(13, 16));
            }
          }
        }
      }
    }
  }

  *canBreath(tile) {
    if (this.compare(this.stage.vars.Creative, 1) < 0) {
      this.vars.tS = this.itemOf(
        this.vars.undefined,
        this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 6
      );
      if (
        this.toString(this.vars.tS) === "." ||
        this.toString(this.vars.tS) === "D"
      ) {
        this.vars.Airlevel += -0.04 * this.toNumber(this.stage.vars.Ticks);
        if (this.compare(this.vars.Airlevel, 0) < 0) {
          this.vars.Airlevel++;
          this.stage.vars.HealthS -= 2;
          this.broadcast("Update Health");
        }
      } else {
        if (
          11 ===
          this.toNumber(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 9
            )
          )
        ) {
          this.vars.tS = "N";
        } else {
          this.vars.tS = this.itemOf(
            this.vars.undefined,
            this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 2
          );
        }
        if (!(this.toString(this.vars.tS) === "Y")) {
          this.vars.Airlevel = 22;
        } else {
          if (this.compare(this.vars.Airlevel, 1) < 0) {
            this.vars.Airlevel +=
              -0.0666 * this.toNumber(this.stage.vars.Ticks);
            if (this.compare(this.vars.Airlevel, 0) < 0) {
              this.vars.Airlevel++;
              this.stage.vars.HealthS--;
              this.broadcast("Update Health");
            }
          } else {
            this.vars.Airlevel = 0.9;
          }
        }
      }
    }
  }

  *whenIReceiveSleep() {
    this.stage.vars.Respawnidx = this.stage.vars.Cursor;
    this.stage.vars.Respawnseed = this.stage.vars.ChunkSeed;
    if (this.toNumber(this.stage.vars.Undercursor) === 51) {
      this.stage.vars.Respawnidx--;
    }
    this.vars.lx =
      this.toNumber(this.stage.vars.Respawnidx) %
      this.toNumber(this.stage.vars.Lsx);
    this.vars.ly =
      Math.floor(
        this.toNumber(this.stage.vars.Cursor) /
          this.toNumber(this.stage.vars.Lsx)
      ) + 0.7;
    this.vars.Sy = 0;
    this.vars.onfloor = this.timer + 0.2;
    this.stage.vars.Mode = "S";
  }

  *inLava(tile) {
    this.vars.tS = this.itemOf(
      this.vars.undefined,
      this.toNumber(this.vars.tileS) * this.toNumber(this.stage.vars.Dmul) + 13
    );
    if (this.compare(this.vars.tS, 0) > 0) {
      if (this.toNumber(this.vars.inlava) === 0) {
        this.stage.vars.HealthS += Math.floor(
          (0 - this.toNumber(this.vars.tS)) *
            this.toNumber(this.stage.vars.Defensemul)
        );
        this.stage.vars.Damagearmor++;
        this.broadcast("Update Health");
      }
      this.vars.inlava += this.toNumber(this.stage.vars.Ticks);
      if (this.compare(this.vars.inlava, 16) > 0) {
        this.vars.inlava -= 15;
        this.stage.vars.HealthS += Math.floor(
          (0 - this.toNumber(this.vars.tS)) *
            this.toNumber(this.stage.vars.Defensemul)
        );
        this.stage.vars.Damagearmor++;
        this.broadcast("Update Health");
      }
    } else {
      this.vars.inlava = 0;
    }
  }

  *whenIReceivePlayDigSound() {
    yield* this.soundFootStep(this.sprites["Cursor"].vars.digtile, 80);
  }

  *loopticks() {
    for (let i = 0; i < this.toNumber(this.stage.vars.Ticks); i++) {
      if (
        this.toNumber(this.vars.onladder) === 0 &&
        this.toNumber(this.vars.isflymode) === 0
      ) {
        if (
          this.toString(this.vars.inwater) === "." ||
          this.toString(this.vars.inwater) === "D"
        ) {
          if (this.compare(this.vars.Sy, -0.04) > 0) {
            this.vars.Sy -= 0.01;
          }
          if (this.compare(this.vars.Sy, -0.02) < 0) {
            this.vars.Sy = this.toNumber(this.vars.Sy) * 0.8;
            if (this.compare(this.vars.Sy, -0.02) > 0) {
              this.vars.Sy = -0.02;
            }
          }
        } else {
          this.vars.Sy -= 0.04;
          if (this.compare(this.vars.Sy, -0.4) < 0) {
            this.vars.Sy = -0.4;
          }
        }
      }
      yield* this.checkHalfTileAt(
        this.vars.lx,
        this.toNumber(this.vars.ly) - 0.841
      );
      if (
        this.toNumber(this.vars.isblockS) === 0 &&
        (this.keyPressed("s") || this.keyPressed("down arrow"))
      ) {
        this.vars.stuckS = 1;
      } else {
        this.vars.stuckS = this.vars.isblockS;
      }
      this.vars.ly += this.toNumber(this.vars.Sy);
      if (this.compare(this.vars.Sy, 0) < 0) {
        yield* this.checkHalfTileAt(
          this.vars.lx,
          this.toNumber(this.vars.ly) - 0.851
        );
        if (233 === this.toNumber(this.vars.tileS)) {
          yield* this.doSwitchTileidxTileid(this.vars.iS, this.vars.tileS);
        }
        if (
          this.compare(this.vars.isblockS, 9) > 0 ||
          (this.compare(this.vars.isblockS, 0) > 0 &&
            this.toNumber(this.vars.stuckS) === 0)
        ) {
          this.vars.ly = Math.floor(this.toNumber(this.vars.ly) - 0.851) + 1.85;
          if (this.compare(this.vars.isblockY, 0) > 0) {
            this.vars.ly += this.toNumber(this.vars.isblockY) - 1;
          }
          this.vars.Sy = 0;
          this.vars.onfloor = this.timer + 0.2;
          this.vars.iS =
            Math.floor(
              this.toNumber(this.vars.ly) - this.toNumber(this.vars.fallheightS)
            ) + 4;
          if (
            this.compare(this.vars.iS, 0) < 0 &&
            this.compare(this.stage.vars.Creative, 1) < 0
          ) {
            this.stage.vars.HealthS += this.toNumber(this.vars.iS);
            this.broadcast("Update Health");
          } else {
            if (this.compare(this.vars.walkframe, this.vars.lastwalkstep) > 0) {
              yield* this.soundFootStep(this.vars.tileS, 20);
              this.vars.lastwalkstep += 6;
            }
          }
          this.vars.fallheightS = this.vars.ly;
        }
      } else {
        this.vars.fallheightS = this.vars.ly;
        yield* this.gettileS(
          this.stage.vars.X,
          this.toNumber(this.stage.vars.Y) + 0.7
        );
        yield* this.isblockS(this.vars.tileS, 0);
        if (this.compare(this.vars.isblockS, 9) > 0) {
          this.vars.ly = Math.floor(this.toNumber(this.vars.ly) + 0.7) - 0.7;
          this.vars.Sy = 0;
        }
      }
      yield;
    }
  }

  *whenIReceiveGameModeChanged() {
    if (this.compare(this.stage.vars.Creative, 1) < 0) {
      this.vars.isflymode = 0;
    }
  }

  *whenIReceiveAnimate() {
    if (
      this.compare(this.stage.vars.HealthS, 0) > 0 ||
      (this.compare(this.stage.vars.Creative, 0) > 0 &&
        this.compare(this.stage.vars.HealthS, -10000) > 0)
    ) {
      yield* this.stevetick();
    } else {
      yield* this.deathTickS();
    }
  }

  *whenIReceiveInit1b() {
    yield* this.wait(0.2);
    this.moveAhead();
    this.moveBehind(1);
  }

  *whenIReceiveInit1b2() {
    yield* this.gettileS(
      this.stage.vars.X,
      this.toNumber(this.stage.vars.Y) - 0.851
    );
    yield* this.isblockS(this.vars.tileS, 0);
    if (this.compare(this.vars.isblockS, 9) > 0) {
      while (!(this.compare(this.vars.isblockS, 10) < 0)) {
        this.stage.vars.Y++;
        yield* this.gettileS(
          this.stage.vars.X,
          this.toNumber(this.stage.vars.Y) - 0.851
        );
        yield* this.isblockS(this.vars.tileS, 0);
        yield;
      }
      this.stage.vars.Y =
        Math.floor(this.toNumber(this.stage.vars.Y) - 0.851) + 0.85;
    } else {
      while (!(this.compare(this.vars.isblockS, 9) > 0)) {
        this.stage.vars.Y--;
        yield* this.gettileS(
          this.stage.vars.X,
          this.toNumber(this.stage.vars.Y) - 0.851
        );
        yield* this.isblockS(this.vars.tileS, 0);
        yield;
      }
      this.stage.vars.Y =
        Math.floor(this.toNumber(this.stage.vars.Y) - 0.851) + 1.85;
    }
    if (this.compare(this.itemOf(this.stage.vars.Menu, 3), 0) > 0) {
      yield* this.addSign(
        this.toNumber(this.stage.vars.X) - 2,
        Math.floor(this.toNumber(this.stage.vars.Y)),
        "Welcome to Paper Minecraft by Griffpatch! Press 'E' with your cursor over the chest to the right to open it!"
      );
      if (this.toNumber(this.itemOf(this.stage.vars.Menu, 3)) === 1) {
        yield* this.addBonusChest(
          this.toNumber(this.stage.vars.X) + 3,
          Math.floor(this.toNumber(this.stage.vars.Y))
        );
      }
    }
    yield* this.gettileS(this.stage.vars.X, this.stage.vars.Y);
    this.stage.vars.Respawnidx = this.vars.iS;
    this.stage.vars.Respawnseed = this.stage.vars.ChunkSeed;
  }

  *whenIReceiveGo() {
    this.moveAhead();
  }

  *whenIReceiveInit3() {
    yield* this.respawn(0);
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
    this.size = 220;
    this.direction = 90;
    this.costume = "Body4";
    this.vars.custumewalk = 1;
    this.stage.vars.HealthS = 20;
    this.stage.vars.Hunger = 20;
    this.stage.vars.Foodsaturation = 80;
    this.vars.isflymode = 0;
    this.vars.light = 0;
    this.stage.vars.Skin = this.random(0, 1);
  }

  *setWalk(dir) {
    this.stage.vars.keydelay = 1;
    if (this.keyPressed("")) {
      if (this.compare(this.vars.isflymode, 0) > 0) {
        this.vars.Sx = 0.3 * this.toNumber(dir);
        this.vars.walkframe += this.toNumber(this.stage.vars.Ticks) * 1.5;
        return;
      } else {
        if (!(this.compare(this.stage.vars.Hunger, 6) < 0)) {
          this.vars.Sx = 0.2 * this.toNumber(dir);
          this.vars.walkframe += this.toNumber(this.stage.vars.Ticks) * 1;
          this.stage.vars.Foodsaturation -= 0.0035;
          return;
        }
      }
    }
    this.vars.Sx = 0.15 * this.toNumber(dir);
    this.vars.walkframe += this.toNumber(this.stage.vars.Ticks) * 0.8;
    this.stage.vars.Foodsaturation -= 0.0015;
  }
}
