/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class SaveGame extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Save Game", "./SaveGame/costumes/Save Game.png", {
        x: 480,
        y: 360,
      }),
      new Costume("Saving", "./SaveGame/costumes/Saving.svg", {
        x: 188,
        y: 97,
      }),
      new Costume("Saved", "./SaveGame/costumes/Saved.svg", { x: 202, y: 170 }),
      new Costume("Load Ask", "./SaveGame/costumes/Load Ask.svg", {
        x: 188,
        y: 97,
      }),
      new Costume("Loading", "./SaveGame/costumes/Loading.svg", {
        x: 188,
        y: 97,
      }),
      new Costume("Bad", "./SaveGame/costumes/Bad.svg", { x: 188, y: 97 }),
      new Costume("BringToLife", "./SaveGame/costumes/BringToLife.svg", {
        x: 188,
        y: 97,
      }),
      new Costume("a", "./SaveGame/costumes/a.png", { x: 0, y: 0 }),
      new Costume("b", "./SaveGame/costumes/b.png", { x: 0, y: 0 }),
      new Costume("c", "./SaveGame/costumes/c.png", { x: 0, y: 0 }),
      new Costume("d", "./SaveGame/costumes/d.png", { x: 0, y: 0 }),
      new Costume("e", "./SaveGame/costumes/e.png", { x: 0, y: 0 }),
      new Costume("f", "./SaveGame/costumes/f.png", { x: 0, y: 0 }),
      new Costume("g", "./SaveGame/costumes/g.png", { x: 0, y: 0 }),
      new Costume("h", "./SaveGame/costumes/h.png", { x: 0, y: 0 }),
      new Costume("i", "./SaveGame/costumes/i.png", { x: 0, y: 0 }),
      new Costume("j", "./SaveGame/costumes/j.png", { x: 0, y: 0 }),
      new Costume("k", "./SaveGame/costumes/k.png", { x: 0, y: 0 }),
      new Costume("l", "./SaveGame/costumes/l.png", { x: 0, y: 0 }),
      new Costume("m", "./SaveGame/costumes/m.png", { x: 0, y: 0 }),
      new Costume("n", "./SaveGame/costumes/n.png", { x: 0, y: 0 }),
      new Costume("o", "./SaveGame/costumes/o.png", { x: 0, y: 0 }),
      new Costume("p", "./SaveGame/costumes/p.png", { x: 0, y: 0 }),
      new Costume("q", "./SaveGame/costumes/q.png", { x: 0, y: 0 }),
      new Costume("r", "./SaveGame/costumes/r.png", { x: 0, y: 0 }),
      new Costume("s", "./SaveGame/costumes/s.png", { x: 0, y: 0 }),
      new Costume("t", "./SaveGame/costumes/t.png", { x: 0, y: 0 }),
      new Costume("u", "./SaveGame/costumes/u.png", { x: 0, y: 0 }),
      new Costume("v", "./SaveGame/costumes/v.png", { x: 0, y: 0 }),
      new Costume("w", "./SaveGame/costumes/w.png", { x: 0, y: 0 }),
      new Costume("x", "./SaveGame/costumes/x.png", { x: 0, y: 0 }),
      new Costume("y", "./SaveGame/costumes/y.png", { x: 0, y: 0 }),
      new Costume("z", "./SaveGame/costumes/z.png", { x: 0, y: 0 }),
      new Costume("A", "./SaveGame/costumes/A.png", { x: 0, y: 0 }),
      new Costume("B", "./SaveGame/costumes/B.png", { x: 0, y: 0 }),
      new Costume("C", "./SaveGame/costumes/C.png", { x: 0, y: 0 }),
      new Costume("D", "./SaveGame/costumes/D.png", { x: 0, y: 0 }),
      new Costume("E", "./SaveGame/costumes/E.png", { x: 0, y: 0 }),
      new Costume("F", "./SaveGame/costumes/F.png", { x: 0, y: 0 }),
      new Costume("G", "./SaveGame/costumes/G.png", { x: 0, y: 0 }),
      new Costume("H", "./SaveGame/costumes/H.png", { x: 0, y: 0 }),
      new Costume("I", "./SaveGame/costumes/I.png", { x: 0, y: 0 }),
      new Costume("J", "./SaveGame/costumes/J.png", { x: 0, y: 0 }),
      new Costume("K", "./SaveGame/costumes/K.png", { x: 0, y: 0 }),
      new Costume("L", "./SaveGame/costumes/L.png", { x: 0, y: 0 }),
      new Costume("M", "./SaveGame/costumes/M.png", { x: 0, y: 0 }),
      new Costume("N", "./SaveGame/costumes/N.png", { x: 0, y: 0 }),
      new Costume("O", "./SaveGame/costumes/O.png", { x: 0, y: 0 }),
      new Costume("P", "./SaveGame/costumes/P.png", { x: 0, y: 0 }),
      new Costume("Q", "./SaveGame/costumes/Q.png", { x: 0, y: 0 }),
      new Costume("R", "./SaveGame/costumes/R.png", { x: 0, y: 0 }),
      new Costume("S", "./SaveGame/costumes/S.png", { x: 0, y: 0 }),
      new Costume("T", "./SaveGame/costumes/T.png", { x: 0, y: 0 }),
      new Costume("V", "./SaveGame/costumes/V.png", { x: 0, y: 0 }),
      new Costume("W", "./SaveGame/costumes/W.png", { x: 0, y: 0 }),
      new Costume("X", "./SaveGame/costumes/X.png", { x: 0, y: 0 }),
      new Costume("Y", "./SaveGame/costumes/Y.png", { x: 0, y: 0 }),
      new Costume("Z", "./SaveGame/costumes/Z.png", { x: 0, y: 0 }),
    ];

    this.sounds = [new Sound("meow", "./SaveGame/sounds/meow.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Save Game" },
        this.whenIReceiveSaveGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Save Chunk" },
        this.whenIReceiveSaveChunk
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Load Chunk" },
        this.whenIReceiveLoadChunk
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Load Example" },
        this.whenIReceiveLoadExample
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "m" }, this.whenKeyMPressed),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Load Game" },
        this.whenIReceiveLoadGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.sgI = 261;
    this.vars.sgCount = 27;
    this.vars.sgTile = "N";
    this.vars.sgEncode = 10;
    this.vars.sgFull = "gp5 - The Nether Portal by griffpatch";
    this.vars.sgN = 0;
    this.vars.sgRc = 1;
    this.vars.sgType = 400;
    this.vars.sgNext = 3063;
    this.vars.sgTileidx = -199;
    this.vars.sgFormat = 2;
    this.vars.sgStr = "Chest";
    this.vars.sgTsI = 3;
    this.vars.sgTsC = "t";
    this.vars.costUppercase = 34;
    this.vars.rcostSg = 2;
    this.vars.break = 58;
    this.vars.savidx = 3;
    this.vars.previousChunk = 298862;
    this.vars.savchkidx = 4;
    this.vars.chunkstart = 3005;
    this.vars.loadingchunk = 298862;
    this.vars.devCreate = 0;
    this.vars.SaveList = [];
    this.vars.counts = [];
    this.vars.savechunks = [];
    this.vars.slice = [];
    this.vars.levelPresets = [
      "gp5",
      "The Nether Portal",
      "griffpatch",
      null,
      0,
      "gp4",
      "A Tutorial World I'm working on",
      "griffpatch",
      null,
      0,
      "dd2",
      "hobbit hole ish map",
      "doggydudet",
      null,
      0,
      "jx2",
      "Boss Battle",
      "Jinx733",
      null,
      0,
      "as1",
      "Swim Up",
      "awsmScratcher",
      null,
      0,
      "jk1",
      "parkore map",
      340340,
      null,
      0,
      "jk2",
      "tree house",
      "jake340340",
      null,
      0,
      "bc1",
      "Elevator Mayhem",
      "BajanCanadianMC",
      null,
      0,
      "wl1",
      "My best adventure map",
      "welt101",
      null,
      0,
      "pw5",
      "Parcour Tree Jumper Map",
      "Gustav27",
      null,
      0,
      "ht4",
      "Herobrine Adventure Map",
      "HT2",
      null,
      0,
      "ff1",
      "Ffion's House v.1",
      "Ffiongamerz",
      null,
      0,
      "ns1",
      "Nether-style mini survival game",
      "YakMaster",
      null,
      0,
      "do1",
      "Island of Diamond?",
      "downy",
      null,
      0,
      "pw6",
      "Discodude16's Parkor Map",
      "Discodude16",
      null,
      0,
      "castle3",
      "Abandoned Castle Map",
      "doggydudet",
      null,
      0,
      "ht3",
      "Aether/Nether Adventure Map",
      "HT2",
      null,
      0,
      "ch1",
      "Cool House (modified version of gp4)",
      "TBNFrags",
      null,
      0,
      "ht1",
      "Huge Mushroom Fort",
      "HT2",
      null,
      0,
      "pw4",
      "Maxuper's Parkour map",
      "maxuper03",
      null,
      0,
      "dd1",
      "Doggydudet's Adventure World",
      "doggydudet",
      null,
      0,
      "gu1",
      "Skyblocks Adventure Map",
      "Gustav27",
      null,
      0,
      "craft1",
      "Crafting Guide",
      "MCAnimator3D",
      null,
      0,
      "bw1",
      "Basic World - Awesome House!",
      "miscellaneousgames",
      null,
      0,
      "go1",
      "Soothing solid gold house on an island",
      "pepperpuppy",
      null,
      0,
      "mm1",
      "minymine123's world",
      "minymine123",
      null,
      0,
      "cb1",
      "Awesome Desert Temple",
      "capybara",
      null,
      0,
      "pp1",
      "lava and water pit prank trick",
      "dorypal5",
      null,
      0,
      "sv1",
      "Steve's Survival Adventure Part 1",
      "randomzombie7",
      null,
      0,
      "sv2",
      "Steve's Survival Adventure Part 2",
      "randomzombie7",
      null,
      0,
      "pf1",
      "Puffle9's World",
      "puffle9",
      null,
      0,
      "em1",
      "Ember101's World",
      "Ember101",
      null,
      0,
      "am2",
      "Adventure Map",
      "MagicPencil",
      null,
      0,
      "sm1",
      "Survival Map v.1",
      "Ffiongamerz",
      null,
      0,
      "pw3",
      "Parkour Level",
      "Telekinesis",
      null,
      0,
      "pw2",
      "Parkour Sky World",
      "joshay",
      null,
      0,
      "rm1",
      "Redstone Help Map",
      "MinecraftParty77",
      null,
      0,
      "gh1",
      "Ghost-house and testing area",
      "xlgames",
      null,
      0,
      "jc1",
      "Jump Circuit",
      "Andre_Soto",
      null,
      0,
      "aol",
      "Awesome Obsidian Lair",
      "HT2",
      null,
      0,
      "town1",
      "Desert Town",
      "sentai_13",
      null,
      0,
      "house1",
      "3 story house with redstone elevator",
      "joshay",
      null,
      0,
      "gp3",
      "Redstone Elevator 2",
      "griffpatch",
      null,
      0,
      "castle2",
      "HALLOWEEN MINI-CASTLE",
      "liam48D",
      null,
      0,
      "pw1",
      "Parkour World",
      "joshay",
      null,
      0,
      "rw1",
      "My Little Redstone Workshop",
      "rookie4680",
      null,
      0,
      "gp2",
      "Hidden Cave Entrance",
      "griffpatch",
      null,
      0,
      "gp1",
      "Hidden Piston Staircase",
      "griffpatch",
      null,
      0,
      "fort1",
      "mrwillcreates",
      "Underground fortress with elevator & lava door",
      null,
      0,
      "castle1",
      "An Obsideon Castle",
      "ksps196",
      null,
      0,
      "jx1",
      "An extensive multi-chunk build",
      "Jinx733",
      null,
      0,
      "am1",
      "Sunken island adventure map",
      "monkeyboots30",
      null,
    ];
    this.vars.exampleWords = [];
    this.vars.fullHack = [];

    this.watchers.SaveList = new Watcher({
      label: "SaveGame: _SAVE_LIST",
      style: "normal",
      visible: false,
      value: () => this.vars.SaveList,
      x: 276,
      y: -6,
      width: 404,
      height: 396,
    });
    this.watchers.counts = new Watcher({
      label: "SaveGame: Counts",
      style: "normal",
      visible: false,
      value: () => this.vars.counts,
      x: 478,
      y: 154,
      width: 624,
      height: 686,
    });
    this.watchers.exampleWords = new Watcher({
      label: "SaveGame: Example Words",
      style: "normal",
      visible: false,
      value: () => this.vars.exampleWords,
      x: 256,
      y: 170,
      width: 452,
      height: 259,
    });
  }

  *whenIReceiveSaveGame() {
    while (!!this.keyPressed("o")) {
      yield;
    }
    yield* this.saveGame();
    this.costume = "Saved";
    while (!this.keyPressed("o")) {
      yield;
    }
    this.vars.SaveList = [];
    this.watchers.SaveList.visible = false;
    this.visible = false;
    while (!!this.keyPressed("o")) {
      yield;
    }
  }

  *saveBasicPlayerData() {
    this.vars.sgEncode = "";
    yield* this.appendNumber(Math.floor(this.toNumber(this.stage.vars.X)));
    yield* this.appendNumber(Math.floor(this.toNumber(this.stage.vars.Y)));
    yield* this.appendNumber(
      Math.floor(this.toNumber(this.stage.vars.HealthS))
    );
    yield* this.appendNumber(
      Math.floor(this.toNumber(this.stage.vars.Respawnidx))
    );
    yield* this.appendNumber(
      Math.floor(this.toNumber(this.stage.vars.Survival))
    );
    if (this.toNumber(this.stage.vars.Creative) === -1) {
      yield* this.appendNumber(99);
    } else {
      yield* this.appendNumber(
        Math.floor(this.toNumber(this.stage.vars.Creative))
      );
    }
    yield* this.appendNumber(
      Math.floor(this.toNumber(this.stage.vars.Respawnseed))
    );
    yield* this.appendNumber(
      Math.floor(this.toNumber(this.stage.vars.ChunkSeed))
    );
    yield* this.appendNumber(Math.floor(this.toNumber(this.stage.vars.Time)));
    yield* this.appendNumber(
      Math.floor(this.toNumber(this.stage.vars.Heldinvid))
    );
    yield* this.appendNumber(this.itemOf(this.stage.vars.Menu, 1));
    yield* this.appendString(this.stage.vars.Locked);
    yield* this.appendString(this.stage.vars.Skin);
    yield* this.saveToFull(100);
  }

  *getLevelStats() {
    this.vars.counts = [];
    for (
      let i = 0;
      i < this.vars.undefined.length / this.toNumber(this.stage.vars.Dmul);
      i++
    ) {
      this.vars.counts.push(0);
      yield;
    }
    this.vars.sgN = 1;
    for (let i = 0; i < this.stage.vars.Level.length; i++) {
      this.vars.sgTile = this.itemOf(this.stage.vars.Level, this.vars.sgN - 1);
      this.vars.counts.splice(
        this.vars.sgTile - 1,
        1,
        1 + this.toNumber(this.itemOf(this.vars.counts, this.vars.sgTile - 1))
      );
      this.vars.sgN++;
      yield;
    }
    this.watchers.counts.visible = true;
  }

  *saveInventory() {
    this.vars.sgEncode = "";
    this.vars.sgI = 1;
    while (!(this.compare(this.vars.sgI, 80) > 0)) {
      this.vars.sgTile = this.itemOf(this.stage.vars.Inv, this.vars.sgI - 1);
      if (this.toString(this.vars.sgTile) === "#") {
        yield* this.appendNumber(0);
        this.vars.sgCount = 1;
        while (
          !(
            this.compare(this.vars.sgI, 78) > 0 ||
            !(
              "#" ===
              this.toString(
                this.itemOf(
                  this.stage.vars.Inv,
                  this.toNumber(this.vars.sgI) + 1
                )
              )
            )
          )
        ) {
          this.vars.sgI += 2;
          this.vars.sgCount++;
          yield;
        }
        yield* this.appendNumber(this.vars.sgCount);
      } else {
        yield* this.appendNumber(this.vars.sgTile);
        yield* this.appendNumber(
          this.itemOf(this.stage.vars.Inv, this.toNumber(this.vars.sgI))
        );
      }
      this.vars.sgI += 2;
      yield;
    }
    yield* this.saveToFull(202);
  }

  *saveContainers() {
    this.vars.sgEncode = "";
    this.vars.sgI = 1;
    while (!(this.compare(this.vars.sgI, this.stage.vars.Inside.length) > 0)) {
      this.vars.sgCount = this.itemOf(
        this.stage.vars.Inside,
        this.vars.sgI - 1
      );
      yield* this.appendNumber(this.vars.sgCount);
      this.vars.sgI++;
      this.vars.sgCount = this.itemOf(
        this.stage.vars.Inside,
        this.vars.sgI - 1
      );
      yield* this.appendNumber(this.vars.sgCount);
      this.vars.sgI++;
      yield* this.appendString(
        this.itemOf(this.stage.vars.Inside, this.vars.sgI - 1)
      );
      this.vars.sgI++;
      this.vars.break =
        this.toNumber(this.vars.sgI) + this.toNumber(this.vars.sgCount) * 2 - 2;
      while (!(this.compare(this.vars.sgI, this.vars.break) > 0)) {
        this.vars.sgTile = this.itemOf(
          this.stage.vars.Inside,
          this.vars.sgI - 1
        );
        if (this.toString(this.vars.sgTile) === "#") {
          yield* this.appendNumber(0);
          this.vars.sgCount = 1;
          while (
            !(
              this.compare(this.vars.sgI, 78) > 0 ||
              !(
                "#" ===
                this.toString(
                  this.itemOf(
                    this.stage.vars.Inside,
                    this.toNumber(this.vars.sgI) + 1
                  )
                )
              )
            )
          ) {
            this.vars.sgI += 2;
            this.vars.sgCount++;
            yield;
          }
          yield* this.appendNumber(this.vars.sgCount);
        } else {
          yield* this.appendNumber(this.vars.sgTile);
          yield* this.appendNumber(
            this.itemOf(this.stage.vars.Inside, this.toNumber(this.vars.sgI))
          );
        }
        this.vars.sgI += 2;
        yield;
      }
      yield;
    }
    yield* this.appendNumber(0);
    yield* this.saveToFull(301);
  }

  *loadInventory(count, mode) {
    this.stage.vars.Inv = [];
    while (
      !!(this.compare(this.stage.vars.Inv.length, this.toNumber(count) * 2) < 0)
    ) {
      yield* this.readNumber();
      if (this.toNumber(this.vars.sgN) === 0) {
        if (this.compare(mode, 201) > 0) {
          yield* this.readNumber();
          for (let i = 0; i < this.toNumber(this.vars.sgN); i++) {
            this.stage.vars.Inv.push("#");
            this.stage.vars.Inv.push(0);
            yield;
          }
        } else {
          this.stage.vars.Inv.push("#");
          this.stage.vars.Inv.push(0);
        }
      } else {
        this.stage.vars.Inv.push(this.vars.sgN);
        yield* this.readNumber();
        this.stage.vars.Inv.push(this.vars.sgN);
      }
      yield;
    }
    while (!(this.compare(this.stage.vars.Inv.length, 170) > 0)) {
      this.stage.vars.Inv.push("#");
      this.stage.vars.Inv.push(0);
      yield;
    }
  }

  *loadContainers(mode) {
    yield* this.readNumber();
    while (
      !(
        this.toNumber(this.vars.sgN) === 0 ||
        !(this.compare(this.vars.sgI, this.vars.sgNext) < 0)
      )
    ) {
      this.stage.vars.Inside.push(this.vars.sgN);
      if (
        !(
          this.toNumber(
            this.itemOf(this.stage.vars.Levelref, this.vars.sgN - 1)
          ) === 0
        )
      ) {
        this.stage.vars.Refdata.splice(
          this.toNumber(
            this.itemOf(this.stage.vars.Levelref, this.vars.sgN - 1)
          ) + 1,
          1,
          this.stage.vars.Inside.length
        );
      }
      yield* this.readNumber();
      this.vars.sgCount = this.vars.sgN;
      this.stage.vars.Inside.push(this.vars.sgCount);
      yield* this.readString();
      if (this.toString(this.vars.sgStr) === "Press E to write on this sign") {
        this.vars.sgStr = "Press N to write on this sign";
      }
      this.stage.vars.Inside.push(this.vars.sgStr);
      this.vars.break =
        this.stage.vars.Inside.length +
        this.toNumber(this.vars.sgCount) * 2 -
        2;
      while (
        !(this.compare(this.stage.vars.Inside.length, this.vars.break) > 0)
      ) {
        yield* this.readNumber();
        if (this.toNumber(this.vars.sgN) === 0) {
          if (this.compare(mode, 300) > 0) {
            yield* this.readNumber();
            for (let i = 0; i < this.toNumber(this.vars.sgN); i++) {
              this.stage.vars.Inside.push("#");
              this.stage.vars.Inside.push(0);
              yield;
            }
          } else {
            this.stage.vars.Inside.push("#");
            this.stage.vars.Inside.push(0);
          }
        } else {
          this.stage.vars.Inside.push(this.vars.sgN);
          yield* this.readNumber();
          this.stage.vars.Inside.push(this.vars.sgN);
        }
        yield;
      }
      yield* this.readNumber();
      yield;
    }
  }

  *readString() {
    yield* this.readNumber();
    this.stage.vars.debug.splice(this.stage.vars.debug.length - 1, 1);
    this.vars.sgRc = this.vars.sgN;
    this.vars.sgStr = "";
    if (this.toNumber(this.vars.sgFormat) === 1) {
      for (let i = 0; i < this.toNumber(this.vars.sgRc); i++) {
        if (this.letterOf(this.vars.sgFull, this.vars.sgI - 1) === "_") {
          this.vars.sgStr = this.toString(this.vars.sgStr) + " ";
        } else {
          this.vars.sgStr =
            this.toString(this.vars.sgStr) +
            this.letterOf(this.vars.sgFull, this.vars.sgI - 1);
        }
        this.vars.sgI++;
        yield;
      }
    } else {
      for (let i = 0; i < this.toNumber(this.vars.sgRc); i++) {
        this.vars.sgN =
          this.toNumber(this.letterOf(this.vars.sgFull, this.vars.sgI - 1)) *
            10 +
          this.toNumber(
            this.letterOf(this.vars.sgFull, this.toNumber(this.vars.sgI))
          );
        this.vars.sgStr =
          this.toString(this.vars.sgStr) +
          this.letterOf(this.stage.vars.Chars, this.vars.sgN - 1);
        this.vars.sgI += 2;
        yield;
      }
    }
    this.stage.vars.debug.push(this.vars.sgN);
  }

  *clearDownLevel(all) {
    this.stage.vars.Level = [];
    this.stage.vars.Levelref = [];
    this.stage.vars.Light = [];
    this.stage.vars.Refdata = [];
    this.stage.vars.Refpool = [];
    this.stage.vars.Lightmod = [];
    this.stage.vars.Grow = [];
    this.stage.vars.Growtime = [];
    this.stage.vars.Harvest = [];
    this.stage.vars.Inside = [];
    if (all) {
      this.stage.vars.ChunkSeed = 0;
      this.vars.savechunks = [];
      this.stage.vars.Inv = [];
    }
    this.stage.vars.Mob = [];
    this.stage.vars.Mobspawn = [];
    yield* this.broadcastAndWait("Reset All");
  }

  *getSaveLevelChunkIndex() {
    this.vars.savidx = 1;
    while (
      !(
        this.compare(this.vars.savidx, this.vars.savechunks.length) > 0 ||
        this.compare(
          this.itemOf(this.vars.savechunks, this.vars.savidx - 1),
          this.stage.vars.ChunkSeed
        ) === 0
      )
    ) {
      this.vars.savidx += 2;
      yield;
    }
  }

  *whenIReceiveSaveChunk() {
    yield* this.saveLevelChunk();
  }

  *whenIReceiveLoadChunk() {
    yield* this.restoreLevelChunk();
  }

  *restoreLevelChunk() {
    this.costume = "Loading";
    this.visible = true;
    this.moveAhead();
    this.vars.slice = [];
    if (
      this.compare(
        this.stage.vars.ChunkSeed,
        this.toNumber(this.vars.previousChunk) -
          (this.toNumber(this.stage.vars.Lsx) - 2)
      ) === 0
    ) {
      this.vars.sgI = 1;
    } else {
      if (
        this.compare(
          this.stage.vars.ChunkSeed,
          this.toNumber(this.vars.previousChunk) +
            (this.toNumber(this.stage.vars.Lsx) - 2)
        ) === 0
      ) {
        this.vars.sgI = this.toNumber(this.stage.vars.Lsx) - 1;
      } else {
        this.vars.sgI = 0;
      }
    }
    if (this.compare(this.vars.sgI, 0) > 0) {
      for (let i = 0; i < this.toNumber(this.stage.vars.Lsy); i++) {
        this.vars.slice.push(
          this.itemOf(this.stage.vars.Level, this.vars.sgI - 1)
        );
        this.vars.slice.push(
          this.itemOf(this.stage.vars.Level, this.toNumber(this.vars.sgI))
        );
        this.vars.sgI += this.toNumber(this.stage.vars.Lsx);
        yield;
      }
    }
    yield* this.getSaveLevelChunkIndex();
    if (this.compare(this.vars.savidx, this.vars.savechunks.length) > 0) {
      yield* this.clearDownLevel(0);
      this.stage.vars.Biomeid = 0;
      yield* this.broadcastAndWait("Spawn Chunk from Seed");
    } else {
      this.vars.sgFull = this.itemOf(
        this.vars.savechunks,
        this.toNumber(this.vars.savidx)
      );
      this.vars.sgI = 1;
      this.vars.sgFormat = 2;
      if (
        this.compare(this.vars.sgFormat, 1) < 0 ||
        this.compare(this.vars.sgFormat, 2) > 0
      ) {
        this.costume = "Bad";
        return;
      }
      yield* this.clearDownLevel(0);
      yield* this.loadGame2(!null);
    }
    if (this.compare(this.vars.slice.length, 0) > 0) {
      if (
        this.compare(this.stage.vars.ChunkSeed, this.vars.previousChunk) < 0
      ) {
        this.vars.sgI = this.toNumber(this.stage.vars.Lsx) - 1;
      } else {
        this.vars.sgI = 1;
      }
      this.vars.sgN = 1;
      for (let i = 0; i < this.toNumber(this.stage.vars.Lsy); i++) {
        this.stage.vars.Level.splice(
          this.vars.sgI - 1,
          1,
          this.itemOf(this.vars.slice, this.vars.sgN - 1)
        );
        this.stage.vars.Level.splice(
          this.toNumber(this.vars.sgI),
          1,
          this.itemOf(this.vars.slice, this.toNumber(this.vars.sgN))
        );
        this.vars.sgI += this.toNumber(this.stage.vars.Lsx);
        this.vars.sgN += 2;
        yield;
      }
      this.vars.slice = [];
    }
    this.costume = "BringToLife";
    yield* this.broadcastAndWait("Bring to Life");
    yield* this.wait(0.05);
    yield* this.broadcastAndWait("Post Chunk Load");
    this.stage.vars.debug = [];
    this.visible = false;
  }

  *saveLevelChunk() {
    this.costume = "Saving";
    this.visible = true;
    this.moveAhead();
    yield* this.getSaveLevelChunkIndex();
    if (this.compare(this.vars.savidx, this.vars.savechunks.length) > 0) {
      this.vars.savechunks.push(this.stage.vars.ChunkSeed);
      this.vars.savechunks.push("");
    }
    this.vars.fullHack = [];
    yield* this.saveLevelData();
    yield* this.saveContainers();
    yield* this.saveMobs();
    this.vars.savechunks.splice(
      this.toNumber(this.vars.savidx),
      1,
      this.vars.fullHack.join(" ")
    );
    this.vars.fullHack = [];
    this.vars.previousChunk = this.stage.vars.ChunkSeed;
  }

  *saveGame() {
    if (this.compare(this.stage.vars.ChunkSeed, 0) > 0) {
      yield* this.saveLevelChunk();
    }
    this.costume = "Saving";
    this.visible = true;
    this.moveAhead();
    this.vars.fullHack = [];
    yield* this.appendNumberToFull(2);
    this.vars.SaveList = [];
    this.watchers.SaveList.visible = false;
    yield* this.saveBasicPlayerData();
    yield* this.saveInventory();
    if (this.toNumber(this.stage.vars.ChunkSeed) === 0) {
      yield* this.saveLevelData();
      yield* this.saveContainers();
      yield* this.saveMobs();
    } else {
      this.vars.savchkidx = 2;
      while (
        !(this.compare(this.vars.savchkidx, this.vars.savechunks.length) > 0)
      ) {
        yield* this.appenddatatofull(
          this.itemOf(this.vars.savechunks, this.vars.savchkidx - 1)
        );
        this.vars.savchkidx += 2;
        yield;
      }
    }
    this.vars.SaveList.push(this.vars.fullHack.join(" "));
    this.vars.fullHack = [];
    this.watchers.SaveList.visible = true;
    this.vars.sgEncode = "";
    this.vars.sgFull = "";
    this.moveAhead();
  }

  *readRaw() {
    this.vars.sgN = "";
    while (!(this.compare(this.vars.chunkstart, this.vars.sgNext) === 0)) {
      this.vars.sgN =
        this.toString(this.vars.sgN) +
        this.letterOf(this.vars.sgFull, this.vars.chunkstart - 1);
      this.vars.chunkstart++;
      yield;
    }
  }

  *loadBasicPlayerData() {
    yield* this.readNumber();
    this.stage.vars.X = this.toNumber(this.vars.sgN) + 0.5;
    yield* this.readNumber();
    this.stage.vars.Y = this.toNumber(this.vars.sgN) + 0.87;
    yield* this.readNumber();
    this.stage.vars.HealthS = this.vars.sgN;
    yield* this.readNumber();
    this.stage.vars.Respawnidx = this.vars.sgN;
    if (this.compare(this.vars.sgI, this.vars.sgNext) < 0) {
      yield* this.readNumber();
      this.stage.vars.Survival = this.vars.sgN;
    }
    if (this.compare(this.vars.sgI, this.vars.sgNext) < 0) {
      yield* this.readNumber();
      if (this.toNumber(this.vars.sgN) === 99) {
        this.stage.vars.Creative = -1;
      } else {
        this.stage.vars.Creative = this.vars.sgN;
      }
    }
    if (this.compare(this.vars.sgI, this.vars.sgNext) < 0) {
      yield* this.readNumber();
      this.stage.vars.Respawnseed = this.vars.sgN;
      yield* this.readNumber();
      this.stage.vars.ChunkSeed = this.vars.sgN;
    } else {
      this.stage.vars.Respawnseed = 0;
      this.stage.vars.ChunkSeed = 0;
    }
    if (this.compare(this.vars.sgI, this.vars.sgNext) < 0) {
      yield* this.readNumber();
      this.stage.vars.Time = this.vars.sgN;
      yield* this.readNumber();
      this.stage.vars.Nextselid = 0 - this.toNumber(this.vars.sgN);
    } else {
      this.stage.vars.Time = 6 * 50;
      this.stage.vars.Nextselid = -1;
    }
    if (this.compare(this.vars.sgI, this.vars.sgNext) < 0) {
      yield* this.readNumber();
      this.stage.vars.Menu.splice(1, 1, this.vars.sgN);
    } else {
      this.stage.vars.Menu.splice(1, 1, 0);
    }
    if (this.compare(this.vars.sgI, this.vars.sgNext) < 0) {
      yield* this.readString();
      this.stage.vars.Locked = this.vars.sgStr;
    } else {
      this.stage.vars.Locked = "";
    }
    if (this.compare(this.vars.sgI, this.vars.sgNext) < 0) {
      yield* this.readString();
      this.stage.vars.Skin = this.vars.sgStr;
    } else {
      this.stage.vars.Skin = 0;
    }
  }

  *loadPresetWorld(levelName) {
    this.vars.sgI = 1;
    while (!(this.compare(this.vars.sgI, this.vars.levelPresets.length) > 0)) {
      if (
        this.compare(
          levelName,
          this.itemOf(this.vars.levelPresets, this.vars.sgI - 1)
        ) === 0 ||
        this.compare(levelName, (this.toNumber(this.vars.sgI) + 4) / 5) === 0
      ) {
        this.vars.sgFull = this.itemOf(
          this.vars.levelPresets,
          this.toNumber(this.vars.sgI) + 2
        );
        this.vars.sgI = 9999999;
      }
      this.vars.sgI += 5;
      yield;
    }
  }

  *showExampleWorldList(show) {
    if (show) {
      this.vars.exampleWords = [];
      this.vars.sgI = 1;
      while (
        !(this.compare(this.vars.sgI, this.vars.levelPresets.length) > 0)
      ) {
        this.vars.sgFull = this.itemOf(
          this.vars.levelPresets,
          this.toNumber(this.vars.sgI) + -1
        );
        this.vars.sgFull =
          this.toString(this.vars.sgFull) +
          (" - " +
            this.toString(
              this.itemOf(this.vars.levelPresets, this.toNumber(this.vars.sgI))
            ));
        this.vars.sgFull =
          this.toString(this.vars.sgFull) +
          (" by " +
            this.toString(
              this.itemOf(
                this.vars.levelPresets,
                this.toNumber(this.vars.sgI) + 1
              )
            ));
        this.vars.exampleWords.push(this.vars.sgFull);
        this.vars.sgI += 5;
        yield;
      }
      this.vars.exampleWords.push("");
      this.vars.exampleWords.push("");
      this.vars.exampleWords.push(
        "Want your map here? - Post your best on the forum!"
      );
      this.vars.exampleWords.push("");
      this.vars.exampleWords.push("");
      this.vars.sgFull = this.itemOf(this.vars.exampleWords, 0);
      this.watchers.exampleWords.visible = true;
    } else {
      this.vars.exampleWords = [];
      this.watchers.exampleWords.visible = false;
    }
  }

  *whenIReceiveLoadExample() {
    yield* this.loadGame(!null);
  }

  *whenKeyMPressed() {}

  *saveMobs() {
    this.vars.sgEncode = "";
    this.vars.sgI = 1;
    while (!(this.compare(this.vars.sgI, this.stage.vars.Mob.length) > 0)) {
      if (
        this.compare(this.itemOf(this.stage.vars.Mob, this.vars.sgI - 1), 0) > 0
      ) {
        yield* this.appendNumber(
          this.itemOf(this.stage.vars.Mob, this.vars.sgI - 1)
        );
        yield* this.appendNumber(
          this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.sgI) + 1)
        );
        yield* this.appendNumber(
          this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.sgI) + 16)
        );
        yield* this.appendNumber(
          this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.sgI) + 18)
        );
      }
      this.vars.sgI += this.toNumber(this.stage.vars.Mobmul);
      yield;
    }
    yield* this.appendNumber(0);
    yield* this.saveToFull(402);
  }

  *loadGame2(issecondtime) {
    this.stage.vars.debug.push("*** Load Game2 ***");
    this.vars.loadingchunk = 0;
    while (!(this.compare(this.vars.sgI, this.vars.sgFull.length) > 0)) {
      if (
        this.compare(this.letterOf(this.vars.sgFull, this.vars.sgI - 1), 0) <
          0 ||
        this.compare(this.letterOf(this.vars.sgFull, this.vars.sgI - 1), 9) > 0
      ) {
        this.vars.sgI++;
      } else {
        this.vars.chunkstart = this.vars.sgI;
        this.stage.vars.debug.push("*** TYPE ***");
        yield* this.readNumber();
        this.vars.sgType = this.vars.sgN;
        this.stage.vars.debug.push("*** Length ***");
        yield* this.readNumber();
        this.vars.sgNext =
          this.toNumber(this.vars.sgI) + this.toNumber(this.vars.sgN);
        if (this.compare(this.vars.sgType, 100) < 0) {
          if (issecondtime) {
            if (this.toNumber(this.vars.sgType) === 1) {
              this.stage.vars.Lcopy = [];
              this.stage.vars.ChunkSeed = 0;
              this.stage.vars.GenVersion = 0;
              this.stage.vars.Biomeid = 0;
              yield* this.loadLevelData(this.vars.sgType);
            }
            if (this.toNumber(this.vars.sgType) === 2) {
              yield* this.readNumber();
              this.vars.loadingchunk = this.vars.sgN;
              this.stage.vars.ChunkSeed = this.vars.loadingchunk;
              yield* this.readNumber();
              this.stage.vars.GenVersion = this.vars.sgN;
              yield* this.readNumber();
              this.stage.vars.Biomeid = this.vars.sgN;
              yield* this.broadcastAndWait("Spawn Chunk from Seed");
              if (this.toNumber(this.vars.devCreate) === 1) {
                yield* this.devClearLevel();
              }
              yield* this.clearDownLevel(0);
              yield* this.loadLevelData(this.vars.sgType);
            }
          } else {
            if (this.toNumber(this.vars.sgType) === 1) {
              this.vars.savechunks.push(0);
            }
            if (this.toNumber(this.vars.sgType) === 2) {
              yield* this.readNumber();
              this.vars.savechunks.push(this.vars.sgN);
            }
            yield* this.readRaw();
            this.vars.savechunks.push(this.vars.sgN);
          }
        }
        if (this.toNumber(this.vars.sgType) === 100) {
          yield* this.loadBasicPlayerData();
        }
        if (this.toNumber(this.vars.sgType) === 200) {
          yield* this.loadInventory(36, this.vars.sgType);
        }
        if (this.toNumber(this.vars.sgType) === 201) {
          yield* this.loadInventory(40, this.vars.sgType);
        }
        if (this.toNumber(this.vars.sgType) === 202) {
          yield* this.loadInventory(40, this.vars.sgType);
        }
        if (
          this.compare(this.vars.sgType, 299) > 0 &&
          this.compare(this.vars.sgType, 500) < 0
        ) {
          if (issecondtime) {
            if (this.toNumber(this.vars.sgType) === 300) {
              yield* this.loadContainers(this.vars.sgType);
            }
            if (this.toNumber(this.vars.sgType) === 301) {
              yield* this.loadContainers(this.vars.sgType);
            }
            if (
              this.compare(this.vars.sgType, 399) > 0 &&
              this.compare(this.vars.sgType, 499) < 0
            ) {
              yield* this.loadMobs(this.vars.sgType);
            }
          } else {
            yield* this.readRaw();
            this.vars.sgN =
              this.toString(
                this.itemOf(
                  this.vars.savechunks,
                  this.vars.savechunks.length - 1
                )
              ) + this.toString(this.vars.sgN);
            this.vars.savechunks.splice("last", 1, this.vars.sgN);
          }
        }
        this.vars.sgI = this.vars.sgNext;
      }
      yield;
    }
    if (!(this.compare(this.vars.sgI, this.vars.sgFull.length + 1) === 0)) {
      this.costume = "Bad";
      this.stage.vars.debug.push("*** Length Exception ***");
      this.stage.vars.debug.push(this.vars.sgI);
      this.stage.vars.debug.push(this.vars.sgFull.length + 1);
      /* TODO: Implement stop all */ null;
    }
    this.vars.sgFull = "";
    this.stage.vars.Nextselid = this.stage.vars.Heldinvid;
    this.vars.SaveList = [];
    this.watchers.SaveList.visible = false;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.Chars =
      " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    this.costume = "A";
    this.vars.costUppercase = this.costumeNumber;
  }

  *devClearLevel() {
    this.vars.sgTileidx = 1;
    for (let i = 0; i < this.stage.vars.Lcopy.length; i++) {
      this.stage.vars.Lcopy.splice(this.vars.sgTileidx - 1, 1, 1);
      this.vars.sgTileidx++;
      yield;
    }
  }

  *loadMobs(mode) {
    yield* this.readNumber();
    while (
      !(
        this.toNumber(this.vars.sgN) === 0 ||
        !(this.compare(this.vars.sgI, this.vars.sgNext) < 0)
      )
    ) {
      this.stage.vars.Mobspawn.push(this.vars.sgN);
      yield* this.readNumber();
      this.stage.vars.Mobspawn.push(this.vars.sgN);
      yield* this.readNumber();
      if (this.compare(mode, 400) > 0) {
        this.stage.vars.Mobspawn.push(this.vars.sgN);
        yield* this.readNumber();
      } else {
        this.stage.vars.Mobspawn.push(0);
      }
      if (this.compare(mode, 401) > 0) {
        this.stage.vars.Mobspawn.push(this.vars.sgN);
        yield* this.readNumber();
      } else {
        this.stage.vars.Mobspawn.push(0);
      }
      yield;
    }
  }

  *whenIReceiveLoadGame() {
    yield* this.loadGame(0);
  }

  *whenIReceiveGreenFlag() {
    this.goto(0, 0);
    this.watchers.SaveList.visible = false;
    this.vars.savechunks = [];
    yield* this.showExampleWorldList(0);
    this.visible = false;
  }

  *appendNumberToFull(nnnn) {
    this.vars.fullHack.push(this.letterOf(nnnn.length, 0));
    this.vars.sgTsI = 1;
    for (let i = 0; i < nnnn.length; i++) {
      this.vars.fullHack.push(this.letterOf(nnnn, this.vars.sgTsI - 1));
      this.vars.sgTsI++;
      yield;
    }
  }

  *loadGame(example) {
    this.stage.vars.debug = [];
    this.stage.vars.debug.push("*** Load Game ***");
    this.costume = "Load Ask";
    this.visible = false;
    if (example) {
      yield* this.showExampleWorldList(!null);
      yield* this.askAndWait(
        "Enter the code or list number of the example world to play"
      );
      yield* this.showExampleWorldList(0);
    } else {
      yield* this.askAndWait("Paste (Ctrl+V) a Save Game String Below:");
    }
    if (this.toNumber(this.answer) === 0) {
      this.broadcast("Splash1");
      return;
    }
    this.vars.sgFull = this.answer;
    if (this.compare(this.vars.sgFull.length, 100) < 0) {
      yield* this.loadPresetWorld(this.vars.sgFull);
      if (this.compare(this.vars.sgFull.length, 100) < 0) {
        this.broadcast("Splash1");
        return;
      }
    }
    this.costume = "Loading";
    this.visible = true;
    this.moveAhead();
    this.vars.sgI = 1;
    yield* this.readNumber();
    this.vars.sgFormat = this.vars.sgN;
    if (
      this.compare(this.vars.sgFormat, 1) < 0 ||
      this.compare(this.vars.sgFormat, 2) > 0
    ) {
      this.costume = "Bad";
      this.stage.vars.debug.push("*** Unknown Save Game Format ***");
      this.stage.vars.debug.push(this.vars.sgFormat);
      /* TODO: Implement stop all */ null;
    }
    yield* this.clearDownLevel(!null);
    yield* this.loadGame2(0);
    yield* this.getSaveLevelChunkIndex();
    this.stage.vars.debug.push("*** Chunk Seed ***");
    this.stage.vars.debug.push(this.stage.vars.ChunkSeed);
    this.stage.vars.debug.push(this.vars.savidx);
    if (this.toNumber(this.stage.vars.ChunkSeed) === 0) {
      this.vars.savidx = 1;
    }
    if (this.compare(this.vars.savidx, this.vars.savechunks.length) > 0) {
      this.costume = "Bad";
      this.stage.vars.debug.push("*** Save Index Out of range ***");
      this.stage.vars.debug.push(this.vars.savidx);
      /* TODO: Implement stop all */ null;
    } else {
      this.vars.sgFull = this.itemOf(
        this.vars.savechunks,
        this.toNumber(this.vars.savidx)
      );
      this.vars.sgI = 1;
      if (
        this.compare(this.vars.sgFormat, 1) < 0 ||
        this.compare(this.vars.sgFormat, 2) > 0
      ) {
        this.costume = "Bad";
        this.stage.vars.debug.push("*** Unknown Format ***");
        this.stage.vars.debug.push(this.vars.sgFormat);
        /* TODO: Implement stop all */ null;
      }
      yield* this.loadGame2(!null);
    }
    if (this.stage.vars.Level.length === 0) {
      this.costume = "Bad";
      this.stage.vars.debug.push("*** Level Empty!?! ***");
      /* TODO: Implement stop all */ null;
    }
    this.stage.vars.debug = [];
    this.visible = false;
    this.broadcast("Start After Loaded");
  }

  *saveLevelData() {
    this.vars.sgEncode = "";
    if (this.compare(this.stage.vars.Lcopy.length, 0) > 0) {
      yield* this.appendNumber(this.stage.vars.ChunkSeed);
      yield* this.appendNumber(this.stage.vars.GenVersion);
      yield* this.appendNumber(this.stage.vars.Biomeid);
    }
    yield* this.appendNumber(this.stage.vars.Lsx);
    yield* this.appendNumber(this.stage.vars.Lsy);
    if (this.toNumber(this.stage.vars.ChunkSeed) === 0) {
      this.vars.sgI = 1;
      for (let i = 0; i < this.toNumber(this.stage.vars.Lsx); i++) {
        this.stage.vars.Level.splice(this.vars.sgI - 1, 1, 4);
        this.vars.sgI++;
        yield;
      }
    }
    this.vars.sgI = 2;
    while (!(this.compare(this.vars.sgI, this.stage.vars.Level.length) > 0)) {
      this.vars.sgTile = this.itemOf(this.stage.vars.Level, this.vars.sgI - 1);
      if (
        this.compare(
          this.vars.sgTile,
          this.itemOf(this.stage.vars.Lcopy, this.vars.sgI - 1)
        ) === 0
      ) {
        this.vars.sgTile = 0;
      }
      this.vars.sgI++;
      this.vars.sgCount = 1;
      this.vars.break = 0;
      while (!(this.toNumber(this.vars.break) === 1)) {
        if (this.compare(this.vars.sgI, this.stage.vars.Level.length) > 0) {
          this.vars.break = 1;
        } else {
          this.vars.sgTsI = this.itemOf(
            this.stage.vars.Level,
            this.vars.sgI - 1
          );
          if (
            this.compare(this.stage.vars.Lcopy.length, 0) > 0 &&
            this.compare(
              this.vars.sgTsI,
              this.itemOf(this.stage.vars.Lcopy, this.vars.sgI - 1)
            ) === 0
          ) {
            this.vars.sgTsI = 0;
          }
          if (
            this.compare(this.vars.sgTsI, this.vars.sgTile) === 0 ||
            this.toNumber(this.vars.sgTsI) === 6
          ) {
            this.vars.sgI++;
            this.vars.sgCount++;
          } else {
            this.vars.break = 1;
          }
        }
        yield;
      }
      yield* this.appendNumber(this.vars.sgTile);
      yield* this.appendNumber(this.vars.sgCount);
      yield;
    }
    if (this.compare(this.stage.vars.Lcopy.length, 0) > 0) {
      yield* this.saveToFull(2);
    } else {
      yield* this.saveToFull(1);
    }
  }

  *appenddatatofull(data) {
    this.vars.sgTsI = 1;
    for (let i = 0; i < data.length; i++) {
      this.vars.fullHack.push(this.letterOf(data, this.vars.sgTsI - 1));
      this.vars.sgTsI++;
      yield;
    }
  }

  *loadLevelData(mode) {
    yield* this.readNumber();
    this.stage.vars.Lsx = this.vars.sgN;
    this.stage.vars.Lsxneg = 0 - this.toNumber(this.stage.vars.Lsx);
    yield* this.readNumber();
    this.stage.vars.Lsy = this.vars.sgN;
    this.vars.sgTileidx = 2;
    this.stage.vars.Level.push(1);
    this.stage.vars.Levelref.push(0);
    this.stage.vars.Light.push(0);
    this.stage.vars.Light.push(0);
    while (!!(this.compare(this.vars.sgI, this.vars.sgNext) < 0)) {
      yield* this.readNumber();
      this.vars.sgTile = this.vars.sgN;
      yield* this.readNumber();
      if (this.compare(mode, 1) > 0 && this.toNumber(this.vars.sgTile) === 0) {
        for (let i = 0; i < this.toNumber(this.vars.sgN); i++) {
          this.stage.vars.Level.push(
            this.itemOf(this.stage.vars.Lcopy, this.stage.vars.Level.length)
          );
          this.stage.vars.Levelref.push("");
          this.stage.vars.Light.push(0);
          this.stage.vars.Light.push(0);
          yield;
        }
      } else {
        for (let i = 0; i < this.toNumber(this.vars.sgN); i++) {
          this.stage.vars.Level.push(this.vars.sgTile);
          this.stage.vars.Levelref.push("");
          this.stage.vars.Light.push(0);
          this.stage.vars.Light.push(0);
          yield;
        }
      }
      yield;
    }
    if (
      !(
        this.compare(
          this.stage.vars.Level.length,
          this.toNumber(this.stage.vars.Lsx) *
            this.toNumber(this.stage.vars.Lsy)
        ) === 0
      )
    ) {
      this.costume = "Bad";
      this.stage.vars.debug.push("*** Level Bounds Mismatch ***");
      this.stage.vars.debug.push(this.stage.vars.Level.length);
      this.stage.vars.debug.push(
        this.toNumber(this.stage.vars.Lsx) * this.toNumber(this.stage.vars.Lsy)
      );
      /* TODO: Implement stop all */ null;
    }
    if (this.compare(mode, 2) < 0) {
      this.vars.sgTileidx = 1;
      for (let i = 0; i < this.toNumber(this.stage.vars.Lsy); i++) {
        this.stage.vars.Level.splice(this.vars.sgTileidx - 1, 1, 6);
        this.vars.sgTileidx += this.toNumber(this.stage.vars.Lsx);
        this.stage.vars.Level.splice(
          this.toNumber(this.vars.sgTileidx) - 2,
          1,
          6
        );
        yield;
      }
    }
    this.vars.sgTileidx = 1;
    for (let i = 0; i < this.toNumber(this.stage.vars.Lsx); i++) {
      this.stage.vars.Level.splice(this.vars.sgTileidx - 1, 1, 6);
      this.vars.sgTileidx++;
      yield;
    }
    this.vars.sgN = this.stage.vars.Level.length;
    for (let i = 0; i < this.toNumber(this.stage.vars.Lsx); i++) {
      this.vars.sgCount = 16;
      this.stage.vars.Light.splice(this.vars.sgN - 1, 1, this.vars.sgCount);
      this.vars.sgTileidx =
        this.toNumber(this.vars.sgN) - this.toNumber(this.stage.vars.Lsx);
      for (let i = 0; i < this.toNumber(this.stage.vars.Lsy) - 1; i++) {
        this.vars.sgTile = this.itemOf(
          this.stage.vars.Level,
          this.vars.sgTileidx - 1
        );
        if (this.compare(this.vars.sgCount, 0) > 0) {
          if (this.toNumber(this.vars.sgTile) === 1) {
            this.stage.vars.Light.splice(
              this.vars.sgTileidx - 1,
              1,
              this.vars.sgCount
            );
          } else {
            this.vars.sgCount = 0;
            this.stage.vars.Lightmod.push(this.vars.sgTileidx);
          }
        }
        if (
          this.compare(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(this.vars.sgTile) *
                this.toNumber(this.stage.vars.Dmul) +
                8
            ),
            0
          ) < 0
        ) {
          this.stage.vars.Lightmod.push(
            this.toNumber(this.vars.sgTileidx) + this.stage.vars.Level.length
          );
        }
        this.vars.sgTile = this.itemOf(
          this.vars.undefined,
          this.toNumber(this.vars.sgTile) *
            this.toNumber(this.stage.vars.Dmul) +
            19
        );
        if (this.toString(this.vars.sgTile) === "G") {
          this.stage.vars.Grow.push(this.vars.sgTileidx);
          this.stage.vars.Growtime.push(0);
        } else {
          if (
            this.toString(this.vars.sgTile) === "A" ||
            this.toString(this.vars.sgTile) === "B" ||
            this.toString(this.vars.sgTile) === "R" ||
            this.toString(this.vars.sgTile) === "F"
          ) {
            this.stage.vars.Refdata.push(this.vars.sgTileidx);
            this.stage.vars.Levelref.splice(
              this.vars.sgTileidx - 1,
              1,
              this.stage.vars.Refdata.length
            );
            if (this.toString(this.vars.sgTile) === "B") {
              this.stage.vars.Refdata.push("b");
            } else {
              if (this.toString(this.vars.sgTile) === "R") {
                this.stage.vars.Refdata.push("r");
              } else {
                if (this.toString(this.vars.sgTile) === "F") {
                  this.stage.vars.Refdata.push("fi");
                } else {
                  this.stage.vars.Refdata.push("");
                }
              }
            }
            for (
              let i = 0;
              i < this.toNumber(this.stage.vars.Refsize) - 2;
              i++
            ) {
              this.stage.vars.Refdata.push("");
              yield;
            }
          }
        }
        this.vars.sgTileidx += this.toNumber(this.stage.vars.Lsxneg);
        yield;
      }
      this.vars.sgN--;
      yield;
    }
  }

  *appendNumber(nnn) {
    if (this.compare(nnn, Math.round(this.toNumber(nnn))) === 0) {
      if (this.toNumber(nnn) === 1) {
        this.vars.sgEncode = this.toString(this.vars.sgEncode) + "0";
      } else {
        this.vars.sgEncode =
          this.toString(this.vars.sgEncode) +
          (this.toString(nnn.length) + this.toString(nnn));
      }
    } else {
      yield* this.appendNumber(Math.round(this.toNumber(nnn)));
    }
  }

  *appendString(txt) {
    this.vars.rcostSg = this.costumeNumber;
    yield* this.appendNumber(txt.length);
    this.vars.sgStr = "";
    this.vars.sgN = 1;
    for (let i = 0; i < txt.length; i++) {
      this.vars.sgTsC = this.letterOf(txt, this.vars.sgN - 1);
      if (
        !(
          this.compare(this.vars.sgTsC, "a") < 0 ||
          this.compare(this.vars.sgTsC, "z") > 0
        )
      ) {
        this.costume = this.vars.sgTsC;
        if (this.compare(this.costumeNumber, this.vars.costUppercase) < 0) {
          this.vars.sgTsI = 66;
        } else {
          this.vars.sgTsI = 32;
        }
      } else {
        this.vars.sgTsI = 1;
      }
      while (
        !(
          this.compare(
            this.vars.sgTsC,
            this.letterOf(this.stage.vars.Chars, this.vars.sgTsI - 1)
          ) === 0 ||
          this.compare(this.vars.sgTsI, this.stage.vars.Chars.length) > 0
        )
      ) {
        this.vars.sgTsI++;
        yield;
      }
      if (this.compare(this.vars.sgTsI, 10) < 0) {
        this.vars.sgStr = this.toString(this.vars.sgStr) + "0";
      }
      this.vars.sgStr =
        this.toString(this.vars.sgStr) + this.toString(this.vars.sgTsI);
      this.vars.sgN++;
      yield;
    }
    this.vars.sgEncode =
      this.toString(this.vars.sgEncode) + this.toString(this.vars.sgStr);
    this.costume = this.vars.rcostSg;
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
        yield;
      }
    }
  }

  *saveToFull(typ) {
    yield* this.appendNumberToFull(typ);
    yield* this.appendNumberToFull(this.vars.sgEncode.length);
    this.vars.sgTsI = 1;
    for (let i = 0; i < this.vars.sgEncode.length; i++) {
      this.vars.fullHack.push(
        this.letterOf(this.vars.sgEncode, this.vars.sgTsI - 1)
      );
      this.vars.sgTsI++;
      yield;
    }
  }
}
