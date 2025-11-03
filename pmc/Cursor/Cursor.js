/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cursor extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("cursor", "./Cursor/costumes/cursor.png", { x: 42, y: 42 }),
      new Costume("dig1", "./Cursor/costumes/dig1.png", { x: 41, y: 41 }),
      new Costume("dig2", "./Cursor/costumes/dig2.png", { x: 41, y: 41 }),
      new Costume("dig3", "./Cursor/costumes/dig3.png", { x: 41, y: 41 }),
      new Costume("dig4", "./Cursor/costumes/dig4.png", { x: 41, y: 41 }),
      new Costume("dig5", "./Cursor/costumes/dig5.png", { x: 41, y: 41 }),
      new Costume("dig6", "./Cursor/costumes/dig6.png", { x: 41, y: 41 }),
      new Costume("dig7", "./Cursor/costumes/dig7.png", { x: 41, y: 41 }),
      new Costume("dig8", "./Cursor/costumes/dig8.png", { x: 41, y: 41 }),
      new Costume("dig9", "./Cursor/costumes/dig9.png", { x: 41, y: 41 }),
      new Costume("dig10", "./Cursor/costumes/dig10.png", { x: 41, y: 41 }),
    ];

    this.sounds = [new Sound("meow", "./Cursor/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Open Close Door" },
        this.whenIReceiveOpenCloseDoor
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Change of Tool" },
        this.whenIReceiveChangeOfTool
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "TeleportToPortal" },
        this.whenIReceiveTeleporttoportal
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.x = 92;
    this.vars.y = 64;
    this.vars.iC = 12893;
    this.vars.xx = -0.13540202997337855;
    this.vars.yy = 0.1108660916560528;
    this.vars.isblockC = 0;
    this.vars.tileC = 1;
    this.vars.digidx = 0;
    this.vars.digtime = 284.353;
    this.vars.digend = 0;
    this.vars.elapse = 0;
    this.vars.refidxC = 0;
    this.vars.wasmode = 0;
    this.vars.data = 0;
    this.vars.justplacedidx = 0;
    this.vars.data2 = 0;
    this.vars.count = 1;
    this.vars.iiC = 321;
    this.vars.fightidx = 0;
    this.vars.lastxC = 92;
    this.vars.lastyC = 64;
    this.vars.tileidxC = 12893;
    this.vars.invidxC = 0;
    this.vars.tooltip = 0;
    this.vars.newtip = 0;
    this.vars.digtile = 289;
    this.vars.larm = 0;
    this.vars.larmtick = 0;
    this.vars.bowpull = 0;
    this.vars.data3 = "N";
    this.vars.hitreach = 10;
    this.vars.t2 = 12273;
    this.vars.lastarmsoundtick = 215;
  }

  *gettileC(x, y) {
    this.vars.tileidxC =
      Math.floor(this.toNumber(y)) * this.toNumber(this.stage.vars.Lsx) +
      Math.floor(this.toNumber(x)) +
      1;
    this.vars.tileC = this.itemOf(
      this.stage.vars.Level,
      this.vars.tileidxC - 1
    );
  }

  *addToHarvest(tileidx, typ) {
    this.vars.data2 = this.itemOf(
      this.vars.undefined,
      this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 4
    );
    if (this.compare(this.vars.data2.length, 1) > 0) {
      this.vars.data = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.stage.vars.Heldc) *
          this.toNumber(this.stage.vars.Dmul) +
          9
      );
      if (this.toNumber(this.vars.data) === 1) {
        this.vars.data = this.itemOf(
          this.vars.undefined,
          this.toNumber(this.stage.vars.Heldc) *
            this.toNumber(this.stage.vars.Dmul) +
            4
        );
        if (
          this.compare(
            this.letterOf(this.vars.data, 0),
            this.letterOf(this.vars.data2, 0)
          ) === 0
        ) {
          if (
            !(
              this.compare(
                this.letterOf(this.vars.data, 1),
                this.letterOf(this.vars.data2, 1)
              ) < 0
            )
          ) {
            yield* this.addToHarvestNow(tileidx, typ, 1);
          }
        }
      }
    } else {
      yield* this.addToHarvestNow(tileidx, typ, 1);
    }
    yield* this.deleteContents(tileidx, !null);
  }

  *isblockC(typ, or, excludedigthrough) {
    this.vars.data = this.itemOf(
      this.vars.undefined,
      this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 3
    );
    if (
      this.toNumber(this.vars.data) === 0 ||
      (excludedigthrough && this.toNumber(this.vars.data) === -1)
    ) {
      if (!or) {
        this.vars.isblockC = 0;
      }
    } else {
      this.vars.isblockC = 1;
    }
  }

  *findMineOrCraftTile() {
    this.goto(
      Math.floor(
        (this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.Scrx)) * 40
      ) + 20,
      Math.floor(
        (this.toNumber(this.vars.y) - this.toNumber(this.stage.vars.Scry)) * 40
      ) + 20
    );
    this.visible = true;
    this.vars.fightidx = 0;
    this.vars.x = this.stage.vars.X;
    this.vars.y = this.toNumber(this.stage.vars.Y) + 0.2;
    this.vars.xx = this.mouse.x / 40 + this.toNumber(this.stage.vars.Scrx);
    this.vars.yy = this.mouse.y / 40 + this.toNumber(this.stage.vars.Scry);
    this.vars.xx = this.toNumber(this.vars.xx) - this.toNumber(this.vars.x);
    this.vars.yy = this.toNumber(this.vars.yy) - this.toNumber(this.vars.y);
    this.vars.iC = Math.sqrt(
      this.toNumber(this.vars.xx) * this.toNumber(this.vars.xx) +
        this.toNumber(this.vars.yy) * this.toNumber(this.vars.yy)
    );
    if (
      this.compare(this.vars.iC, this.stage.vars.MaxReach) > 0 &&
      this.compare(this.stage.vars.Creative, 1) < 0
    ) {
      this.vars.iC =
        this.toNumber(this.stage.vars.MaxReach) / this.toNumber(this.vars.iC);
      this.vars.xx = this.toNumber(this.vars.xx) * this.toNumber(this.vars.iC);
      this.vars.yy = this.toNumber(this.vars.yy) * this.toNumber(this.vars.iC);
      this.vars.hitreach = 20 - 35 / this.toNumber(this.stage.vars.MaxReach);
    } else {
      this.vars.hitreach = 20 - 35 / this.toNumber(this.vars.iC);
    }
    this.vars.iC = 20;
    this.vars.newtip = 0;
    this.vars.xx = this.toNumber(this.vars.xx) / this.toNumber(this.vars.iC);
    this.vars.yy = this.toNumber(this.vars.yy) / this.toNumber(this.vars.iC);
    this.vars.isblockC = 0;
    this.vars.lastxC = 0;
    while (
      !(
        this.compare(this.vars.isblockC, 0) > 0 ||
        this.compare(this.vars.iC, 1) < 0
      )
    ) {
      this.vars.iC--;
      this.vars.x += this.toNumber(this.vars.xx);
      this.vars.y += this.toNumber(this.vars.yy);
      if (
        !(
          this.compare(
            this.vars.lastxC,
            Math.floor(this.toNumber(this.vars.x))
          ) === 0 &&
          this.compare(
            this.vars.lastyC,
            Math.floor(this.toNumber(this.vars.y))
          ) === 0
        )
      ) {
        yield* this.gettileC(this.vars.x, this.vars.y);
        yield* this.isblockC(this.vars.tileC, 0, !null);
        if (this.compare(this.vars.isblockC, 0) > 0) {
          this.vars.data = this.itemOf(
            this.vars.undefined,
            this.toNumber(this.vars.tileC) *
              this.toNumber(this.stage.vars.Dmul) +
              2
          );
          if (!(this.toString(this.vars.data) === "Y")) {
            this.vars.isblockC = 0;
          }
        }
        this.vars.lastxC = Math.floor(this.toNumber(this.vars.x));
        this.vars.lastyC = Math.floor(this.toNumber(this.vars.y));
        if (
          this.toNumber(this.vars.fightidx) === 0 &&
          this.compare(this.vars.iC, this.vars.hitreach) > 0
        ) {
          this.vars.iiC = 1;
          while (
            !(this.compare(this.vars.iiC, this.stage.vars.Mob.length) > 0)
          ) {
            this.vars.data2 = this.itemOf(
              this.stage.vars.Mob,
              this.vars.iiC - 1
            );
            if (this.compare(this.vars.data2, 0) > 0) {
              if (
                this.compare(
                  this.itemOf(
                    this.stage.vars.Mob,
                    this.toNumber(this.vars.iiC) + 1
                  ),
                  this.vars.tileidxC
                ) === 0
              ) {
                if (this.compare(this.vars.iC, this.vars.hitreach) > 0) {
                  this.vars.iC = -1;
                  this.vars.fightidx = this.vars.iiC;
                  this.vars.iiC = 9999999;
                }
                this.vars.isblockC = 1;
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
                    this.vars.tileidxC
                  ) === 0
                ) {
                  if (this.compare(this.vars.iC, this.vars.hitreach) > 0) {
                    this.vars.iC = -1;
                    this.vars.fightidx = this.vars.iiC;
                    this.vars.iiC = 9999999;
                  }
                  this.vars.isblockC = 1;
                } else {
                  if (
                    this.toNumber(this.vars.data2) === 107 &&
                    this.compare(
                      this.toNumber(
                        this.itemOf(
                          this.stage.vars.Mob,
                          this.toNumber(this.vars.iiC) + 1
                        )
                      ) +
                        2 * this.toNumber(this.stage.vars.Lsx),
                      this.vars.tileidxC
                    ) === 0
                  ) {
                    if (this.compare(this.vars.iC, this.vars.hitreach) > 0) {
                      this.vars.iC = -1;
                      this.vars.fightidx = this.vars.iiC;
                      this.vars.iiC = 9999999;
                    }
                    this.vars.isblockC = 1;
                  }
                }
              }
            }
            this.vars.iiC += this.toNumber(this.stage.vars.Mobmul);
            yield;
          }
        }
      }
      yield;
    }
    this.vars.x = Math.floor(this.toNumber(this.vars.x));
    this.vars.y = Math.floor(this.toNumber(this.vars.y));
    this.vars.iC =
      this.toNumber(this.vars.y) * this.toNumber(this.stage.vars.Lsx) +
      this.toNumber(this.vars.x) +
      1;
    this.vars.refidxC = this.itemOf(this.stage.vars.Levelref, this.vars.iC - 1);
    if (!(this.toNumber(this.vars.refidxC) === 0)) {
      if (
        this.toString(
          this.itemOf(this.stage.vars.Refdata, this.toNumber(this.vars.refidxC))
        ) === "f"
      ) {
        this.vars.iC = 0;
      }
    }
    this.stage.vars.Undercursor = this.vars.tileC;
    this.stage.vars.Cursor = this.vars.iC;
  }

  *whenIReceiveOpenCloseDoor() {
    if (this.toNumber(this.stage.vars.Undercursor) === 56) {
      yield* this.setBlock(this.stage.vars.Cursor, 120, 0, !null);
      yield* this.setBlock(
        this.toNumber(this.stage.vars.Cursor) -
          this.toNumber(this.stage.vars.Lsx),
        121,
        0,
        !null
      );
    }
    if (this.toNumber(this.stage.vars.Undercursor) === 57) {
      yield* this.setBlock(this.stage.vars.Cursor, 121, 0, !null);
      yield* this.setBlock(
        this.toNumber(this.stage.vars.Cursor) +
          this.toNumber(this.stage.vars.Lsx),
        120,
        0,
        !null
      );
    }
    if (this.toNumber(this.stage.vars.Undercursor) === 120) {
      yield* this.setBlock(this.stage.vars.Cursor, 56, 0, !null);
      yield* this.setBlock(
        this.toNumber(this.stage.vars.Cursor) -
          this.toNumber(this.stage.vars.Lsx),
        57,
        0,
        !null
      );
    }
    if (this.toNumber(this.stage.vars.Undercursor) === 121) {
      yield* this.setBlock(this.stage.vars.Cursor, 57, 0, !null);
      yield* this.setBlock(
        this.toNumber(this.stage.vars.Cursor) +
          this.toNumber(this.stage.vars.Lsx),
        56,
        0,
        !null
      );
    }
  }

  *doBowAction() {
    this.vars.larm = this.sprites["StevesHead"].direction;
    if (this.compare(this.stage.vars.Lastdir, 0) < 0) {
      this.vars.larm = 0 - this.toNumber(this.vars.larm);
    }
    if (this.toNumber(this.vars.larm) === 0) {
      this.vars.larm = 0.01;
    }
    if (this.toNumber(this.vars.bowpull) === 0) {
      yield* this.gotAnyArrows();
      if (this.compare(this.vars.iC, 0) > 0) {
        this.vars.bowpull = 0.001;
      }
    } else {
      this.vars.bowpull += this.toNumber(this.stage.vars.Ticks) * 0.125;
      if (this.compare(this.vars.bowpull, 2.5) > 0) {
        this.vars.bowpull = 2.5;
      }
    }
  }

  *setCostume(costumeno) {
    if (!(this.compare(costumeno, this.costumeNumber) === 0)) {
      this.costume = costumeno;
    }
  }

  *gotAnyArrows() {
    if (this.compare(this.stage.vars.Creative, 1) < 0) {
      this.vars.iC = 36;
      while (
        !(
          this.compare(this.vars.iC, 1) < 0 ||
          131 ===
            this.toNumber(
              this.itemOf(
                this.stage.vars.Inv,
                this.toNumber(this.vars.iC) * 2 - 2
              )
            )
        )
      ) {
        this.vars.iC--;
        yield;
      }
    } else {
      this.vars.iC = 99999;
    }
  }

  *doShootBow() {
    yield* this.gotAnyArrows();
    if (this.compare(this.vars.iC, 0) > 0) {
      yield* this.reduceItemsHeldByInvid(this.vars.iC, 1);
      yield* this.damageTool(this.vars.tileC);
      this.stage.vars.Harvest.push(
        this.toNumber(this.stage.vars.X) +
          0.9 * Math.sin(this.degToRad(this.sprites["StevesHead"].direction))
      );
      this.stage.vars.Harvest.push(
        this.toNumber(this.stage.vars.Y) +
          0.3 +
          0.9 * Math.cos(this.degToRad(this.sprites["StevesHead"].direction))
      );
      this.stage.vars.Harvest.push(132);
      this.stage.vars.Harvest.push(1);
      this.vars.bowpull += 0.5;
      this.stage.vars.Harvest.push(
        this.toNumber(this.vars.bowpull) *
          0.3 *
          Math.sin(this.degToRad(this.sprites["StevesHead"].direction))
      );
      this.stage.vars.Harvest.push(
        this.toNumber(this.vars.bowpull) *
          0.3 *
          Math.cos(this.degToRad(this.sprites["StevesHead"].direction))
      );
    }
  }

  *whenIReceiveChangeOfTool() {
    this.vars.elapse = 0;
    if (this.toNumber(this.stage.vars.Mode) === 0) {
      if (this.compare(this.vars.wasmode, 0) > 0) {
        this.vars.wasmode = -1;
        this.vars.digidx = 0;
      }
    }
  }

  *animate() {
    if (this.toNumber(this.stage.vars.Mode) === 0) {
      yield* this.findMineOrCraftTile();
      yield* this.toolTip(this.vars.iC, this.vars.tileC);
      if (this.mouse.down) {
        if (this.compare(this.vars.wasmode, -1) > 0) {
          if (this.toNumber(this.stage.vars.Heldc) === 130) {
            yield* this.doBowAction();
            return;
          }
          this.vars.bowpull = 0;
          this.vars.larmtick += this.toNumber(this.stage.vars.Ticks);
          this.vars.larm =
            5.5 + Math.abs(((this.toNumber(this.vars.larmtick) / 1.5) % 5) - 3);
          this.vars.larm = 220 - this.toNumber(this.vars.larm) * 14;
          if (this.compare(this.vars.fightidx, 0) > 0) {
            yield* this.hitMob(this.vars.fightidx);
            this.vars.wasmode = 3;
            this.vars.digidx = 0;
            this.stage.vars.Foodsaturation -= 0.02;
          } else {
            this.stage.vars.Foodsaturation -= 0.015;
            if (this.toNumber(this.stage.vars.Heldc) === 142) {
              yield* this.plantSeeds(this.vars.iC, this.vars.tileC);
            }
            this.vars.data2 = this.itemOf(
              this.vars.undefined,
              this.toNumber(this.stage.vars.Heldc) *
                this.toNumber(this.stage.vars.Dmul) +
                4
            );
            if ("H" === this.letterOf(this.vars.data2, 0)) {
              if (
                this.toNumber(this.vars.tileC) === 2 ||
                this.toNumber(this.vars.tileC) === 3
              ) {
                yield* this.setBlock(this.vars.iC, 144, 0, !null);
                yield* this.damageTool(this.vars.tileC);
                yield* this.setCostume(1);
                this.vars.wasmode = 4;
                this.vars.digidx = 0;
              }
            }
          }
          if (this.compare(this.vars.wasmode, 2) < 0) {
            if (this.compare(this.vars.iC, 0) > 0) {
              if (
                !(
                  this.compare(this.vars.iC, this.vars.digidx) === 0 &&
                  this.compare(this.vars.tileC, this.vars.digtile) === 0
                )
              ) {
                if (this.toNumber(this.stage.vars.Heldc) === 110) {
                  yield* this.flintAndSteel();
                  this.vars.digidx = 0;
                  this.vars.wasmode = -1;
                } else {
                  if (
                    this.toNumber(this.stage.vars.Heldc) === 195 &&
                    this.compare(this.vars.tileC, 1) > 0
                  ) {
                    yield* this.collateralChecksC(this.vars.iC, "bm", 0);
                    yield* this.reduceItemsHeld(0);
                    this.vars.digidx = 0;
                    this.vars.wasmode = -1;
                  } else {
                    if (
                      this.toNumber(this.stage.vars.Heldc) === 92 &&
                      (this.toNumber(this.vars.tileC) === 81 ||
                        this.toNumber(this.vars.tileC) === 38)
                    ) {
                      if (this.toNumber(this.vars.tileC) === 81) {
                        this.stage.vars.Inv.splice(
                          2 * this.toNumber(this.stage.vars.Heldinvid) - 2,
                          1,
                          82
                        );
                      } else {
                        this.stage.vars.Inv.splice(
                          2 * this.toNumber(this.stage.vars.Heldinvid) - 2,
                          1,
                          95
                        );
                      }
                      yield* this.setBlock(this.vars.iC, 1, 0, 0);
                      this.stage.vars.Nextselid = this.stage.vars.Heldinvid;
                      this.broadcast("Update Inventory");
                      this.vars.digidx = 0;
                      this.vars.wasmode = -1;
                    } else {
                      if (
                        this.compare(Math.abs(this.mouse.x), 239) > 0 ||
                        this.compare(Math.abs(this.mouse.y), 179) > 0
                      ) {
                        this.vars.digidx = 0;
                      } else {
                        yield* this.getDigSpeed(this.vars.tileC);
                      }
                      if (this.compare(this.vars.digend, 0) > 0) {
                        this.vars.digidx = this.vars.iC;
                        this.vars.digtile = this.vars.tileC;
                        this.vars.digtime = this.timer;
                        this.vars.digend =
                          this.toNumber(this.vars.digend) * 0.15;
                        this.vars.wasmode = 1;
                      } else {
                        this.vars.digidx = 0;
                      }
                    }
                  }
                }
              }
            } else {
              this.vars.digidx = 0;
            }
          }
          if (
            !(
              this.toNumber(this.vars.wasmode) === -1 ||
              this.toNumber(this.vars.wasmode) === 1 ||
              this.toNumber(this.vars.wasmode) === 3
            )
          ) {
            yield* this.placeBlock(this.stage.vars.Heldc, 0);
          }
        }
      } else {
        this.vars.digidx = 0;
        this.vars.wasmode = 0;
        this.vars.justplacedidx = 0;
        this.vars.larm = 0;
        this.vars.lastarmsoundtick = this.vars.larmtick;
        if (this.compare(this.vars.bowpull, 0) > 0) {
          yield* this.doShootBow();
          this.vars.bowpull = 0;
        }
      }
      if (this.compare(this.vars.digidx, 0) > 0) {
        this.vars.elapse = this.timer - this.toNumber(this.vars.digtime);
        if (
          this.compare(
            this.vars.elapse,
            this.toNumber(this.vars.digend) * 9.99
          ) > 0
        ) {
          yield* this.gettileC(this.vars.x, this.vars.y);
          yield* this.damageTool(this.vars.tileC);
          yield* this.setBlock(this.vars.iC, 1, !null, 0);
          yield* this.setCostume(1);
          this.vars.digidx = 0;
        } else {
          yield* this.setCostume(
            Math.floor(
              this.toNumber(this.vars.elapse) / this.toNumber(this.vars.digend)
            ) + 2
          );
          if (
            this.compare(this.vars.larmtick, this.vars.lastarmsoundtick) > 0
          ) {
            this.broadcast("Play Dig Sound");
            this.vars.lastarmsoundtick += 8;
          }
        }
      } else {
        yield* this.setCostume(1);
      }
      if (this.keyPressed("f")) {
        if (this.toNumber(this.stage.vars.Eating) === 0) {
          yield* this.eatSomething();
        }
      } else {
        this.stage.vars.Eating = 0;
      }
    } else {
      this.visible = false;
    }
  }

  *whenIReceiveAnimate() {
    yield* this.animate();
  }

  *addToLightMod(tileidx) {
    if (!this.arrayIncludes(this.stage.vars.Lightmod, tileidx)) {
      this.stage.vars.Lightmod.push(tileidx);
    }
    if (
      !this.arrayIncludes(
        this.stage.vars.Lightmod,
        this.toNumber(tileidx) + this.stage.vars.Level.length
      )
    ) {
      this.stage.vars.Lightmod.push(
        this.toNumber(tileidx) + this.stage.vars.Level.length
      );
    }
  }

  *collateralChecksC(idx, mode, force) {
    this.vars.refidxC = this.itemOf(this.stage.vars.Levelref, idx - 1);
    if (0 === this.toNumber(this.vars.refidxC)) {
      yield* this.getAvailableRefIndexC();
      this.stage.vars.Refdata.splice(
        this.toNumber(this.vars.refidxC) + -1,
        1,
        idx
      );
      this.stage.vars.Refdata.splice(this.toNumber(this.vars.refidxC), 1, mode);
      this.stage.vars.Levelref.splice(idx - 1, 1, this.vars.refidxC);
    } else {
      if (
        0 ===
          this.toNumber(
            this.itemOf(
              this.stage.vars.Refdata,
              this.toNumber(this.vars.refidxC)
            )
          ) ||
        force
      ) {
        this.stage.vars.Refdata.splice(
          this.toNumber(this.vars.refidxC),
          1,
          mode
        );
      }
    }
    yield* this.addToLightMod(idx);
  }

  *plantSeeds(tileidx, tile) {
    if (144 === this.toNumber(tile)) {
      yield* this.plantSeeds(
        this.toNumber(tileidx) + this.toNumber(this.stage.vars.Lsx),
        this.itemOf(
          this.stage.vars.Level,
          this.toNumber(tileidx) + this.toNumber(this.stage.vars.Lsx) - 1
        )
      );
      return;
    }
    if (!(1 === this.toNumber(tile))) {
      return;
    }
    if (
      !(
        144 ===
        this.toNumber(
          this.itemOf(
            this.stage.vars.Level,
            this.toNumber(tileidx) - this.toNumber(this.stage.vars.Lsx) - 1
          )
        )
      )
    ) {
      return;
    }
    yield* this.reduceItemsHeld(0);
    this.stage.vars.Level.splice(tileidx - 1, 1, 134);
    this.stage.vars.Grow.push(tileidx);
    this.stage.vars.Growtime.push(0);
    this.vars.wasmode = 4;
    this.vars.digidx = 0;
  }

  *getAvailableRefIndexC() {
    if (this.stage.vars.Refpool.length === 0) {
      this.vars.refidxC = this.stage.vars.Refdata.length + 1;
      for (let i = 0; i < this.toNumber(this.stage.vars.Refsize); i++) {
        this.stage.vars.Refdata.push("");
        yield;
      }
    } else {
      this.vars.refidxC = this.itemOf(this.stage.vars.Refpool, 0);
      this.stage.vars.Refpool.splice(0, 1);
    }
  }

  *damageTool(tile) {
    if (this.compare(this.stage.vars.Creative, 1) < 0) {
      this.vars.data = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.stage.vars.Heldc) *
          this.toNumber(this.stage.vars.Dmul) +
          9
      );
      if (this.toNumber(this.vars.data) === 1) {
        this.vars.data =
          this.toNumber(
            this.itemOf(
              this.stage.vars.Inv,
              this.toNumber(this.stage.vars.Heldinvid) * 2 - 1
            )
          ) - 1;
        this.stage.vars.Inv.splice(
          this.toNumber(this.stage.vars.Heldinvid) * 2 - 1,
          1,
          this.vars.data
        );
        if (this.compare(this.vars.data, 1) < 0) {
          this.stage.vars.Inv.splice(
            this.toNumber(this.stage.vars.Heldinvid) * 2 - 2,
            1,
            "#"
          );
          this.stage.vars.Nextselid = this.stage.vars.Heldinvid;
        }
      }
    }
  }

  *hitMob(mobidx) {
    this.vars.data = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(mobidx) + -1
    );
    if (
      this.toNumber(this.stage.vars.Heldc) === 92 &&
      this.toNumber(this.vars.data) === 3
    ) {
      this.stage.vars.Inv.splice(
        2 * this.toNumber(this.stage.vars.Heldinvid) - 2,
        1,
        168
      );
      this.stage.vars.Nextselid = this.stage.vars.Heldinvid;
      this.broadcast("Update Inventory");
      this.vars.digidx = 0;
      this.vars.wasmode = -1;
      return;
    }
    if (this.toNumber(this.stage.vars.Heldc) === 194) {
      if (
        this.toNumber(this.vars.data) === 5 ||
        this.toNumber(this.vars.data) === 6
      ) {
        if (this.toNumber(this.vars.data) === 5) {
          yield* this.reduceItemsHeld(0);
        }
        this.vars.digidx = 0;
        this.vars.wasmode = -1;
        if (this.toNumber(this.vars.data) === 5 && this.random(1, 3) === 1) {
          this.stage.vars.Mob.splice(this.toNumber(mobidx) + -1, 1, 6);
        }
        return;
      }
    }
    if (this.compare(this.timer, this.vars.elapse) < 0) {
      return;
    }
    this.vars.elapse = this.timer + 0.5;
    if (
      this.compare(
        this.itemOf(this.stage.vars.Mob, this.toNumber(mobidx) + 11),
        this.stage.vars.Timereal
      ) < 0
    ) {
      this.vars.data = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.stage.vars.Heldc) *
          this.toNumber(this.stage.vars.Dmul) +
          9
      );
      if (this.toNumber(this.vars.data) === 1) {
        this.vars.data = this.itemOf(
          this.vars.undefined,
          this.toNumber(this.stage.vars.Heldc) *
            this.toNumber(this.stage.vars.Dmul) +
            13
        );
        if (this.compare(this.vars.data, 1) < 0) {
          this.vars.data = 1;
        }
      } else {
        this.vars.data = 1;
      }
      this.stage.vars.Mob.splice(this.toNumber(mobidx) + 8, 1, this.vars.data);
      if (
        this.compare(
          this.stage.vars.X,
          this.itemOf(this.stage.vars.Mob, this.toNumber(mobidx) + 2)
        ) < 0
      ) {
        this.vars.data = 1;
      } else {
        this.vars.data = -1;
      }
      this.stage.vars.Mob.splice(this.toNumber(mobidx) + 17, 1, this.vars.data);
      yield* this.damageTool(0);
    }
  }

  *addToHarvestNow(tileidx, typ, count) {
    this.vars.data = this.itemOf(
      this.vars.undefined,
      this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 10
    );
    if (
      this.toNumber(typ) === 5 &&
      this.compare(this.random(2.3283064365386963e-10, 9.00000000023283), 1) < 0
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
    if (
      this.compare(this.vars.data, 0) > 0 &&
      this.compare(count, 0) > 0 &&
      this.compare(this.stage.vars.Creative, 1) < 0
    ) {
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
        yield* this.addToHarvestNow(tileidx, 142, this.random(0, 3));
      }
    }
  }

  *deleteContents(tileidx, harvestcontents) {
    yield* this.getInventoryIdxFor(tileidx);
    if (this.compare(this.vars.invidxC, 0) > 0) {
      this.vars.iiC = this.toNumber(this.vars.invidxC) + 3;
      for (
        let i = 0;
        i <
        this.toNumber(
          this.itemOf(this.stage.vars.Inside, this.toNumber(this.vars.invidxC))
        );
        i++
      ) {
        this.vars.data2 = this.itemOf(
          this.stage.vars.Inside,
          this.toNumber(this.vars.iiC)
        );
        if (this.compare(this.vars.data2, 0) > 0 && harvestcontents) {
          yield* this.addToHarvestNow(
            tileidx,
            this.itemOf(this.stage.vars.Inside, this.vars.iiC - 1),
            this.vars.data2
          );
        }
        this.stage.vars.Inside.splice(this.vars.iiC - 1, 1);
        this.stage.vars.Inside.splice(this.vars.iiC - 1, 1);
        yield;
      }
      this.stage.vars.Inside.splice(this.vars.invidxC - 1, 1);
      this.stage.vars.Inside.splice(this.vars.invidxC - 1, 1);
      this.stage.vars.Inside.splice(this.vars.invidxC - 1, 1);
    }
  }

  *getInventoryIdxFor(tileidx) {
    this.vars.data = 1;
    this.vars.invidxC = 0;
    while (!(this.compare(this.vars.data, this.stage.vars.Inside.length) > 0)) {
      if (
        this.compare(
          tileidx,
          this.itemOf(this.stage.vars.Inside, this.vars.data - 1)
        ) === 0
      ) {
        this.vars.invidxC = this.vars.data;
        this.vars.data += 9999999;
      } else {
        this.vars.data +=
          2 *
            this.toNumber(
              this.itemOf(this.stage.vars.Inside, this.toNumber(this.vars.data))
            ) +
          3;
      }
      yield;
    }
  }

  *flintAndSteel() {
    if (this.toNumber(this.vars.tileC) === 52) {
      while (
        !!(
          52 ===
          this.toNumber(this.itemOf(this.stage.vars.Level, this.vars.iC - 1))
        )
      ) {
        this.vars.iC += this.toNumber(this.stage.vars.Lsx);
        yield;
      }
      this.vars.iC += this.toNumber(this.stage.vars.Lsxneg);
      this.vars.yy = this.vars.iC;
      while (
        !!(
          52 ===
          this.toNumber(this.itemOf(this.stage.vars.Level, this.vars.iC - 1))
        )
      ) {
        this.vars.iC += this.toNumber(this.stage.vars.Lsxneg);
        yield;
      }
      if (
        this.compare(
          this.toNumber(this.vars.yy) - this.toNumber(this.vars.iC),
          5 * this.toNumber(this.stage.vars.Lsx)
        ) === 0
      ) {
        this.vars.iC += this.toNumber(this.stage.vars.Lsx);
        if (
          52 ===
          this.toNumber(
            this.itemOf(this.stage.vars.Level, this.toNumber(this.vars.iC))
          )
        ) {
          this.vars.xx = 1;
        } else {
          this.vars.xx = -1;
        }
        this.vars.t2 = 0;
        for (let i = 0; i < 2; i++) {
          this.vars.iC += this.toNumber(this.vars.xx);
          if (
            52 ===
            this.toNumber(this.itemOf(this.stage.vars.Level, this.vars.iC - 1))
          ) {
            if (
              1 ===
              this.toNumber(
                this.itemOf(
                  this.stage.vars.Level,
                  this.toNumber(this.vars.iC) +
                    1 * this.toNumber(this.stage.vars.Lsx) -
                    1
                )
              )
            ) {
              if (
                1 ===
                this.toNumber(
                  this.itemOf(
                    this.stage.vars.Level,
                    this.toNumber(this.vars.iC) +
                      2 * this.toNumber(this.stage.vars.Lsx) -
                      1
                  )
                )
              ) {
                if (
                  1 ===
                  this.toNumber(
                    this.itemOf(
                      this.stage.vars.Level,
                      this.toNumber(this.vars.iC) +
                        3 * this.toNumber(this.stage.vars.Lsx) -
                        1
                    )
                  )
                ) {
                  if (
                    52 ===
                    this.toNumber(
                      this.itemOf(
                        this.stage.vars.Level,
                        this.toNumber(this.vars.iC) +
                          4 * this.toNumber(this.stage.vars.Lsx) -
                          1
                      )
                    )
                  ) {
                    this.vars.t2++;
                  }
                }
              }
            }
          }
          yield;
        }
        if (this.toNumber(this.vars.t2) === 2) {
          this.vars.iC += this.toNumber(this.vars.xx);
          for (let i = 0; i < 5; i++) {
            if (
              52 ===
              this.toNumber(
                this.itemOf(this.stage.vars.Level, this.vars.iC - 1)
              )
            ) {
              this.vars.t2++;
              this.vars.iC += this.toNumber(this.stage.vars.Lsx);
            }
            yield;
          }
          if (this.toNumber(this.vars.t2) === 7) {
            this.vars.iC += 5 * this.toNumber(this.stage.vars.Lsxneg);
            if (this.toNumber(this.vars.xx) === 1) {
              this.vars.iC -= 3;
            }
            yield* this.createportal(this.vars.iC);
          }
        }
      }
    } else {
      if (this.toNumber(this.vars.tileC) === 18) {
        yield* this.collateralChecksC(this.vars.iC, "X", 0);
        yield* this.damageTool(this.vars.tileC);
      } else {
        yield* this.collateralChecksC(this.vars.iC, "fi", 0);
        yield* this.damageTool(this.vars.tileC);
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

  *whenIReceiveTeleporttoportal() {
    yield* this.teleporttoportal();
  }

  *createportal(tileidx) {
    this.vars.iC = tileidx;
    for (let i = 0; i < 4; i++) {
      this.stage.vars.Level.splice(this.vars.iC - 1, 1, 267);
      this.vars.iC++;
      yield;
    }
    this.vars.iC += this.toNumber(this.stage.vars.Lsx) - 4;
    for (let i = 0; i < 3; i++) {
      this.stage.vars.Level.splice(this.vars.iC - 1, 1, 267);
      this.vars.iC++;
      for (let i = 0; i < 2; i++) {
        this.stage.vars.Level.splice(this.vars.iC - 1, 1, 266);
        yield* this.addToLightMod(this.vars.iC);
        this.vars.iC++;
        yield;
      }
      this.stage.vars.Level.splice(this.vars.iC - 1, 1, 267);
      this.vars.iC += this.toNumber(this.stage.vars.Lsx) - 3;
      yield;
    }
    for (let i = 0; i < 4; i++) {
      this.stage.vars.Level.splice(this.vars.iC - 1, 1, 267);
      this.vars.iC++;
      yield;
    }
  }

  *teleporttoportal() {
    this.vars.iC = Math.floor(this.toNumber(this.stage.vars.X)) + 1;
    this.vars.xx = 1;
    while (!(this.compare(this.vars.xx, 32) > 0)) {
      this.vars.tileC = this.itemOf(
        this.stage.vars.Level,
        this.toNumber(this.vars.iC) + this.toNumber(this.vars.xx) - 1
      );
      if (266 === this.toNumber(this.vars.tileC)) {
        this.vars.xx =
          this.toNumber(this.vars.iC) + this.toNumber(this.vars.xx);
      } else {
        if (
          266 ===
          this.toNumber(
            this.itemOf(
              this.stage.vars.Level,
              this.toNumber(this.vars.iC) - this.toNumber(this.vars.xx) - 1
            )
          )
        ) {
          this.vars.xx =
            this.toNumber(this.vars.iC) - this.toNumber(this.vars.xx);
        } else {
          this.vars.iC += this.toNumber(this.stage.vars.Lsx);
          if (this.compare(this.vars.iC, this.stage.vars.Level.length) > 0) {
            this.vars.iC = Math.floor(this.toNumber(this.stage.vars.X)) + 1;
            this.vars.xx++;
          }
        }
      }
      yield;
    }
    if (this.compare(this.vars.xx, 34) < 0) {
      this.vars.iC =
        Math.floor(this.toNumber(this.stage.vars.X)) +
        (this.stage.vars.Level.length - this.toNumber(this.stage.vars.Lsx) + 1);
      this.vars.data = 999;
      this.vars.data2 = 1;
      this.vars.yy = this.stage.vars.Lsy;
      while (!(this.compare(this.vars.iC, 1) < 0)) {
        if (this.toNumber(this.vars.data2) === 1) {
          if (
            1 ===
            this.toNumber(this.itemOf(this.stage.vars.Level, this.vars.iC - 1))
          ) {
            this.vars.data2 = 0;
          }
        } else {
          if (
            !(
              1 ===
              this.toNumber(
                this.itemOf(this.stage.vars.Level, this.vars.iC - 1)
              )
            )
          ) {
            this.vars.data2 = 1;
            if (
              this.compare(
                Math.abs(
                  this.toNumber(this.vars.yy) - this.toNumber(this.stage.vars.Y)
                ),
                this.vars.data
              ) < 0
            ) {
              this.vars.xx =
                this.toNumber(this.vars.iC) -
                1 +
                this.toNumber(this.stage.vars.Lsx);
              this.vars.data = Math.abs(
                this.toNumber(this.vars.yy) - this.toNumber(this.stage.vars.Y)
              );
            }
          }
        }
        this.vars.iC += this.toNumber(this.stage.vars.Lsxneg);
        this.vars.yy--;
        yield;
      }
      yield* this.createportal(this.vars.xx);
      this.vars.xx += 1 - 3 * this.toNumber(this.stage.vars.Lsxneg);
    } else {
      if (
        266 ===
        this.toNumber(
          this.itemOf(this.stage.vars.Level, this.toNumber(this.vars.xx) - 2)
        )
      ) {
        this.vars.xx--;
      }
    }
    this.stage.vars.X =
      ((this.toNumber(this.vars.xx) - 1) % this.toNumber(this.stage.vars.Lsx)) +
      1.5;
    this.stage.vars.Y =
      Math.floor(
        (this.toNumber(this.vars.xx) - 1) / this.toNumber(this.stage.vars.Lsx)
      ) + 1;
  }

  *toolTip(tileidx, tile) {
    this.vars.newtip = "";
    if (this.toNumber(tile) === 117 || this.toNumber(tile) === 12) {
      yield* this.getInventoryIdxFor(tileidx);
      if (this.compare(this.vars.invidxC, 0) > 0) {
        this.vars.newtip = this.itemOf(
          this.stage.vars.Inside,
          this.toNumber(this.vars.invidxC) + 1
        );
      }
    }
    if (!(this.compare(this.vars.newtip, this.vars.tooltip) === 0)) {
      this.think(this.vars.newtip);
      this.vars.tooltip = this.vars.newtip;
    }
  }

  *eatSomething() {
    if (this.toString(this.stage.vars.Heldc) === "#") {
      this.stage.vars.Eating = -1;
    } else {
      this.stage.vars.Eating = this.stage.vars.Foodmul;
      while (
        !(
          this.compare(
            this.stage.vars.Eating,
            this.stage.vars.FoodData.length
          ) > 0
        )
      ) {
        if (
          this.compare(
            this.stage.vars.Heldc,
            this.itemOf(
              this.stage.vars.FoodData,
              this.toNumber(this.stage.vars.Eating)
            )
          ) === 0
        ) {
          if (this.compare(this.stage.vars.Hunger, 20) < 0) {
            if (
              this.compare(
                this.random(0, 1),
                this.itemOf(
                  this.stage.vars.FoodData,
                  this.toNumber(this.stage.vars.Eating) + 4
                )
              ) < 0
            ) {
              this.stage.vars.Foodsaturation -= 60;
              this.stage.vars.HealthS--;
              if (this.compare(this.stage.vars.HealthS, 0) < 0) {
                this.stage.vars.HealthS = 0;
              }
              this.stage.vars.Speak = "Yuck!  Poisoned...";
            } else {
              this.stage.vars.Hunger += this.toNumber(
                this.itemOf(
                  this.stage.vars.FoodData,
                  this.toNumber(this.stage.vars.Eating) + 2
                )
              );
              if (this.compare(this.stage.vars.Hunger, 20) > 0) {
                this.stage.vars.Hunger = 20;
              }
              this.stage.vars.Foodsaturation +=
                this.toNumber(
                  this.itemOf(
                    this.stage.vars.FoodData,
                    this.toNumber(this.stage.vars.Eating) + 3
                  )
                ) * 4;
              if (
                this.compare(
                  this.stage.vars.Foodsaturation,
                  this.toNumber(this.stage.vars.Hunger) * 4
                ) > 0
              ) {
                this.stage.vars.Foodsaturation =
                  this.toNumber(this.stage.vars.Hunger) * 4;
              }
              this.stage.vars.Speak = "Munch munch...";
            }
            this.broadcast("Update Health");
            yield* this.reduceItemsHeld(
              this.itemOf(
                this.stage.vars.FoodData,
                this.toNumber(this.stage.vars.Eating) + 5
              )
            );
          } else {
            this.stage.vars.Speak = "I'm not hungry...";
          }
          this.stage.vars.Eating += 99999;
        } else {
          this.stage.vars.Eating += this.toNumber(this.stage.vars.Foodmul);
        }
        yield;
      }
      if (this.compare(this.stage.vars.Eating, 99999) < 0) {
        this.stage.vars.Speak = "I can't eat that!";
      }
    }
  }

  *reduceItemsHeldByInvid(invid, replaceid) {
    if (this.compare(this.stage.vars.Creative, 1) < 0) {
      if (this.compare(replaceid, 2) < 0) {
        this.vars.count = this.itemOf(
          this.stage.vars.Inv,
          2 * this.toNumber(invid) - 1
        );
        this.vars.count--;
        this.stage.vars.Inv.splice(
          2 * this.toNumber(invid) - 1,
          1,
          this.vars.count
        );
        if (this.toNumber(this.vars.count) === 0) {
          this.stage.vars.Inv.splice(2 * this.toNumber(invid) - 2, 1, "#");
          if (this.compare(this.stage.vars.Heldinvid, invid) === 0) {
            this.stage.vars.Nextselid = this.stage.vars.Heldinvid;
            this.broadcast("Update Inventory");
          }
        }
      } else {
        this.stage.vars.Inv.splice(2 * this.toNumber(invid) - 2, 1, replaceid);
        if (this.compare(this.stage.vars.Heldinvid, invid) === 0) {
          this.stage.vars.Nextselid = this.stage.vars.Heldinvid;
          this.broadcast("Update Inventory");
        }
      }
    }
  }

  *reduceItemsHeld(orreplace) {
    yield* this.reduceItemsHeldByInvid(this.stage.vars.Heldinvid, orreplace);
  }

  *placeOnWall(tileid, leaveid, leftid, rightid, topid) {
    this.vars.t2 = this.sprites["StevesHead"].direction;
    yield* this.gettileC(
      this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.Lsx),
      this.vars.y
    );
    yield* this.isblockC(this.vars.tileC, 0, !null);
    if (
      this.toNumber(this.vars.isblockC) === 0 ||
      this.compare((this.toNumber(this.vars.t2) - 120) % 360, 120) > 0
    ) {
      if (this.compare(this.vars.t2, 0) < 0) {
        yield* this.gettileC(this.toNumber(this.vars.x) - 1, this.vars.y);
        yield* this.isblockC(this.vars.tileC, 0, !null);
        if (this.compare(this.vars.isblockC, 0) > 0) {
          yield* this.placeBlock(leftid, leaveid);
          return;
        }
      }
      yield* this.gettileC(this.toNumber(this.vars.x) + 1, this.vars.y);
      yield* this.isblockC(this.vars.tileC, 0, !null);
      if (this.compare(this.vars.isblockC, 0) > 0) {
        yield* this.placeBlock(rightid, leaveid);
        return;
      }
      if (this.compare(this.vars.t2, 0) > 0) {
        yield* this.gettileC(this.toNumber(this.vars.x) - 1, this.vars.y);
        yield* this.isblockC(this.vars.tileC, 0, !null);
        if (this.compare(this.vars.isblockC, 0) > 0) {
          yield* this.placeBlock(leftid, leaveid);
          return;
        }
      }
    }
    yield* this.gettileC(this.vars.x, this.vars.y);
    this.vars.t2 = -999;
  }

  *getDigSpeed(tile) {
    this.vars.digend = this.itemOf(
      this.vars.undefined,
      this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 3
    );
    if (this.compare(this.stage.vars.Creative, 1) < 0) {
      if (this.compare(this.vars.digend, 0) < 0) {
        this.vars.digend = 0.001;
      }
      this.vars.data = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.stage.vars.Heldc) *
          this.toNumber(this.stage.vars.Dmul) +
          9
      );
      this.vars.data2 = this.itemOf(
        this.vars.undefined,
        this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 4
      );
      this.vars.data3 = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.stage.vars.Heldc) *
          this.toNumber(this.stage.vars.Dmul) +
          4
      );
      if (
        this.compare(this.vars.data2.length, 0) > 0 &&
        !(this.toString(this.vars.data2) === "N")
      ) {
        if (
          this.toNumber(this.vars.data) === 1 &&
          this.compare(
            this.letterOf(this.vars.data3, 0),
            this.letterOf(this.vars.data2, 0)
          ) === 0
        ) {
          if (
            this.compare(this.vars.data2.length, 1) > 0 &&
            this.compare(
              this.letterOf(this.vars.data3, 1),
              this.letterOf(this.vars.data2, 1)
            ) < 0
          ) {
            this.vars.digend = this.toNumber(this.vars.digend) * 3.33;
          } else {
            this.vars.digend =
              this.toNumber(this.vars.digend) /
              (3 * this.toNumber(this.letterOf(this.vars.data3, 1)));
          }
        } else {
          if (this.toNumber(this.stage.vars.Creative) === -1) {
            this.vars.digend = 99999;
          } else {
            if (this.compare(this.vars.data2.length, 1) > 0) {
              this.vars.digend = this.toNumber(this.vars.digend) * 3.33;
            }
          }
        }
      }
    } else {
      if (this.compare(this.vars.digend, 99998) > 0) {
        this.vars.digend = 99999;
      } else {
        if (!(this.toNumber(this.vars.digend) === 0)) {
          this.vars.digend = 0.03;
        }
      }
    }
  }

  *setBlock(tileidx, tileid, harvest, exact) {
    yield* this.gettileC(this.vars.x, this.vars.y);
    if (this.toNumber(this.vars.tileC) === 100) {
      yield* this.specialSetBlock(tileidx, 8, 0, harvest, 9);
    } else {
      if (this.toNumber(this.vars.tileC) === 287) {
        yield* this.specialSetBlock(tileidx, 38, 0, 0, 0);
      } else {
        if (this.toNumber(this.vars.tileC) === 183) {
          yield* this.specialSetBlock(tileidx, 179, 0, harvest, 181);
        } else {
          if (this.toNumber(this.vars.tileC) === 186) {
            yield* this.specialSetBlock(tileidx, 178, 0, harvest, 184);
          } else {
            if (this.toNumber(this.vars.tileC) === 189) {
              yield* this.specialSetBlock(tileidx, 180, 0, harvest, 187);
            } else {
              if (
                !exact &&
                11 ===
                  this.toNumber(
                    this.itemOf(
                      this.vars.undefined,
                      this.toNumber(this.vars.tileC) *
                        this.toNumber(this.stage.vars.Dmul) +
                        9
                    )
                  )
              ) {
                if (
                  this.toNumber(this.vars.tileC) === 56 ||
                  this.toNumber(this.vars.tileC) === 120
                ) {
                  yield* this.specialSetBlock(
                    tileidx,
                    tileid,
                    this.stage.vars.Lsxneg,
                    harvest,
                    56
                  );
                } else {
                  if (
                    this.toNumber(this.vars.tileC) === 57 ||
                    this.toNumber(this.vars.tileC) === 121
                  ) {
                    yield* this.specialSetBlock(
                      tileidx,
                      tileid,
                      this.stage.vars.Lsx,
                      harvest,
                      56
                    );
                  } else {
                    if (
                      this.toNumber(this.vars.tileC) === 220 ||
                      this.toNumber(this.vars.tileC) === 222
                    ) {
                      yield* this.specialSetBlock(
                        tileidx,
                        tileid,
                        this.stage.vars.Lsxneg,
                        harvest,
                        219
                      );
                    } else {
                      if (
                        this.toNumber(this.vars.tileC) === 221 ||
                        this.toNumber(this.vars.tileC) === 223
                      ) {
                        yield* this.specialSetBlock(
                          tileidx,
                          tileid,
                          this.stage.vars.Lsx,
                          harvest,
                          219
                        );
                      } else {
                        null;
                      }
                    }
                  }
                }
              } else {
                if (this.toNumber(this.vars.tileC) === 50 && !exact) {
                  yield* this.specialSetBlock(tileidx, tileid, 1, harvest, 124);
                } else {
                  if (this.toNumber(this.vars.tileC) === 51 && !exact) {
                    yield* this.specialSetBlock(
                      tileidx,
                      tileid,
                      -1,
                      harvest,
                      124
                    );
                  } else {
                    yield* this.specialSetBlock(
                      tileidx,
                      tileid,
                      0,
                      harvest,
                      this.vars.tileC
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
    yield* this.addToLightMod(tileidx);
    yield* this.collateralChecksC(tileidx, 0, !null);
    yield* this.collateralChecksC(
      this.toNumber(tileidx) - this.toNumber(this.stage.vars.Lsx),
      0,
      0
    );
    yield* this.collateralChecksC(
      this.toNumber(tileidx) + this.toNumber(this.stage.vars.Lsx),
      0,
      0
    );
    yield* this.collateralChecksC(this.toNumber(tileidx) - 1, 0, 0);
    yield* this.collateralChecksC(this.toNumber(tileidx) + 1, 0, 0);
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
    this.size = 100;
    this.moveAhead();
    this.vars.wasmode = 0;
    this.vars.justplacedidx = 0;
    this.vars.elapse = 0;
    this.vars.digidx = 0;
    this.stage.vars.Foodmul = 7;
    this.stage.vars.MaxReach = 3.5;
    this.vars.larm = 0;
    this.vars.larmtick = 0;
    this.vars.bowpull = 0;
  }

  *placeBlock(tileid, leaveid) {
    if (this.compare(this.vars.iC, this.vars.justplacedidx) === 0) {
      return;
    }
    yield* this.gettileC(this.vars.x, this.vars.y);
    if (this.toNumber(tileid) === 20) {
      yield* this.placeOnWall(20, leaveid, 244, 245, 0);
      if (this.compare(this.vars.t2, -999) > 0) {
        return;
      }
    }
    if (this.toNumber(tileid) === 258) {
      yield* this.placeOnWall(258, leaveid, 260, 262, 0);
      if (this.compare(this.vars.t2, -999) > 0) {
        return;
      }
    }
    if (
      this.toNumber(tileid) === 237 ||
      this.toNumber(tileid) === 239 ||
      this.toNumber(tileid) === 241
    ) {
      this.vars.t2 = this.sprites["StevesHead"].direction;
      if (this.compare(this.vars.t2, 0) < 0) {
        yield* this.placeBlock(this.toNumber(tileid) + 1, leaveid);
        return;
      } else {
        null;
      }
    }
    if (this.toNumber(tileid) === 243) {
      if (this.compare(Math.abs(this.mouse.x), 25) < 0) {
        yield* this.placeBlock(278, leaveid);
        return;
      }
    }
    if (this.toNumber(tileid) === 190) {
      this.vars.t2 = this.sprites["StevesHead"].direction;
      if (this.compare((this.toNumber(this.vars.t2) + 60) % 360, 120) < 0) {
        yield* this.placeBlock(206, leaveid);
        return;
      } else {
        if (
          this.compare(this.vars.t2, 0) > 0 &&
          this.compare(this.vars.t2, 120) < 0
        ) {
          yield* this.placeBlock(230, leaveid);
          return;
        } else {
          if (
            this.compare(this.vars.t2, 0) < 0 &&
            this.compare(this.vars.t2, -120) > 0
          ) {
            yield* this.placeBlock(227, leaveid);
            return;
          } else {
            null;
          }
        }
      }
    }
    if (this.toNumber(tileid) === 82) {
      yield* this.placeBlock(81, 92);
      return;
    }
    if (this.toNumber(tileid) === 95) {
      yield* this.placeBlock(38, 92);
      return;
    }
    if (this.toNumber(tileid) === 92) {
      return;
    }
    if (
      this.compare(this.vars.iC, 1) < 0 ||
      this.toString(tileid) === "#" ||
      this.compare(
        this.itemOf(
          this.vars.undefined,
          this.toNumber(tileid) * this.toNumber(this.stage.vars.Dmul) + 9
        ),
        2
      ) < 0
    ) {
      return;
    }
    if (
      this.compare(
        this.itemOf(
          this.vars.undefined,
          this.toNumber(tileid) * this.toNumber(this.stage.vars.Dmul) + 17
        ),
        0
      ) > 0
    ) {
      return;
    }
    if (
      this.compare(
        Math.floor(this.toNumber(this.stage.vars.X)),
        this.vars.x
      ) === 0 &&
      (this.compare(
        Math.floor(this.toNumber(this.stage.vars.Y) - 0.6),
        this.vars.y
      ) === 0 ||
        this.compare(
          Math.floor(this.toNumber(this.stage.vars.Y) + 0.4),
          this.vars.y
        ) === 0)
    ) {
      if (
        this.toString(
          this.itemOf(
            this.vars.undefined,
            this.toNumber(tileid) * this.toNumber(this.stage.vars.Dmul) + 2
          )
        ) === "Y"
      ) {
        return;
      }
    }
    this.vars.count = this.itemOf(
      this.stage.vars.Inv,
      2 * this.toNumber(this.stage.vars.Heldinvid) - 1
    );
    if (0 === this.toNumber(this.vars.count)) {
      return;
    }
    yield* this.isblockC(this.vars.tileC, 0, 0);
    if (
      this.compare(this.vars.tileC, tileid) === 0 ||
      this.toNumber(this.vars.isblockC) === 1
    ) {
      return;
    }
    yield* this.isblockC(
      this.itemOf(
        this.stage.vars.Level,
        this.toNumber(this.vars.iC) - this.toNumber(this.stage.vars.Lsx) - 1
      ),
      0,
      !null
    );
    yield* this.isblockC(
      this.itemOf(
        this.stage.vars.Level,
        this.toNumber(this.vars.iC) + this.toNumber(this.stage.vars.Lsx) - 1
      ),
      !null,
      !null
    );
    yield* this.isblockC(
      this.itemOf(this.stage.vars.Level, this.toNumber(this.vars.iC) - 2),
      !null,
      !null
    );
    yield* this.isblockC(
      this.itemOf(this.stage.vars.Level, this.toNumber(this.vars.iC)),
      !null,
      !null
    );
    if (this.compare(this.vars.isblockC, 0) > 0) {
      if (this.toNumber(tileid) === 118 || this.toNumber(tileid) === 219) {
        yield* this.isblockC(
          this.itemOf(
            this.stage.vars.Level,
            this.toNumber(this.vars.iC) + this.toNumber(this.stage.vars.Lsx) - 1
          ),
          0,
          0
        );
        if (this.compare(this.vars.isblockC, 0) > 0) {
          yield* this.isblockC(
            this.itemOf(
              this.stage.vars.Level,
              this.toNumber(this.vars.iC) -
                this.toNumber(this.stage.vars.Lsx) -
                1
            ),
            0,
            0
          );
          if (this.compare(this.vars.isblockC, 0) > 0) {
            return;
          }
          this.vars.iC += this.toNumber(this.stage.vars.Lsxneg);
        }
        if (this.toNumber(tileid) === 118) {
          this.stage.vars.Level.splice(this.vars.iC - 1, 1, 121);
          this.vars.iC += this.toNumber(this.stage.vars.Lsx);
          this.stage.vars.Level.splice(this.vars.iC - 1, 1, 120);
        } else {
          this.stage.vars.Level.splice(this.vars.iC - 1, 1, 223);
          this.vars.iC += this.toNumber(this.stage.vars.Lsx);
          this.stage.vars.Level.splice(this.vars.iC - 1, 1, 222);
        }
        yield* this.addToLightMod(this.vars.iC);
        yield* this.collateralChecksC(
          this.toNumber(this.vars.iC) - this.toNumber(this.stage.vars.Lsx),
          0,
          0
        );
        yield* this.collateralChecksC(this.toNumber(this.vars.iC) - 1, 0, 0);
        yield* this.collateralChecksC(this.toNumber(this.vars.iC) + 1, 0, 0);
      } else {
        if (this.toNumber(tileid) === 124) {
          yield* this.isblockC(
            this.itemOf(this.stage.vars.Level, this.toNumber(this.vars.iC)),
            0,
            0
          );
          if (this.compare(this.vars.isblockC, 0) > 0) {
            yield* this.isblockC(
              this.itemOf(
                this.stage.vars.Level,
                this.toNumber(this.vars.iC) - 2
              ),
              0,
              0
            );
            if (this.compare(this.vars.isblockC, 0) > 0) {
              return;
            }
            this.vars.iC--;
          }
          this.stage.vars.Level.splice(this.vars.iC - 1, 1, 50);
          yield* this.addToLightMod(this.vars.iC);
          yield* this.collateralChecksC(this.toNumber(this.vars.iC) - 1, 0, 0);
          yield* this.collateralChecksC(
            this.toNumber(this.vars.iC) - this.toNumber(this.stage.vars.Lsx),
            0,
            0
          );
          yield* this.collateralChecksC(
            this.toNumber(this.vars.iC) + this.toNumber(this.stage.vars.Lsx),
            0,
            0
          );
          this.vars.iC++;
          this.stage.vars.Level.splice(this.vars.iC - 1, 1, 51);
        } else {
          this.stage.vars.Level.splice(this.vars.iC - 1, 1, tileid);
        }
      }
      yield* this.addToLightMod(this.vars.iC);
      yield* this.collateralChecksC(
        this.toNumber(this.vars.iC) - this.toNumber(this.stage.vars.Lsx),
        0,
        0
      );
      yield* this.collateralChecksC(
        this.toNumber(this.vars.iC) + this.toNumber(this.stage.vars.Lsx),
        0,
        0
      );
      yield* this.collateralChecksC(this.vars.iC, 0, 0);
      yield* this.collateralChecksC(this.toNumber(this.vars.iC) - 1, 0, 0);
      yield* this.collateralChecksC(this.toNumber(this.vars.iC) + 1, 0, 0);
      yield* this.setCostume(1);
      if (this.toNumber(tileid) === 117) {
        this.stage.vars.Inside.push(this.vars.iC);
        this.stage.vars.Inside.push(0);
        this.stage.vars.Inside.push("Press N to write on this sign");
      }
      this.vars.digidx = 0;
      this.vars.wasmode = 2;
      this.vars.justplacedidx = this.vars.iC;
      if (this.compare(this.stage.vars.Creative, 1) < 0) {
        if (this.toNumber(leaveid) === 0) {
          yield* this.reduceItemsHeld(1);
        } else {
          this.stage.vars.Inv.splice(
            2 * this.toNumber(this.stage.vars.Heldinvid) - 2,
            1,
            leaveid
          );
          this.stage.vars.Nextselid = this.stage.vars.Heldinvid;
          this.broadcast("Update Inventory");
        }
      }
    }
  }

  *specialSetBlock(tileidx, tileid, offset, harvest, harvestid) {
    yield* this.deactivateTile(
      this.itemOf(this.stage.vars.Levelref, tileidx - 1)
    );
    this.stage.vars.Level.splice(tileidx - 1, 1, tileid);
    yield* this.collateralChecksC(tileidx, 0, !null);
    if (!(this.toNumber(offset) === 0)) {
      this.stage.vars.Level.splice(
        this.toNumber(tileidx) + this.toNumber(offset) - 1,
        1,
        1
      );
    }
    if (harvest) {
      yield* this.addToHarvest(tileidx, harvestid);
    } else {
      yield* this.deleteContents(tileidx, 0);
    }
  }
}
