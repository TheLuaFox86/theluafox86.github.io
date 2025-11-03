/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Generator extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("generate", "./Generator/costumes/generate.png", {
        x: 0,
        y: 0,
      }),
    ];

    this.sounds = [new Sound("meow", "./Generator/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Spawn Chunk from Seed" },
        this.whenIReceiveSpawnChunkFromSeed
      ),
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.totalG = -34;
    this.vars.i = 25601;
    this.vars.y = 62;
    this.vars.x = 201;
    this.vars.t = false;
    this.vars.t2 = false;
    this.vars.refidxG = 25;
    this.vars.Waterlevel = 57;
    this.vars.seed = 821407;
    this.vars.sand = -5;
    this.vars.dy = -200;
    this.vars.iZ3 = 12400;
    this.vars.xxG = 24;
    this.vars.yyG = 55;
    this.vars.ssG = 4016;
    this.vars.dirG = -1;
    this.vars.yG = 5.5;
    this.vars.xG = 2.179449471770337;
    this.vars.iG = 5018;
    this.vars.t2G = 0;
    this.vars.debug = 0;
    this.vars.gIsflat = 0;
    this.vars.gWorldsize = 0;
    this.vars.gTyy = 61.47614666112956;
    this.vars.lasty = 11400;
    this.vars.bmul = 9;
    this.vars.vmul = -0.7;
    this.vars.voff = 55;
    this.vars.biometype = "G";
    this.vars.waterTileId = 38;
    this.vars.track = "16,20";
    this.vars.SaveList = [];
    this.vars.Nextharvest = [];
    this.vars.altitude = [];
    this.vars.tree = [];
    this.vars.rand = [0];
    this.vars.biomeData = [
      "1) Biome ID",
      "2) Biome Name",
      "3) Biome Type (G - Grass, D - Desert, T - Taiga, S - Snow, W - Swamp, N - Nether)",
      "4) Altitude Multiplier",
      "5) Altitude Offset",
      "6) Island Multiplier",
      "7) Tree Type (O - Oak, B - Birch, S - Spruce, J - Jungle, C - Cactas)",
      "8) Tree Frequency",
      0,
      1,
      "Normal",
      "G",
      1,
      3,
      1,
      "OB",
      7,
      0,
      2,
      "Flat Lands",
      "G",
      0.3,
      3,
      0.3,
      "OB",
      5,
      0,
      3,
      "Hills",
      "G",
      2.5,
      8,
      1,
      "OB",
      5,
      0,
      4,
      "Desert",
      "D",
      0.3,
      4,
      0.3,
      "C",
      6,
      0,
      5,
      "Islands",
      "G",
      1.8,
      -4,
      2,
      "OB",
      7,
      0,
      6,
      "Forest",
      "G",
      0.5,
      5,
      0.3,
      "OB",
      24,
      0,
      7,
      "Taiga",
      "T",
      0.7,
      5,
      1,
      "S",
      12,
      0,
      8,
      "Snow",
      "S",
      1,
      3,
      1,
      "S",
      7,
    ];
    this.vars.rndstack = [];
    this.vars.caverns = [];

    this.watchers.SaveList = new Watcher({
      label: "Generator: _SAVE_LIST",
      style: "normal",
      visible: false,
      value: () => this.vars.SaveList,
      x: 240,
      y: 180,
      width: undefined,
      height: undefined,
    });
  }

  *registerActivity(tileidx) {
    this.stage.vars.Lightmod.push(
      this.toNumber(tileidx) + this.stage.vars.Level.length
    );
    this.stage.vars.Refdata.push(tileidx);
    this.stage.vars.Levelref.splice(
      tileidx - 1,
      1,
      this.stage.vars.Refdata.length
    );
    for (let i = 0; i < this.toNumber(this.stage.vars.Refsize) - 1; i++) {
      this.stage.vars.Refdata.push("");
      yield;
    }
  }

  *fillCircleG(typ, x, y, radius, roughness, onlyinid) {
    this.vars.yG = 0.5 - this.toNumber(radius);
    this.vars.refidxG = this.toNumber(radius) * this.toNumber(radius);
    while (!(this.compare(this.vars.yG, radius) > 0)) {
      this.vars.xG = Math.sqrt(
        this.toNumber(this.vars.refidxG) -
          this.toNumber(this.vars.yG) * this.toNumber(this.vars.yG)
      );
      yield* this.random2(0 - this.toNumber(roughness), roughness, 0);
      this.vars.t2G = this.itemOf(this.vars.rand, 0);
      yield* this.fillHorizontalLine(
        typ,
        Math.round(
          this.toNumber(x) -
            this.toNumber(this.vars.xG) +
            this.toNumber(this.vars.t2G)
        ),
        Math.round(this.toNumber(y) + this.toNumber(this.vars.yG)),
        Math.round(
          this.toNumber(x) +
            this.toNumber(this.vars.xG) +
            this.toNumber(this.vars.t2G)
        ),
        onlyinid
      );
      this.vars.yG++;
      yield;
    }
  }

  *fillHorizontalLine(typ, x, y, x2, onlyinid) {
    this.vars.iG =
      this.toNumber(x) + this.toNumber(y) * this.toNumber(this.stage.vars.Lsx);
    for (let i = 0; i < this.toNumber(x2) - this.toNumber(x) + 1; i++) {
      this.vars.iG++;
      if (
        !(
          this.compare(
            typ,
            this.itemOf(this.stage.vars.Level, this.vars.iG - 1)
          ) === 0
        )
      ) {
        if (
          this.toNumber(onlyinid) === 0 ||
          this.compare(
            onlyinid,
            this.itemOf(this.stage.vars.Level, this.vars.iG - 1)
          ) === 0
        ) {
          this.stage.vars.Level.splice(this.vars.iG - 1, 1, typ);
          this.vars.totalG--;
        }
      }
      yield;
    }
  }

  *random2(from, to, append) {
    if (!append) {
      this.vars.rand = [];
    }
    if (
      this.compare(this.stage.vars.Randidx, this.stage.vars.Random.length) > 0
    ) {
      this.stage.vars.Randidx =
        1 +
        ((this.toNumber(this.stage.vars.Randidx) - 1) %
          this.stage.vars.Random.length);
    }
    if (
      this.compare(Math.round(this.toNumber(to)), to) === 0 &&
      this.compare(Math.round(this.toNumber(from)), from) === 0
    ) {
      this.vars.rand.push(
        Math.floor(
          (Math.abs(
            this.toNumber(
              this.itemOf(this.stage.vars.Random, this.stage.vars.Randidx - 1)
            )
          ) -
            1) *
            ((this.toNumber(to) - this.toNumber(from) + 1) / 2147483645) +
            this.toNumber(from)
        )
      );
    } else {
      this.vars.rand.push(
        (Math.abs(
          this.toNumber(
            this.itemOf(this.stage.vars.Random, this.stage.vars.Randidx - 1)
          )
        ) -
          1) *
          ((this.toNumber(to) - this.toNumber(from)) / 2147483644) +
          this.toNumber(from)
      );
    }
    this.stage.vars.Randidx++;
  }

  *makeSeams(typ, chance, size, depth, link, onlyinid) {
    this.vars.totalG =
      this.toNumber(this.stage.vars.Lsx) *
      this.toNumber(depth) *
      (this.toNumber(chance) / 100);
    this.vars.voff = 0;
    while (
      !(
        this.compare(this.vars.totalG, 0) < 0 ||
        this.compare(this.vars.voff, 300) > 0
      )
    ) {
      yield* this.random2(1, this.stage.vars.Lsx, 0);
      this.vars.xxG = this.itemOf(this.vars.rand, 0);
      yield* this.random2(1, depth, 0);
      this.vars.yyG = this.itemOf(this.vars.rand, 0);
      if (this.compare(size, 0.5) > 0) {
        yield* this.random2(1.0000000002328306, size, 0);
        this.vars.ssG = this.itemOf(this.vars.rand, 0);
        yield* this.fillCircleG(
          typ,
          this.vars.xxG,
          this.vars.yyG,
          this.vars.ssG,
          1,
          onlyinid
        );
      } else {
        yield* this.fillHorizontalLine(
          typ,
          this.vars.xxG,
          this.vars.yyG,
          this.vars.xxG,
          onlyinid
        );
      }
      this.vars.voff++;
      if (link) {
        this.vars.debug++;
        this.vars.xxG = 0.1 + this.toNumber(this.vars.xxG);
        this.vars.yyG = 0.1 + this.toNumber(this.vars.yyG);
        yield* this.random2(0.8, 1.8, 0);
        this.vars.ssG = this.itemOf(this.vars.rand, 0);
        yield* this.random2(0, 10, 0);
        if (this.compare(this.itemOf(this.vars.rand, 0), 2) > 0) {
          yield* this.random2(0, 1, 0);
          yield* this.random2(60, 119.9, !null);
          this.vars.dirG =
            (2 * this.toNumber(this.itemOf(this.vars.rand, 0)) - 1) *
            this.toNumber(this.itemOf(this.vars.rand, 1));
        } else {
          yield* this.random2(0, 359.9, 0);
          this.vars.dirG = this.itemOf(this.vars.rand, 0);
        }
        yield* this.random2(0, 64, 0);
        while (
          !(
            this.toNumber(this.itemOf(this.vars.rand, 0)) === 0 ||
            this.compare(this.vars.xxG, 1) < 0 ||
            this.compare(this.vars.xxG, this.stage.vars.Lsx) > 0 ||
            this.compare(this.vars.yyG, 1) < 0 ||
            this.compare(this.vars.yyG, depth) > 0
          )
        ) {
          this.vars.xxG +=
            this.toNumber(this.vars.ssG) *
            Math.sin(this.degToRad(this.toNumber(this.vars.dirG)));
          this.vars.yyG +=
            this.toNumber(this.vars.ssG) *
            Math.cos(this.degToRad(this.toNumber(this.vars.dirG)));
          yield* this.random2(0, 10, 0);
          if (this.compare(this.itemOf(this.vars.rand, 0), 7) > 0) {
            yield* this.random2(-35, 35, 0);
            this.vars.dirG += this.toNumber(this.itemOf(this.vars.rand, 0));
          } else {
            yield* this.random2(-8, 8, 0);
            this.vars.dirG += this.toNumber(this.itemOf(this.vars.rand, 0));
          }
          yield* this.random2(0, 10, 0);
          if (this.compare(this.itemOf(this.vars.rand, 0), 9) > 0) {
            yield* this.random2(0.6, 1.8, 0);
            this.vars.ssG = this.itemOf(this.vars.rand, 0);
            yield* this.random2(0, 10, 0);
            if (this.compare(this.itemOf(this.vars.rand, 0), 7) > 0) {
              yield* this.random2(0, 10, 0);
              if (this.compare(this.itemOf(this.vars.rand, 0), 2) > 0) {
                yield* this.random2(0, 1, 0);
                yield* this.random2(60, 119.9, !null);
                this.vars.dirG =
                  (2 * this.toNumber(this.itemOf(this.vars.rand, 0)) - 1) *
                  this.toNumber(this.itemOf(this.vars.rand, 1));
              } else {
                yield* this.random2(0, 359.9, 0);
                this.vars.dirG = this.itemOf(this.vars.rand, 0);
              }
            }
          }
          yield* this.random2(0, 100, 0);
          if (this.compare(this.itemOf(this.vars.rand, 0), 96) > 0) {
            yield* this.random2(1.5, size, 0);
            yield* this.fillCircleG(
              typ,
              this.vars.xxG,
              this.vars.yyG,
              this.itemOf(this.vars.rand, 0),
              1,
              0
            );
            this.vars.caverns.push(
              Math.round(this.toNumber(this.vars.xxG)) +
                Math.round(this.toNumber(this.vars.yyG)) *
                  this.toNumber(this.stage.vars.Lsx) +
                1
            );
          } else {
            yield* this.random2(0, 0.7, 0);
            yield* this.fillCircleG(
              typ,
              this.vars.xxG,
              this.vars.yyG,
              this.vars.ssG,
              this.itemOf(this.vars.rand, 0),
              0
            );
          }
          yield* this.random2(0, 64, 0);
          yield;
        }
      }
      yield;
    }
  }

  *enlargePoolBounds() {
    this.vars.x = 2;
    this.vars.t2 = 0;
    this.vars.lasty =
      this.toNumber(this.vars.Waterlevel) * this.toNumber(this.stage.vars.Lsx);
    for (let i = 0; i < this.toNumber(this.stage.vars.Lsx) - 2; i++) {
      if (
        this.compare(
          this.itemOf(this.vars.altitude, this.vars.x - 1),
          this.vars.Waterlevel
        ) < 0
      ) {
        if (this.toNumber(this.vars.t2) === 0) {
          this.vars.t2 = 1;
          this.vars.t = this.toNumber(this.vars.x) - 1;
          while (
            !(
              this.compare(this.vars.t, 2) < 0 ||
              this.compare(
                this.itemOf(
                  this.stage.vars.Level,
                  this.toNumber(this.vars.lasty) +
                    (this.toNumber(this.vars.t) - 1) -
                    1
                ),
                1
              ) > 0
            )
          ) {
            this.vars.altitude.splice(
              this.vars.t - 1,
              1,
              this.toNumber(this.vars.Waterlevel) - 1
            );
            this.vars.t--;
            yield;
          }
        }
      } else {
        if (this.toNumber(this.vars.t2) === 1) {
          if (
            this.toNumber(
              this.itemOf(
                this.stage.vars.Level,
                this.toNumber(this.vars.lasty) +
                  (this.toNumber(this.vars.x) - 1) -
                  1
              )
            ) === 1
          ) {
            this.vars.altitude.splice(
              this.vars.x - 1,
              1,
              this.toNumber(this.vars.Waterlevel) - 1
            );
          } else {
            this.vars.t2 = 0;
          }
        }
      }
      this.vars.x++;
      yield;
    }
    this.vars.x = 2;
    for (let i = 0; i < this.toNumber(this.stage.vars.Lsx); i++) {
      if (
        this.compare(
          this.itemOf(this.vars.altitude, this.vars.x - 1),
          this.vars.Waterlevel
        ) < 0
      ) {
        yield* this.doskysea(
          this.toNumber(this.vars.x) - 2,
          1,
          this.vars.Waterlevel
        );
      } else {
        yield* this.doskysea(this.toNumber(this.vars.x) - 2, 1, 0);
      }
      this.vars.x++;
      yield;
    }
  }

  *doskysea(xx, yy, waterlevel) {
    this.vars.iZ3 =
      this.toNumber(xx) +
      this.toNumber(this.stage.vars.Lsy) * this.toNumber(this.stage.vars.Lsx) +
      1;
    this.vars.iZ3 += this.toNumber(this.stage.vars.Lsxneg);
    this.vars.t = this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1);
    this.vars.y = this.stage.vars.Lsy;
    this.vars.t2 = 0;
    while (
      !(
        this.compare(this.vars.t, 1) > 0 &&
        this.toString(
          this.itemOf(
            this.vars.undefined,
            this.toNumber(this.vars.t) * this.toNumber(this.stage.vars.Dmul) + 2
          )
        ) === "Y" &&
        (this.toNumber(waterlevel) === 0 || this.toNumber(this.vars.t2) === 2)
      )
    ) {
      this.vars.y--;
      if (this.compare(this.vars.y, waterlevel) > 0) {
        if (this.compare(this.vars.t, 1) > 0) {
          this.vars.t2 = 1;
          this.stage.vars.Lightmod.push(this.vars.iZ3);
        } else {
          if (this.toNumber(this.vars.t2) === 0) {
            this.stage.vars.Light.splice(this.vars.iZ3 - 1, 1, 16);
          }
        }
      } else {
        if (this.compare(this.vars.t2, 2) < 0) {
          this.stage.vars.Lightmod.push(this.vars.iZ3);
        }
        this.stage.vars.Level.splice(
          this.vars.iZ3 - 1,
          1,
          this.vars.waterTileId
        );
        this.vars.t2 = 2;
      }
      this.vars.iZ3 += this.toNumber(this.stage.vars.Lsxneg);
      this.vars.t = this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1);
      yield;
    }
    this.stage.vars.Lightmod.push(this.vars.iZ3);
    if (this.compare(waterlevel, 0) > 0) {
      this.stage.vars.Grow.push(
        this.toNumber(this.vars.iZ3) + this.toNumber(this.stage.vars.Lsx)
      );
    }
  }

  *makeTree(xx, yy, size) {
    yield* this.random2(
      1,
      this.itemOf(
        this.vars.biomeData,
        6 +
          this.toNumber(this.stage.vars.Biomeid) * this.toNumber(this.vars.bmul)
      ).length,
      0
    );
    this.vars.voff = this.letterOf(
      this.itemOf(
        this.vars.biomeData,
        6 +
          this.toNumber(this.stage.vars.Biomeid) * this.toNumber(this.vars.bmul)
      ),
      this.itemOf(this.vars.rand, 0) - 1
    );
    if (this.toString(this.vars.voff) === "O") {
      this.vars.voff = 55;
    } else {
      if (this.toString(this.vars.voff) === "B") {
        this.vars.voff = 176;
      } else {
        if (this.toString(this.vars.voff) === "S") {
          this.vars.voff = 175;
        } else {
          if (this.toString(this.vars.voff) === "J") {
            this.vars.voff = 177;
          } else {
            this.vars.voff = 55;
          }
        }
      }
    }
    this.vars.y = this.toNumber(yy) + 1;
    this.vars.iZ3 =
      this.toNumber(xx) +
      this.toNumber(this.vars.y) * this.toNumber(this.stage.vars.Lsx) +
      1;
    this.vars.t = this.itemOf(
      this.stage.vars.Level,
      this.toNumber(this.vars.iZ3) - this.toNumber(this.stage.vars.Lsx) - 1
    );
    if (this.toNumber(this.vars.t) === 2) {
      this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, this.vars.voff);
      this.stage.vars.Grow.push(this.vars.iZ3);
      this.stage.vars.Growtime.push(0);
    } else {
      if (
        this.toNumber(this.vars.t) === 7 &&
        this.toString(
          this.itemOf(
            this.vars.biomeData,
            2 +
              this.toNumber(this.stage.vars.Biomeid) *
                this.toNumber(this.vars.bmul)
          )
        ) === "D"
      ) {
        for (let i = 0; i < 3; i++) {
          this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 11);
          this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
          this.vars.y++;
          yield;
        }
      } else {
        null;
      }
    }
  }

  *initCaves() {
    if (this.toNumber(this.vars.gIsflat) === 0) {
      if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
        this.stage.vars.Randidx = 4000;
        yield* this.random2(3.1, 7, 0);
        this.stage.vars.Randidx = 4010;
        if (
          this.compare(
            this.itemOf(
              this.vars.biomeData,
              4 +
                this.toNumber(this.stage.vars.Biomeid) *
                  this.toNumber(this.vars.bmul)
            ),
            0
          ) > 0
        ) {
          yield* this.makeSeams(
            1,
            this.itemOf(this.vars.rand, 0),
            3.5,
            this.toNumber(this.vars.Waterlevel) + 4,
            !null,
            0
          );
        }
        if (
          !(
            this.toString(
              this.itemOf(
                this.vars.biomeData,
                2 +
                  this.toNumber(this.stage.vars.Biomeid) *
                    this.toNumber(this.vars.bmul)
              )
            ) === "D"
          )
        ) {
          yield* this.makeSeams(
            53,
            0.12,
            3,
            this.toNumber(this.vars.Waterlevel) + 1,
            0,
            7
          );
        }
      } else {
        this.stage.vars.Randidx = 4000;
        yield* this.random2(10, 18, 0);
        this.stage.vars.Randidx = 4010;
        yield* this.makeSeams(
          1,
          this.itemOf(this.vars.rand, 0),
          4.5,
          this.stage.vars.Lsy,
          !null,
          0
        );
      }
    } else {
      null;
    }
    this.stage.vars.Randidx = 5000;
    yield* this.fillHorizontalLine(6, 0, 0, this.stage.vars.Lsx, 0);
  }

  *makeNewStripCeiling(xx, yy, ryy, ch) {
    this.vars.iZ3 =
      this.toNumber(xx) +
      this.toNumber(yy) * this.toNumber(this.stage.vars.Lsx) +
      1;
    this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
    this.vars.t2 = ch;
    while (
      !(
        this.compare(this.vars.iZ3, this.stage.vars.Level.length) > 0 ||
        this.compare(this.vars.t2, 1) < 0
      )
    ) {
      this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 1);
      this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
      this.vars.t2--;
      yield;
    }
    this.vars.iZ3 =
      this.toNumber(xx) +
      this.toNumber(yy) * this.toNumber(this.stage.vars.Lsx) +
      1;
    if (
      this.toString(this.vars.biometype) === "T" ||
      this.toString(this.vars.biometype) === "N"
    ) {
      this.vars.sand = 0;
    } else {
      if (this.toString(this.vars.biometype) === "D") {
        this.vars.sand = 3;
      } else {
        this.vars.sand = Math.round(
          (this.toNumber(this.vars.Waterlevel) - this.toNumber(ryy)) * 2 + 3.5
        );
      }
    }
    if (!(this.toString(this.vars.biometype) === "N")) {
      if (this.compare(this.vars.sand, 0) > 0) {
        if (this.compare(this.vars.sand, 2) > 0) {
          yield* this.random2(2, 3, 0);
          this.vars.sand = this.itemOf(this.vars.rand, 0);
        }
        for (let i = 0; i < this.toNumber(this.vars.sand); i++) {
          this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 7);
          this.vars.iZ3 += this.toNumber(this.vars.dy);
          yield;
        }
        if (
          this.toString(
            this.itemOf(
              this.vars.biomeData,
              2 +
                this.toNumber(this.stage.vars.Biomeid) *
                  this.toNumber(this.vars.bmul)
            )
          ) === "D"
        ) {
          this.vars.sand = 3;
        } else {
          this.vars.sand =
            this.toNumber(this.vars.Waterlevel) - this.toNumber(yy) - 2;
        }
        if (this.compare(this.vars.sand, 3) > 0) {
          this.vars.sand = 3;
        }
        yield* this.random2(0, this.vars.sand, 0);
        for (
          let i = 0;
          i < this.toNumber(this.itemOf(this.vars.rand, 0));
          i++
        ) {
          this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 58);
          this.vars.iZ3 += this.toNumber(this.vars.dy);
          yield;
        }
      } else {
        if (
          this.toString(this.vars.biometype) === "T" &&
          this.compare(yy, this.vars.Waterlevel) < 0
        ) {
          null;
        } else {
          this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 2);
          this.vars.iZ3 += this.toNumber(this.vars.dy);
        }
        yield* this.random2(1, 3, 0);
        for (
          let i = 0;
          i < this.toNumber(this.itemOf(this.vars.rand, 0));
          i++
        ) {
          this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 3);
          this.vars.iZ3 += this.toNumber(this.vars.dy);
          yield;
        }
      }
      for (let i = 0; i < 3; i++) {
        if (
          this.toNumber(
            this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1)
          ) === 1
        ) {
          this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 4);
        }
        this.vars.iZ3 += this.toNumber(this.vars.dy);
        yield;
      }
    }
    if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
      if (!(this.compare(yy, this.vars.Waterlevel) < 0)) {
        if (
          this.toNumber(this.vars.gIsflat) === 0 ||
          this.toNumber(this.stage.vars.Creative) === 0
        ) {
          this.vars.tree.push(xx);
          this.vars.tree.push(yy);
        }
      }
    } else {
      this.vars.tree.push(xx);
      this.vars.tree.push(yy);
    }
  }

  *populateTreesAndShrubs() {
    if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
      this.vars.i = 1;
      while (!(this.compare(this.vars.i, this.vars.tree.length) > 0)) {
        yield* this.random2(0, 100, 0);
        if (
          this.compare(
            this.itemOf(this.vars.rand, 0),
            this.itemOf(
              this.vars.biomeData,
              7 +
                this.toNumber(this.stage.vars.Biomeid) *
                  this.toNumber(this.vars.bmul)
            )
          ) < 0
        ) {
          yield* this.random2(2, 3, 0);
          yield* this.makeTree(
            this.itemOf(this.vars.tree, this.vars.i - 1),
            this.itemOf(this.vars.tree, this.toNumber(this.vars.i)),
            this.itemOf(this.vars.rand, 0)
          );
          this.vars.tree.splice(this.vars.i - 1, 1);
          this.vars.tree.splice(this.vars.i - 1, 1);
          this.vars.i += 4;
        } else {
          this.vars.i += 2;
        }
        yield;
      }
      if (this.toNumber(this.stage.vars.Biomeid) === 8) {
        yield* this.random2(3, 6, 0);
      } else {
        yield* this.random2(4, 12, 0);
      }
      for (let i = 0; i < this.toNumber(this.itemOf(this.vars.rand, 0)); i++) {
        yield* this.random2(1, this.vars.tree.length / 2, 0);
        this.vars.i = this.toNumber(this.itemOf(this.vars.rand, 0)) * 2 - 1;
        yield* this.random2(0, 100, 0);
        this.vars.t = this.itemOf(this.vars.rand, 0);
        if (this.toNumber(this.stage.vars.Biomeid) === 8) {
          if (this.compare(this.vars.t, 45) < 0) {
            this.vars.t = 45;
          } else {
            if (this.compare(this.vars.t, 90) < 0) {
              this.vars.t = 46;
            } else {
              this.vars.t = 54;
            }
          }
        } else {
          if (this.compare(this.vars.t, 50) < 0) {
            this.vars.t = 43;
          } else {
            if (this.compare(this.vars.t, 95) < 0) {
              this.vars.t = 44;
            } else {
              this.vars.t = 54;
            }
          }
        }
        yield* this.random2(2, 4, 0);
        for (
          let i = 0;
          i < this.toNumber(this.itemOf(this.vars.rand, 0));
          i++
        ) {
          this.vars.iZ3 =
            this.toNumber(this.itemOf(this.vars.tree, this.vars.i - 1)) +
            this.toNumber(
              this.itemOf(this.vars.tree, this.toNumber(this.vars.i))
            ) *
              this.toNumber(this.stage.vars.Lsx) +
            1;
          if (
            this.toNumber(
              this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1)
            ) === 2
          ) {
            if (
              this.toNumber(
                this.itemOf(
                  this.stage.vars.Level,
                  this.toNumber(this.vars.iZ3) +
                    this.toNumber(this.stage.vars.Lsx) -
                    1
                )
              ) === 1
            ) {
              this.stage.vars.Level.splice(
                this.toNumber(this.vars.iZ3) +
                  this.toNumber(this.stage.vars.Lsx) -
                  1,
                1,
                this.vars.t
              );
            }
          }
          this.vars.tree.splice(this.vars.i - 1, 1);
          this.vars.tree.splice(this.vars.i - 1, 1);
          yield* this.random2(0, 1, 0);
          this.vars.i += 2 * this.toNumber(this.itemOf(this.vars.rand, 0));
          yield;
        }
        yield;
      }
      this.vars.i = 1;
      yield* this.random2(0, 16, 0);
      this.vars.i += 2 * this.toNumber(this.itemOf(this.vars.rand, 0));
      while (!(this.compare(this.vars.i, this.vars.tree.length) > 0)) {
        this.vars.iZ3 =
          this.toNumber(this.itemOf(this.vars.tree, this.vars.i - 1)) +
          this.toNumber(
            this.itemOf(this.vars.tree, this.toNumber(this.vars.i))
          ) *
            this.toNumber(this.stage.vars.Lsx) +
          1;
        yield* this.random2(0, 100, 0);
        if (this.compare(this.itemOf(this.vars.rand, 0), 65) < 0) {
          if (
            this.toNumber(
              this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1)
            ) === 2
          ) {
            if (
              this.toNumber(
                this.itemOf(
                  this.stage.vars.Level,
                  this.toNumber(this.vars.iZ3) +
                    this.toNumber(this.stage.vars.Lsx) -
                    1
                )
              ) === 1
            ) {
              this.stage.vars.Level.splice(
                this.toNumber(this.vars.iZ3) +
                  this.toNumber(this.stage.vars.Lsx) -
                  1,
                1,
                133
              );
            }
          }
        } else {
          null;
        }
        this.vars.i += 2;
        yield* this.random2(0, 100, 0);
        if (this.compare(this.itemOf(this.vars.rand, 0), 25) < 0) {
          yield* this.random2(4, 16, 0);
          this.vars.i += 2 * this.toNumber(this.itemOf(this.vars.rand, 0));
        }
        yield;
      }
      this.vars.tree = [];
      this.vars.iZ3 =
        this.toNumber(this.vars.Waterlevel) *
          this.toNumber(this.stage.vars.Lsx) +
        2;
      this.vars.t2 = "false";
      this.vars.iZ3++;
      for (let i = 0; i < this.toNumber(this.stage.vars.Lsx) - 4; i++) {
        this.vars.t =
          this.toNumber(
            this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1)
          ) === 38;
        if (!(this.compare(this.vars.t2, this.vars.t) === 0)) {
          if (this.toString(this.vars.t) === "true") {
            this.vars.iZ3--;
          }
          this.vars.i = this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1);
          if (
            this.toNumber(this.vars.i) === 2 ||
            this.toNumber(this.vars.i) === 3 ||
            this.toNumber(this.vars.i) === 7
          ) {
            this.vars.i = this.itemOf(
              this.stage.vars.Level,
              this.toNumber(this.vars.iZ3) +
                this.toNumber(this.stage.vars.Lsx) -
                1
            );
            if (this.toNumber(this.vars.i) === 1) {
              this.vars.tree.push(
                this.toNumber(this.vars.iZ3) +
                  this.toNumber(this.stage.vars.Lsx)
              );
            }
          }
          this.vars.iZ3++;
        }
        this.vars.t2 = this.vars.t;
        this.vars.iZ3++;
        yield;
      }
      yield* this.random2(2, 4, 0);
      this.vars.i = this.itemOf(this.vars.rand, 0);
      if (this.compare(this.vars.i, this.vars.tree.length) > 0) {
        this.vars.i = this.vars.tree.length;
      }
      for (let i = 0; i < this.toNumber(this.vars.i); i++) {
        yield* this.random2(1, this.vars.tree.length, 0);
        this.vars.i = this.itemOf(this.vars.rand, 0);
        this.vars.iZ3 = this.itemOf(this.vars.tree, this.vars.i - 1);
        this.vars.tree.splice(this.vars.i - 1, 1);
        yield* this.random2(1, 3, 0);
        this.vars.i = this.itemOf(this.vars.rand, 0);
        for (let i = 0; i < this.toNumber(this.vars.i); i++) {
          this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 61);
          this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
          yield;
        }
        if (this.compare(this.vars.i, 3) < 0) {
          this.stage.vars.Grow.push(
            this.toNumber(this.vars.iZ3) - this.toNumber(this.stage.vars.Lsx)
          );
          this.stage.vars.Growtime.push(0);
        }
        yield;
      }
    } else {
      this.vars.i = 1;
      while (!(this.compare(this.vars.i, this.vars.tree.length) > 0)) {
        yield* this.random2(0, 100, 0);
        if (this.compare(this.itemOf(this.vars.rand, 0), 20) < 0) {
          this.vars.iZ3 =
            this.toNumber(this.itemOf(this.vars.tree, this.vars.i - 1)) +
            this.toNumber(
              this.itemOf(this.vars.tree, this.toNumber(this.vars.i))
            ) *
              this.toNumber(this.stage.vars.Lsx) +
            1;
          this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
          this.vars.t = 0;
          while (
            !!(
              81 ===
              this.toNumber(
                this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1)
              )
            )
          ) {
            this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
            yield;
          }
          while (
            !!(
              1 ===
              this.toNumber(
                this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1)
              )
            )
          ) {
            this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
            this.vars.t++;
            yield;
          }
          yield* this.random2(4, 7, 0);
          if (this.compare(this.vars.t, this.itemOf(this.vars.rand, 0)) > 0) {
            this.vars.t = this.itemOf(this.vars.rand, 0);
          }
          this.vars.iZ3 +=
            this.toNumber(this.stage.vars.Lsx) -
            Math.round(this.toNumber(this.vars.t) / 2);
          for (let i = 0; i < this.toNumber(this.vars.t); i++) {
            for (let i = 0; i < this.toNumber(this.vars.t); i++) {
              if (
                1 ===
                this.toNumber(
                  this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1)
                )
              ) {
                this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 255);
                this.stage.vars.Lightmod.push(
                  this.toNumber(this.vars.iZ3) + this.stage.vars.Level.length
                );
              }
              this.vars.iZ3++;
              yield;
            }
            yield* this.random2(0, 99, 0);
            if (this.compare(this.itemOf(this.vars.rand, 0), 50) < 0) {
              this.vars.iZ3 +=
                this.toNumber(this.stage.vars.Lsxneg) -
                this.toNumber(this.vars.t) +
                1;
            } else {
              this.vars.iZ3 +=
                this.toNumber(this.stage.vars.Lsxneg) -
                this.toNumber(this.vars.t);
            }
            this.vars.t--;
            yield;
          }
          this.vars.i += 8;
        } else {
          this.vars.i += 2;
        }
        yield;
      }
    }
  }

  *addWaterOrLava(count, maxy, typ) {
    this.vars.totalG = count;
    for (let i = 0; i < 1000; i++) {
      if (this.compare(this.vars.totalG, 1) < 0) {
        return;
      }
      yield* this.random2(0, this.stage.vars.Lsx, 0);
      this.vars.x = this.itemOf(this.vars.rand, 0);
      yield* this.random2(0, maxy, 0);
      this.vars.y = this.itemOf(this.vars.rand, 0);
      this.vars.iZ3 =
        this.toNumber(this.vars.x) +
        this.toNumber(this.vars.y) * this.toNumber(this.stage.vars.Lsx) +
        1;
      if (
        this.toNumber(this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1)) ===
          1 &&
        (this.compare(this.vars.y, 33) < 0 ||
          this.compare(this.stage.vars.Biomeid, 999) > 0)
      ) {
        yield* this.random2(0, 10, 0);
        if (this.compare(this.itemOf(this.vars.rand, 0), 3) < 0) {
          this.vars.dirG = this.stage.vars.Lsx;
        } else {
          yield* this.random2(0, 1, 0);
          this.vars.dirG =
            this.toNumber(this.itemOf(this.vars.rand, 0)) * 2 - 1;
        }
        while (
          !!(
            this.toNumber(
              this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1)
            ) === 1
          )
        ) {
          this.vars.iZ3 += this.toNumber(this.vars.dirG);
          yield;
        }
        this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, typ);
        yield* this.registerActivity(this.vars.iZ3);
        this.vars.totalG--;
      }
      yield;
    }
  }

  *addDungeons() {
    this.vars.track = "";
    while (!(this.vars.caverns.length === 0)) {
      yield* this.random2(1, this.vars.caverns.length, 0);
      this.vars.ssG = this.itemOf(
        this.vars.caverns,
        this.itemOf(this.vars.rand, 0) - 1
      );
      this.vars.caverns.splice(this.itemOf(this.vars.rand, 0) - 1, 1);
      if (
        this.compare(this.vars.ssG, 45 * this.toNumber(this.stage.vars.Lsx)) <
          0 &&
        this.toNumber(this.itemOf(this.stage.vars.Level, this.vars.ssG - 1)) ===
          1
      ) {
        this.vars.ssG += this.toNumber(this.stage.vars.Lsxneg);
        while (
          !(
            this.compare(
              this.itemOf(this.stage.vars.Level, this.vars.ssG - 1),
              1
            ) > 0
          )
        ) {
          this.vars.ssG += this.toNumber(this.stage.vars.Lsxneg);
          yield;
        }
        if (
          this.toNumber(
            this.itemOf(this.stage.vars.Level, this.vars.ssG - 1)
          ) === 4
        ) {
          this.vars.ssG += this.toNumber(this.stage.vars.Lsx);
          this.vars.track =
            this.toString(
              this.toNumber(this.vars.ssG) % this.toNumber(this.stage.vars.Lsx)
            ) +
            ("," +
              this.toString(
                Math.round(
                  this.toNumber(this.vars.ssG) /
                    this.toNumber(this.stage.vars.Lsx)
                )
              ));
          yield* this.fillCircleG(
            270,
            (this.toNumber(this.vars.ssG) - 1) %
              this.toNumber(this.stage.vars.Lsx),
            Math.round(
              (this.toNumber(this.vars.ssG) - 1) /
                this.toNumber(this.stage.vars.Lsx)
            ),
            5,
            1,
            4
          );
          this.stage.vars.Level.splice(this.vars.ssG - 1, 1, 12);
          this.stage.vars.Inside.push(this.vars.ssG);
          this.stage.vars.Inside.push(27);
          this.stage.vars.Inside.push("Dungeon Chest");
          this.stage.vars.Inside.push(269);
          this.stage.vars.Inside.push(78);
          this.stage.vars.Inside.push(109);
          this.stage.vars.Inside.push(30);
          this.stage.vars.Inside.push(112);
          this.stage.vars.Inside.push(1);
          for (let i = 0; i < 24; i++) {
            this.stage.vars.Inside.push("#");
            this.stage.vars.Inside.push(0);
            yield;
          }
          this.vars.caverns = [];
        }
      }
      yield;
    }
  }

  *popRandomStack() {
    this.stage.vars.Randidx = this.itemOf(
      this.vars.rndstack,
      this.vars.rndstack.length - 1
    );
    this.vars.rndstack.splice(this.vars.rndstack.length - 1, 1);
  }

  *pushRandomStack(offset) {
    this.vars.rndstack.push(this.stage.vars.Randidx);
    this.stage.vars.Randidx += this.toNumber(offset);
  }

  *storeOriginal() {
    this.stage.vars.Lcopy = [];
    this.vars.i = 1;
    for (let i = 0; i < this.stage.vars.Level.length; i++) {
      this.stage.vars.Lcopy.push(
        this.itemOf(this.stage.vars.Level, this.vars.i - 1)
      );
      this.vars.i++;
      yield;
    }
  }

  *whenIReceiveSpawnChunkFromSeed() {
    yield* this.spawnFromSeed(this.toNumber(this.stage.vars.Biomeid) === 0);
  }

  *init(chunkLoad) {
    yield* this.initPrep(chunkLoad);
    if (this.compare(this.stage.vars.ChunkSeed, 0) > 0) {
      yield* this.initSeams();
      yield* this.initGroundCurves();
      yield* this.initCaves();
      yield* this.enlargePoolBounds();
      if (!chunkLoad) {
        if (this.compare(this.vars.tree.length, 10) > 0) {
          this.vars.i = Math.round(this.vars.tree.length / 5) * 2;
          this.stage.vars.X =
            0.5 +
            this.toNumber(
              this.itemOf(this.vars.tree, this.toNumber(this.vars.i) - 2)
            );
          this.stage.vars.Y =
            2 + this.toNumber(this.itemOf(this.vars.tree, this.vars.i - 1));
        }
      }
      yield* this.populateTreesAndShrubs();
      yield* this.addWaterOrLava(6, 22, 81);
      this.vars.x =
        this.toNumber(this.stage.vars.Lsx) *
          this.toNumber(this.stage.vars.Lsy) -
        this.toNumber(this.stage.vars.Lsx);
      if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
        yield* this.addWaterOrLava(6, 40, 38);
        for (let i = 0; i < this.toNumber(this.stage.vars.Lsx); i++) {
          this.vars.x++;
          this.stage.vars.Light.splice(this.vars.x - 1, 1, 16);
          yield;
        }
      } else {
        yield* this.addWaterOrLava(
          4,
          this.toNumber(this.stage.vars.Lsy) - 4,
          81
        );
        for (let i = 0; i < this.toNumber(this.stage.vars.Lsx); i++) {
          this.vars.x++;
          this.stage.vars.Level.splice(this.vars.x - 1, 1, 6);
          yield;
        }
      }
      if (this.toNumber(this.stage.vars.Biomeid) === 8) {
        yield* this.freezeSurface(1);
      } else {
        yield* this.freezeSurface(this.toNumber(this.vars.Waterlevel) + 15);
      }
    }
  }

  *spawnHouseAtPadding(tileid, xpos, left, right) {
    if (
      this.compare(
        this.toNumber(xpos) + (this.toNumber(left) + this.toNumber(right)),
        this.stage.vars.Lsx
      ) > 0
    ) {
      return;
    }
    this.vars.y = this.itemOf(this.vars.altitude, xpos - 1);
    this.vars.y = Math.round(
      (this.toNumber(this.vars.y) +
        this.toNumber(
          this.itemOf(
            this.vars.altitude,
            this.toNumber(xpos) +
              (this.toNumber(left) + this.toNumber(right)) -
              1
          )
        )) /
        2
    );
    this.vars.xxG = this.random(0, 3);
    while (
      !(
        this.compare(this.vars.xxG, 1) < 0 &&
        this.compare(this.vars.y, this.vars.yG) === 0
      )
    ) {
      if (this.compare(this.random(1, 10), 4) < 0) {
        yield* this.pavementStripStep(this.vars.x, this.vars.yG, 0);
      } else {
        if (this.compare(this.vars.yG, this.vars.y) < 0) {
          yield* this.pavementStripStep(this.vars.x, this.vars.yG, 1);
        } else {
          if (this.compare(this.vars.yG, this.vars.y) > 0) {
            yield* this.pavementStripStep(this.vars.x, this.vars.yG, -1);
          } else {
            yield* this.pavementStripStep(this.vars.x, this.vars.yG, 0);
          }
        }
      }
      this.vars.t = this.itemOf(this.vars.altitude, this.vars.x - 1);
      this.vars.xxG--;
      yield;
    }
    for (let i = 0; i < this.toNumber(left); i++) {
      yield* this.pavementStripStep(this.vars.x, this.vars.yG, 0);
      yield;
    }
    if (this.compare(tileid, 0) > 0) {
      yield* this.pavementStripStep(this.vars.x, this.vars.yG, 0);
      this.vars.iZ3 =
        this.toNumber(this.vars.x) +
        (this.toNumber(this.vars.yG) + 1) * this.toNumber(this.stage.vars.Lsx) +
        0;
      this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, tileid);
      this.stage.vars.Levelref.splice(this.vars.iZ3 - 1, 1, "");
      this.stage.vars.Grow.push(this.vars.iZ3);
    }
    for (let i = 0; i < this.toNumber(right); i++) {
      yield* this.pavementStripStep(this.vars.x, this.vars.yG, 0);
      yield;
    }
  }

  *pavementStripStep(x, y, stepdir) {
    this.vars.iZ3 =
      this.toNumber(x) +
      (this.toNumber(y) - 5) * this.toNumber(this.stage.vars.Lsx) +
      1;
    for (let i = 0; i < 4; i++) {
      this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 3);
      this.stage.vars.Levelref.splice(this.vars.iZ3 - 1, 1, "");
      this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
      yield;
    }
    if (this.toNumber(stepdir) === -1) {
      this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 5);
      this.stage.vars.Levelref.splice(this.vars.iZ3 - 1, 1, "");
      this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
      this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 238);
    } else {
      if (this.toNumber(stepdir) === 1) {
        this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 3);
        this.stage.vars.Levelref.splice(this.vars.iZ3 - 1, 1, "");
        this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
        this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 5);
        this.stage.vars.Levelref.splice(this.vars.iZ3 - 1, 1, "");
        this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
        this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 237);
      } else {
        this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 3);
        this.stage.vars.Levelref.splice(this.vars.iZ3 - 1, 1, "");
        this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
        this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 5);
      }
    }
    this.stage.vars.Levelref.splice(this.vars.iZ3 - 1, 1, "");
    this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
    for (let i = 0; i < 16; i++) {
      this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 1);
      this.stage.vars.Levelref.splice(this.vars.iZ3 - 1, 1, "");
      this.vars.iZ3 += this.toNumber(this.stage.vars.Lsx);
      yield;
    }
    this.vars.yG += this.toNumber(stepdir);
    this.vars.x++;
  }

  *initSeams() {
    if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
      yield* this.makeSeams(
        5,
        3.2,
        6,
        this.toNumber(this.vars.Waterlevel) + 13,
        0,
        0
      );
      yield* this.makeSeams(
        13,
        1.5,
        3,
        this.toNumber(this.vars.Waterlevel) + 13,
        0,
        0
      );
      yield* this.pushRandomStack(1999);
      yield* this.makeSeams(
        217,
        0.1,
        1.5,
        Math.round(this.toNumber(this.vars.Waterlevel) * 0.27),
        0,
        0
      );
      yield* this.makeSeams(16, 0.8, 2, 40, 0, 0);
      yield* this.makeSeams(271, 0.07, 0.5, 29, 0, 0);
      yield* this.popRandomStack();
      yield* this.makeSeams(
        16,
        1.0000000002328306,
        2,
        this.toNumber(this.vars.Waterlevel) + 3,
        0,
        0
      );
      yield* this.makeSeams(15, 0.1, 0.5, this.stage.vars.Lsy, 0, 0);
      yield* this.makeSeams(
        15,
        0.13,
        1.5,
        Math.round(this.toNumber(this.vars.Waterlevel) * 0.54),
        0,
        0
      );
      yield* this.makeSeams(
        14,
        0.45,
        1,
        Math.round(this.toNumber(this.vars.Waterlevel) * 0.27),
        0,
        0
      );
      yield* this.makeSeams(3, 1, 3, this.stage.vars.Lsy, 0, 0);
    } else {
      yield* this.makeSeams(5, 3.2, 6, this.stage.vars.Lsy, 0, 0);
      yield* this.makeSeams(257, 3.2, 6, this.stage.vars.Lsy, 0, 0);
    }
  }

  *initGroundCurves() {
    this.vars.x = this.vars.seed;
    this.vars.altitude = [];
    this.vars.altitude.push(this.stage.vars.Lsy);
    if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
      this.vars.vmul =
        this.toNumber(
          this.itemOf(
            this.vars.biomeData,
            3 +
              this.toNumber(this.stage.vars.Biomeid) *
                this.toNumber(this.vars.bmul)
          )
        ) - 1;
      this.vars.voff =
        this.toNumber(
          this.itemOf(
            this.vars.biomeData,
            4 +
              this.toNumber(this.stage.vars.Biomeid) *
                this.toNumber(this.vars.bmul)
          )
        ) - 3;
      this.vars.biometype = this.itemOf(
        this.vars.biomeData,
        2 +
          this.toNumber(this.stage.vars.Biomeid) * this.toNumber(this.vars.bmul)
      );
      this.vars.waterTileId = 38;
    } else {
      this.vars.vmul = 0;
      this.vars.voff = 1;
      this.vars.biometype = "N";
      this.vars.waterTileId = 81;
    }
    for (let i = 0; i < this.toNumber(this.stage.vars.Lsx); i++) {
      this.vars.t = Math.sin(
        this.degToRad(
          90 *
            Math.sin(
              this.degToRad(
                (180 / this.toNumber(this.stage.vars.Lsx)) *
                  this.vars.altitude.length
              )
            )
        )
      );
      if (this.toNumber(this.vars.gIsflat) === 1) {
        this.vars.gTyy = this.toNumber(this.vars.Waterlevel) + 4;
      } else {
        this.vars.gTyy =
          (5 + 4 * Math.sin(this.degToRad(2.11 * this.toNumber(this.vars.x)))) *
          Math.cos(this.degToRad(1.95 * this.toNumber(this.vars.x))) *
          Math.sin(this.degToRad(7 * this.toNumber(this.vars.x)));
        this.vars.gTyy =
          this.toNumber(this.vars.gTyy) -
          (2.64 * Math.cos(this.degToRad(4.1 * this.toNumber(this.vars.x))) +
            0.73 * Math.cos(this.degToRad(22 * this.toNumber(this.vars.x))));
        this.vars.gTyy =
          (1 + this.toNumber(this.vars.vmul) * this.toNumber(this.vars.t)) *
          this.toNumber(this.vars.gTyy);
        this.vars.gTyy =
          this.toNumber(this.vars.Waterlevel) +
          this.toNumber(this.vars.gTyy) +
          (3 + this.toNumber(this.vars.voff) * this.toNumber(this.vars.t));
      }
      if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
        this.vars.t2 = 999;
      } else {
        this.vars.t2 =
          (5 + 4 * Math.sin(this.degToRad(2.03 * this.toNumber(this.vars.x)))) *
          Math.cos(this.degToRad(-1.76 * this.toNumber(this.vars.x))) *
          Math.sin(this.degToRad(6.3 * this.toNumber(this.vars.x)));
        this.vars.t2 =
          this.toNumber(this.vars.t2) -
          (2.74 * Math.cos(this.degToRad(5.7 * this.toNumber(this.vars.x))) +
            0.78 * Math.cos(this.degToRad(-19.5 * this.toNumber(this.vars.x))));
        if (this.compare(this.vars.t2, -4) < 0) {
          this.vars.t2 = 3;
        } else {
          this.vars.t2 += 7;
        }
      }
      yield* this.makeNewStripCeiling(
        this.toNumber(this.vars.x) - this.toNumber(this.vars.seed),
        Math.round(this.toNumber(this.vars.gTyy)),
        this.vars.gTyy,
        Math.round(
          this.toNumber(this.vars.gTyy) +
            this.toNumber(this.vars.t2) -
            Math.round(this.toNumber(this.vars.gTyy))
        )
      );
      this.vars.altitude.push(Math.round(this.toNumber(this.vars.gTyy)));
      this.vars.x++;
      yield;
    }
    this.vars.altitude.push(this.stage.vars.Lsy);
  }

  *changeBackground(background) {
    this.stage.vars.Background = background;
    this.broadcast("Change Background");
  }

  *whenIReceiveInit() {
    this.watchers.SaveList.visible = false;
    yield* this.changeBackground("Wait - World");
    this.vars.bmul = 9;
    this.stage.vars.GenVersion = 1;
    if (this.keyPressed("z") && this.keyPressed("0")) {
      this.vars.seed = 0;
    } else {
      this.vars.seed = Math.round(this.random(2000, 998000));
    }
    this.stage.vars.ChunkSeed = this.vars.seed;
    this.stage.vars.Randomseed = this.vars.seed;
    this.stage.vars.Biomeid = 0;
    this.vars.rand = [];
    this.stage.vars.Random = [];
    yield* this.broadcastAndWait("Fill Random");
    yield* this.init(0);
    yield* this.storeOriginal();
    if (this.compare(this.stage.vars.ChunkSeed, 0) > 0) {
      yield* this.addDungeons();
      yield* this.spawnVillage();
    }
    this.stage.vars.Random = [];
    this.vars.altitude = [];
  }

  *spawnVillage() {
    if (
      !(this.toNumber(this.stage.vars.Biomeid) === 2) ||
      this.compare(this.random(1, 10), 6) > 0
    ) {
      return;
    }
    this.vars.x = this.random(10, this.toNumber(this.stage.vars.Lsx) * 0.6);
    this.vars.totalG = this.random(2, 6);
    this.vars.t2 = this.random(1, this.toNumber(this.vars.totalG));
    this.vars.yG = this.itemOf(this.vars.altitude, this.vars.x - 1);
    for (let i = 0; i < this.toNumber(this.vars.totalG); i++) {
      this.vars.t2--;
      if (this.toNumber(this.vars.t2) === 0) {
        yield* this.spawnHouseAtPadding(279, this.vars.x, 4, 4);
      } else {
        this.vars.i = this.random(1, 3);
        if (this.toNumber(this.vars.i) === 1) {
          yield* this.spawnHouseAtPadding(275, this.vars.x, 6, 6);
        }
        if (this.toNumber(this.vars.i) === 2) {
          yield* this.spawnHouseAtPadding(276, this.vars.x, 6, 8);
        }
        if (this.toNumber(this.vars.i) === 3) {
          yield* this.spawnHouseAtPadding(277, this.vars.x, 6, 6);
        }
      }
      yield;
    }
    yield* this.spawnHouseAtPadding(0, this.vars.x, 0, 0);
  }

  *spawnFromSeed(newChunk) {
    this.stage.vars.Randomseed = this.stage.vars.ChunkSeed;
    this.vars.seed = this.stage.vars.ChunkSeed;
    this.vars.rand = [];
    this.stage.vars.Random = [];
    yield* this.broadcastAndWait("Fill Random");
    this.stage.vars.Randidx = 1;
    yield* this.init(!null);
    yield* this.storeOriginal();
    if (newChunk) {
      yield* this.addDungeons();
      yield* this.spawnVillage();
    }
    this.stage.vars.Random = [];
    this.vars.altitude = [];
  }

  *clearLists() {
    this.stage.vars.Level = [];
    this.stage.vars.Levelref = [];
    this.stage.vars.Refdata = [];
    this.stage.vars.Refpool = [];
    this.vars.tree = [];
    this.stage.vars.Grow = [];
    this.stage.vars.Growtime = [];
    this.stage.vars.Light = [];
    this.stage.vars.Lightmod = [];
    this.stage.vars.Harvest = [];
    this.vars.Nextharvest = [];
    this.vars.caverns = [];
  }

  *whenIReceiveGreenFlag() {
    yield* this.clearLists();
    this.stage.vars.Inside = [];
    this.stage.vars.Mob = [];
    this.stage.vars.Inv = [];
    this.stage.vars.Lcopy = [];
    this.vars.debug = 0;
  }

  *freezeSurface(above) {
    this.vars.x = 1;
    for (let i = 0; i < this.toNumber(this.stage.vars.Lsx); i++) {
      this.vars.iZ3 =
        this.toNumber(this.vars.x) +
        (this.toNumber(this.stage.vars.Lsy) - 1) *
          this.toNumber(this.stage.vars.Lsx);
      this.vars.y = this.stage.vars.Lsy;
      while (
        !(
          this.compare(
            this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1),
            1
          ) > 0
        )
      ) {
        this.vars.iZ3 += this.toNumber(this.stage.vars.Lsxneg);
        this.vars.y--;
        yield;
      }
      if (this.compare(this.vars.y, above) > 0) {
        this.vars.t = this.itemOf(this.stage.vars.Level, this.vars.iZ3 - 1);
        if (this.toNumber(this.vars.t) === 38) {
          this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 287);
          this.stage.vars.Level.splice(
            this.toNumber(this.vars.iZ3) +
              this.toNumber(this.stage.vars.Lsx) -
              1,
            1,
            283
          );
        } else {
          if (
            !(
              this.toString(
                this.itemOf(
                  this.vars.undefined,
                  this.toNumber(this.vars.t) *
                    this.toNumber(this.stage.vars.Dmul) +
                    2
                )
              ) === "N"
            )
          ) {
            this.stage.vars.Level.splice(
              this.toNumber(this.vars.iZ3) +
                this.toNumber(this.stage.vars.Lsx) -
                1,
              1,
              283
            );
            if (this.toNumber(this.vars.t) === 2) {
              this.stage.vars.Level.splice(this.vars.iZ3 - 1, 1, 284);
            } else {
              null;
            }
          }
        }
      }
      this.vars.x++;
      yield;
    }
  }

  *initPrep(chunkLoad) {
    if (this.toNumber(this.stage.vars.Biomeid) === 0) {
      this.stage.vars.Randidx = 1;
      if (this.compare(this.vars.seed, 1000000) < 0) {
        yield* this.random2(1, 10, 0);
        this.stage.vars.Biomeid = this.itemOf(this.vars.rand, 0);
        if (this.compare(this.stage.vars.Biomeid, 8) > 0) {
          this.stage.vars.Biomeid = 2;
        }
      } else {
        this.stage.vars.Biomeid = 1000;
      }
    }
    this.stage.vars.Randidx = 50;
    yield* this.clearLists();
    this.vars.gWorldsize = 0;
    this.stage.vars.Lsx = 200;
    this.stage.vars.Lsy = 128;
    this.vars.Waterlevel = 57;
    this.vars.gIsflat = this.itemOf(this.stage.vars.Menu, 1);
    this.stage.vars.Lsxneg = 0 - this.toNumber(this.stage.vars.Lsx);
    this.stage.vars.Scrx = this.toNumber(this.stage.vars.Lsx) * 0.5;
    this.stage.vars.Scry = this.toNumber(this.stage.vars.Lsy) * 0.5;
    this.vars.dy = 0 - this.toNumber(this.stage.vars.Lsx);
    if (!chunkLoad) {
      this.stage.vars.X = Math.round(this.toNumber(this.stage.vars.Lsx) / 3);
      this.stage.vars.Y = Math.round(this.toNumber(this.stage.vars.Lsy) * 0.9);
    }
    if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
      this.vars.t = 4;
    } else {
      this.vars.t = 256;
    }
    for (
      let i = 0;
      i <
      this.toNumber(this.stage.vars.Lsx) * this.toNumber(this.stage.vars.Lsy);
      i++
    ) {
      this.stage.vars.Level.push(this.vars.t);
      this.stage.vars.Levelref.push("");
      this.stage.vars.Light.push(0);
      this.stage.vars.Light.push(0);
      yield;
    }
  }
}
