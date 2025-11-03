/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class GuiInvrow extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("gui_invrow", "./GuiInvrow/costumes/gui_invrow.png", {
        x: 362,
        y: 42,
      }),
      new Costume("Inventory", "./GuiInvrow/costumes/Inventory.svg", {
        x: 189,
        y: 166,
      }),
      new Costume("Crafting Table", "./GuiInvrow/costumes/Crafting Table.png", {
        x: 378,
        y: 332,
      }),
      new Costume("Furnace", "./GuiInvrow/costumes/Furnace.png", {
        x: 378,
        y: 332,
      }),
      new Costume("Chest", "./GuiInvrow/costumes/Chest.png", {
        x: 378,
        y: 332,
      }),
      new Costume("Creative", "./GuiInvrow/costumes/Creative.png", {
        x: 378,
        y: 332,
      }),
      new Costume("Creative-Inv", "./GuiInvrow/costumes/Creative-Inv.png", {
        x: 378,
        y: 332,
      }),
    ];

    this.sounds = [new Sound("meow", "./GuiInvrow/sounds/meow.wav")];

    this.triggers = [
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
      new Trigger(Trigger.KEY_PRESSED, { key: "n" }, this.whenKeyNPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "e" }, this.whenKeyEPressed),
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(Trigger.KEY_PRESSED, { key: "q" }, this.whenKeyQPressed),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.invid = 3;
    this.vars.x = -2;
    this.vars.y = 0;
    this.vars.dropOne = 0;
    this.vars.x2 = 0;
    this.vars.y2 = 288;
    this.vars.match = "  #  #  #  #  #  #  #  #  #";
    this.vars.iIv = 11;
    this.vars.craftmul = 99999;
    this.vars.count = 0;
    this.vars.spacedown = 0;
    this.vars.ix = 64;
    this.vars.siit = "#";
    this.vars.refidxIv = 13;
    this.vars.changemode = 0;
    this.vars.maxstack = 64;
    this.vars.durIv = 0;
    this.vars.invposid = 3;
    this.vars.siidx = 2;
    this.vars.invidfrom = 0;
    this.vars.invidto = 0;
    this.vars.t = 6;
    this.vars.dropItem = 0;
    this.vars.ix2 = 6;
    this.vars.Tempstore = [];
  }

  *whenIReceiveAnimate() {
    if (
      this.compare(this.stage.vars.HealthS, 0) > 0 ||
      (this.compare(this.stage.vars.Creative, 0) > 0 &&
        this.compare(this.stage.vars.HealthS, -9999) > 0)
    ) {
      yield* this.tick();
    } else {
      yield* this.deathTick();
    }
  }

  *tick() {
    if (
      this.letterOf(this.stage.vars.Mode, 0) === "x" &&
      this.compare(this.stage.vars.Nextselid, 0) < 0
    ) {
      this.stage.vars.Creative = 0 - this.toNumber(this.stage.vars.Nextselid);
      this.stage.vars.Nextselid = 0;
      this.broadcast("Switch Tabs");
      yield* this.switchToCreativeInventory();
    }
    if (this.compare(this.vars.changemode, 0) > 0) {
      yield* this.changeMode(this.vars.changemode);
      this.vars.changemode = 0;
    }
    if (this.keyPressed("space")) {
      if (this.toNumber(this.vars.spacedown) === 0) {
        this.vars.spacedown = 1;
        this.vars.dropOne = 1;
      }
    } else {
      this.vars.spacedown = 0;
      this.vars.dropOne = 0;
    }
    if (this.compare(this.vars.dropItem, 0) > 0) {
      this.vars.dropItem = 0;
      yield* this.transferTiles(
        this.stage.vars.Heldinvid,
        0,
        this.itemOf(
          this.stage.vars.Inv,
          this.toNumber(this.stage.vars.Heldinvid) * 2 - 1
        )
      );
      this.stage.vars.Nextselid = this.stage.vars.Heldinvid;
    }
    if (this.toNumber(this.stage.vars.Mode) === 0) {
      return;
    }
    if (this.mouse.down) {
      if (this.toNumber(this.stage.vars.Dragsrcid) === 0) {
        yield* this.doclick();
      } else {
        if (this.compare(this.vars.dropOne, 0) > 0) {
          yield* this.dodragend(!null);
          this.vars.dropOne = 0;
        }
      }
    } else {
      if (this.compare(this.stage.vars.Dragsrcid, 0) > 0) {
        yield* this.dodragend(0);
        if (this.compare(this.itemOf(this.stage.vars.Inv, 86 * 2 - 1), 0) > 0) {
          yield* this.transferTiles(
            64,
            this.stage.vars.Dragsrcid,
            this.itemOf(this.stage.vars.Inv, 86 * 2 - 1)
          );
        }
        while (
          !(this.toNumber(this.itemOf(this.stage.vars.Inv, 86 * 2 - 1)) === 0)
        ) {
          yield* this.getInvIdForTile(
            this.itemOf(this.stage.vars.Inv, 86 * 2 - 2)
          );
          if (this.compare(this.vars.ix, 0) > 0) {
            yield* this.transferTiles(
              64,
              this.vars.ix,
              this.itemOf(this.stage.vars.Inv, 86 * 2 - 1)
            );
          } else {
            yield* this.dropBlocks(
              this.itemOf(this.stage.vars.Inv, 86 * 2 - 2),
              this.itemOf(this.stage.vars.Inv, 86 * 2 - 1)
            );
            yield* this.setInventoryItem(64, "#", 0);
          }
          yield;
        }
      }
      this.stage.vars.Dragsrcid = 0;
    }
  }

  *whenIReceiveInit1b() {
    this.visible = true;
    yield* this.wait(0.8);
    this.moveAhead();
  }

  *whenKeyNPressed() {
    this.vars.changemode = 2;
  }

  *changeMode(changemode) {
    if (this.toNumber(this.stage.vars.Dragsrcid) === 0) {
      if (this.toNumber(this.stage.vars.Mode) === 0) {
        this.stage.vars.Insideidx = 0;
        this.vars.t = this.itemOf(
          this.vars.undefined,
          this.toNumber(this.stage.vars.Undercursor) *
            this.toNumber(this.stage.vars.Dmul) +
            9
        );
        if (this.toNumber(changemode) === 2) {
          if (this.toNumber(this.stage.vars.Undercursor) === 117) {
            yield* this.switchToInside(this.stage.vars.Cursor, 0);
          } else {
            if (this.toNumber(this.stage.vars.Undercursor) === 12) {
              yield* this.switchToInside(this.stage.vars.Cursor, 27);
            } else {
              return;
            }
          }
          yield* this.askAndWait("What do you want to write?");
          if (this.compare(this.answer.length, 0) > 0) {
            this.stage.vars.Inside.splice(
              this.toNumber(this.stage.vars.Insideidx) + 1,
              1,
              this.answer
            );
          }
          this.stage.vars.Insideidx = 0;
          this.broadcast("Switch Mode");
          return;
        }
        if (this.toNumber(this.vars.t) === 11) {
          yield* this.broadcastAndWait("Open Close Door");
          return;
        } else {
          if (
            this.toNumber(this.vars.t) === 20 ||
            this.toNumber(this.vars.t) === 22
          ) {
            yield* this.activateTileIv(
              this.stage.vars.Cursor,
              "t",
              this.toNumber(this.vars.t) === 22,
              1
            );
          } else {
            if (this.toNumber(this.stage.vars.Undercursor) === 47) {
              this.stage.vars.Mode = "c";
              this.goto(0, -21);
              this.costume = "Crafting Table";
            } else {
              if (
                this.toNumber(this.stage.vars.Undercursor) === 48 ||
                this.toNumber(this.stage.vars.Undercursor) === 49
              ) {
                this.stage.vars.Mode = "f";
                this.goto(0, -21);
                this.costume = "Furnace";
                yield* this.switchToInside(this.stage.vars.Cursor, 3);
              } else {
                if (this.toNumber(this.stage.vars.Undercursor) === 12) {
                  this.stage.vars.Mode = "Ch";
                  this.goto(0, -21);
                  this.costume = "Chest";
                  yield* this.switchToInside(this.stage.vars.Cursor, 27);
                } else {
                  if (
                    this.toNumber(this.stage.vars.Undercursor) === 50 ||
                    this.toNumber(this.stage.vars.Undercursor) === 51
                  ) {
                    yield* this.doSleepClicked();
                    return;
                  } else {
                    if (this.compare(this.stage.vars.Creative, 0) > 0) {
                      yield* this.switchToCreativeInventory();
                    } else {
                      this.stage.vars.Mode = "i";
                      this.goto(0, -21);
                      this.costume = "Inventory";
                    }
                  }
                }
              }
            }
            yield* this.broadcastAndWait("Rearrange GUI");
          }
        }
      } else {
        yield* this.switchOutOfInside();
        this.stage.vars.Mode = "";
        this.goto(0, -158);
        this.costume = "gui_invrow";
        this.stage.vars.Nextselid = this.stage.vars.Heldinvid;
        this.stage.vars.Insideidx = 0;
      }
      this.broadcast("Switch Mode");
    }
  }

  *whenKeyEPressed() {
    this.vars.changemode = 1;
  }

  *checkRecipe(dir) {
    this.vars.iIv = 0;
    this.vars.x = 2;
    this.vars.y = 9;
    this.vars.craftmul = 99999;
    for (let i = 0; i < 9; i++) {
      if (
        !(
          this.toString(
            this.itemOf(
              this.stage.vars.Inv,
              this.toNumber(this.vars.iIv) * 2 + 80
            )
          ) === "#"
        )
      ) {
        if (this.compare(this.toNumber(this.vars.iIv) % 3, this.vars.x) < 0) {
          this.vars.x = this.toNumber(this.vars.iIv) % 3;
        }
        if (this.compare(this.vars.iIv, this.vars.y) < 0) {
          this.vars.y = this.vars.iIv;
        }
        if (
          this.compare(
            this.vars.craftmul,
            this.itemOf(
              this.stage.vars.Inv,
              this.toNumber(this.vars.iIv) * 2 + 81
            )
          ) > 0
        ) {
          this.vars.craftmul = this.itemOf(
            this.stage.vars.Inv,
            this.toNumber(this.vars.iIv) * 2 + 81
          );
        }
      }
      this.vars.iIv++;
      yield;
    }
    this.vars.y = Math.floor(this.toNumber(this.vars.y) / 3);
    this.vars.match = "";
    this.vars.iIv = this.toNumber(this.vars.x) + this.toNumber(this.vars.y) * 3;
    for (let i = 0; i < 3 - this.toNumber(this.vars.y); i++) {
      if (this.compare(dir, 0) > 0) {
        for (let i = 0; i < 3 - this.toNumber(this.vars.x); i++) {
          yield* this.append(
            this.itemOf(
              this.stage.vars.Inv,
              this.toNumber(this.vars.iIv) * 2 + 80
            )
          );
          this.vars.iIv++;
          yield;
        }
      } else {
        this.vars.iIv += 3 - this.toNumber(this.vars.x);
        for (let i = 0; i < 3 - this.toNumber(this.vars.x); i++) {
          this.vars.iIv--;
          yield* this.append(
            this.itemOf(
              this.stage.vars.Inv,
              this.toNumber(this.vars.iIv) * 2 + 80
            )
          );
          yield;
        }
        this.vars.iIv += 3 - this.toNumber(this.vars.x);
      }
      for (let i = 0; i < this.toNumber(this.vars.x); i++) {
        yield* this.append("#");
        this.vars.iIv++;
        yield;
      }
      yield;
    }
    for (let i = 0; i < this.toNumber(this.vars.y); i++) {
      for (let i = 0; i < 3; i++) {
        yield* this.append("#");
        yield;
      }
      yield;
    }
    this.vars.x2 = 10;
    while (!(this.compare(this.vars.x2, this.vars.undefined.length) > 0)) {
      if (
        this.compare(
          this.vars.match,
          this.itemOf(this.vars.undefined, this.vars.x2 - 1)
        ) === 0
      ) {
        this.vars.ix = this.itemOf(
          this.vars.undefined,
          this.toNumber(this.vars.x2) - 3
        );
        this.vars.x2 = this.itemOf(
          this.vars.undefined,
          this.toNumber(this.vars.x2) - 2
        );
        yield* this.getDurability(this.vars.ix);
        if (this.toNumber(this.vars.durIv) === 0) {
          yield* this.getStackLimit(this.vars.ix);
          if (this.toNumber(this.vars.maxstack) === 1) {
            this.vars.y2 = this.vars.x2;
          } else {
            this.vars.y2 =
              this.toNumber(this.vars.x2) * this.toNumber(this.vars.craftmul);
            while (!!(this.compare(this.vars.y2, this.vars.maxstack) > 0)) {
              this.vars.y2 += 0 - this.toNumber(this.vars.x2);
              yield;
            }
          }
        } else {
          this.vars.x2 = this.vars.durIv;
          this.vars.y2 = this.vars.x2;
        }
        yield* this.setInventoryItem(46, this.vars.ix, this.vars.y2);
        this.vars.craftmul = this.vars.x2;
        this.vars.x2 = 99999;
      }
      this.vars.x2 += 5;
      yield;
    }
    if (this.compare(this.vars.x2, 99999) < 0) {
      if (this.compare(dir, 0) > 0) {
        yield* this.checkRecipe(-1);
      } else {
        yield* this.setInventoryItem(46, "#", 0);
      }
    }
  }

  *switchToCreativeInventory() {
    if (this.compare(this.stage.vars.Creative, 9) < 0) {
      if (this.toString(this.stage.vars.Mode) === "xi") {
        yield* this.switchOutOfInside();
      }
      yield* this.toCreativeFast();
      yield* this.broadcastAndWait("Rearrange GUI");
    } else {
      yield* this.switchOutOfInside();
      this.stage.vars.Mode = "xi";
      this.goto(0, -21);
      this.costume = "Creative-Inv";
      yield* this.broadcastAndWait("Rearrange GUI");
    }
  }

  *removeCraft(count) {
    this.vars.iIv = 37;
    for (let i = 0; i < 9; i++) {
      this.vars.invidfrom = this.itemOf(
        this.stage.vars.Invpos,
        this.toNumber(this.vars.iIv) * 3 - 3
      );
      this.vars.x = this.itemOf(
        this.stage.vars.Inv,
        this.toNumber(this.vars.invidfrom) * 2 - 1
      );
      if (
        this.compare(
          this.vars.x,
          this.toNumber(count) / this.toNumber(this.vars.craftmul)
        ) > 0
      ) {
        yield* this.setInventoryItem(
          this.vars.iIv,
          0,
          this.toNumber(this.vars.x) -
            this.toNumber(count) / this.toNumber(this.vars.craftmul)
        );
      } else {
        yield* this.setInventoryItem(this.vars.iIv, "#", 0);
      }
      this.vars.iIv++;
      yield;
    }
  }

  *dodragend(dropone) {
    yield* this.getInvIdAtPoint(this.mouse.x, this.mouse.y);
    this.vars.count = this.itemOf(this.stage.vars.Inv, 86 * 2 - 1);
    if (this.compare(this.vars.count, 0) > 0) {
      yield* this.getStackLimit(this.itemOf(this.stage.vars.Inv, 86 * 2 - 2));
      if (
        this.toNumber(this.vars.dropOne) === 1 &&
        this.compare(this.vars.maxstack, 1) > 0
      ) {
        yield* this.transferTiles(64, this.vars.invposid, 1);
      } else {
        yield* this.transferTiles(64, this.vars.invposid, this.vars.count);
      }
      this.vars.dropOne = 0;
    } else {
      this.stage.vars.Dragsrcid = -1;
    }
    if (!dropone) {
      this.vars.spacedown = 0;
    }
  }

  *switchOutOfInside() {
    if (
      this.toNumber(this.stage.vars.Insideidx) === 0 &&
      this.compare(this.stage.vars.Creative, 1) < 0
    ) {
      this.vars.ix = 37;
      for (let i = 0; i < 27; i++) {
        this.vars.invidfrom = this.itemOf(
          this.stage.vars.Invpos,
          this.toNumber(this.vars.ix) * 3 - 3
        );
        if (this.compare(this.vars.invidfrom, 40) > 0) {
          yield* this.transferTiles(
            this.vars.ix,
            0,
            this.itemOf(
              this.stage.vars.Inv,
              this.toNumber(this.vars.invidfrom) * 2 - 1
            )
          );
          if (
            this.compare(
              this.itemOf(
                this.stage.vars.Inv,
                this.toNumber(this.vars.invidfrom) * 2 - 1
              ),
              0
            ) > 0
          ) {
            this.stage.vars.Inv.splice(
              this.toNumber(this.vars.invidfrom) * 2 - 2,
              1,
              "#"
            );
            this.stage.vars.Inv.splice(
              this.toNumber(this.vars.invidfrom) * 2 - 1,
              1,
              0
            );
          }
        }
        this.vars.ix++;
        yield;
      }
    } else {
      this.vars.ix = 81;
      while (!(this.compare(this.vars.ix, this.stage.vars.Inv.length) > 0)) {
        this.stage.vars.Inv.splice(this.vars.ix - 1, 1, "#");
        this.vars.ix++;
        this.stage.vars.Inv.splice(this.vars.ix - 1, 1, 0);
        this.vars.ix++;
        yield;
      }
    }
  }

  *getInvIdForTile(tile) {
    yield* this.getInvId2ForTileFromTo(tile, 1, 36);
  }

  *getInvId2ForTileFromTo(tile, from, to) {
    this.vars.ix = from;
    this.vars.ix2 = this.itemOf(
      this.stage.vars.Invpos,
      this.toNumber(this.vars.ix) * 3 - 3
    );
    yield* this.getStackLimit(tile);
    while (
      !(
        this.compare(this.vars.ix, to) > 0 ||
        (this.compare(
          tile,
          this.itemOf(this.stage.vars.Inv, this.toNumber(this.vars.ix2) * 2 - 2)
        ) === 0 &&
          this.compare(
            this.vars.maxstack,
            this.itemOf(
              this.stage.vars.Inv,
              this.toNumber(this.vars.ix2) * 2 - 1
            )
          ) > 0)
      )
    ) {
      this.vars.ix++;
      this.vars.ix2 = this.itemOf(
        this.stage.vars.Invpos,
        this.toNumber(this.vars.ix) * 3 - 3
      );
      yield;
    }
    if (this.compare(this.vars.ix, to) > 0) {
      this.vars.ix = from;
      this.vars.ix2 = this.itemOf(
        this.stage.vars.Invpos,
        this.toNumber(this.vars.ix) * 3 - 3
      );
      while (
        !(
          this.compare(this.vars.ix, to) > 0 ||
          0 ===
            this.toNumber(
              this.itemOf(
                this.stage.vars.Inv,
                this.toNumber(this.vars.ix2) * 2 - 1
              )
            )
        )
      ) {
        this.vars.ix++;
        this.vars.ix2 = this.itemOf(
          this.stage.vars.Invpos,
          this.toNumber(this.vars.ix) * 3 - 3
        );
        yield;
      }
      if (this.compare(this.vars.ix, to) > 0) {
        this.vars.ix = 0;
      }
    }
  }

  *creativetabswitch(x, y) {
    if (this.compare(x, -185) > 0 && this.compare(x, 181) < 0) {
      if (this.compare(y, 75) > 0 && this.compare(y, 138) < 0) {
        this.stage.vars.Nextselid =
          0 -
          (Math.floor((this.toNumber(x) + 307) / 122) +
            Math.floor((138 - this.toNumber(y)) / 21) * 3);
        if (
          this.compare(this.stage.vars.Nextselid, -9) < 0 ||
          this.compare(this.stage.vars.Nextselid, -1) > 0
        ) {
          this.stage.vars.Nextselid = 0;
        }
      }
    }
  }

  *append(typ) {
    if (this.toString(typ) === "#") {
      this.vars.match = this.toString(this.vars.match) + "  #";
    } else {
      this.vars.t = this.itemOf(
        this.vars.undefined,
        this.toNumber(typ) * this.toNumber(this.stage.vars.Dmul) + 18
      );
      for (let i = 0; i < 3 - this.vars.t.length; i++) {
        this.vars.match = this.toString(this.vars.match) + " ";
        yield;
      }
      this.vars.match =
        this.toString(this.vars.match) + this.toString(this.vars.t);
    }
  }

  *toCreativeFast() {
    this.stage.vars.Mode = "x";
    this.goto(0, -21);
    this.costume = "Creative";
    this.vars.ix = this.toNumber(this.stage.vars.Dmul) + 15;
    this.vars.iIv = 81;
    while (!(this.compare(this.vars.ix, this.vars.undefined.length) > 0)) {
      if (
        this.compare(
          this.stage.vars.Creative,
          this.itemOf(this.vars.undefined, this.vars.ix - 1)
        ) === 0
      ) {
        this.stage.vars.Inv.splice(
          this.vars.iIv - 1,
          1,
          this.itemOf(this.vars.undefined, this.toNumber(this.vars.ix) - 15)
        );
        yield* this.getDurability(
          this.itemOf(this.vars.undefined, this.toNumber(this.vars.ix) - 15)
        );
        if (this.compare(this.vars.durIv, 0) > 0) {
          this.stage.vars.Inv.splice(
            this.toNumber(this.vars.iIv),
            1,
            this.vars.durIv
          );
        } else {
          this.stage.vars.Inv.splice(this.toNumber(this.vars.iIv), 1, 1);
        }
        this.vars.iIv += 2;
      }
      this.vars.ix += this.toNumber(this.stage.vars.Dmul);
      yield;
    }
    while (!(this.compare(this.vars.iIv, this.stage.vars.Inv.length) > 0)) {
      this.stage.vars.Inv.splice(this.vars.iIv - 1, 1, "#");
      this.vars.iIv++;
      this.stage.vars.Inv.splice(this.vars.iIv - 1, 1, 0);
      this.vars.iIv++;
      yield;
    }
  }

  *jiggerCreativeTabs() {
    this.vars.iIv = 15;
    while (!(this.compare(this.vars.iIv, this.vars.undefined.length) > 0)) {
      this.vars.t = this.itemOf(this.vars.undefined, this.vars.iIv - 1);
      if (this.compare(this.vars.t, 2) > 0) {
        this.vars.undefined.splice(
          this.vars.iIv - 1,
          1,
          this.toNumber(this.vars.t) + 1
        );
      }
      this.vars.iIv += this.toNumber(this.stage.vars.Dmul);
      yield;
    }
  }

  *whenIReceiveInit() {
    this.stage.vars.Dragsrcid = 0;
    if (this.toNumber(this.stage.vars.Creative) === 0) {
      null;
    }
  }

  *getStackLimit(tile) {
    this.vars.maxstack = this.itemOf(
      this.vars.undefined,
      this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 17
    );
    if (this.compare(this.vars.maxstack, 0) > 0) {
      this.vars.maxstack = 1;
    } else {
      this.vars.maxstack = this.itemOf(
        this.vars.undefined,
        this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 9
      );
      if (
        this.toNumber(this.vars.maxstack) === 1 ||
        this.toNumber(this.vars.maxstack) === 8
      ) {
        this.vars.maxstack = 1;
      } else {
        this.vars.maxstack = 64;
      }
    }
  }

  *getDurability(tileid) {
    this.vars.durIv = this.itemOf(
      this.vars.undefined,
      this.toNumber(tileid) * this.toNumber(this.stage.vars.Dmul) + 17
    );
  }

  *activateTileIv(idx, mode, force, data) {
    this.vars.refidxIv = this.itemOf(this.stage.vars.Levelref, idx - 1);
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

  *transferTiles(fromidx, toidx, count) {
    this.vars.invidfrom = this.itemOf(
      this.stage.vars.Invpos,
      this.toNumber(fromidx) * 3 - 3
    );
    this.vars.invidto = this.itemOf(
      this.stage.vars.Invpos,
      this.toNumber(toidx) * 3 - 3
    );
    if (
      this.toString(this.stage.vars.Mode) === "i" ||
      this.toString(this.stage.vars.Mode) === "c"
    ) {
      if (
        this.toNumber(toidx) === 46 ||
        (this.toNumber(fromidx) === 46 && this.toNumber(toidx) === 0)
      ) {
        return;
      }
    }
    if (this.toString(this.stage.vars.Mode) === "f") {
      if (this.toNumber(toidx) === 39) {
        return;
      }
    }
    this.vars.x2 = this.itemOf(
      this.stage.vars.Inv,
      this.toNumber(this.vars.invidfrom) * 2 - 1
    );
    if (this.toNumber(this.vars.x2) === 0) {
      return;
    }
    this.vars.y2 = this.itemOf(
      this.stage.vars.Inv,
      this.toNumber(this.vars.invidfrom) * 2 - 2
    );
    this.vars.y = this.itemOf(
      this.vars.undefined,
      this.toNumber(this.vars.y2) * this.toNumber(this.stage.vars.Dmul) + 9
    );
    if (
      this.toNumber(this.vars.invidto) === 37 &&
      !(this.toNumber(this.vars.y) === 13)
    ) {
      return;
    }
    if (
      this.toNumber(this.vars.invidto) === 38 &&
      !(this.toNumber(this.vars.y) === 14)
    ) {
      return;
    }
    if (
      this.toNumber(this.vars.invidto) === 39 &&
      !(this.toNumber(this.vars.y) === 15)
    ) {
      return;
    }
    if (
      this.toNumber(this.vars.invidto) === 40 &&
      !(this.toNumber(this.vars.y) === 16)
    ) {
      return;
    }
    if (this.compare(toidx, 1) < 0) {
      yield* this.setInventoryItem(fromidx, "#", 0);
      if (this.compare(toidx, -999) > 0) {
        yield* this.dropBlocks(this.vars.y2, this.vars.x2);
      }
      return;
    }
    this.vars.x = this.itemOf(
      this.stage.vars.Inv,
      this.toNumber(this.vars.invidto) * 2 - 1
    );
    this.vars.y = this.itemOf(
      this.stage.vars.Inv,
      this.toNumber(this.vars.invidto) * 2 - 2
    );
    if (this.toString(this.vars.y) === "#") {
      this.vars.y = this.vars.y2;
    }
    this.vars.count = count;
    yield* this.getStackLimit(this.vars.y);
    if (
      this.compare(this.vars.y, this.vars.y2) === 0 &&
      this.compare(this.vars.maxstack, 1) > 0
    ) {
      if (
        this.toNumber(fromidx) === 46 &&
        (this.toString(this.stage.vars.Mode) === "i" ||
          this.toString(this.stage.vars.Mode) === "c")
      ) {
        this.vars.count =
          Math.ceil(
            this.toNumber(this.vars.count) / this.toNumber(this.vars.craftmul)
          ) * this.toNumber(this.vars.craftmul);
        if (this.compare(this.vars.count, this.vars.x2) > 0) {
          this.vars.count = this.vars.x2;
        }
      }
      if (
        this.compare(
          this.toNumber(this.vars.x) + this.toNumber(this.vars.count),
          this.vars.maxstack
        ) > 0
      ) {
        this.vars.count =
          this.toNumber(this.vars.maxstack) - this.toNumber(this.vars.x);
      } else {
        null;
      }
      if (
        this.toNumber(fromidx) === 46 &&
        (this.toString(this.stage.vars.Mode) === "i" ||
          this.toString(this.stage.vars.Mode) === "c")
      ) {
        this.vars.count =
          Math.floor(
            this.toNumber(this.vars.count) / this.toNumber(this.vars.craftmul)
          ) * this.toNumber(this.vars.craftmul);
      }
      yield* this.setInventoryItem(
        fromidx,
        this.vars.y,
        this.toNumber(this.vars.x2) - this.toNumber(this.vars.count)
      );
      yield* this.setInventoryItem(
        toidx,
        this.vars.y,
        this.toNumber(this.vars.x) + this.toNumber(this.vars.count)
      );
    } else {
      if (this.toNumber(this.vars.maxstack) === 1) {
        this.vars.count = this.vars.x2;
      }
      if (
        this.toString(this.stage.vars.Mode) === "x" &&
        this.compare(toidx, 9) > 0 &&
        this.compare(toidx, 64) < 0
      ) {
        yield* this.setInventoryItem(fromidx, "#", 0);
      } else {
        if (this.compare(this.vars.count, this.vars.x2) === 0) {
          yield* this.setInventoryItem(fromidx, this.vars.y, this.vars.x);
          yield* this.setInventoryItem(toidx, this.vars.y2, this.vars.x2);
        }
      }
    }
    if (
      this.toNumber(fromidx) === 46 &&
      (this.toString(this.stage.vars.Mode) === "i" ||
        this.toString(this.stage.vars.Mode) === "c")
    ) {
      yield* this.removeCraft(this.vars.count);
    }
    if (
      this.toString(this.stage.vars.Mode) === "i" ||
      this.toString(this.stage.vars.Mode) === "c"
    ) {
      if (this.compare(toidx, 36) > 0 || this.compare(fromidx, 36) > 0) {
        yield* this.checkRecipe(1);
      }
    }
    this.vars.count = this.toNumber(count) - this.toNumber(this.vars.count);
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

  *doSleepClicked() {
    yield* this.broadcastAndWait("Sleep");
  }

  *deathTick() {
    if (this.compare(this.stage.vars.HealthS, -10000) > 0) {
      this.vars.ix = 1;
      for (let i = 0; i < 40; i++) {
        if (
          this.compare(
            this.itemOf(
              this.stage.vars.Inv,
              this.toNumber(this.vars.ix) * 2 - 1
            ),
            0
          ) > 0
        ) {
          yield* this.transferTiles(
            this.vars.ix,
            0,
            this.itemOf(
              this.stage.vars.Inv,
              this.toNumber(this.vars.ix) * 2 - 1
            )
          );
          this.stage.vars.Inv.splice(
            this.toNumber(this.vars.ix) * 2 - 2,
            1,
            "#"
          );
          this.stage.vars.Inv.splice(this.toNumber(this.vars.ix) * 2 - 1, 1, 0);
        }
        this.vars.ix++;
        yield;
      }
      this.stage.vars.Nextselid = this.stage.vars.Heldinvid;
      this.stage.vars.HealthS = -10000;
    }
    this.stage.vars.HealthS += 0 - this.toNumber(this.stage.vars.Ticks);
  }

  *dropBlocks(tile, count) {
    this.stage.vars.Harvest.push(this.stage.vars.X);
    this.stage.vars.Harvest.push(this.stage.vars.Y);
    this.stage.vars.Harvest.push(tile);
    this.stage.vars.Harvest.push(count);
    if (this.compare(this.stage.vars.HealthS, 0) > 0) {
      if (this.compare(this.sprites["Steve"].vars.dirS, 0) < 0) {
        this.stage.vars.Harvest.push(-0.2);
      } else {
        this.stage.vars.Harvest.push(0.2);
      }
    } else {
      this.stage.vars.Harvest.push(this.random(-0.2, 0.2));
    }
    this.stage.vars.Harvest.push(-999);
  }

  *switchToInside(idx, size) {
    this.vars.ix = 1;
    this.stage.vars.Insideidx = 0;
    while (!(this.compare(this.vars.ix, this.stage.vars.Inside.length) > 0)) {
      if (
        this.compare(
          idx,
          this.itemOf(this.stage.vars.Inside, this.vars.ix - 1)
        ) === 0
      ) {
        this.stage.vars.Insideidx = this.vars.ix;
        this.vars.ix += 2;
        this.vars.x = this.toNumber(this.vars.ix) - 80;
        for (
          let i = 0;
          i <
          2 *
            this.toNumber(
              this.itemOf(
                this.stage.vars.Inside,
                this.toNumber(this.vars.ix) - 2
              )
            );
          i++
        ) {
          this.vars.ix++;
          this.stage.vars.Inv.splice(
            this.toNumber(this.vars.ix) - this.toNumber(this.vars.x) - 1,
            1,
            this.itemOf(this.stage.vars.Inside, this.vars.ix - 1)
          );
          yield;
        }
        this.vars.ix = 999999;
      } else {
        this.vars.ix +=
          2 *
            this.toNumber(
              this.itemOf(this.stage.vars.Inside, this.toNumber(this.vars.ix))
            ) +
          3;
      }
      yield;
    }
    if (this.compare(this.vars.ix, 999999) < 0) {
      this.stage.vars.Insideidx = this.vars.ix;
      this.stage.vars.Inside.push(idx);
      this.stage.vars.Inside.push(size);
      if (this.toNumber(size) === 0) {
        this.stage.vars.Inside.push("");
      } else {
        this.stage.vars.Inside.push("");
        for (let i = 0; i < this.toNumber(size); i++) {
          this.stage.vars.Inside.push("#");
          this.stage.vars.Inside.push(0);
          yield;
        }
      }
    }
  }

  *setInventoryItem(idx, typ, count) {
    if (
      this.toString(this.stage.vars.Mode) === "x" &&
      this.compare(idx, 9) > 0 &&
      this.compare(idx, 64) < 0
    ) {
      return;
    }
    this.vars.siidx = this.itemOf(
      this.stage.vars.Invpos,
      this.toNumber(idx) * 3 - 3
    );
    if (this.toNumber(count) === 0) {
      this.vars.siit = "#";
    } else {
      this.vars.siit = typ;
    }
    if (!(this.toNumber(this.vars.siit) === 0)) {
      this.stage.vars.Inv.splice(
        this.toNumber(this.vars.siidx) * 2 - 2,
        1,
        this.vars.siit
      );
    }
    this.stage.vars.Inv.splice(
      this.toNumber(this.vars.siidx) * 2 - 1,
      1,
      count
    );
    if (
      this.compare(this.stage.vars.Insideidx, 0) > 0 &&
      this.compare(idx, 36) > 0 &&
      this.compare(idx, 64) < 0
    ) {
      if (!(this.toNumber(this.vars.siit) === 0)) {
        this.stage.vars.Inside.splice(
          this.toNumber(idx) * 2 -
            71 +
            this.toNumber(this.stage.vars.Insideidx) -
            1,
          1,
          this.vars.siit
        );
      }
      this.stage.vars.Inside.splice(
        this.toNumber(idx) * 2 -
          70 +
          this.toNumber(this.stage.vars.Insideidx) -
          1,
        1,
        count
      );
      if (
        this.toString(this.stage.vars.Mode) === "f" &&
        this.toNumber(idx) === 37
      ) {
        yield* this.activateTileIv(
          this.stage.vars.Cursor,
          "b",
          0,
          this.stage.vars.Insideidx
        );
      }
    }
  }

  *getInvIdAtPoint(x, y) {
    this.vars.invposid = 1;
    for (let i = 0; i < 63; i++) {
      if (
        this.compare(
          Math.abs(
            this.toNumber(
              this.itemOf(
                this.stage.vars.Invpos,
                this.toNumber(this.vars.invposid) * 3 - 2
              )
            ) - this.toNumber(x)
          ),
          21
        ) < 0
      ) {
        if (
          this.compare(
            Math.abs(
              this.toNumber(
                this.itemOf(
                  this.stage.vars.Invpos,
                  this.toNumber(this.vars.invposid) * 3 - 1
                )
              ) - this.toNumber(y)
            ),
            21
          ) < 0
        ) {
          this.vars.invid = this.itemOf(
            this.stage.vars.Invpos,
            this.toNumber(this.vars.invposid) * 3 - 3
          );
          return;
        }
      }
      this.vars.invposid++;
      yield;
    }
    this.vars.invid = 0;
    this.vars.invposid = 0;
  }

  *doclick() {
    if (this.letterOf(this.stage.vars.Mode, 0) === "x") {
      yield* this.creativetabswitch(this.mouse.x, this.mouse.y);
    }
    yield* this.getInvIdAtPoint(this.mouse.x, this.mouse.y);
    if (this.compare(this.vars.invid, 1) < 0) {
      this.stage.vars.Dragsrcid = -1;
    } else {
      this.stage.vars.Dragsrcid = this.vars.invposid;
      this.vars.count = this.itemOf(
        this.stage.vars.Inv,
        this.toNumber(this.vars.invid) * 2 - 1
      );
      if (this.compare(this.vars.count, 0) > 0) {
        if (this.toNumber(this.vars.dropOne) === 1) {
          this.vars.dropOne = 0;
          if (
            this.toString(this.stage.vars.Mode) === "x" &&
            this.compare(this.vars.invposid, 9) > 0 &&
            this.compare(this.vars.invposid, 64) < 0
          ) {
            this.vars.count = 1;
            yield* this.getStackLimit(
              this.itemOf(
                this.stage.vars.Inv,
                this.toNumber(this.vars.invid) * 2 - 2
              )
            );
            this.vars.count = this.vars.maxstack;
          } else {
            this.vars.count = Math.ceil(this.toNumber(this.vars.count) / 2);
          }
        } else {
          null;
        }
        if (this.keyPressed("")) {
          this.stage.vars.debug.push(this.vars.invid);
          while (!(this.toNumber(this.vars.count) === 0)) {
            if (this.toString(this.stage.vars.Mode) === "Ch") {
              if (this.compare(this.vars.invposid, 37) < 0) {
                yield* this.getInvId2ForTileFromTo(
                  this.itemOf(
                    this.stage.vars.Inv,
                    this.toNumber(this.vars.invid) * 2 - 2
                  ),
                  37,
                  63
                );
              } else {
                yield* this.getInvId2ForTileFromTo(
                  this.itemOf(
                    this.stage.vars.Inv,
                    this.toNumber(this.vars.invid) * 2 - 2
                  ),
                  1,
                  36
                );
              }
            } else {
              if (this.toString(this.stage.vars.Mode) === "x") {
                if (this.compare(this.vars.invposid, 10) < 0) {
                  yield* this.transferTiles(
                    this.vars.invposid,
                    -999,
                    this.vars.count
                  );
                  this.vars.count = 0;
                } else {
                  yield* this.getInvId2ForTileFromTo(
                    this.itemOf(
                      this.stage.vars.Inv,
                      this.toNumber(this.vars.invid) * 2 - 2
                    ),
                    1,
                    9
                  );
                }
              } else {
                if (this.compare(this.vars.invposid, 10) < 0) {
                  yield* this.getInvId2ForTileFromTo(
                    this.itemOf(
                      this.stage.vars.Inv,
                      this.toNumber(this.vars.invid) * 2 - 2
                    ),
                    10,
                    36
                  );
                } else {
                  if (this.compare(this.vars.invposid, 37) < 0) {
                    yield* this.getInvId2ForTileFromTo(
                      this.itemOf(
                        this.stage.vars.Inv,
                        this.toNumber(this.vars.invid) * 2 - 2
                      ),
                      1,
                      9
                    );
                  } else {
                    yield* this.getInvId2ForTileFromTo(
                      this.itemOf(
                        this.stage.vars.Inv,
                        this.toNumber(this.vars.invid) * 2 - 2
                      ),
                      1,
                      36
                    );
                  }
                }
              }
            }
            if (this.compare(this.vars.ix, 0) > 0) {
              yield* this.transferTiles(
                this.vars.invposid,
                this.vars.ix,
                this.vars.count
              );
            } else {
              this.vars.count = 0;
            }
            yield;
          }
          this.stage.vars.Dragsrcid = -1;
        } else {
          yield* this.transferTiles(this.vars.invposid, 64, this.vars.count);
        }
      } else {
        this.stage.vars.Dragsrcid = -1;
      }
    }
  }

  *whenKeyQPressed() {
    this.vars.dropItem = 1;
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
    this.costume = "gui_invrow";
    this.goto(0, -158);
    this.vars.spacedown = 0;
    this.vars.dropItem = 0;
    this.vars.dropOne = 0;
    this.stage.vars.Insideidx = 0;
    this.stage.vars.Dragsrcid = 0;
    this.vars.changemode = 0;
    this.vars.Tempstore = [];
  }
}
