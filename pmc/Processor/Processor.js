/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Processor extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Processor", "./Processor/costumes/Processor.png", {
        x: 0,
        y: 0,
      }),
    ];

    this.sounds = [new Sound("meow", "./Processor/sounds/meow.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "go" }, this.whenIReceiveGo),
      new Trigger(
        Trigger.BROADCAST,
        { name: "toggle debug" },
        this.whenIReceiveToggleDebug
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "post chunk load" },
        this.whenIReceivePostChunkLoad
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "green flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "bring to life" },
        this.whenIReceiveBringToLife
      ),
      new Trigger(Trigger.BROADCAST, { name: "init3" }, this.whenIReceiveInit3),
    ];

    this.vars.tilePr = 3;
    this.vars.isblockPr = 1;
    this.vars.dirPr = "L";
    this.vars.nextsecond = 295;
    this.vars.refidxPr = 49;
    this.vars.refitPr = 1;
    this.vars.reftilePr = 11691;
    this.vars.refmodePr = 0;
    this.vars.y = 92;
    this.vars.sy = 1;
    this.vars.growidx = 999999;
    this.vars.checktilePr = 1;
    this.vars.flowdir = "N";
    this.vars.depth = 6;
    this.vars.tPr = 11.50382400000142;
    this.vars.canflow = 1;
    this.vars.basetile = 81;
    this.vars.x = 23068;
    this.vars.t2 = 12092;
    this.vars.sisTyp = "#";
    this.vars.countPr = 6;
    this.vars.flowbase = 0;
    this.vars.prDist = 15.659356117918124;
    this.vars.prHlIdx = 14000;
    this.vars.saturation = 1;
    this.vars.lighte = -12;
    this.vars.lights = -3;
    this.vars.lightw = -10;
    this.vars.lightn = 7;
    this.vars.gtI = 49;
    this.vars.iiC = 865;
    this.vars.data2 = 12881;
    this.vars.prTool = 0;
    this.vars.data = 11;
    this.vars.bringtolife = 0;
    this.vars.break = 0;
    this.vars.sgFull = 0;
    this.vars.sgI = 325;
    this.vars.sgRc = 1;
    this.vars.sgN = 2;
    this.vars.sgFormat = 2;
    this.vars.loadingchunk = 0;
    this.vars.chunkstart = 317;
    this.vars.sgType = 401;
    this.vars.sgNext = 325;
    this.vars.sgTileidx = 15031;
    this.vars.sgTile = 7;
    this.vars.assets = [
      "Village House",
      null,
      "Small House with Wheat",
      null,
      "Black Smith",
      null,
      "Well",
      null,
    ];
  }

  *hline(tileidx, tileid, count, replaceid) {
    this.vars.prHlIdx = tileidx;
    for (let i = 0; i < this.toNumber(count); i++) {
      if (
        !(
          this.compare(
            tileid,
            this.itemOf(this.stage.vars.Level, this.vars.prHlIdx - 1)
          ) === 0
        )
      ) {
        if (
          this.toNumber(replaceid) === 0 ||
          this.compare(
            replaceid,
            this.itemOf(this.stage.vars.Level, this.vars.prHlIdx - 1)
          ) === 0
        ) {
          this.stage.vars.Level.splice(this.vars.prHlIdx - 1, 1, tileid);
        }
      }
      this.vars.prHlIdx++;
    }
  }

  *processBurn(refidx, tileidx, tile) {
    if (
      this.toNumber(tile) === 48 ||
      this.compare(
        this.timer,
        this.itemOf(this.stage.vars.Refdata, this.toNumber(refidx) + 2)
      ) > 0
    ) {
      this.vars.tPr = this.itemOf(
        this.stage.vars.Refdata,
        this.toNumber(refidx) + 1
      );
      this.vars.t2 = this.itemOf(
        this.stage.vars.Inside,
        this.toNumber(this.vars.tPr) + 2
      );
      this.vars.isblockPr = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.t2) * this.toNumber(this.stage.vars.Dmul) + 12
      );
      if (
        this.toString(this.vars.t2) === "#" ||
        this.toNumber(this.vars.isblockPr) === 0
      ) {
        if (this.toNumber(tile) === 49) {
          this.stage.vars.Level.splice(tileidx - 1, 1, 48);
          this.warp(this.deactivateTile)(refidx);
          this.warp(this.addToLightMod)(
            this.toNumber(tileidx) + this.stage.vars.Level.length
          );
        }
      } else {
        this.stage.vars.Level.splice(tileidx - 1, 1, 49);
        this.warp(this.addToLightMod)(
          this.toNumber(tileidx) + this.stage.vars.Level.length
        );
        this.stage.vars.Refdata.splice(
          this.toNumber(refidx) + 4,
          1,
          this.vars.isblockPr
        );
        this.stage.vars.Refdata.splice(
          this.toNumber(refidx) + 2,
          1,
          this.timer + this.toNumber(this.vars.isblockPr)
        );
        if (this.toNumber(tile) === 48) {
          this.stage.vars.Refdata.splice(
            this.toNumber(refidx) + 3,
            1,
            this.timer + 10
          );
        }
        if (
          1 ===
          this.toNumber(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(this.vars.t2) *
                this.toNumber(this.stage.vars.Dmul) +
                9
            )
          )
        ) {
          this.warp(this.setInside)(this.vars.tPr, 1, 0, 0);
        } else {
          this.warp(this.setInside)(
            this.vars.tPr,
            1,
            0,
            this.toNumber(
              this.itemOf(
                this.stage.vars.Inside,
                this.toNumber(this.vars.tPr) + 3
              )
            ) - 1
          );
        }
      }
    }
    if (this.toNumber(tile) === 49) {
      this.vars.tPr = this.itemOf(
        this.stage.vars.Refdata,
        this.toNumber(refidx) + 1
      );
      this.vars.t2 = this.itemOf(
        this.stage.vars.Inside,
        this.toNumber(this.vars.tPr) + 4
      );
      this.vars.isblockPr = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.t2) * this.toNumber(this.stage.vars.Dmul) + 11
      );
      if (
        this.toString(this.vars.t2) === "#" ||
        this.toNumber(this.vars.isblockPr) === 0
      ) {
        this.stage.vars.Refdata.splice(
          this.toNumber(refidx) + 3,
          1,
          this.timer + 10
        );
      } else {
        this.vars.tilePr = this.itemOf(
          this.stage.vars.Inside,
          this.toNumber(this.vars.tPr) + 6
        );
        this.vars.depth = this.itemOf(
          this.stage.vars.Inside,
          this.toNumber(this.vars.tPr) + 7
        );
        if (
          (this.toString(this.vars.tilePr) === "#" ||
            this.compare(this.vars.tilePr, this.vars.isblockPr) === 0) &&
          this.compare(this.vars.depth, 64) < 0
        ) {
          if (
            this.compare(
              this.timer,
              this.itemOf(this.stage.vars.Refdata, this.toNumber(refidx) + 3)
            ) > 0
          ) {
            this.warp(this.setInside)(
              this.vars.tPr,
              3,
              this.vars.isblockPr,
              this.toNumber(this.vars.depth) + 1
            );
            this.warp(this.setInside)(
              this.vars.tPr,
              2,
              0,
              this.toNumber(
                this.itemOf(
                  this.stage.vars.Inside,
                  this.toNumber(this.vars.tPr) + 5
                )
              ) - 1
            );
            this.stage.vars.Refdata.splice(
              this.toNumber(refidx) + 3,
              1,
              this.timer + 10
            );
          }
        } else {
          this.stage.vars.Refdata.splice(
            this.toNumber(refidx) + 3,
            1,
            this.timer + 10
          );
        }
      }
    }
  }

  *doBlockFall(refidx, dontsetfall) {
    this.vars.y = this.itemOf(
      this.stage.vars.Refdata,
      this.toNumber(refidx) + 1
    );
    this.vars.sy = this.itemOf(
      this.stage.vars.Refdata,
      this.toNumber(refidx) + 2
    );
    for (let i = 0; i < this.toNumber(this.stage.vars.Ticks); i++) {
      this.vars.sy -= 0.04;
      if (this.compare(this.vars.sy, -0.4) < 0) {
        this.vars.sy = -0.4;
      }
      this.vars.y += this.toNumber(this.vars.sy);
    }
    if (this.compare(this.vars.y, 0) < 0) {
      this.warp(this.initiateBlockFall)(refidx, !null, dontsetfall);
    } else {
      this.stage.vars.Refdata.splice(this.toNumber(refidx) + 1, 1, this.vars.y);
      this.stage.vars.Refdata.splice(
        this.toNumber(refidx) + 2,
        1,
        this.vars.sy
      );
    }
  }

  *activateBlocksAround(idx, notdiags) {
    this.warp(this.collateralChecksPr)(
      this.toNumber(idx) - this.toNumber(this.stage.vars.Lsx),
      0,
      0
    );
    this.warp(this.collateralChecksPr)(this.toNumber(idx) - 1, 0, 0);
    this.warp(this.collateralChecksPr)(idx, 0, 0);
    this.warp(this.collateralChecksPr)(this.toNumber(idx) + 1, 0, 0);
    this.warp(this.collateralChecksPr)(
      this.toNumber(idx) + this.toNumber(this.stage.vars.Lsx),
      0,
      0
    );
    if (!notdiags) {
      this.warp(this.collateralChecksPr)(
        this.toNumber(idx) - this.toNumber(this.stage.vars.Lsx) + -1,
        0,
        0
      );
      this.warp(this.collateralChecksPr)(
        this.toNumber(idx) - this.toNumber(this.stage.vars.Lsx) + 1,
        0,
        0
      );
      this.warp(this.collateralChecksPr)(
        this.toNumber(idx) + this.toNumber(this.stage.vars.Lsx) + -1,
        0,
        0
      );
      this.warp(this.collateralChecksPr)(
        this.toNumber(idx) + this.toNumber(this.stage.vars.Lsx) + 1,
        0,
        0
      );
    }
  }

  *processFlowingTile(reftile, tile) {
    this.vars.tilePr = this.itemOf(
      this.stage.vars.Level,
      this.toNumber(reftile) - this.toNumber(this.stage.vars.Lsx) - 1
    );
    if (this.compare(tile, 39) < 0) {
      this.vars.basetile = 38;
    } else {
      this.vars.basetile = 81;
    }
    this.warp(this.isblockPr)(this.vars.tilePr, 0);
    this.warp(this.getWaterStats)(this.vars.tilePr);
    if (
      this.compare(this.vars.flowbase, 0) > 0 &&
      !(this.compare(this.vars.flowbase, this.vars.basetile) === 0)
    ) {
      this.warp(this.deactivateTile)(
        this.itemOf(
          this.stage.vars.Levelref,
          this.toNumber(reftile) - this.toNumber(this.stage.vars.Lsx) - 1
        )
      );
      if (this.toNumber(this.vars.basetile) === 81) {
        this.warp(this.replaceTile)(
          this.toNumber(reftile) - this.toNumber(this.stage.vars.Lsx),
          4,
          !null,
          0
        );
      } else {
        if (this.toString(this.vars.flowdir) === ".") {
          this.warp(this.replaceTile)(
            this.toNumber(reftile) - this.toNumber(this.stage.vars.Lsx),
            52,
            !null,
            0
          );
        } else {
          this.warp(this.replaceTile)(
            this.toNumber(reftile) - this.toNumber(this.stage.vars.Lsx),
            41,
            !null,
            0
          );
        }
      }
      return;
    }
    this.vars.canflow = 0;
    if (
      this.toNumber(this.vars.isblockPr) === 1 ||
      this.toString(this.vars.flowdir) === "."
    ) {
      this.vars.canflow = 1;
    }
    if (
      this.toNumber(this.vars.isblockPr) === 0 &&
      this.compare(this.vars.depth, 9) < 0
    ) {
      this.warp(this.deactivateTile)(
        this.itemOf(
          this.stage.vars.Levelref,
          this.toNumber(reftile) - this.toNumber(this.stage.vars.Lsx) - 1
        )
      );
      this.warp(this.replaceTile)(
        this.toNumber(reftile) - this.toNumber(this.stage.vars.Lsx),
        this.toNumber(this.vars.basetile) - 1,
        !null,
        0
      );
    }
    this.warp(this.getWaterStats)(tile);
    if (!(this.toString(this.vars.flowdir) === ".")) {
      if (this.toString(this.vars.flowdir) === "D") {
        this.warp(this.getWaterStats)(
          this.itemOf(
            this.stage.vars.Level,
            this.toNumber(reftile) + this.toNumber(this.stage.vars.Lsx) - 1
          )
        );
        if (this.toNumber(this.vars.depth) === 0) {
          this.warp(this.replaceTile)(reftile, 1, !null, 0);
          return;
        }
      } else {
        this.vars.tPr = this.vars.depth;
        if (this.toString(this.vars.flowdir) === "L") {
          this.warp(this.getWaterStats)(
            this.itemOf(this.stage.vars.Level, this.toNumber(reftile))
          );
          this.vars.tilePr = this.itemOf(
            this.stage.vars.Level,
            this.toNumber(reftile) - this.toNumber(this.stage.vars.Lsx)
          );
        } else {
          this.warp(this.getWaterStats)(
            this.itemOf(this.stage.vars.Level, this.toNumber(reftile) - 2)
          );
          this.vars.tilePr = this.itemOf(
            this.stage.vars.Level,
            this.toNumber(reftile) - this.toNumber(this.stage.vars.Lsx) - 2
          );
        }
        if (!(this.compare(this.vars.depth, this.vars.tPr) > 0)) {
          if (
            this.toNumber(this.vars.basetile) === 81 &&
            this.compare(this.random(1, 5), 1) > 0
          ) {
            this.stage.vars.Grow.splice(0, 0, reftile);
            this.stage.vars.Growtime.splice(
              0,
              0,
              this.toNumber(this.stage.vars.Timereal) + 0.4
            );
            this.vars.growidx++;
          } else {
            this.warp(this.replaceTile)(reftile, 1, !null, 0);
          }
          return;
        }
        this.warp(this.isblockPr)(this.vars.tilePr, 0);
        this.warp(this.getWaterStats)(this.vars.tilePr);
        if (
          !(
            this.toNumber(this.vars.isblockPr) === 1 ||
            this.toString(this.vars.flowdir) === "."
          )
        ) {
          this.warp(this.replaceTile)(reftile, 1, !null, 0);
          return;
        }
      }
    }
    if (this.toNumber(this.vars.canflow) === 1) {
      this.warp(this.getWaterStats)(tile);
      if (this.compare(this.vars.depth, 2) < 0) {
        return;
      }
      this.vars.tPr = this.toNumber(this.vars.depth) - 1;
      this.vars.dirPr = this.vars.flowdir;
      if (!(this.toString(this.vars.dirPr) === "R")) {
        this.warp(this.flowSideways)(this.toNumber(reftile) - 1, 18);
      }
      if (!(this.toString(this.vars.dirPr) === "L")) {
        this.warp(this.flowSideways)(this.toNumber(reftile) + 1, 10);
      }
    }
  }

  *whenIReceiveGo() {
    while (true) {
      if (this.keyPressed("p")) {
        yield* this.broadcastAndWait("paused");
      }
      if (this.keyPressed("t") && this.toNumber(this.stage.vars.Mode) === 0) {
        yield* this.broadcastAndWait("talk");
      }
      if (this.keyPressed("o")) {
        yield* this.broadcastAndWait("save game");
      }
      yield* this.gametick(0);
      yield* this.doDayNightCycle();
      if (this.compare(this.stage.vars.X, 0.5) < 0) {
        yield* this.broadcastAndWait("save chunk");
        this.stage.vars.ChunkSeed += 2 - this.toNumber(this.stage.vars.Lsx);
        this.stage.vars.X += this.toNumber(this.stage.vars.Lsx) - 2;
        yield* this.broadcastAndWait("load chunk");
      }
      if (
        this.compare(
          this.stage.vars.X,
          this.toNumber(this.stage.vars.Lsx) - 0.5
        ) > 0
      ) {
        yield* this.broadcastAndWait("save chunk");
        this.stage.vars.ChunkSeed += this.toNumber(this.stage.vars.Lsx) - 2;
        this.stage.vars.X += 2 - this.toNumber(this.stage.vars.Lsx);
        yield* this.broadcastAndWait("load chunk");
      }
      this.stage.vars.throttle = 100;
      yield* this.broadcastAndWait("animate");
      if (
        (this.toNumber(this.stage.vars.Keydelaytrick) === 0 ||
          this.compare(this.stage.vars.keydelay, 0) > 0) &&
        this.toNumber(this.stage.vars.Mode) === 0
      ) {
        if (this.toNumber(this.stage.vars.Forcedelay) === 1) {
          yield* this.wait(0.001);
        }
        if (this.toNumber(this.stage.vars.Forcedelay) === 2) {
          yield* this.wait(0.01);
        }
        this.stage.vars.keydelay -= 0.2;
      }
      yield;
    }
  }

  *checkNearWood(refidx, tileidx) {
    this.vars.countPr = 0;
    this.vars.refidxPr =
      this.toNumber(tileidx) - 2 * this.toNumber(this.stage.vars.Lsx) - 1;
    for (let i = 0; i < 3; i++) {
      this.warp(this.isWoodBlock)(
        this.itemOf(this.stage.vars.Level, this.vars.refidxPr - 1)
      );
      this.vars.refidxPr++;
    }
    this.vars.refidxPr += this.toNumber(this.stage.vars.Lsx) - 4;
    for (let i = 0; i < 3; i++) {
      for (let i = 0; i < 5; i++) {
        this.warp(this.isWoodBlock)(
          this.itemOf(this.stage.vars.Level, this.vars.refidxPr - 1)
        );
        this.vars.refidxPr++;
      }
      this.vars.refidxPr += this.toNumber(this.stage.vars.Lsx) - 5;
    }
    this.vars.refidxPr++;
    for (let i = 0; i < 3; i++) {
      this.warp(this.isWoodBlock)(
        this.itemOf(this.stage.vars.Level, this.vars.refidxPr - 1)
      );
      this.vars.refidxPr++;
    }
    if (this.toNumber(this.vars.countPr) === 0) {
      this.warp(this.addToGrow)(tileidx, 1);
    }
    this.warp(this.deactivateTile)(refidx);
  }

  *growSapling(tileidx, tileid) {
    this.vars.reftilePr = tileidx;
    if (this.toNumber(tileid) === 55) {
      this.vars.gtI = this.random(1, 20);
      if (this.toNumber(this.vars.gtI) === 1) {
        this.warp(this.growTree)(
          8,
          9,
          10,
          100,
          11,
          "45 00000700000 11 00000776100 11 00003656553 11 00076655655 11 00755655651 11 15556651100 11 15556550000 11 01556510000 11 00111100000"
        );
      } else {
        this.warp(this.growTree)(
          8,
          9,
          10,
          100,
          5,
          "13 00700 11 45654 11 35653 11 04640 11 03630"
        );
      }
    } else {
      if (this.toNumber(tileid) === 176) {
        this.warp(this.growTree)(
          179,
          181,
          182,
          183,
          5,
          "13 00700 11 45654 11 25652 11 04640 11 02620 11 00100"
        );
      } else {
        if (this.toNumber(tileid) === 175) {
          this.vars.gtI = this.random(1, 4);
          if (this.toNumber(this.vars.gtI) === 1) {
            this.warp(this.growTree)(
              178,
              184,
              185,
              186,
              5,
              "12 00700 11 55655 11 05650 11 55655 11 01610 11 00600 11 01610 11 00100"
            );
          } else {
            if (this.toNumber(this.vars.gtI) === 2) {
              this.warp(this.growTree)(
                178,
                184,
                185,
                186,
                5,
                "11 00700 11 55655 11 05650 11 55655 11 05650 11 55655 11 01610 11 00600 11 01610 11 00100"
              );
            } else {
              if (this.toNumber(this.vars.gtI) === 3) {
                this.warp(this.growTree)(
                  178,
                  184,
                  185,
                  186,
                  5,
                  "11 00700 11 01610 11 55655 11 05650 11 55655 11 01610 11 00600 11 01610 11 00100"
                );
              } else {
                this.warp(this.growTree)(
                  178,
                  184,
                  185,
                  186,
                  3,
                  "49 070 33 565 11 050"
                );
              }
            }
          }
        } else {
          if (this.toNumber(tileid) === 177) {
            this.warp(this.growTree)(
              180,
              187,
              188,
              189,
              5,
              "37 00700 11 45654 11 35653 11 04640 11 03630"
            );
          } else {
            if (this.toNumber(tileid) === 45) {
              this.warp(this.growTree)(
                253,
                252,
                0,
                0,
                5,
                "23 00700 33 55555 11 05550"
              );
            } else {
              if (this.toNumber(tileid) === 46) {
                this.warp(this.growTree)(
                  253,
                  254,
                  0,
                  0,
                  7,
                  "58 0007000 11 5555555"
                );
              } else {
                null;
              }
            }
          }
        }
      }
    }
  }

  *growTree(trunkid, leavesid, leaves2id, leavestrunkid, width, pattern) {
    this.vars.gtI = 4;
    this.vars.reftilePr += (this.toNumber(width) - 1) * -0.5;
    while (!(this.compare(this.vars.gtI, pattern.length) > 0)) {
      for (
        let i = 0;
        i <
        this.random(
          this.toNumber(
            this.letterOf(pattern, this.toNumber(this.vars.gtI) - 4)
          ),
          this.toNumber(
            this.letterOf(pattern, this.toNumber(this.vars.gtI) - 3)
          )
        );
        i++
      ) {
        for (let i = 0; i < this.toNumber(width); i++) {
          this.vars.tPr = this.letterOf(pattern, this.vars.gtI - 1);
          if (this.compare(this.vars.tPr, 0) > 0) {
            if (this.compare(this.vars.tPr, 6) < 0) {
              this.vars.t2 = this.itemOf(
                this.vars.undefined,
                this.toNumber(
                  this.itemOf(this.stage.vars.Level, this.vars.reftilePr - 1)
                ) *
                  this.toNumber(this.stage.vars.Dmul) +
                  18
              );
              if (
                this.toNumber(this.vars.t2) === 1 ||
                this.toNumber(this.vars.t2) === 10
              ) {
                if (
                  this.compare(
                    this.random(0, 3),
                    5 - this.toNumber(this.vars.tPr)
                  ) < 0
                ) {
                  this.stage.vars.Level.splice(
                    this.vars.reftilePr - 1,
                    1,
                    leaves2id
                  );
                } else {
                  if (
                    this.toNumber(leavesid) === 9 &&
                    this.random(1, 80) === 1
                  ) {
                    this.stage.vars.Level.splice(
                      this.vars.reftilePr - 1,
                      1,
                      115
                    );
                  } else {
                    this.stage.vars.Level.splice(
                      this.vars.reftilePr - 1,
                      1,
                      leavesid
                    );
                  }
                }
              }
            } else {
              if (this.toNumber(this.vars.tPr) === 6) {
                this.stage.vars.Level.splice(
                  this.vars.reftilePr - 1,
                  1,
                  leavestrunkid
                );
              } else {
                this.stage.vars.Level.splice(
                  this.vars.reftilePr - 1,
                  1,
                  trunkid
                );
              }
              this.warp(this.addToLightMod)(this.vars.reftilePr);
            }
          }
          this.vars.reftilePr++;
          this.vars.gtI++;
        }
        this.vars.reftilePr +=
          this.toNumber(this.stage.vars.Lsx) - this.toNumber(width);
        this.vars.gtI += 0 - this.toNumber(width);
      }
      this.vars.gtI += this.toNumber(width) + 4;
    }
  }

  *bringToLife() {
    this.vars.growidx = 1;
    this.vars.bringtolife = 3000;
    this.warp(this.gametick)(!null);
    while (
      !(
        (this.stage.vars.Refdata.length === 0 &&
          this.stage.vars.Lightmod.length === 0 &&
          this.stage.vars.Grow.length === 0) ||
        this.compare(this.vars.bringtolife, 1) < 0
      )
    ) {
      this.vars.bringtolife--;
      this.warp(this.gametick)(!null);
    }
  }

  *isWoodBlock(tile) {
    if (
      10 ===
      this.toNumber(
        this.itemOf(
          this.vars.undefined,
          this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 9
        )
      )
    ) {
      this.vars.countPr++;
    }
  }

  *getXY(idx) {
    this.vars.y = Math.floor(
      (this.toNumber(idx) - 1) / this.toNumber(this.stage.vars.Lsx)
    );
    this.vars.x = (this.toNumber(idx) - 1) % this.toNumber(this.stage.vars.Lsx);
  }

  *getIllumination(tileidx) {
    this.vars.prDist =
      this.toNumber(this.itemOf(this.stage.vars.Light, tileidx - 1)) -
      this.toNumber(this.stage.vars.Glight);
    this.vars.tPr = this.itemOf(
      this.stage.vars.Light,
      this.toNumber(tileidx) + this.stage.vars.Level.length - 1
    );
    if (this.compare(this.vars.tPr, this.vars.prDist) < 0) {
      this.vars.tPr = this.vars.prDist;
    }
  }

  *getSaturation(tileidx, width) {
    this.vars.saturation = 0;
    this.vars.x = 1;
    for (let i = 0; i < this.toNumber(width); i++) {
      this.vars.y = this.itemOf(
        this.stage.vars.Level,
        this.toNumber(tileidx) - this.toNumber(this.vars.x) - 1
      );
      if (
        this.compare(this.vars.y, 20) > 0 &&
        this.compare(this.vars.y, 39) < 0
      ) {
        this.vars.saturation = 1;
        return;
      }
      this.vars.y = this.itemOf(
        this.stage.vars.Level,
        this.toNumber(tileidx) + this.toNumber(this.vars.x) - 1
      );
      if (
        this.compare(this.vars.y, 20) > 0 &&
        this.compare(this.vars.y, 39) < 0
      ) {
        this.vars.saturation = 1;
        return;
      }
      this.vars.x++;
    }
  }

  *doDayNightCycle() {
    this.stage.vars.Time += this.toNumber(this.stage.vars.Ticks) * 0.0333;
    this.stage.vars.Timereal = this.stage.vars.Time;
    this.vars.tPr = (this.toNumber(this.stage.vars.Time) / 50) % 24;
    if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
      this.stage.vars.Glight = 0;
      if (this.compare(this.vars.tPr, 4.5) < 0) {
        this.stage.vars.Glight = 12;
      } else {
        if (this.compare(this.vars.tPr, 6) < 0) {
          this.stage.vars.Glight =
            12 - Math.round((this.toNumber(this.vars.tPr) - 4.5) * 8);
        } else {
          if (this.compare(this.vars.tPr, 18) < 0) {
            this.stage.vars.Glight = 0;
          } else {
            if (this.compare(this.vars.tPr, 19.5) < 0) {
              this.stage.vars.Glight =
                12 - Math.round((19.5 - this.toNumber(this.vars.tPr)) * 8);
            } else {
              this.stage.vars.Glight = 12;
            }
          }
        }
      }
    } else {
      this.stage.vars.Glight = 12;
    }
  }

  *detinate(refidx, tileidx, init) {
    if (init) {
      if (
        this.letterOf(
          this.itemOf(this.stage.vars.Refdata, this.toNumber(refidx)),
          0
        ) === "X"
      ) {
        this.stage.vars.Refdata.splice(this.toNumber(refidx) + 4, 1, 1);
        if (
          this.itemOf(this.stage.vars.Refdata, this.toNumber(refidx)).length ===
          1
        ) {
          this.stage.vars.Refdata.splice(
            this.toNumber(refidx) + 3,
            1,
            this.timer + this.random(2.5, 3.1)
          );
        } else {
          this.stage.vars.Refdata.splice(
            this.toNumber(refidx) + 3,
            1,
            this.timer + this.random(0.5, 1.5)
          );
        }
      } else {
        this.stage.vars.Refdata.splice(this.toNumber(refidx) + 4, 1, 3);
        this.stage.vars.Refdata.splice(
          this.toNumber(refidx) + 3,
          1,
          this.timer + 1
        );
      }
      this.stage.vars.Refdata.splice(this.toNumber(refidx), 1, "D");
      this.warp(this.initiateBlockFall)(refidx, 0, !null);
    } else {
      if (
        this.compare(
          this.timer,
          this.itemOf(this.stage.vars.Refdata, this.toNumber(refidx) + 3)
        ) < 0
      ) {
        if (this.compare((this.timer * 6) % 3, 1) < 0) {
          this.stage.vars.Level.splice(tileidx - 1, 1, 116);
        } else {
          this.stage.vars.Level.splice(tileidx - 1, 1, 18);
        }
      } else {
        this.stage.vars.Refdata.splice(
          this.toNumber(refidx) + 3,
          1,
          this.timer + 1
        );
        this.vars.tPr =
          this.toNumber(
            this.itemOf(this.stage.vars.Refdata, this.toNumber(refidx) + 4)
          ) - 1;
        if (this.compare(this.vars.tPr, 0) > 0) {
          this.stage.vars.Refdata.splice(
            this.toNumber(refidx) + 4,
            1,
            this.vars.tPr
          );
        } else {
          this.warp(this.deactivateTile)(refidx);
          this.warp(this.replaceTile)(tileidx, 1, 0, 0);
          this.warp(this.getXY)(tileidx);
          this.warp(this.explodeCirclePr)(this.vars.x, this.vars.y, 3.5, 0);
          return;
        }
      }
      this.warp(this.doBlockFall)(refidx, !null);
    }
  }

  *initiateBlockFall(refidx, continued, dontsetfall) {
    this.vars.reftilePr = this.itemOf(
      this.stage.vars.Refdata,
      this.toNumber(refidx) + -1
    );
    this.vars.tilePr = this.itemOf(
      this.stage.vars.Level,
      this.vars.reftilePr - 1
    );
    this.warp(this.isblockPr)(
      this.itemOf(
        this.stage.vars.Level,
        this.toNumber(this.vars.reftilePr) -
          this.toNumber(this.stage.vars.Lsx) -
          1
      ),
      0
    );
    if (this.compare(this.vars.isblockPr, 0) > 0) {
      if (dontsetfall) {
        this.stage.vars.Refdata.splice(this.toNumber(refidx) + 1, 1, 0);
        this.stage.vars.Refdata.splice(this.toNumber(refidx) + 2, 1, 0);
      } else {
        this.warp(this.deactivateTile)(refidx);
      }
    } else {
      this.warp(this.deactivateTile)(
        this.itemOf(
          this.stage.vars.Levelref,
          this.toNumber(this.vars.reftilePr) -
            this.toNumber(this.stage.vars.Lsx) -
            1
        )
      );
      this.warp(this.replaceTile)(
        this.toNumber(this.vars.reftilePr) - this.toNumber(this.stage.vars.Lsx),
        this.vars.tilePr,
        0,
        0
      );
      this.stage.vars.Levelref.splice(
        this.toNumber(this.vars.reftilePr) -
          this.toNumber(this.stage.vars.Lsx) -
          1,
        1,
        refidx
      );
      this.stage.vars.Levelref.splice(this.vars.reftilePr - 1, 1, "");
      this.stage.vars.Refdata.splice(
        this.toNumber(refidx) + -1,
        1,
        this.toNumber(this.vars.reftilePr) - this.toNumber(this.stage.vars.Lsx)
      );
      this.warp(this.replaceTile)(this.vars.reftilePr, 1, 0, 0);
      if (!dontsetfall) {
        this.stage.vars.Refdata.splice(this.toNumber(refidx), 1, "f");
      }
      if (continued) {
        this.stage.vars.Refdata.splice(
          this.toNumber(refidx) + 1,
          1,
          this.toNumber(this.vars.y) + 1.0000000002328306
        );
      } else {
        this.stage.vars.Refdata.splice(this.toNumber(refidx) + 1, 1, 1);
        this.stage.vars.Refdata.splice(this.toNumber(refidx) + 2, 1, 0);
        this.warp(this.collateralChecksPr)(
          this.toNumber(this.vars.reftilePr) +
            this.toNumber(this.stage.vars.Lsx),
          0,
          0
        );
      }
    }
  }

  *isblockPr(typ, or) {
    if (
      this.compare(
        this.itemOf(
          this.vars.undefined,
          this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 3
        ),
        0
      ) > 0
    ) {
      this.vars.isblockPr = 1;
    } else {
      if (!or) {
        this.vars.isblockPr = 0;
      }
    }
  }

  *activateRedstone(refidx, reftile, tile, opt) {
    if (
      !(this.toString(opt) === "o") ||
      this.compare(
        this.timer,
        this.itemOf(this.stage.vars.Refdata, this.toNumber(refidx) + 3)
      ) > 0
    ) {
      this.vars.depth = this.timer + 2;
      if (this.toNumber(tile) === 193 || this.toNumber(tile) === 233) {
        if (this.toString(opt) === "r") {
          this.warp(this.activateRepeater)(refidx, reftile, tile, opt);
        } else {
          null;
        }
      } else {
        if (
          190 ===
          this.toNumber(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 18
            )
          )
        ) {
          if (this.toNumber(tile) === 190) {
            this.warp(this.pistonExtend)(
              refidx,
              reftile,
              tile,
              this.stage.vars.Lsx,
              0,
              1
            );
          } else {
            if (this.toNumber(tile) === 191) {
              this.warp(this.pistonContract)(
                refidx,
                reftile,
                tile,
                this.stage.vars.Lsx,
                0,
                -1
              );
            } else {
              if (this.toNumber(tile) === 206) {
                this.warp(this.pistonExtend)(
                  refidx,
                  reftile,
                  tile,
                  this.stage.vars.Lsxneg,
                  0,
                  -1
                );
              } else {
                if (this.toNumber(tile) === 207) {
                  this.warp(this.pistonContract)(
                    refidx,
                    reftile,
                    tile,
                    this.stage.vars.Lsxneg,
                    0,
                    1
                  );
                } else {
                  if (this.toNumber(tile) === 227) {
                    this.warp(this.pistonExtend)(
                      refidx,
                      reftile,
                      tile,
                      1,
                      1,
                      0
                    );
                  } else {
                    if (this.toNumber(tile) === 228) {
                      this.warp(this.pistonContract)(
                        refidx,
                        reftile,
                        tile,
                        1,
                        -1,
                        0
                      );
                    } else {
                      if (this.toNumber(tile) === 230) {
                        this.warp(this.pistonExtend)(
                          refidx,
                          reftile,
                          tile,
                          -1,
                          -1,
                          0
                        );
                      } else {
                        if (this.toNumber(tile) === 231) {
                          this.warp(this.pistonContract)(
                            refidx,
                            reftile,
                            tile,
                            -1,
                            1,
                            0
                          );
                        } else {
                          this.warp(this.deactivateTile)(refidx);
                          return;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          if (this.toNumber(tile) === 121 || this.toNumber(tile) === 223) {
            if (this.toNumber(tile) === 121) {
              this.warp(this.toggleDoor)(refidx, reftile, tile, 57, !null);
            } else {
              this.warp(this.toggleDoor)(refidx, reftile, tile, 221, !null);
            }
          } else {
            if (this.toNumber(tile) === 57 || this.toNumber(tile) === 221) {
              if (this.toNumber(tile) === 57) {
                this.warp(this.toggleDoor)(refidx, reftile, tile, 121, !null);
              } else {
                this.warp(this.toggleDoor)(refidx, reftile, tile, 223, !null);
              }
            } else {
              if (this.toNumber(tile) === 264 || this.toNumber(tile) === 265) {
                this.warp(this.toggleDoor)(
                  refidx,
                  reftile,
                  tile,
                  529 - this.toNumber(tile),
                  0
                );
                if (this.toString(opt) === "t") {
                  this.vars.depth = this.timer + 0.3;
                }
              } else {
                if (
                  this.compare(tile, 197) > 0 &&
                  this.compare(tile, 206) < 0
                ) {
                  if (this.toString(opt) === "t") {
                    if (this.compare(tile, 204) < 0) {
                      this.stage.vars.Level.splice(
                        reftile - 1,
                        1,
                        this.toNumber(tile) + 2
                      );
                    } else {
                      this.stage.vars.Level.splice(
                        reftile - 1,
                        1,
                        this.toNumber(tile) - 6
                      );
                    }
                  } else {
                    if (this.toNumber(tile) % 2 === 0) {
                      this.warp(this.replaceTile)(
                        reftile,
                        this.toNumber(tile) + 1,
                        0,
                        0
                      );
                      this.stage.vars.Refdata.splice(
                        this.toNumber(refidx),
                        1,
                        "o"
                      );
                      this.stage.vars.Refdata.splice(
                        this.toNumber(refidx) + 3,
                        1,
                        this.timer + 0.25 * (this.toNumber(tile) - 197)
                      );
                      this.stage.vars.Refdata.splice(
                        this.toNumber(refidx) + 4,
                        1,
                        0
                      );
                      return;
                    } else {
                      if (
                        this.toNumber(
                          this.itemOf(
                            this.stage.vars.Refdata,
                            this.toNumber(refidx) + 4
                          )
                        ) === 1
                      ) {
                        this.warp(this.replaceTile)(
                          reftile,
                          this.toNumber(tile) - 1,
                          0,
                          0
                        );
                      } else {
                        this.warp(this.activateRepeater)(
                          refidx,
                          reftile,
                          tile,
                          "r" + ""
                        );
                        this.stage.vars.Refdata.splice(
                          this.toNumber(refidx) + 3,
                          1,
                          this.vars.depth
                        );
                        this.stage.vars.Refdata.splice(
                          this.toNumber(refidx) + 4,
                          1,
                          1
                        );
                        return;
                      }
                    }
                  }
                } else {
                  if (
                    this.compare(tile, 208) > 0 &&
                    this.compare(tile, 217) < 0
                  ) {
                    if (this.toString(opt) === "t") {
                      if (this.compare(tile, 215) < 0) {
                        this.stage.vars.Level.splice(
                          reftile - 1,
                          1,
                          this.toNumber(tile) + 2
                        );
                      } else {
                        this.stage.vars.Level.splice(
                          reftile - 1,
                          1,
                          this.toNumber(tile) - 6
                        );
                      }
                    } else {
                      if (this.toNumber(tile) % 2 === 1) {
                        this.warp(this.replaceTile)(
                          reftile,
                          this.toNumber(tile) + 1,
                          0,
                          0
                        );
                        this.warp(this.activateRepeater)(
                          refidx,
                          reftile,
                          tile,
                          "r" + ""
                        );
                      } else {
                        this.warp(this.replaceTile)(
                          reftile,
                          this.toNumber(tile) - 1,
                          0,
                          0
                        );
                      }
                    }
                  } else {
                    if (
                      this.compare(tile, 249) > 0 &&
                      this.compare(tile, 252) < 0
                    ) {
                      if (this.toString(opt) === "t") {
                        null;
                      } else {
                        if (this.toNumber(tile) % 2 === 0) {
                          this.warp(this.replaceTile)(
                            reftile,
                            this.toNumber(tile) + 1,
                            0,
                            0
                          );
                          this.stage.vars.Refdata.splice(
                            this.toNumber(refidx),
                            1,
                            "o"
                          );
                          this.stage.vars.Refdata.splice(
                            this.toNumber(refidx) + 3,
                            1,
                            this.timer + 0.25
                          );
                          this.stage.vars.Refdata.splice(
                            this.toNumber(refidx) + 4,
                            1,
                            0
                          );
                          return;
                        } else {
                          if (
                            this.toNumber(
                              this.itemOf(
                                this.stage.vars.Refdata,
                                this.toNumber(refidx) + 4
                              )
                            ) === 1
                          ) {
                            this.warp(this.replaceTile)(
                              reftile,
                              this.toNumber(tile) - 1,
                              0,
                              0
                            );
                          } else {
                            this.warp(this.activateRepeater)(
                              refidx,
                              reftile,
                              tile,
                              "r" + ""
                            );
                            this.stage.vars.Refdata.splice(
                              this.toNumber(refidx) + 3,
                              1,
                              this.timer + 5
                            );
                            this.stage.vars.Refdata.splice(
                              this.toNumber(refidx) + 4,
                              1,
                              1
                            );
                            return;
                          }
                        }
                      }
                    } else {
                      if (
                        this.toNumber(tile) === 18 &&
                        !(this.toString(opt) === "t")
                      ) {
                        this.warp(this.detinate)(refidx, reftile, !null);
                        return;
                      } else {
                        if (
                          this.compare(tile, 257) > 0 &&
                          this.compare(tile, 264) < 0
                        ) {
                          if (this.toString(opt) === "t") {
                            if (this.toNumber(tile) % 2 === 0) {
                              this.stage.vars.Level.splice(
                                reftile - 1,
                                1,
                                this.toNumber(tile) + 1
                              );
                              this.stage.vars.Refdata.splice(
                                this.toNumber(refidx),
                                1,
                                "r"
                              );
                              this.stage.vars.Refdata.splice(
                                this.toNumber(refidx) + 3,
                                1,
                                this.timer + 2
                              );
                              return;
                            } else {
                              this.stage.vars.Level.splice(
                                reftile - 1,
                                1,
                                this.toNumber(tile) - 1
                              );
                            }
                          } else {
                            if (this.toNumber(tile) % 2 === 0) {
                              this.warp(this.deactivateTile)(refidx);
                              return;
                            } else {
                              this.warp(this.activateRepeater)(
                                refidx,
                                reftile,
                                tile,
                                "r" + ""
                              );
                              this.stage.vars.Refdata.splice(
                                this.toNumber(refidx) + 3,
                                1,
                                this.timer + 2
                              );
                              return;
                            }
                          }
                        } else {
                          this.warp(this.deactivateTile)(refidx);
                          return;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (this.toString(opt) === "r") {
        this.stage.vars.Refdata.splice(this.toNumber(refidx), 1, "o");
        this.stage.vars.Refdata.splice(
          this.toNumber(refidx) + 3,
          1,
          this.vars.depth
        );
      } else {
        this.warp(this.deactivateTile)(refidx);
      }
    }
  }

  *flowSideways(tileidx, baseoffset) {
    this.vars.tilePr = this.itemOf(this.stage.vars.Level, tileidx - 1);
    this.warp(this.isblockPr)(this.vars.tilePr, 0);
    this.warp(this.getWaterStats)(this.vars.tilePr);
    if (
      this.compare(this.vars.flowbase, 0) > 0 &&
      !(this.compare(this.vars.flowbase, this.vars.basetile) === 0)
    ) {
      this.warp(this.deactivateTile)(
        this.itemOf(this.stage.vars.Levelref, tileidx - 1)
      );
      this.warp(this.replaceTile)(tileidx, 41, !null, 0);
    } else {
      if (this.toNumber(this.vars.isblockPr) === 0) {
        if (this.compare(this.vars.depth, this.vars.tPr) < 0) {
          this.warp(this.deactivateTile)(
            this.itemOf(this.stage.vars.Levelref, tileidx - 1)
          );
          this.warp(this.replaceTile)(
            tileidx,
            this.toNumber(this.vars.basetile) -
              this.toNumber(baseoffset) +
              this.toNumber(this.vars.tPr),
            !null,
            0
          );
        } else {
          if (
            this.toNumber(this.vars.basetile) === 38 &&
            this.toString(this.vars.dirPr) === "." &&
            this.toNumber(this.vars.depth) === 8
          ) {
            if (
              this.toNumber(baseoffset) === 18 &&
              this.toString(this.vars.flowdir) === "R"
            ) {
              this.warp(this.deactivateTile)(
                this.itemOf(this.stage.vars.Levelref, tileidx - 1)
              );
              this.warp(this.replaceTile)(
                tileidx,
                this.vars.basetile,
                !null,
                0
              );
            } else {
              if (
                this.toNumber(baseoffset) === 10 &&
                this.toString(this.vars.flowdir) === "L"
              ) {
                this.warp(this.deactivateTile)(
                  this.itemOf(this.stage.vars.Levelref, tileidx - 1)
                );
                this.warp(this.replaceTile)(
                  tileidx,
                  this.vars.basetile,
                  !null,
                  0
                );
              }
            }
          }
        }
      }
    }
  }

  *processLightMod() {
    this.vars.refidxPr = this.itemOf(this.stage.vars.Lightmod, 0);
    this.stage.vars.Lightmod.splice(0, 1);
    if (this.compare(this.vars.refidxPr, this.stage.vars.Level.length) > 0) {
      this.vars.reftilePr =
        this.toNumber(this.vars.refidxPr) - this.stage.vars.Level.length;
    } else {
      this.vars.reftilePr = this.vars.refidxPr;
    }
    this.vars.tilePr = this.itemOf(
      this.stage.vars.Level,
      this.vars.reftilePr - 1
    );
    this.vars.tPr = this.itemOf(
      this.vars.undefined,
      this.toNumber(this.vars.tilePr) * this.toNumber(this.stage.vars.Dmul) + 8
    );
    if (this.compare(this.vars.refidxPr, this.vars.reftilePr) > 0) {
      if (this.compare(this.vars.tPr, 0) < 0) {
        this.vars.depth = 0 - this.toNumber(this.vars.tPr);
      } else {
        this.vars.depth = 0;
      }
    } else {
      if (
        this.compare(
          this.vars.refidxPr,
          this.stage.vars.Level.length - this.toNumber(this.stage.vars.Lsx)
        ) > 0
      ) {
        this.vars.depth = 16;
      } else {
        this.vars.depth = 0;
      }
    }
    if (
      this.toString(
        this.itemOf(
          this.vars.undefined,
          this.toNumber(this.vars.tilePr) *
            this.toNumber(this.stage.vars.Dmul) +
            2
        )
      ) === "N"
    ) {
      this.vars.isblockPr = 0;
    } else {
      this.vars.isblockPr = 1;
    }
    this.vars.y =
      this.toNumber(this.vars.reftilePr) % this.toNumber(this.stage.vars.Lsx);
    if (
      this.compare(
        this.vars.reftilePr,
        this.stage.vars.Level.length - this.toNumber(this.stage.vars.Lsx)
      ) > 0
    ) {
      this.vars.lightn = -999;
    } else {
      this.warp(this.getLightFrom)(
        this.toNumber(this.vars.refidxPr) + this.toNumber(this.stage.vars.Lsx),
        this.toNumber(this.vars.reftilePr) + this.toNumber(this.stage.vars.Lsx)
      );
      this.vars.lightn = this.vars.tPr;
      if (this.compare(this.vars.depth, this.vars.tPr) < 0) {
        this.vars.depth = this.vars.tPr;
      }
    }
    if (
      this.compare(
        this.toNumber(this.vars.reftilePr) - 1,
        this.stage.vars.Lsx
      ) > 0
    ) {
      this.warp(this.getLightFrom)(
        this.toNumber(this.vars.refidxPr) - this.toNumber(this.stage.vars.Lsx),
        this.toNumber(this.vars.reftilePr) - this.toNumber(this.stage.vars.Lsx)
      );
      this.vars.lights = this.vars.tPr;
      if (this.compare(this.vars.depth, this.vars.tPr) < 0) {
        this.vars.depth = this.vars.tPr;
      }
    } else {
      this.vars.lights = -999;
    }
    if (this.toNumber(this.vars.y) === 1) {
      this.vars.lightw = -999;
    } else {
      this.warp(this.getLightFrom)(
        this.toNumber(this.vars.refidxPr) - 1,
        this.toNumber(this.vars.reftilePr) - 1
      );
      this.vars.lightw = this.vars.tPr;
      if (this.compare(this.vars.depth, this.vars.tPr) < 0) {
        this.vars.depth = this.vars.tPr;
      }
    }
    if (this.toNumber(this.vars.y) === 0) {
      this.vars.lighte = -999;
    } else {
      this.warp(this.getLightFrom)(
        this.toNumber(this.vars.refidxPr) + 1,
        this.toNumber(this.vars.reftilePr) + 1
      );
      this.vars.lighte = this.vars.tPr;
      if (this.compare(this.vars.depth, this.vars.tPr) < 0) {
        this.vars.depth = this.vars.tPr;
      }
    }
    if (
      this.compare(this.vars.lightn, 16) < 0 &&
      this.compare(this.vars.lightn, -999) > 0
    ) {
      if (this.compare(this.vars.depth, 0) > 0) {
        this.vars.depth--;
      } else {
        if (this.compare(this.vars.depth, 0) < 0) {
          this.vars.depth = 0;
        }
      }
    }
    this.vars.tPr = this.itemOf(this.stage.vars.Light, this.vars.refidxPr - 1);
    if (this.compare(this.vars.depth, this.vars.tPr) > 0) {
      this.stage.vars.Light.splice(this.vars.refidxPr - 1, 1, this.vars.depth);
      this.vars.depth--;
      if (
        this.compare(this.vars.lightn, -999) > 0 &&
        this.compare(this.vars.depth, this.vars.lightn) > 0
      ) {
        this.warp(this.addToLightMod)(
          this.toNumber(this.vars.refidxPr) + this.toNumber(this.stage.vars.Lsx)
        );
      }
      if (
        this.compare(this.vars.lights, -999) > 0 &&
        this.compare(this.vars.depth, this.vars.lights) > 0
      ) {
        this.warp(this.addToLightMod)(
          this.toNumber(this.vars.refidxPr) - this.toNumber(this.stage.vars.Lsx)
        );
      }
      if (
        this.compare(this.vars.lightw, -999) > 0 &&
        this.compare(this.vars.depth, this.vars.lightw) > 0
      ) {
        this.warp(this.addToLightMod)(this.toNumber(this.vars.refidxPr) - 1);
      }
      if (
        this.compare(this.vars.lighte, -999) > 0 &&
        this.compare(this.vars.depth, this.vars.lighte) > 0
      ) {
        this.warp(this.addToLightMod)(this.toNumber(this.vars.refidxPr) + 1);
      }
    } else {
      if (this.compare(this.vars.depth, this.vars.tPr) < 0) {
        this.stage.vars.Light.splice(
          this.vars.refidxPr - 1,
          1,
          this.vars.depth
        );
        if (this.compare(this.vars.lightn, -999) > 0) {
          this.warp(this.addToLightMod)(
            this.toNumber(this.vars.refidxPr) +
              this.toNumber(this.stage.vars.Lsx)
          );
        }
        if (this.compare(this.vars.lights, -999) > 0) {
          this.warp(this.addToLightMod)(
            this.toNumber(this.vars.refidxPr) -
              this.toNumber(this.stage.vars.Lsx)
          );
        }
        if (this.compare(this.vars.lightw, -999) > 0) {
          this.warp(this.addToLightMod)(this.toNumber(this.vars.refidxPr) - 1);
        }
        if (this.compare(this.vars.lighte, -999) > 0) {
          this.warp(this.addToLightMod)(this.toNumber(this.vars.refidxPr) + 1);
        }
      }
    }
  }

  *processLightLoop() {
    if (this.compare(this.stage.vars.Lightmod.length, 25) > 0) {
      for (let i = 0; i < 25; i++) {
        this.warp(this.processLightMod)();
      }
    } else {
      for (let i = 0; i < this.stage.vars.Lightmod.length; i++) {
        this.warp(this.processLightMod)();
      }
    }
  }

  *isblockNotfall(typ, or) {
    if (
      this.compare(
        this.itemOf(
          this.vars.undefined,
          this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 3
        ),
        0
      ) > 0
    ) {
      if (
        this.toString(
          this.itemOf(
            this.vars.undefined,
            this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 7
          )
        ) === "Y"
      ) {
        this.vars.isblockPr = 2;
      } else {
        this.vars.isblockPr = 3;
      }
      this.vars.prTool = this.letterOf(
        this.itemOf(
          this.vars.undefined,
          this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 4
        ),
        0
      );
      if (
        this.toNumber(
          this.itemOf(
            this.vars.undefined,
            this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 9
          )
        ) === 20
      ) {
        this.vars.prTool = "z";
      }
    } else {
      if (!or) {
        this.vars.isblockPr = 0;
        this.vars.prTool = "";
      }
    }
  }

  *moveTile(reftile, sx, sy, harvest) {
    this.warp(this.replaceTile)(
      this.toNumber(reftile) +
        (this.toNumber(sx) +
          this.toNumber(sy) * this.toNumber(this.stage.vars.Lsx)),
      this.itemOf(this.stage.vars.Level, reftile - 1),
      !null,
      harvest
    );
    this.warp(this.deactivateTile)(
      this.itemOf(
        this.stage.vars.Levelref,
        this.toNumber(reftile) +
          (this.toNumber(sx) +
            this.toNumber(sy) * this.toNumber(this.stage.vars.Lsx)) -
          1
      )
    );
    this.stage.vars.Levelref.splice(
      this.toNumber(reftile) +
        (this.toNumber(sx) +
          this.toNumber(sy) * this.toNumber(this.stage.vars.Lsx)) -
        1,
      1,
      this.itemOf(this.stage.vars.Levelref, reftile - 1)
    );
    if (
      !(this.toNumber(this.itemOf(this.stage.vars.Levelref, reftile - 1)) === 0)
    ) {
      this.stage.vars.Refdata.splice(
        this.itemOf(this.stage.vars.Levelref, reftile - 1) - 1,
        1,
        this.toNumber(reftile) +
          (this.toNumber(sx) +
            this.toNumber(sy) * this.toNumber(this.stage.vars.Lsx))
      );
      this.stage.vars.Levelref.splice(reftile - 1, 1, "");
    }
  }

  *activateRepeater(refidx, reftile, tile, opt) {
    if (this.compare(tile, 209) < 0 || this.compare(tile, 216) > 0) {
      if (this.toNumber(tile) === 251) {
        this.vars.gtI = 1;
      } else {
        this.vars.gtI =
          this.toNumber(reftile) - 2 - 2 * this.toNumber(this.stage.vars.Lsx);
        for (let i = 0; i < 5; i++) {
          for (let i = 0; i < 5; i++) {
            if (!(this.compare(this.vars.gtI, reftile) === 0)) {
              this.warp(this.collateralCheckRedstone)(this.vars.gtI);
            }
            this.vars.gtI++;
          }
          this.vars.gtI += this.toNumber(this.stage.vars.Lsx) - 5;
        }
        this.vars.gtI = 3;
      }
      if (this.compare(tile, 258) < 0 || this.compare(tile, 263) > 0) {
        this.warp(this.collateralCheckRedstone)(
          this.toNumber(reftile) - this.toNumber(this.vars.gtI)
        );
        this.warp(this.collateralCheckRedstone)(
          this.toNumber(reftile) + this.toNumber(this.vars.gtI)
        );
        this.warp(this.collateralCheckRedstone)(
          this.toNumber(reftile) -
            this.toNumber(this.stage.vars.Lsx) * this.toNumber(this.vars.gtI)
        );
        this.warp(this.collateralCheckRedstone)(
          this.toNumber(reftile) +
            this.toNumber(this.stage.vars.Lsx) * this.toNumber(this.vars.gtI)
        );
      }
    } else {
      this.vars.gtI = reftile;
      if (this.toNumber(tile) === 209) {
        this.vars.data2 = this.stage.vars.Lsx;
      } else {
        if (this.toNumber(tile) === 211) {
          this.vars.data2 = 1;
        } else {
          if (this.toNumber(tile) === 213) {
            this.vars.data2 = this.stage.vars.Lsxneg;
          } else {
            this.vars.data2 = -1;
          }
        }
      }
      for (let i = 0; i < 10; i++) {
        this.vars.gtI += this.toNumber(this.vars.data2);
        if (
          52 ===
          this.toNumber(this.itemOf(this.stage.vars.Level, this.vars.gtI - 1))
        ) {
          return;
        }
        this.warp(this.collateralCheckRedstone)(this.vars.gtI);
      }
    }
  }

  *pistonContract(refidx, reftile, tile, offset, ox, oy) {
    this.warp(this.replaceTile)(reftile, this.toNumber(tile) - 1, 0, 0);
    this.warp(this.deactivateTile)(
      this.itemOf(
        this.stage.vars.Levelref,
        this.toNumber(reftile) + this.toNumber(offset) - 1
      )
    );
    this.warp(this.replaceTile)(
      this.toNumber(reftile) + this.toNumber(offset),
      1,
      !null,
      0
    );
    this.vars.gtI = 2;
    this.warp(this.isblockNotfall)(
      this.itemOf(
        this.stage.vars.Level,
        this.toNumber(reftile) +
          this.toNumber(this.vars.gtI) * this.toNumber(offset) -
          1
      ),
      0
    );
    this.vars.sisTyp = this.vars.prTool;
    while (
      !(
        !(this.compare(this.vars.sisTyp, this.vars.prTool) === 0) ||
        this.compare(this.vars.isblockPr, 3) < 0 ||
        this.compare(this.vars.gtI, 20) > 0
      )
    ) {
      this.warp(this.moveTile)(
        this.toNumber(reftile) +
          this.toNumber(this.vars.gtI) * this.toNumber(offset),
        ox,
        oy,
        0
      );
      this.vars.gtI++;
      this.warp(this.isblockNotfall)(
        this.itemOf(
          this.stage.vars.Level,
          this.toNumber(reftile) +
            this.toNumber(this.vars.gtI) * this.toNumber(offset) -
            1
        ),
        0
      );
      if (this.toString(this.vars.prTool) === "z") {
        this.vars.sisTyp = this.vars.prTool;
      } else {
        if (this.toString(this.vars.sisTyp) === "z") {
          this.vars.sisTyp = this.vars.prTool;
        }
      }
    }
    this.vars.gtI--;
    this.warp(this.replaceTile)(
      this.toNumber(reftile) +
        this.toNumber(this.vars.gtI) * this.toNumber(offset),
      1,
      !null,
      0
    );
    this.vars.depth = this.timer + 5;
  }

  *collateralCheckRedstone(tileidx) {
    this.vars.t2 = this.itemOf(this.stage.vars.Level, tileidx - 1);
    this.vars.refidxPr = this.itemOf(this.stage.vars.Levelref, tileidx - 1);
    if (
      this.toNumber(this.vars.refidxPr) === 0 ||
      this.toNumber(
        this.itemOf(this.stage.vars.Refdata, this.toNumber(this.vars.refidxPr))
      ) === 0
    ) {
      this.vars.t2 = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.t2) * this.toNumber(this.stage.vars.Dmul) + 9
      );
      if (
        this.toNumber(this.vars.t2) === 11 ||
        this.toNumber(this.vars.t2) === 20
      ) {
        this.warp(this.collateralChecksPr)(tileidx, "r", 0);
      }
    } else {
      this.vars.t2 = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.t2) * this.toNumber(this.stage.vars.Dmul) + 18
      );
      if (this.toNumber(this.vars.t2) === 190) {
        if (
          "o" ===
          this.toString(
            this.itemOf(
              this.stage.vars.Refdata,
              this.toNumber(this.vars.refidxPr)
            )
          )
        ) {
          this.stage.vars.Refdata.splice(
            this.toNumber(this.vars.refidxPr) + 3,
            1,
            this.timer + 5
          );
        }
      }
      if (
        this.toNumber(this.vars.t2) === 118 ||
        this.toNumber(this.vars.t2) === 219 ||
        this.toNumber(this.vars.t2) === 264
      ) {
        if (
          "o" ===
          this.toString(
            this.itemOf(
              this.stage.vars.Refdata,
              this.toNumber(this.vars.refidxPr)
            )
          )
        ) {
          this.stage.vars.Refdata.splice(
            this.toNumber(this.vars.refidxPr) + 3,
            1,
            this.timer + 3
          );
        }
      }
    }
  }

  *pushThisMob(mobidx, tileidx, sx, sy) {
    this.warp(this.isblockPr)(
      this.itemOf(
        this.stage.vars.Level,
        this.toNumber(tileidx) +
          (this.toNumber(sx) +
            this.toNumber(sy) * this.toNumber(this.stage.vars.Lsx)) -
          1
      ),
      0
    );
    if (
      this.toNumber(this.vars.data2) === 3 ||
      this.toNumber(this.vars.data2) === 100 ||
      this.toNumber(this.vars.data2) === 101
    ) {
      this.warp(this.isblockPr)(
        this.itemOf(
          this.stage.vars.Level,
          this.toNumber(tileidx) +
            (this.toNumber(sx) +
              (this.toNumber(sy) + 1) * this.toNumber(this.stage.vars.Lsx)) -
            1
        ),
        !null
      );
    }
    if (this.toNumber(this.vars.isblockPr) === 0) {
      this.stage.vars.Mob.splice(
        this.toNumber(mobidx) + 1,
        1,
        this.toNumber(tileidx) +
          (this.toNumber(sx) +
            this.toNumber(sy) * this.toNumber(this.stage.vars.Lsx))
      );
      this.stage.vars.Mob.splice(
        this.toNumber(mobidx) + 2,
        1,
        this.toNumber(
          this.itemOf(this.stage.vars.Mob, this.toNumber(mobidx) + 2)
        ) + this.toNumber(sx)
      );
      this.stage.vars.Mob.splice(
        this.toNumber(mobidx) + 3,
        1,
        this.toNumber(
          this.itemOf(this.stage.vars.Mob, this.toNumber(mobidx) + 3)
        ) + this.toNumber(sy)
      );
    } else {
      this.stage.vars.Mob.splice(this.toNumber(mobidx) + 8, 1, 999);
    }
  }

  *pushMob(tileidx, sx, sy) {
    this.vars.iiC = 1;
    while (!(this.compare(this.vars.iiC, this.stage.vars.Mob.length) > 0)) {
      this.vars.data2 = this.itemOf(this.stage.vars.Mob, this.vars.iiC - 1);
      if (this.compare(this.vars.data2, 0) > 0) {
        if (
          this.compare(
            this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.iiC) + 1),
            tileidx
          ) === 0
        ) {
          this.warp(this.pushThisMob)(this.vars.iiC, tileidx, sx, sy);
        }
        if (
          this.toNumber(this.vars.data2) === 3 ||
          (this.compare(this.vars.data2, 99) > 0 &&
            !(this.toNumber(this.vars.data2) === 102))
        ) {
          if (
            this.compare(
              this.toNumber(
                this.itemOf(
                  this.stage.vars.Mob,
                  this.toNumber(this.vars.iiC) + 1
                )
              ) + this.toNumber(this.stage.vars.Lsx),
              tileidx
            ) === 0
          ) {
            this.warp(this.pushThisMob)(this.vars.iiC, tileidx, sx, sy);
          }
        }
      }
      this.vars.iiC += this.toNumber(this.stage.vars.Mobmul);
    }
    this.vars.data2 =
      Math.floor(this.toNumber(this.stage.vars.Y)) *
        this.toNumber(this.stage.vars.Lsx) +
      Math.floor(this.toNumber(this.stage.vars.X)) +
      1;
    if (
      this.compare(tileidx, this.vars.data2) === 0 ||
      this.compare(
        tileidx,
        this.toNumber(this.vars.data2) + this.toNumber(this.stage.vars.Lsx)
      ) === 0
    ) {
      this.warp(this.isblockPr)(
        this.itemOf(
          this.stage.vars.Level,
          this.toNumber(this.vars.data2) +
            (this.toNumber(sx) +
              this.toNumber(sy) * this.toNumber(this.stage.vars.Lsx)) -
            1
        ),
        0
      );
      this.warp(this.isblockPr)(
        this.itemOf(
          this.stage.vars.Level,
          this.toNumber(this.vars.data2) +
            (this.toNumber(sx) +
              (this.toNumber(sy) + 1) * this.toNumber(this.stage.vars.Lsx)) -
            1
        ),
        !null
      );
      if (this.toNumber(this.vars.isblockPr) === 0) {
        this.stage.vars.X += this.toNumber(sx);
        this.stage.vars.Y += this.toNumber(sy);
      } else {
        this.stage.vars.HealthS = 0;
        this.broadcast("update health");
      }
    }
  }

  *toggleDoor(refidx, reftile, tile, newbottile, doublehigh) {
    if (doublehigh) {
      this.warp(this.replaceTile)(
        this.toNumber(reftile) + this.toNumber(this.stage.vars.Lsx),
        this.toNumber(newbottile) - 1,
        !null,
        0
      );
    }
    this.warp(this.replaceTile)(
      this.toNumber(reftile) + 0,
      newbottile,
      !null,
      0
    );
    this.vars.depth = this.timer + 1.5;
  }

  *pistonExtend(refidx, reftile, tile, offset, ox, oy) {
    this.vars.gtI = 1;
    this.warp(this.isblockPr)(
      this.itemOf(
        this.stage.vars.Level,
        this.toNumber(reftile) + this.toNumber(offset) - 1
      ),
      0
    );
    while (
      !(
        this.toNumber(this.vars.isblockPr) === 0 ||
        this.compare(this.vars.gtI, 20) > 0
      )
    ) {
      this.vars.gtI++;
      this.warp(this.isblockPr)(
        this.itemOf(
          this.stage.vars.Level,
          this.toNumber(reftile) +
            this.toNumber(this.vars.gtI) * this.toNumber(offset) -
            1
        ),
        0
      );
    }
    if (this.compare(this.vars.gtI, 20) > 0) {
      return;
    }
    this.warp(this.pushMob)(
      this.toNumber(reftile) +
        this.toNumber(this.vars.gtI) * this.toNumber(offset),
      ox,
      oy
    );
    this.warp(this.replaceTile)(
      this.toNumber(reftile) +
        this.toNumber(this.vars.gtI) * this.toNumber(offset),
      1,
      !null,
      !null
    );
    while (!(this.compare(this.vars.gtI, 2) < 0)) {
      this.vars.gtI--;
      this.warp(this.moveTile)(
        this.toNumber(reftile) +
          this.toNumber(this.vars.gtI) * this.toNumber(offset),
        ox,
        oy,
        0
      );
    }
    this.warp(this.replaceTile)(reftile, this.toNumber(tile) + 1, 0, 0);
    this.warp(this.replaceTile)(
      this.toNumber(reftile) + this.toNumber(offset),
      this.toNumber(tile) + 2,
      !null,
      0
    );
    this.warp(this.deactivateTile)(
      this.itemOf(
        this.stage.vars.Levelref,
        this.toNumber(reftile) + this.toNumber(offset) - 1
      )
    );
    this.vars.depth = this.timer + 5;
  }

  *fireBurn(refidx, reftile) {
    if (this.toNumber(this.vars.tilePr) === 18) {
      this.stage.vars.Refdata.splice(this.toNumber(refidx), 1, "X");
      this.stage.vars.Refdata.splice(this.toNumber(refidx) + 1, 1, "");
      this.stage.vars.Refdata.splice(this.toNumber(refidx) + 2, 1, "");
      return;
    }
    if (
      this.compare(this.vars.tilePr, 224) < 0 ||
      this.compare(this.vars.tilePr, 226) > 0
    ) {
      this.vars.depth = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.tilePr) * this.toNumber(this.stage.vars.Dmul) +
          12
      );
      if (this.compare(this.vars.depth, 0) > 0) {
        this.vars.depth = (this.toNumber(this.vars.depth) + 5) / 1.5;
      } else {
        if (this.toNumber(this.vars.tilePr) === 1) {
          if (
            this.compare(
              this.itemOf(
                this.stage.vars.Level,
                this.toNumber(reftile) - this.toNumber(this.stage.vars.Lsx) - 1
              ),
              1
            ) > 0
          ) {
            this.vars.depth = this.itemOf(
              this.vars.undefined,
              this.toNumber(
                this.itemOf(
                  this.stage.vars.Level,
                  this.toNumber(reftile) -
                    this.toNumber(this.stage.vars.Lsx) -
                    1
                )
              ) *
                this.toNumber(this.stage.vars.Dmul) +
                12
            );
            if (this.toNumber(this.vars.depth) === 0) {
              this.vars.depth = 1;
            } else {
              this.vars.depth = (this.toNumber(this.vars.depth) + 2) / 2;
            }
          }
        }
      }
      if (this.compare(this.vars.depth, 0) > 0) {
        this.stage.vars.Refdata.splice(
          this.toNumber(refidx) + 1,
          1,
          this.vars.depth
        );
        this.stage.vars.Refdata.splice(
          this.toNumber(refidx) + 2,
          1,
          this.toNumber(this.stage.vars.Timereal) +
            this.random(1.5, 4.000000000232831)
        );
        this.stage.vars.Level.splice(reftile - 1, 1, this.random(224, 226));
        this.warp(this.addToLightMod)(reftile);
      } else {
        this.warp(this.deactivateTile)(refidx);
      }
    } else {
      this.vars.depth = this.itemOf(
        this.stage.vars.Refdata,
        this.toNumber(refidx) + 2
      );
      if (
        this.compare(this.vars.depth, 0) > 0 &&
        this.compare(this.stage.vars.Timereal, this.vars.depth) > 0
      ) {
        this.vars.depth = this.itemOf(
          this.stage.vars.Refdata,
          this.toNumber(refidx) + 1
        );
        if (this.compare(this.vars.depth, 1) < 0) {
          this.stage.vars.Level.splice(reftile - 1, 1, 1);
          this.warp(this.deactivateTile)(refidx);
          this.warp(this.addToLightMod)(reftile);
        } else {
          this.vars.depth = this.itemOf(
            this.stage.vars.Refdata,
            this.toNumber(refidx) + 1
          );
          this.stage.vars.Refdata.splice(
            this.toNumber(refidx) + 1,
            1,
            this.toNumber(this.vars.depth) - 1
          );
          this.stage.vars.Refdata.splice(
            this.toNumber(refidx) + 2,
            1,
            this.toNumber(this.stage.vars.Timereal) +
              this.random(1.5, 4.000000000232831)
          );
          this.stage.vars.Level.splice(reftile - 1, 1, this.random(224, 226));
          this.vars.data2 = this.random(1, 8);
          if (this.compare(this.vars.data2, 3) < 0) {
            this.vars.data2 =
              this.toNumber(reftile) - this.toNumber(this.stage.vars.Lsx);
          } else {
            this.vars.sy = 1;
            if (this.compare(this.vars.data2, 5) < 0) {
              this.vars.data2 =
                this.toNumber(reftile) +
                this.toNumber(this.stage.vars.Lsx) *
                  this.toNumber(this.vars.sy);
            } else {
              if (this.compare(this.vars.data2, 7) < 0) {
                this.vars.data2 =
                  this.toNumber(reftile) - this.toNumber(this.vars.sy);
              } else {
                this.vars.data2 =
                  this.toNumber(reftile) + this.toNumber(this.vars.sy);
              }
            }
          }
          this.warp(this.collateralChecksPr)(this.vars.data2, "fi", 0);
        }
      } else {
        if (this.compare(this.vars.depth, 1) < 0) {
          this.stage.vars.Refdata.splice(
            this.toNumber(refidx) + 1,
            1,
            this.random(2, 3)
          );
          this.stage.vars.Refdata.splice(
            this.toNumber(refidx) + 2,
            1,
            this.toNumber(this.stage.vars.Timereal) +
              this.random(1.5, 4.000000000232831)
          );
        }
        if (this.random(1, 5) === 1) {
          this.stage.vars.Level.splice(reftile - 1, 1, this.random(224, 226));
        }
      }
    }
  }

  *gettilePr(x, y) {
    this.vars.tilePr =
      Math.floor(this.toNumber(y)) * this.toNumber(this.stage.vars.Lsx) +
      Math.floor(this.toNumber(x)) +
      1;
    this.vars.tilePr = this.itemOf(this.stage.vars.Level, this.vars.tilePr - 1);
  }

  *getdistancePr(x, y, min) {
    this.vars.prDist = Math.sqrt(
      this.toNumber(x) * this.toNumber(x) + this.toNumber(y) * this.toNumber(y)
    );
    if (this.compare(this.vars.prDist, min) < 0) {
      this.vars.prDist = min;
    }
  }

  *checkAttached(refidx, tileidx, mode) {
    if (this.toString(mode) === "X") {
      this.warp(this.isblockPr)(
        this.itemOf(
          this.stage.vars.Level,
          this.toNumber(tileidx) - this.toNumber(this.stage.vars.Lsx) - 1
        ),
        0
      );
    } else {
      if (this.toString(mode) === "L") {
        this.warp(this.isblockPr)(
          this.itemOf(this.stage.vars.Level, this.toNumber(tileidx) - 2),
          0
        );
      } else {
        if (this.toString(mode) === "R") {
          this.warp(this.isblockPr)(
            this.itemOf(this.stage.vars.Level, this.toNumber(tileidx)),
            0
          );
        } else {
          null;
        }
      }
    }
    if (this.toNumber(this.vars.isblockPr) === 0) {
      this.warp(this.replaceTile)(tileidx, 1, !null, !null);
    }
    this.warp(this.deactivateTile)(refidx);
  }

  *getLightFrom(refidx, reftile) {
    this.vars.tilePr = this.itemOf(this.stage.vars.Level, reftile - 1);
    this.vars.tPr = this.itemOf(
      this.vars.undefined,
      this.toNumber(this.vars.tilePr) * this.toNumber(this.stage.vars.Dmul) + 8
    );
    if (this.compare(this.vars.tPr, 0) < 0) {
      this.vars.tPr = 0;
    }
    this.vars.tPr =
      this.toNumber(this.itemOf(this.stage.vars.Light, refidx - 1)) -
      this.toNumber(this.vars.tPr);
  }

  *addToLightMod(tileidx) {
    if (!this.arrayIncludes(this.stage.vars.Lightmod, tileidx)) {
      this.stage.vars.Lightmod.push(tileidx);
    }
  }

  *deleteContents(tileidx, harvestcontents) {
    this.warp(this.getInventoryIdxFor)(tileidx);
    if (this.compare(this.vars.undefined, 0) > 0) {
      this.vars.iiC = this.toNumber(this.vars.undefined) + 3;
      for (
        let i = 0;
        i <
        this.toNumber(
          this.itemOf(
            this.stage.vars.Inside,
            this.toNumber(this.vars.undefined)
          )
        );
        i++
      ) {
        this.vars.data2 = this.itemOf(
          this.stage.vars.Inside,
          this.toNumber(this.vars.iiC)
        );
        if (this.compare(this.vars.data2, 0) > 0 && harvestcontents) {
          this.warp(this.addToHarvestNow)(
            tileidx,
            this.itemOf(this.stage.vars.Inside, this.vars.iiC - 1),
            this.vars.data2
          );
        }
        this.stage.vars.Inside.splice(this.vars.iiC - 1, 1);
        this.stage.vars.Inside.splice(this.vars.iiC - 1, 1);
      }
      this.stage.vars.Inside.splice(this.vars.undefined - 1, 1);
      this.stage.vars.Inside.splice(this.vars.undefined - 1, 1);
      this.stage.vars.Inside.splice(this.vars.undefined - 1, 1);
    }
  }

  *getInventoryIdxFor(tileidx) {
    this.vars.data = 1;
    this.vars.undefined = 0;
    while (!(this.compare(this.vars.data, this.stage.vars.Inside.length) > 0)) {
      if (
        this.compare(
          tileidx,
          this.itemOf(this.stage.vars.Inside, this.vars.data - 1)
        ) === 0
      ) {
        this.vars.undefined = this.vars.data;
        this.vars.data += 9999999;
      } else {
        this.vars.data +=
          2 *
            this.toNumber(
              this.itemOf(this.stage.vars.Inside, this.toNumber(this.vars.data))
            ) +
          3;
      }
    }
  }

  *checkActiveTiles(init) {
    this.vars.refitPr = 1;
    for (
      let i = 0;
      i <
      this.stage.vars.Refdata.length / this.toNumber(this.stage.vars.Refsize);
      i++
    ) {
      if (
        !(
          0 ===
          this.toNumber(
            this.itemOf(this.stage.vars.Refdata, this.vars.refitPr - 1)
          )
        )
      ) {
        this.warp(this.processTile)(this.vars.refitPr, init);
      }
      this.vars.refitPr += this.toNumber(this.stage.vars.Refsize);
    }
    if (
      this.compare(
        this.stage.vars.Refpool.length * this.toNumber(this.stage.vars.Refsize),
        this.stage.vars.Refdata.length
      ) === 0
    ) {
      this.stage.vars.Refdata = [];
      this.stage.vars.Refpool = [];
    }
  }

  *processTile(refidx, init) {
    this.vars.reftilePr = this.itemOf(this.stage.vars.Refdata, refidx - 1);
    if (this.compare(this.vars.reftilePr, this.stage.vars.Level.length) > 0) {
      this.warp(this.deactivateTile)(refidx);
    } else {
      this.vars.refmodePr = this.itemOf(
        this.stage.vars.Refdata,
        this.toNumber(refidx)
      );
      this.vars.tilePr = this.itemOf(
        this.stage.vars.Level,
        this.vars.reftilePr - 1
      );
      if (this.toNumber(this.vars.refmodePr) === 0) {
        if (
          this.toNumber(this.vars.tilePr) === 2 ||
          this.toNumber(this.vars.tilePr) === 3
        ) {
          this.warp(this.addToGrow)(this.vars.reftilePr, 0);
        }
        if (
          this.toNumber(this.vars.tilePr) === 55 ||
          (this.compare(this.vars.tilePr, 174) > 0 &&
            this.compare(this.vars.tilePr, 178) < 0)
        ) {
          this.warp(this.addToGrow)(this.vars.reftilePr, 0);
        }
        if (
          this.compare(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(this.vars.tilePr) *
                this.toNumber(this.stage.vars.Dmul) +
                5
            ),
            0
          ) > 0
        ) {
          this.warp(this.addToGrow)(this.vars.reftilePr, 0);
        }
        if (
          this.toNumber(this.vars.tilePr) === 283 &&
          this.toNumber(
            this.itemOf(
              this.stage.vars.Level,
              this.toNumber(this.vars.reftilePr) -
                this.toNumber(this.stage.vars.Lsx) -
                1
            )
          ) === 2
        ) {
          this.warp(this.replaceTile)(
            this.toNumber(this.vars.reftilePr) -
              this.toNumber(this.stage.vars.Lsx),
            284,
            0,
            0
          );
        } else {
          if (
            this.toNumber(this.vars.tilePr) === 284 &&
            !(
              this.toNumber(
                this.itemOf(
                  this.stage.vars.Level,
                  this.toNumber(this.vars.reftilePr) +
                    this.toNumber(this.stage.vars.Lsx) -
                    1
                )
              ) === 283
            )
          ) {
            this.warp(this.replaceTile)(this.vars.reftilePr, 2, 0, 0);
          }
        }
        if (
          this.toNumber(this.vars.tilePr) === 18 &&
          this.toNumber(
            this.itemOf(
              this.stage.vars.Level,
              this.toNumber(this.vars.reftilePr) +
                this.toNumber(this.stage.vars.Lsx) -
                1
            )
          ) === 20
        ) {
          this.warp(this.replaceTile)(
            this.toNumber(this.vars.reftilePr) +
              this.toNumber(this.stage.vars.Lsx),
            1,
            !null,
            !null
          );
          this.warp(this.detinate)(refidx, this.vars.reftilePr, !null);
        } else {
          if (
            this.toNumber(this.vars.tilePr) === 61 &&
            this.toNumber(
              this.itemOf(
                this.stage.vars.Level,
                this.toNumber(this.vars.reftilePr) +
                  this.toNumber(this.stage.vars.Lsx) -
                  1
              )
            ) === 1
          ) {
            this.vars.tPr = this.itemOf(
              this.stage.vars.Level,
              this.toNumber(this.vars.reftilePr) -
                this.toNumber(this.stage.vars.Lsx) -
                1
            );
            if (this.compare(this.vars.tPr, this.vars.tilePr) === 0) {
              this.warp(this.addToGrow)(this.vars.reftilePr, 0);
            } else {
              if (
                this.toNumber(this.vars.tPr) === 2 ||
                this.toNumber(this.vars.tPr) === 3 ||
                this.toNumber(this.vars.tPr) === 7
              ) {
                this.warp(this.getSaturation)(
                  this.toNumber(this.vars.reftilePr) -
                    this.toNumber(this.stage.vars.Lsx),
                  4
                );
                if (this.compare(this.vars.saturation, 0) > 0) {
                  this.warp(this.addToGrow)(this.vars.reftilePr, 0);
                } else {
                  this.warp(this.replaceTile)(
                    this.vars.reftilePr,
                    1,
                    !null,
                    !null
                  );
                }
              } else {
                this.warp(this.replaceTile)(
                  this.vars.reftilePr,
                  1,
                  !null,
                  !null
                );
              }
            }
          }
          if (
            this.toNumber(this.vars.tilePr) === 11 &&
            this.toNumber(
              this.itemOf(
                this.stage.vars.Level,
                this.toNumber(this.vars.reftilePr) +
                  this.toNumber(this.stage.vars.Lsx) -
                  1
              )
            ) === 1
          ) {
            this.vars.tPr = this.itemOf(
              this.stage.vars.Level,
              this.toNumber(this.vars.reftilePr) -
                this.toNumber(this.stage.vars.Lsx) -
                1
            );
            if (
              this.toNumber(this.vars.tPr) === 11 ||
              this.toNumber(this.vars.tPr) === 7
            ) {
              this.warp(this.addToGrow)(this.vars.reftilePr, 0);
            } else {
              this.warp(this.replaceTile)(this.vars.reftilePr, 1, !null, !null);
            }
          }
          this.vars.tPr = this.itemOf(
            this.vars.undefined,
            this.toNumber(this.vars.tilePr) *
              this.toNumber(this.stage.vars.Dmul) +
              9
          );
          if (this.toNumber(this.vars.tPr) === 12) {
            this.warp(this.addToGrow)(this.vars.reftilePr, 2);
          } else {
            this.vars.tPr = this.itemOf(
              this.vars.undefined,
              this.toNumber(this.vars.tilePr) *
                this.toNumber(this.stage.vars.Dmul) +
                7
            );
            if (this.toString(this.vars.tPr) === "N" || init) {
              this.warp(this.deactivateTile)(refidx);
            } else {
              if (this.toString(this.vars.tPr) === "Y") {
                this.warp(this.initiateBlockFall)(refidx, 0, 0);
              } else {
                if (this.toString(this.vars.tPr) === "W") {
                  this.warp(this.checkNearWood)(refidx, this.vars.reftilePr);
                } else {
                  if (
                    this.toString(this.vars.tPr) === "X" ||
                    this.toString(this.vars.tPr) === "L" ||
                    this.toString(this.vars.tPr) === "R"
                  ) {
                    this.warp(this.checkAttached)(
                      refidx,
                      this.vars.reftilePr,
                      this.vars.tPr
                    );
                  } else {
                    this.warp(this.deactivateTile)(refidx);
                  }
                }
              }
            }
          }
        }
      } else {
        if (this.toString(this.vars.refmodePr) === "f") {
          this.warp(this.doBlockFall)(refidx, 0);
        } else {
          if (
            this.toString(this.vars.refmodePr) === "D" ||
            this.letterOf(this.vars.refmodePr, 0) === "X"
          ) {
            this.warp(this.detinate)(
              refidx,
              this.vars.reftilePr,
              this.letterOf(this.vars.refmodePr, 0) === "X"
            );
          } else {
            if (this.toString(this.vars.refmodePr) === "b") {
              this.warp(this.processBurn)(
                refidx,
                this.vars.reftilePr,
                this.vars.tilePr
              );
            } else {
              if (
                this.toString(this.vars.refmodePr) === "r" ||
                this.toString(this.vars.refmodePr) === "t" ||
                this.toString(this.vars.refmodePr) === "o"
              ) {
                this.warp(this.activateRedstone)(
                  refidx,
                  this.vars.reftilePr,
                  this.vars.tilePr,
                  this.vars.refmodePr
                );
              } else {
                if (this.toString(this.vars.refmodePr) === "fi") {
                  this.warp(this.fireBurn)(refidx, this.vars.reftilePr);
                } else {
                  if (this.toString(this.vars.refmodePr) === "bm") {
                    this.warp(this.bonemeal)(refidx, this.vars.reftilePr);
                  } else {
                    this.warp(this.deactivateTile)(refidx);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  *deactivateTile(refidx) {
    if (!(this.toNumber(refidx) === 0)) {
      this.vars.t2 = this.itemOf(this.stage.vars.Refdata, refidx - 1);
      if (!(this.toNumber(this.vars.t2) === 0)) {
        this.stage.vars.Levelref.splice(this.vars.t2 - 1, 1, "");
        this.stage.vars.Refdata.splice(refidx - 1, 1, "");
        this.stage.vars.Refpool.push(refidx);
      }
    }
  }

  *gametick(initialise) {
    if (initialise) {
      this.stage.vars.Ticks = 1;
      if (this.compare(this.vars.growidx, this.stage.vars.Grow.length) > 0) {
        this.vars.growidx = 1;
      }
    } else {
      this.stage.vars.Walkframe = this.sprites["Steve"].vars.stevenextwalkframe;
      this.stage.vars.Armframe = this.sprites["Cursor"].vars.larm;
      this.stage.vars.Lastdir = this.sprites["Steve"].direction;
      if (this.toNumber(this.stage.vars.Armframe) === 0) {
        if (
          this.toString(this.stage.vars.Heldc) === "#" ||
          !(this.toNumber(this.stage.vars.Mode) === 0)
        ) {
          this.stage.vars.Armframe =
            240 - this.toNumber(this.stage.vars.Walkframe) * 15;
        } else {
          this.stage.vars.Armframe =
            220 - this.toNumber(this.stage.vars.Walkframe) * 14;
        }
      } else {
        null;
      }
      this.stage.vars.X = this.sprites["Steve"].vars.lx;
      this.stage.vars.Y = this.sprites["Steve"].vars.ly;
      if (
        this.toNumber(this.stage.vars.Mode) === 0 ||
        this.toString(this.stage.vars.Mode) === "S"
      ) {
        this.stage.vars.Scrx =
          Math.round(
            (this.toNumber(this.stage.vars.X) + this.mouse.x * 0.01) * 40
          ) / 40;
        this.stage.vars.Scry =
          Math.round(
            (this.toNumber(this.stage.vars.Y) + this.mouse.y * 0.01) * 40
          ) / 40;
        if (this.compare(this.stage.vars.Scrx, 6) < 0) {
          this.stage.vars.Scrx = 6;
        }
        if (
          this.compare(
            this.stage.vars.Scrx,
            this.toNumber(this.stage.vars.Lsx) - 6
          ) > 0
        ) {
          this.stage.vars.Scrx = this.toNumber(this.stage.vars.Lsx) - 6;
        }
      }
      this.stage.vars.Fcount++;
      if (this.compare(this.timer, this.vars.nextsecond) > 0) {
        this.stage.vars.fps = this.toNumber(this.stage.vars.Fcount) * 2;
        this.stage.vars.Fcount = 0;
        this.vars.nextsecond += 0.5;
        if (this.compare(this.vars.growidx, this.stage.vars.Grow.length) > 0) {
          this.vars.growidx = 1;
        }
        if (this.compare(this.timer, this.vars.nextsecond) > 0) {
          this.vars.nextsecond = this.timer + 0.5;
        }
      }
      this.stage.vars.Ticks = 0;
      while (!(this.compare(this.stage.vars.Ticktime, this.timer) > 0)) {
        this.stage.vars.Ticktime += 0.0333;
        this.stage.vars.Ticks++;
      }
      if (this.compare(this.stage.vars.Ticks, 3) > 0) {
        this.stage.vars.Ticks = 3;
      }
      if (this.toString(this.stage.vars.Mode) === "S") {
        this.stage.vars.Ticks = this.toNumber(this.stage.vars.Ticks) * 20;
      }
      for (let i = 0; i < this.toNumber(this.stage.vars.Clearharvestidx); i++) {
        this.stage.vars.Harvest.splice(0, 1);
      }
    }
    this.stage.vars.Clearharvestidx = 0;
    this.stage.vars.Lightprob = 2;
    this.warp(this.checkActiveTiles)(initialise);
    if (
      !initialise &&
      this.compare(this.sprites["Snow"].vars.weatherType, 0) > 0
    ) {
      if (this.compare(this.sprites["Snow"].vars.weatherType, 3) < 0) {
        if (
          this.toNumber(this.vars.growidx) === 1 ||
          this.toNumber(this.sprites["Snow"].vars.weatherType) === 2
        ) {
          this.warp(this.makeSnow)();
        }
      } else {
        null;
      }
    }
    this.warp(this.processGrowTiles)(initialise);
    this.warp(this.processLightLoop)();
    while (!(this.stage.vars.Explode.length === 0)) {
      this.warp(this.getXY)(this.itemOf(this.stage.vars.Explode, 0));
      this.stage.vars.Explode.splice(0, 1);
      this.warp(this.explodeCirclePr)(
        this.vars.x,
        this.vars.y,
        this.itemOf(this.stage.vars.Explode, 0),
        0
      );
      this.stage.vars.Explode.splice(0, 1);
    }
    if (!(this.toString(this.stage.vars.Debug) === "off")) {
      this.stage.vars.Debug =
        "Active: " +
        this.toString(
          this.stage.vars.Refdata.length /
            this.toNumber(this.stage.vars.Refsize) -
            this.stage.vars.Refpool.length
        );
      this.stage.vars.Debug =
        this.toString(this.stage.vars.Debug) +
        ("/" +
          this.toString(
            this.stage.vars.Refdata.length /
              this.toNumber(this.stage.vars.Refsize)
          ));
      this.stage.vars.Debug =
        this.toString(this.stage.vars.Debug) +
        (",   Grow " + this.toString(this.stage.vars.Grow.length));
      this.stage.vars.Debug =
        this.toString(this.stage.vars.Debug) +
        (",   Mobs " + this.toString(this.stage.vars.mobcount));
      this.stage.vars.Debug =
        this.toString(this.stage.vars.Debug) +
        (",   Clones " + this.toString(this.stage.vars.Spritecount));
    }
  }

  *readNumber() {
    this.vars.sgRc = this.letterOf(this.vars.sgFull, this.vars.sgI - 1);
    this.vars.sgI++;
    if (this.toNumber(this.vars.sgRc) === 0) {
      this.vars.sgN = 1;
    } else {
      this.vars.sgN = "";
      for (let i = 0; i < this.toNumber(this.vars.sgRc); i++) {
        this.vars.sgN =
          this.toString(this.vars.sgN) +
          this.letterOf(this.vars.sgFull, this.vars.sgI - 1);
        this.vars.sgI++;
      }
    }
  }

  *insertAssetAtUsing(idx, data) {
    this.vars.sgFull = data;
    this.vars.sgI = 1;
    this.warp(this.readNumber)();
    this.vars.sgFormat = this.vars.sgN;
    this.vars.loadingchunk = 0;
    this.vars.x = 1;
    while (!(this.compare(this.vars.sgI, this.vars.sgFull.length) > 0)) {
      if (
        this.compare(this.letterOf(this.vars.sgFull, this.vars.sgI - 1), 0) <
          0 ||
        this.compare(this.letterOf(this.vars.sgFull, this.vars.sgI - 1), 9) > 0
      ) {
        this.vars.sgI++;
      } else {
        this.vars.chunkstart = this.vars.sgI;
        this.warp(this.readNumber)();
        this.vars.sgType = this.vars.sgN;
        this.warp(this.readNumber)();
        this.vars.sgNext =
          this.toNumber(this.vars.sgI) + this.toNumber(this.vars.sgN);
        if (this.toNumber(this.vars.sgType) === 100) {
          this.warp(this.readNumber)();
          this.warp(this.readNumber)();
          this.warp(this.readNumber)();
          this.warp(this.readNumber)();
          this.vars.x = this.vars.sgN;
        }
        if (this.compare(this.vars.sgType, 100) < 0) {
          if (this.toNumber(this.vars.sgType) === 2) {
            this.warp(this.readNumber)();
            this.warp(this.readNumber)();
            this.stage.vars.GenVersion = this.vars.sgN;
            this.warp(this.readNumber)();
            this.warp(this.Insertlevelasasset)(
              this.toNumber(idx) - (this.toNumber(this.vars.x) - 1)
            );
          }
        }
      }
      this.vars.sgI = this.vars.sgNext;
    }
    this.vars.sgFull = "";
  }

  *activateHorizontalLine(x, y, x2, typ, checkall) {
    if (this.compare(y, 0) > 0) {
      this.vars.t2 =
        this.toNumber(x) +
        this.toNumber(y) * this.toNumber(this.stage.vars.Lsx);
      for (let i = 0; i < this.toNumber(x2) - this.toNumber(x) + 1; i++) {
        this.vars.t2++;
        this.vars.checktilePr = this.itemOf(
          this.stage.vars.Level,
          this.vars.t2 - 1
        );
        if (
          this.compare(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(this.vars.checktilePr) *
                this.toNumber(this.stage.vars.Dmul) +
                3
            ),
            40
          ) < 0
        ) {
          if (
            this.toNumber(
              this.itemOf(
                this.vars.undefined,
                this.toNumber(this.vars.checktilePr) *
                  this.toNumber(this.stage.vars.Dmul) +
                  5
              )
            ) === 0
          ) {
            if (
              18 === this.toNumber(this.vars.checktilePr) ||
              116 === this.toNumber(this.vars.checktilePr)
            ) {
              this.warp(this.collateralChecksPr)(this.vars.t2, "X2", 0);
            } else {
              this.warp(this.deactivateTile)(
                this.itemOf(this.stage.vars.Levelref, this.vars.t2 - 1)
              );
              this.warp(this.replaceTile)(
                this.vars.t2,
                1,
                !null,
                2 === this.random(1, 3)
              );
              this.warp(this.collateralChecksPr)(this.vars.t2, 0, 0);
            }
          }
        }
      }
    }
  }

  *explodeCirclePr(x, y, r, typ) {
    this.vars.y = 0.5 - this.toNumber(r);
    this.vars.tPr = this.toNumber(r) * this.toNumber(r);
    while (!!(this.compare(this.vars.y, r) < 0)) {
      this.vars.x = Math.sqrt(
        this.toNumber(this.vars.tPr) -
          this.toNumber(this.vars.y) * this.toNumber(this.vars.y)
      );
      this.warp(this.activateHorizontalLine)(
        Math.round(this.toNumber(x) - this.toNumber(this.vars.x)),
        Math.round(this.toNumber(y) + this.toNumber(this.vars.y)),
        Math.round(this.toNumber(x) + this.toNumber(this.vars.x)),
        0,
        0
      );
      this.vars.y++;
    }
    this.warp(this.getdistancePr)(
      this.toNumber(x) - this.toNumber(this.stage.vars.X),
      this.toNumber(y) - this.toNumber(this.stage.vars.Y),
      1
    );
    if (this.compare(this.vars.prDist, r) < 0) {
      if (!(this.toNumber(this.vars.prDist) === 0)) {
        this.stage.vars.Knockback =
          (this.toNumber(r) * 1.7 - this.toNumber(this.vars.prDist)) *
          ((this.toNumber(this.stage.vars.X) - this.toNumber(x)) /
            this.toNumber(this.vars.prDist)) *
          0.5;
      }
      this.vars.prDist = this.toNumber(r) - this.toNumber(this.vars.prDist);
      this.stage.vars.HealthS += Math.floor(
        this.toNumber(this.vars.prDist) *
          -16 *
          this.toNumber(this.stage.vars.Defensemul)
      );
      this.stage.vars.Damagearmor++;
      this.broadcast("update health");
    }
    this.vars.x = 1;
    while (!(this.compare(this.vars.x, this.stage.vars.Mob.length) > 0)) {
      if (
        this.compare(this.itemOf(this.stage.vars.Mob, this.vars.x - 1), 0) > 0
      ) {
        this.warp(this.getdistancePr)(
          this.toNumber(x) -
            this.toNumber(
              this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.x) + 2)
            ),
          this.toNumber(y) -
            this.toNumber(
              this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.x) + 3)
            ),
          1
        );
        if (this.compare(this.vars.prDist, r) < 0) {
          this.vars.prDist = this.toNumber(r) - this.toNumber(this.vars.prDist);
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.x) + 8,
            1,
            Math.round(this.toNumber(this.vars.prDist) * 16)
          );
        }
      }
      this.vars.x += this.toNumber(this.stage.vars.Mobmul);
    }
  }

  *setInside(rootidx, idx, typ, count) {
    if (this.toNumber(count) === 0) {
      this.vars.sisTyp = "#";
    } else {
      this.vars.sisTyp = typ;
    }
    if (!(this.toNumber(this.vars.sisTyp) === 0)) {
      this.stage.vars.Inside.splice(
        this.toNumber(rootidx) + (this.toNumber(idx) * 2 + 1) - 1,
        1,
        this.vars.sisTyp
      );
    }
    this.stage.vars.Inside.splice(
      this.toNumber(rootidx) + (this.toNumber(idx) * 2 + 2) - 1,
      1,
      count
    );
    if (this.compare(rootidx, this.stage.vars.Insideidx) === 0) {
      if (!(this.toNumber(this.vars.sisTyp) === 0)) {
        this.stage.vars.Inv.splice(
          78 + this.toNumber(idx) * 2,
          1,
          this.vars.sisTyp
        );
      }
      this.stage.vars.Inv.splice(79 + this.toNumber(idx) * 2, 1, count);
    }
  }

  *spawnMobFromEgg(tileid, tileidx) {
    this.vars.sgTile = this.itemOf(
      this.vars.undefined,
      this.toNumber(tileid) * this.toNumber(this.stage.vars.Dmul) + 10
    );
    if (this.compare(this.vars.sgTile, 0) > 0) {
      this.stage.vars.Mobspawn.push(this.vars.sgTile);
      this.stage.vars.Mobspawn.push(tileidx);
      this.stage.vars.Mobspawn.push(1);
      this.stage.vars.Mobspawn.push(0);
    } else {
      this.warp(this.insertAssetAtUsing)(
        tileidx,
        this.itemOf(this.vars.assets, this.toNumber(this.vars.sgTile) * -2 - 1)
      );
    }
  }

  *whenIReceiveToggleDebug() {
    if (this.toString(this.stage.vars.Debug) === "off") {
      this.stage.vars.Debug = "";
      this.stage.watchers.Debug.visible = true;
      this.stage.watchers.fps.visible = true;
    } else {
      this.stage.vars.Debug = "off";
      this.stage.watchers.Debug.visible = false;
      this.stage.watchers.fps.visible = false;
    }
  }

  *whenIReceivePostChunkLoad() {
    this.stage.vars.Fcount = 0;
    this.stage.vars.Ticktime = this.timer;
    this.vars.nextsecond = this.timer + 1;
    this.vars.growidx = 1;
  }

  *collateralChecksPr(idx, mode, force) {
    this.vars.refidxPr = this.itemOf(this.stage.vars.Levelref, idx - 1);
    if (
      force ||
      0 === this.toNumber(this.vars.refidxPr) ||
      0 ===
        this.toNumber(
          this.itemOf(
            this.stage.vars.Refdata,
            this.toNumber(this.vars.refidxPr)
          )
        )
    ) {
      if (0 === this.toNumber(this.vars.refidxPr)) {
        this.warp(this.getAvailableRefIndexPr)();
        this.stage.vars.Levelref.splice(idx - 1, 1, this.vars.refidxPr);
        this.stage.vars.Refdata.splice(
          this.toNumber(this.vars.refidxPr) + -1,
          1,
          idx
        );
      } else {
        null;
      }
      this.stage.vars.Refdata.splice(
        this.toNumber(this.vars.refidxPr),
        1,
        mode
      );
    }
  }

  *getAvailableRefIndexPr() {
    if (this.stage.vars.Refpool.length === 0) {
      this.vars.refidxPr = this.stage.vars.Refdata.length + 1;
      for (let i = 0; i < this.toNumber(this.stage.vars.Refsize); i++) {
        this.stage.vars.Refdata.push("");
      }
    } else {
      this.vars.refidxPr = this.itemOf(this.stage.vars.Refpool, 0);
      this.stage.vars.Refpool.splice(0, 1);
      this.stage.vars.Refdata.splice(
        this.toNumber(this.vars.refidxPr) + 3,
        1,
        ""
      );
    }
  }

  *checktilePr(idx, match, include) {
    if (
      this.compare(this.itemOf(this.stage.vars.Level, idx - 1), match) === 0
    ) {
      this.vars.checktilePr = 1;
    } else {
      if (!include) {
        this.vars.checktilePr = 0;
      }
    }
  }

  *getWaterStats(tile) {
    this.vars.depth = this.itemOf(
      this.vars.undefined,
      this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 5
    );
    this.vars.flowdir = this.itemOf(
      this.vars.undefined,
      this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 6
    );
    if (this.compare(this.vars.depth, 0) > 0) {
      if (this.compare(tile, 39) < 0) {
        this.vars.flowbase = 38;
      } else {
        this.vars.flowbase = 81;
      }
    } else {
      this.vars.flowbase = 0;
    }
  }

  *addToGrow(tileidx, time) {
    if (!this.arrayIncludes(this.stage.vars.Grow, tileidx)) {
      this.stage.vars.Grow.splice(0, 0, tileidx);
      if (this.compare(time, 0) > 0) {
        this.stage.vars.Growtime.splice(
          0,
          0,
          this.toNumber(this.stage.vars.Timereal) + this.toNumber(time)
        );
      } else {
        this.stage.vars.Growtime.splice(0, 0, 0);
      }
      this.vars.growidx++;
    }
  }

  *whenIReceiveGreenFlag() {
    this.stage.watchers.Debug.visible = false;
    this.stage.vars.Debug = "off";
    this.stage.vars.keydelay = 0;
    this.visible = false;
  }

  *whenIReceiveBringToLife() {
    yield* this.bringToLife();
  }

  *Insertlevelasasset(idx) {
    this.warp(this.readNumber)();
    this.stage.vars.Lsx = this.vars.sgN;
    this.stage.vars.Lsxneg = 0 - this.toNumber(this.stage.vars.Lsx);
    this.warp(this.readNumber)();
    this.stage.vars.Lsy = this.vars.sgN;
    this.vars.sgTileidx = idx;
    while (!!(this.compare(this.vars.sgI, this.vars.sgNext) < 0)) {
      this.warp(this.readNumber)();
      this.vars.sgTile = this.vars.sgN;
      this.warp(this.readNumber)();
      if (this.toNumber(this.vars.sgTile) === 0) {
        this.vars.sgTileidx += this.toNumber(this.vars.sgN);
      } else {
        if (
          this.toString(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(this.vars.sgTile) *
                this.toNumber(this.stage.vars.Dmul) +
                19
            )
          ) === "G"
        ) {
          this.stage.vars.Grow.push(this.vars.sgTileidx);
          this.stage.vars.Growtime.push(1);
        }
        for (let i = 0; i < this.toNumber(this.vars.sgN); i++) {
          this.stage.vars.Level.splice(
            this.vars.sgTileidx - 1,
            1,
            this.vars.sgTile
          );
          this.stage.vars.Levelref.splice(this.vars.sgTileidx - 1, 1, "");
          this.stage.vars.Light.splice(this.vars.sgTileidx - 1, 1, 0);
          this.stage.vars.Light.splice(
            this.toNumber(this.vars.sgTileidx) +
              this.stage.vars.Level.length -
              1,
            1,
            0
          );
          this.stage.vars.Lightmod.push(
            this.toNumber(this.vars.sgTileidx) + this.stage.vars.Level.length
          );
          this.stage.vars.Lightmod.push(this.vars.sgTileidx);
          this.vars.sgTileidx++;
        }
      }
    }
  }

  *replaceTile(tileidx, typ, activate, harvest) {
    this.vars.isblockPr = this.itemOf(
      this.vars.undefined,
      this.toNumber(this.itemOf(this.stage.vars.Level, tileidx - 1)) *
        this.toNumber(this.stage.vars.Dmul) +
        3
    );
    if (this.compare(this.vars.isblockPr, 999) > 0) {
      return;
    }
    if (harvest || this.toNumber(typ) === 1) {
      this.warp(this.deactivateTile)(
        this.itemOf(this.stage.vars.Levelref, tileidx - 1)
      );
    }
    if (harvest && !(this.toNumber(this.vars.isblockPr) === 0)) {
      this.warp(this.addToHarvestNow)(
        tileidx,
        this.itemOf(this.stage.vars.Level, tileidx - 1),
        1
      );
    }
    this.stage.vars.Level.splice(tileidx - 1, 1, typ);
    if (activate) {
      this.warp(this.activateBlocksAround)(tileidx, 0);
    }
    this.warp(this.addToLightMod)(tileidx);
    this.warp(this.addToLightMod)(
      this.toNumber(tileidx) + this.stage.vars.Level.length
    );
  }

  *addToHarvestNow(tileidx, typ, count) {
    if (
      this.compare(
        this.itemOf(
          this.vars.undefined,
          this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 4
        ).length,
        2
      ) < 0
    ) {
      this.vars.data = this.itemOf(
        this.vars.undefined,
        this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 10
      );
      if (
        this.toNumber(typ) === 5 &&
        this.compare(this.random(2.3283064365386963e-10, 9.00000000023283), 1) <
          0
      ) {
        this.vars.data = 101;
      }
      if (this.toNumber(this.vars.data) === 0) {
        this.vars.data = typ;
      } else {
        if (
          this.compare(this.vars.data, -1) < 0 &&
          this.compare(this.random(1, 10), 2) < 0
        ) {
          this.vars.data = 0 - this.toNumber(this.vars.data);
        }
      }
      if (this.compare(this.vars.data, 0) > 0 && this.compare(count, 0) > 0) {
        this.stage.vars.Harvest.push(tileidx);
        this.stage.vars.Harvest.push(0);
        this.stage.vars.Harvest.push(this.vars.data);
        if (this.toNumber(typ) === 217) {
          this.stage.vars.Harvest.push(this.random(4, 5));
        } else {
          this.stage.vars.Harvest.push(count);
        }
        this.stage.vars.Harvest.push(this.random(-0.1, 0.1));
        this.stage.vars.Harvest.push(-999);
        if (this.toNumber(this.vars.data) === 143) {
          this.warp(this.addToHarvestNow)(tileidx, 142, this.random(0, 3));
        }
      }
    }
  }

  *processGrowTiles(init) {
    this.vars.break = 0;
    while (
      !(
        this.compare(this.vars.growidx, this.stage.vars.Grow.length) > 0 ||
        this.compare(this.vars.break, 0) > 0
      )
    ) {
      if (
        this.compare(
          this.itemOf(this.stage.vars.Growtime, this.vars.growidx - 1),
          this.stage.vars.Timereal
        ) > 0
      ) {
        this.vars.growidx++;
      } else {
        this.warp(this.processGrowTilesNow)(init);
        this.vars.break = 1;
      }
    }
    if (this.toNumber(this.vars.break) === 0) {
      this.vars.growidx = 999999;
    }
  }

  *processGrowTilesNow(init) {
    this.vars.reftilePr = this.itemOf(
      this.stage.vars.Grow,
      this.vars.growidx - 1
    );
    this.vars.tilePr = this.itemOf(
      this.stage.vars.Level,
      this.vars.reftilePr - 1
    );
    if (this.toNumber(this.vars.tilePr) === 3) {
      this.warp(this.isblockPr)(
        this.itemOf(
          this.stage.vars.Level,
          this.toNumber(this.vars.reftilePr) +
            this.toNumber(this.stage.vars.Lsx) -
            1
        ),
        0
      );
      if (this.compare(this.vars.isblockPr, 0) > 0) {
        this.stage.vars.Grow.splice(this.vars.growidx - 1, 1);
        this.stage.vars.Growtime.splice(this.vars.growidx - 1, 1);
        return;
      } else {
        if (this.random(1, 5) === 1) {
          this.warp(this.checktilePr)(
            this.toNumber(this.vars.reftilePr) +
              (this.toNumber(this.stage.vars.Lsx) + -1),
            2,
            0
          );
          this.warp(this.checktilePr)(
            this.toNumber(this.vars.reftilePr) +
              (this.toNumber(this.stage.vars.Lsx) + 1),
            2,
            !null
          );
          this.warp(this.checktilePr)(
            this.toNumber(this.vars.reftilePr) + -1,
            2,
            !null
          );
          this.warp(this.checktilePr)(
            this.toNumber(this.vars.reftilePr) + 1,
            2,
            !null
          );
          this.warp(this.checktilePr)(
            this.toNumber(this.vars.reftilePr) -
              (this.toNumber(this.stage.vars.Lsx) + -1),
            2,
            !null
          );
          this.warp(this.checktilePr)(
            this.toNumber(this.vars.reftilePr) -
              (this.toNumber(this.stage.vars.Lsx) + 1),
            2,
            !null
          );
          if (this.compare(this.vars.checktilePr, 0) > 0) {
            this.stage.vars.Level.splice(this.vars.reftilePr - 1, 1, 2);
            this.warp(this.activateBlocksAround)(this.vars.reftilePr, 0);
          }
          this.stage.vars.Grow.splice(this.vars.growidx - 1, 1);
          this.stage.vars.Growtime.splice(this.vars.growidx - 1, 1);
          return;
        }
      }
      this.vars.growidx++;
      return;
    }
    if (this.toNumber(this.vars.tilePr) === 2) {
      this.warp(this.isblockPr)(
        this.itemOf(
          this.stage.vars.Level,
          this.toNumber(this.vars.reftilePr) +
            this.toNumber(this.stage.vars.Lsx) -
            1
        ),
        0
      );
      if (this.compare(this.vars.isblockPr, 0) > 0) {
        this.stage.vars.Level.splice(this.vars.reftilePr - 1, 1, 3);
      }
      this.stage.vars.Grow.splice(this.vars.growidx - 1, 1);
      this.stage.vars.Growtime.splice(this.vars.growidx - 1, 1);
      return;
    }
    this.vars.basetile = this.itemOf(
      this.vars.undefined,
      this.toNumber(this.vars.tilePr) * this.toNumber(this.stage.vars.Dmul) + 18
    );
    if (this.toNumber(this.vars.basetile) === 55) {
      this.vars.isblockPr = this.itemOf(
        this.stage.vars.Level,
        this.toNumber(this.vars.reftilePr) -
          this.toNumber(this.stage.vars.Lsx) -
          1
      );
      if (
        this.toNumber(this.vars.isblockPr) === 2 ||
        this.toNumber(this.vars.isblockPr) === 3
      ) {
        if (
          !init &&
          this.toNumber(
            this.itemOf(this.stage.vars.Growtime, this.vars.growidx - 1)
          ) === 0
        ) {
          this.stage.vars.Growtime.splice(
            this.vars.growidx - 1,
            1,
            this.toNumber(this.stage.vars.Timereal) + 30
          );
          this.vars.growidx++;
          return;
        }
        if (init || this.random(1, 100) === 1) {
          this.warp(this.growSapling)(this.vars.reftilePr, this.vars.tilePr);
          this.stage.vars.Grow.splice(this.vars.growidx - 1, 1);
          this.stage.vars.Growtime.splice(this.vars.growidx - 1, 1);
          return;
        }
      } else {
        if (this.random(1, 10) === 1) {
          this.stage.vars.Level.splice(this.vars.reftilePr - 1, 1, 1);
          this.stage.vars.Grow.splice(this.vars.growidx - 1, 1);
          this.stage.vars.Growtime.splice(this.vars.growidx - 1, 1);
          return;
        }
      }
      this.vars.growidx++;
      return;
    }
    if (this.toNumber(this.vars.basetile) === 9) {
      if (this.random(1, 15) === 1) {
        this.stage.vars.Grow.splice(this.vars.growidx - 1, 1);
        this.stage.vars.Growtime.splice(this.vars.growidx - 1, 1);
        this.warp(this.replaceTile)(this.vars.reftilePr, 1, !null, !null);
        return;
      }
      this.vars.growidx++;
      return;
    }
    if (this.toNumber(this.vars.basetile) === 134) {
      this.warp(this.getIllumination)(this.vars.reftilePr);
      if (
        this.compare(
          this.itemOf(this.stage.vars.Growtime, this.vars.growidx - 1),
          0
        ) > 0 &&
        this.compare(this.vars.tPr, 8) > 0
      ) {
        this.vars.tilePr++;
        this.warp(this.replaceTile)(
          this.vars.reftilePr,
          this.vars.tilePr,
          0,
          0
        );
        if (this.toNumber(this.vars.tilePr) === 141) {
          this.stage.vars.Grow.splice(this.vars.growidx - 1, 1);
          this.stage.vars.Growtime.splice(this.vars.growidx - 1, 1);
          return;
        }
      }
      this.stage.vars.Growtime.splice(
        this.vars.growidx - 1,
        1,
        this.toNumber(this.stage.vars.Timereal) + this.random(150, 300)
      );
      this.vars.growidx++;
      return;
    }
    if (
      this.toNumber(this.vars.tilePr) === 11 ||
      this.toNumber(this.vars.tilePr) === 61
    ) {
      this.warp(this.isblockPr)(
        this.itemOf(
          this.stage.vars.Level,
          this.toNumber(this.vars.reftilePr) +
            this.toNumber(this.stage.vars.Lsx) -
            1
        ),
        0
      );
      if (this.toNumber(this.vars.isblockPr) === 0) {
        if (
          !(
            this.compare(
              this.itemOf(
                this.stage.vars.Level,
                this.toNumber(this.vars.reftilePr) -
                  this.toNumber(this.stage.vars.Lsx) * 2 -
                  1
              ),
              this.vars.tilePr
            ) === 0
          )
        ) {
          if (
            this.toNumber(
              this.itemOf(this.stage.vars.Growtime, this.vars.growidx - 1)
            ) === 0
          ) {
            this.stage.vars.Growtime.splice(
              this.vars.growidx - 1,
              1,
              this.toNumber(this.stage.vars.Timereal) + this.random(250, 400)
            );
            this.vars.growidx++;
            return;
          }
          this.stage.vars.Level.splice(
            this.toNumber(this.vars.reftilePr) +
              this.toNumber(this.stage.vars.Lsx) -
              1,
            1,
            this.vars.tilePr
          );
          this.warp(this.collateralChecksPr)(
            this.toNumber(this.vars.reftilePr) +
              this.toNumber(this.stage.vars.Lsx),
            0,
            0
          );
        }
      }
      this.stage.vars.Grow.splice(this.vars.growidx - 1, 1);
      this.stage.vars.Growtime.splice(this.vars.growidx - 1, 1);
      return;
    }
    if (
      this.toNumber(
        this.itemOf(
          this.vars.undefined,
          this.toNumber(this.vars.tilePr) *
            this.toNumber(this.stage.vars.Dmul) +
            9
        )
      ) === 12
    ) {
      if (this.compare(this.stage.vars.ChunkSeed, 0) > 0) {
        if (
          this.toNumber(
            this.itemOf(this.stage.vars.Growtime, this.vars.growidx - 1)
          ) === 0
        ) {
          this.stage.vars.Growtime.splice(
            this.vars.growidx - 1,
            1,
            this.toNumber(this.stage.vars.Timereal) +
              this.random(5.000000000232831, 8.00000000023283)
          );
          this.vars.growidx++;
          return;
        }
        this.warp(this.replaceTile)(this.vars.reftilePr, 1, !null, !null);
        this.warp(this.spawnMobFromEgg)(this.vars.tilePr, this.vars.reftilePr);
      }
      this.stage.vars.Grow.splice(this.vars.growidx - 1, 1);
      this.stage.vars.Growtime.splice(this.vars.growidx - 1, 1);
      return;
    }
    if (
      this.compare(
        this.itemOf(
          this.vars.undefined,
          this.toNumber(this.vars.tilePr) *
            this.toNumber(this.stage.vars.Dmul) +
            5
        ),
        0
      ) > 0
    ) {
      if (
        this.compare(
          this.itemOf(
            this.vars.undefined,
            this.toNumber(this.vars.tilePr) *
              this.toNumber(this.stage.vars.Dmul) +
              13
          ),
          0
        ) > 0
      ) {
        if (
          !init &&
          this.toNumber(
            this.itemOf(this.stage.vars.Growtime, this.vars.growidx - 1)
          ) === 0
        ) {
          this.stage.vars.Growtime.splice(
            this.vars.growidx - 1,
            1,
            this.toNumber(this.stage.vars.Timereal) + 1
          );
          this.vars.growidx++;
          return;
        }
      }
      this.warp(this.processFlowingTile)(this.vars.reftilePr, this.vars.tilePr);
    }
    this.stage.vars.Grow.splice(this.vars.growidx - 1, 1);
    this.stage.vars.Growtime.splice(this.vars.growidx - 1, 1);
    return;
  }

  *bonemeal(refidx, reftile) {
    this.vars.tilePr = this.itemOf(this.stage.vars.Level, reftile - 1);
    this.vars.depth = this.itemOf(
      this.vars.undefined,
      this.toNumber(this.vars.tilePr) * this.toNumber(this.stage.vars.Dmul) + 18
    );
    if (
      this.toNumber(this.vars.depth) === 55 ||
      this.toNumber(this.vars.depth) === 45
    ) {
      this.warp(this.deactivateTile)(refidx);
      this.warp(this.growSapling)(reftile, this.vars.tilePr);
      return;
    }
    this.vars.depth = 1;
    while (!(this.compare(this.vars.depth, this.stage.vars.Grow.length) > 0)) {
      if (
        this.compare(
          reftile,
          this.itemOf(this.stage.vars.Grow, this.vars.depth - 1)
        ) === 0
      ) {
        this.stage.vars.Growtime.splice(
          this.vars.depth - 1,
          1,
          this.stage.vars.Timereal
        );
        this.warp(this.deactivateTile)(refidx);
        return;
      }
      this.vars.depth++;
    }
    this.warp(this.deactivateTile)(refidx);
  }

  *makeSnow() {
    this.vars.refidxPr =
      this.toNumber(this.stage.vars.Lsx) *
        (this.toNumber(this.stage.vars.Lsy) - 1) +
      this.random(1, this.toNumber(this.stage.vars.Lsx));
    while (
      !!(
        this.toNumber(
          this.itemOf(this.stage.vars.Level, this.vars.refidxPr - 1)
        ) === 1
      )
    ) {
      this.vars.refidxPr += this.toNumber(this.stage.vars.Lsxneg);
    }
    this.vars.t2 = this.itemOf(this.stage.vars.Level, this.vars.refidxPr - 1);
    if (this.toNumber(this.vars.t2) === 38) {
      if (
        !(
          this.toString(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(
                this.itemOf(
                  this.stage.vars.Level,
                  this.toNumber(this.vars.refidxPr) - 2
                )
              ) *
                this.toNumber(this.stage.vars.Dmul) +
                2
            )
          ) === "N"
        )
      ) {
        this.stage.vars.Level.splice(this.vars.refidxPr - 1, 1, 287);
        this.stage.vars.Level.splice(
          this.toNumber(this.vars.refidxPr) +
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
                this.toNumber(
                  this.itemOf(
                    this.stage.vars.Level,
                    this.toNumber(this.vars.refidxPr)
                  )
                ) *
                  this.toNumber(this.stage.vars.Dmul) +
                  2
              )
            ) === "N"
          )
        ) {
          this.stage.vars.Level.splice(this.vars.refidxPr - 1, 1, 287);
          this.stage.vars.Level.splice(
            this.toNumber(this.vars.refidxPr) +
              this.toNumber(this.stage.vars.Lsx) -
              1,
            1,
            283
          );
        }
      }
    } else {
      if (
        !(
          this.toString(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(this.vars.t2) *
                this.toNumber(this.stage.vars.Dmul) +
                2
            )
          ) === "N"
        )
      ) {
        this.stage.vars.Level.splice(
          this.toNumber(this.vars.refidxPr) +
            this.toNumber(this.stage.vars.Lsx) -
            1,
          1,
          283
        );
        if (this.toNumber(this.vars.t2) === 2) {
          this.stage.vars.Level.splice(this.vars.refidxPr - 1, 1, 284);
        } else {
          null;
        }
      }
    }
  }

  *whenIReceiveInit3() {
    this.stage.vars.Fcount = 0;
    this.stage.vars.Ticktime = this.timer;
    this.vars.nextsecond = this.timer + 1;
    this.vars.growidx = 1;
  }
}
