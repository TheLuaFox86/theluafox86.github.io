/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Mob extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ZombieLook", "./Mob/costumes/ZombieLook.png", {
        x: 12,
        y: 68,
      }),
      new Costume("Zombie4", "./Mob/costumes/Zombie4.png", { x: 12, y: 68 }),
      new Costume("Zombie5", "./Mob/costumes/Zombie5.png", { x: 19, y: 68 }),
      new Costume("Zombie6", "./Mob/costumes/Zombie6.png", { x: 30, y: 68 }),
      new Costume("Zombie7", "./Mob/costumes/Zombie7.png", { x: 36, y: 68 }),
      new Costume("Zombie_hLook", "./Mob/costumes/Zombie_hLook.png", {
        x: 12,
        y: 68,
      }),
      new Costume("Zombie_h4", "./Mob/costumes/Zombie_h4.png", {
        x: 12,
        y: 68,
      }),
      new Costume("Zombie_h5", "./Mob/costumes/Zombie_h5.png", {
        x: 19,
        y: 68,
      }),
      new Costume("Zombie_h6", "./Mob/costumes/Zombie_h6.png", {
        x: 30,
        y: 68,
      }),
      new Costume("Zombie_h7", "./Mob/costumes/Zombie_h7.png", {
        x: 36,
        y: 68,
      }),
      new Costume("Sheep_Face", "./Mob/costumes/Sheep_Face.png", {
        x: 68,
        y: 60,
      }),
      new Costume("Walk1", "./Mob/costumes/Walk1.png", { x: 92, y: 60 }),
      new Costume("Walk2", "./Mob/costumes/Walk2.png", { x: 82, y: 60 }),
      new Costume("Walk3", "./Mob/costumes/Walk3.png", { x: 68, y: 60 }),
      new Costume("Walk4", "./Mob/costumes/Walk4.png", { x: 82, y: 60 }),
      new Costume("Walk5", "./Mob/costumes/Walk5.png", { x: 92, y: 60 }),
      new Costume("Sheep_Hurt", "./Mob/costumes/Sheep_Hurt.png", {
        x: 102,
        y: 60,
      }),
      new Costume("creeper-facing", "./Mob/costumes/creeper-facing.png", {
        x: 70,
        y: 156,
      }),
      new Costume("creeper-1", "./Mob/costumes/creeper-1.png", {
        x: 118,
        y: 200,
      }),
      new Costume("creeper-2", "./Mob/costumes/creeper-2.png", {
        x: 118,
        y: 200,
      }),
      new Costume("creeper-3", "./Mob/costumes/creeper-3.png", {
        x: 118,
        y: 200,
      }),
      new Costume("creeper-4", "./Mob/costumes/creeper-4.png", {
        x: 118,
        y: 200,
      }),
      new Costume(
        "creeper-facing_hit",
        "./Mob/costumes/creeper-facing_hit.png",
        { x: 70, y: 156 }
      ),
      new Costume("creeper-1_hit", "./Mob/costumes/creeper-1_hit.png", {
        x: 70,
        y: 156,
      }),
      new Costume("creeper-2_hit", "./Mob/costumes/creeper-2_hit.png", {
        x: 118,
        y: 200,
      }),
      new Costume("creeper-3_hit", "./Mob/costumes/creeper-3_hit.png", {
        x: 118,
        y: 200,
      }),
      new Costume("creeper-4_hit", "./Mob/costumes/creeper-4_hit.png", {
        x: 84,
        y: 156,
      }),
      new Costume("cowLook", "./Mob/costumes/cowLook.png", { x: 38, y: 48 }),
      new Costume("cow1", "./Mob/costumes/cow1.png", { x: 60, y: 48 }),
      new Costume("cow2", "./Mob/costumes/cow2.png", { x: 56, y: 48 }),
      new Costume("cow3", "./Mob/costumes/cow3.png", { x: 48, y: 48 }),
      new Costume("cow4", "./Mob/costumes/cow4.png", { x: 38, y: 48 }),
      new Costume("cow5", "./Mob/costumes/cow5.png", { x: 48, y: 48 }),
      new Costume("cow6", "./Mob/costumes/cow6.png", { x: 56, y: 48 }),
      new Costume("cow7", "./Mob/costumes/cow7.png", { x: 60, y: 48 }),
      new Costume("cowHurt", "./Mob/costumes/cowHurt.png", { x: 58, y: 46 }),
      new Costume("ChickenFace", "./Mob/costumes/ChickenFace.png", {
        x: 20,
        y: 28,
      }),
      new Costume("Chicken1", "./Mob/costumes/Chicken1.png", { x: 20, y: 28 }),
      new Costume("Chicken2", "./Mob/costumes/Chicken2.png", { x: 20, y: 28 }),
      new Costume("Chicken3", "./Mob/costumes/Chicken3.png", { x: 20, y: 28 }),
      new Costume("Chicken4", "./Mob/costumes/Chicken4.png", { x: 20, y: 28 }),
      new Costume("Chicken5", "./Mob/costumes/Chicken5.png", { x: 20, y: 28 }),
      new Costume("ChickenHurt", "./Mob/costumes/ChickenHurt.png", {
        x: 20,
        y: 28,
      }),
      new Costume("SpiderFace", "./Mob/costumes/SpiderFace.png", {
        x: 108,
        y: 50,
      }),
      new Costume("Spider3", "./Mob/costumes/Spider3.png", { x: 108, y: 50 }),
      new Costume("SpiderHurt", "./Mob/costumes/SpiderHurt.png", {
        x: 108,
        y: 50,
      }),
      new Costume("SpiderHurt2", "./Mob/costumes/SpiderHurt2.png", {
        x: 108,
        y: 50,
      }),
      new Costume("SkeletonFace", "./Mob/costumes/SkeletonFace.png", {
        x: 46,
        y: 128,
      }),
      new Costume("Skeleton4", "./Mob/costumes/Skeleton4.png", {
        x: 46,
        y: 128,
      }),
      new Costume("Skeleton3", "./Mob/costumes/Skeleton3.png", {
        x: 54,
        y: 128,
      }),
      new Costume("Skeleton2", "./Mob/costumes/Skeleton2.png", {
        x: 68,
        y: 128,
      }),
      new Costume("Skeleton1", "./Mob/costumes/Skeleton1.png", {
        x: 76,
        y: 128,
      }),
      new Costume("SkeletonFaceHurt", "./Mob/costumes/SkeletonFaceHurt.png", {
        x: 46,
        y: 128,
      }),
      new Costume("Skeleton4Hurt", "./Mob/costumes/Skeleton4Hurt.png", {
        x: 46,
        y: 128,
      }),
      new Costume("Skeleton3Hurt", "./Mob/costumes/Skeleton3Hurt.png", {
        x: 54,
        y: 128,
      }),
      new Costume("Skeleton2Hurt", "./Mob/costumes/Skeleton2Hurt.png", {
        x: 68,
        y: 128,
      }),
      new Costume("Skeleton1Hurt", "./Mob/costumes/Skeleton1Hurt.png", {
        x: 76,
        y: 128,
      }),
      new Costume("Wolf_face", "./Mob/costumes/Wolf_face.png", {
        x: 100,
        y: 62,
      }),
      new Costume("Wolf1", "./Mob/costumes/Wolf1.png", { x: 100, y: 62 }),
      new Costume("Wolf2", "./Mob/costumes/Wolf2.png", { x: 100, y: 62 }),
      new Costume("Wolf3", "./Mob/costumes/Wolf3.png", { x: 100, y: 62 }),
      new Costume("Wolf4", "./Mob/costumes/Wolf4.png", { x: 100, y: 62 }),
      new Costume("Wolf5", "./Mob/costumes/Wolf5.png", { x: 100, y: 62 }),
      new Costume("Wolf_hurt", "./Mob/costumes/Wolf_hurt.png", {
        x: 100,
        y: 62,
      }),
      new Costume("Wolf_face3", "./Mob/costumes/Wolf_face3.png", {
        x: 100,
        y: 62,
      }),
      new Costume("Wolf9", "./Mob/costumes/Wolf9.png", { x: 100, y: 62 }),
      new Costume("Wolf10", "./Mob/costumes/Wolf10.png", { x: 100, y: 62 }),
      new Costume("Wolf11", "./Mob/costumes/Wolf11.png", { x: 100, y: 62 }),
      new Costume("Wolf12", "./Mob/costumes/Wolf12.png", { x: 100, y: 62 }),
      new Costume("Wolf13", "./Mob/costumes/Wolf13.png", { x: 100, y: 62 }),
      new Costume("Wolf_hurt6", "./Mob/costumes/Wolf_hurt6.png", {
        x: 100,
        y: 62,
      }),
      new Costume("PigLook2", "./Mob/costumes/PigLook2.png", { x: 88, y: 64 }),
      new Costume("Pig14", "./Mob/costumes/Pig14.png", { x: 100, y: 64 }),
      new Costume("Pig13", "./Mob/costumes/Pig13.png", { x: 94, y: 64 }),
      new Costume("Pig12", "./Mob/costumes/Pig12.png", { x: 88, y: 64 }),
      new Costume("Pig8", "./Mob/costumes/Pig8.png", { x: 94, y: 64 }),
      new Costume("Pig9", "./Mob/costumes/Pig9.png", { x: 100, y: 64 }),
      new Costume("PigDamage", "./Mob/costumes/PigDamage.png", {
        x: 108,
        y: 64,
      }),
      new Costume(
        "Zombie_Pigman_look",
        "./Mob/costumes/Zombie_Pigman_look.png",
        { x: 34, y: 82 }
      ),
      new Costume(
        "Zombie_Pigman_walk3",
        "./Mob/costumes/Zombie_Pigman_walk3.png",
        { x: 36, y: 82 }
      ),
      new Costume(
        "Zombie_Pigman_walk2",
        "./Mob/costumes/Zombie_Pigman_walk2.png",
        { x: 42, y: 82 }
      ),
      new Costume(
        "Zombie_Pigman_walk1",
        "./Mob/costumes/Zombie_Pigman_walk1.png",
        { x: 50, y: 82 }
      ),
      new Costume(
        "Zombie_Pigman_walk0",
        "./Mob/costumes/Zombie_Pigman_walk0.png",
        { x: 54, y: 82 }
      ),
      new Costume(
        "Zombie_Pigman_look_h",
        "./Mob/costumes/Zombie_Pigman_look_h.png",
        { x: 36, y: 82 }
      ),
      new Costume(
        "Zombie_Pigman_walk3_h2",
        "./Mob/costumes/Zombie_Pigman_walk3_h2.png",
        { x: 36, y: 82 }
      ),
      new Costume(
        "Zombie_Pigman_walk2_h",
        "./Mob/costumes/Zombie_Pigman_walk2_h.png",
        { x: 42, y: 82 }
      ),
      new Costume(
        "Zombie_Pigman_walk1_h",
        "./Mob/costumes/Zombie_Pigman_walk1_h.png",
        { x: 50, y: 82 }
      ),
      new Costume(
        "Zombie_Pigman_walk0_h",
        "./Mob/costumes/Zombie_Pigman_walk0_h.png",
        { x: 54, y: 82 }
      ),
      new Costume("Villager-Face", "./Mob/costumes/Villager-Face.png", {
        x: 18,
        y: 70,
      }),
      new Costume("Villager-Walk-1", "./Mob/costumes/Villager-Walk-1.png", {
        x: 26,
        y: 70,
      }),
      new Costume("Villager-Walk-2", "./Mob/costumes/Villager-Walk-2.png", {
        x: 22,
        y: 70,
      }),
      new Costume("Villager-Walk-3", "./Mob/costumes/Villager-Walk-3.png", {
        x: 20,
        y: 70,
      }),
      new Costume("Villager-Walk-4", "./Mob/costumes/Villager-Walk-4.png", {
        x: 22,
        y: 70,
      }),
      new Costume("Villager-Walk-5", "./Mob/costumes/Villager-Walk-5.png", {
        x: 26,
        y: 70,
      }),
      new Costume(
        "Villager-Walk-1-Hurt",
        "./Mob/costumes/Villager-Walk-1-Hurt.png",
        { x: 26, y: 70 }
      ),
      new Costume("Enderman-face", "./Mob/costumes/Enderman-face.png", {
        x: 38,
        y: 100,
      }),
      new Costume("Enderman-walk-3", "./Mob/costumes/Enderman-walk-3.png", {
        x: 18,
        y: 100,
      }),
      new Costume("Enderman-walk-2", "./Mob/costumes/Enderman-walk-2.png", {
        x: 20,
        y: 100,
      }),
      new Costume("Enderman-walk-1", "./Mob/costumes/Enderman-walk-1.png", {
        x: 34,
        y: 100,
      }),
      new Costume(
        "Enderman-face-hurt",
        "./Mob/costumes/Enderman-face-hurt.png",
        { x: 38, y: 100 }
      ),
      new Costume(
        "Enderman-walk-3-hurt",
        "./Mob/costumes/Enderman-walk-3-hurt.png",
        { x: 18, y: 100 }
      ),
      new Costume(
        "Enderman-walk-2-hurt",
        "./Mob/costumes/Enderman-walk-2-hurt.png",
        { x: 20, y: 100 }
      ),
      new Costume(
        "Enderman-walk-1-hurt",
        "./Mob/costumes/Enderman-walk-1-hurt.png",
        { x: 34, y: 100 }
      ),
    ];

    this.sounds = [
      new Sound("pig1", "./Mob/sounds/pig1.wav"),
      new Sound("pig2", "./Mob/sounds/pig2.wav"),
      new Sound("pig3", "./Mob/sounds/pig3.wav"),
      new Sound("pigdeath", "./Mob/sounds/pigdeath.wav"),
      new Sound("sheep1", "./Mob/sounds/sheep1.wav"),
      new Sound("sheep2", "./Mob/sounds/sheep2.wav"),
      new Sound("sheep3", "./Mob/sounds/sheep3.wav"),
      new Sound("chicken1", "./Mob/sounds/chicken1.wav"),
      new Sound("chicken2", "./Mob/sounds/chicken2.wav"),
      new Sound("chicken3", "./Mob/sounds/chicken3.wav"),
      new Sound("chickenhurt1", "./Mob/sounds/chickenhurt1.wav"),
      new Sound("chickenhurt2", "./Mob/sounds/chickenhurt2.wav"),
      new Sound("chickenplop", "./Mob/sounds/chickenplop.wav"),
      new Sound("cow1", "./Mob/sounds/cow1.wav"),
      new Sound("cow2", "./Mob/sounds/cow2.wav"),
      new Sound("cow3", "./Mob/sounds/cow3.wav"),
      new Sound("cow4", "./Mob/sounds/cow4.wav"),
      new Sound("cowhurt1", "./Mob/sounds/cowhurt1.wav"),
      new Sound("cowhurt2", "./Mob/sounds/cowhurt2.wav"),
      new Sound("cowhurt3", "./Mob/sounds/cowhurt3.wav"),
      new Sound("zombie1", "./Mob/sounds/zombie1.wav"),
      new Sound("zombie2", "./Mob/sounds/zombie2.wav"),
      new Sound("zombie3", "./Mob/sounds/zombie3.wav"),
      new Sound("zombiehurt1", "./Mob/sounds/zombiehurt1.wav"),
      new Sound("zombiehurt2", "./Mob/sounds/zombiehurt2.wav"),
      new Sound("zombiedeath", "./Mob/sounds/zombiedeath.wav"),
      new Sound("skeleton1", "./Mob/sounds/skeleton1.wav"),
      new Sound("skeleton2", "./Mob/sounds/skeleton2.wav"),
      new Sound("skeleton3", "./Mob/sounds/skeleton3.wav"),
      new Sound("skeletonhurt1", "./Mob/sounds/skeletonhurt1.wav"),
      new Sound("skeletonhurt2", "./Mob/sounds/skeletonhurt2.wav"),
      new Sound("skeletondeath", "./Mob/sounds/skeletondeath.wav"),
      new Sound("spider1", "./Mob/sounds/spider1.wav"),
      new Sound("spider2", "./Mob/sounds/spider2.wav"),
      new Sound("spider3", "./Mob/sounds/spider3.wav"),
      new Sound("spider4", "./Mob/sounds/spider4.wav"),
      new Sound("spiderdeath", "./Mob/sounds/spiderdeath.wav"),
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Lighting Mode Change" },
        this.whenIReceiveLightingModeChange
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Reset All" },
        this.whenIReceiveResetAll
      ),
      new Trigger(Trigger.BROADCAST, { name: "init2" }, this.whenIReceiveInit2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "init1b" },
        this.whenIReceiveInit1b
      ),
    ];

    this.vars.id = -1;
    this.vars.cloneasid = 0;
    this.vars.tileidxp = 9859;
    this.vars.x = 148.5;
    this.vars.y = 59.3;
    this.vars.isblockp = 1;
    this.vars.typp = 0;
    this.vars.dirp = -1;
    this.vars.time = 0.375;
    this.vars.sy = 0;
    this.vars.choice = 21;
    this.vars.lightP = 16;
    this.vars.lightmodP = 0;
    this.vars.healthp = 4;
    this.vars.hurtingp = 0;
    this.vars.inwaterp = "N";
    this.vars.tilep = 4;
    this.vars.statep = 2;
    this.vars.halfyP = 0.3;
    this.vars.idxP = 61;
    this.vars.ofyP = 16;
    this.vars.frx = 0.19661016949163254;
    this.vars.fry = 0.8033898305083674;
    this.vars.dist = 606.2583999999993;
    this.vars.getDirection = 3;
    this.vars.refidxIv = 1;
    this.vars.tact = 0;
    this.vars.mdoff = 52;
    this.vars.allegiance = 2;
    this.vars.mobpool = [];
    this.vars.spwnIdxs = [];
  }

  *soundMob(mobtyp, soundtyp) {
    if (this.compare(this.stage.vars.Sound, 0) > 0) {
      if (this.toNumber(mobtyp) === 1) {
        if (this.toNumber(soundtyp) === 1) {
          yield* this.startSound(this.random(1, 3));
        } else {
          yield* this.startSound(4 + 0);
        }
      } else {
        if (this.toNumber(mobtyp) === 2) {
          if (this.toNumber(soundtyp) === 1) {
            yield* this.startSound(this.random(5, 7));
          } else {
            yield* this.startSound(this.random(5, 7));
          }
        } else {
          if (this.toNumber(mobtyp) === 4) {
            if (this.toNumber(soundtyp) === 1) {
              yield* this.startSound(this.random(8, 10));
            } else {
              yield* this.startSound(this.random(11, 12));
            }
          } else {
            if (this.toNumber(mobtyp) === 3) {
              if (this.toNumber(soundtyp) === 1) {
                yield* this.startSound(this.random(14, 17));
              } else {
                yield* this.startSound(this.random(18, 20));
              }
            } else {
              if (this.toNumber(mobtyp) === 100) {
                if (this.toNumber(soundtyp) === 1) {
                  yield* this.startSound(this.random(21, 23));
                } else {
                  if (this.toNumber(soundtyp) === 2) {
                    yield* this.startSound(this.random(24, 25));
                  } else {
                    yield* this.startSound(26 + 0);
                  }
                }
              } else {
                if (this.toNumber(mobtyp) === 103) {
                  if (this.toNumber(soundtyp) === 1) {
                    yield* this.startSound(this.random(27, 29));
                  } else {
                    if (this.toNumber(soundtyp) === 2) {
                      yield* this.startSound(this.random(30, 31));
                    } else {
                      yield* this.startSound(32 + 0);
                    }
                  }
                } else {
                  if (this.toNumber(mobtyp) === 102) {
                    if (this.toNumber(soundtyp) === 1) {
                      yield* this.startSound(this.random(33, 36));
                    } else {
                      if (this.toNumber(soundtyp) === 2) {
                        yield* this.startSound(this.random(33, 36));
                      } else {
                        yield* this.startSound(37 + 0);
                      }
                    }
                  } else {
                    null;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  *getmobdataoffset(mobtype) {
    if (this.compare(mobtype, 100) < 0) {
      this.vars.mdoff =
        this.toNumber(this.stage.vars.Mdmul) * this.toNumber(mobtype);
    } else {
      this.vars.mdoff =
        this.toNumber(this.stage.vars.Mdmul) * this.toNumber(mobtype) -
        this.toNumber(this.stage.vars.Mob100);
    }
  }

  *getmob100() {
    this.stage.vars.Mob100 = 1;
    while (
      !(
        100 ===
        this.toNumber(
          this.itemOf(this.stage.vars.MobData, this.stage.vars.Mob100 - 1)
        )
      )
    ) {
      this.stage.vars.Mob100 += this.toNumber(this.stage.vars.Mdmul);
      yield;
    }
    this.stage.vars.Mob100 =
      100 * this.toNumber(this.stage.vars.Mdmul) -
      this.toNumber(this.stage.vars.Mob100) +
      1;
  }

  *whenIReceiveGreenFlag() {
    this.stage.vars.Mobmul = 20;
    this.stage.vars.Mdmul = 13;
    this.vars.id = -1;
    this.vars.cloneasid = 0;
    this.vars.lightP = 16;
    this.stage.vars.Spawnarea = 45;
    yield* this.getmob100();
    yield* this.reset();
    this.size = 25;
    this.visible = false;
  }

  *knockSteveBackP(left, amount) {
    if (left) {
      this.stage.vars.Knockback += 0 - this.toNumber(amount);
    } else {
      this.stage.vars.Knockback += this.toNumber(amount);
    }
  }

  *addToMobPool(id) {
    this.vars.sy = id;
    for (let i = 0; i < this.toNumber(this.stage.vars.Mobmul); i++) {
      this.stage.vars.Mob.splice(this.vars.sy - 1, 1, 0);
      this.vars.sy++;
      yield;
    }
    this.vars.mobpool.push(id);
  }

  *shootAttack(typ) {
    if (
      this.compare(
        Math.abs(this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.X)),
        17
      ) < 0
    ) {
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + 13,
        1,
        this.toNumber(this.stage.vars.Timereal) +
          (this.random(1.1, 4.1) +
            Math.abs(
              this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.X)
            ) /
              2)
      );
      yield* this.getDirection(
        this.toNumber(this.stage.vars.X) - this.toNumber(this.vars.x),
        this.toNumber(this.stage.vars.Y) +
          Math.abs(
            this.toNumber(this.stage.vars.X) - this.toNumber(this.vars.x)
          ) /
            4.000000000232831 -
          this.toNumber(this.vars.y)
      );
      this.vars.getDirection += this.random(-10, 10);
      this.stage.vars.Harvest.push(
        this.toNumber(this.vars.x) +
          0.9 * Math.sin(this.degToRad(this.toNumber(this.vars.getDirection)))
      );
      this.stage.vars.Harvest.push(
        this.toNumber(this.vars.y) +
          0.3 +
          0.9 * Math.cos(this.degToRad(this.toNumber(this.vars.getDirection)))
      );
      this.stage.vars.Harvest.push(132);
      this.stage.vars.Harvest.push(1);
      this.vars.sy = 2.2;
      this.stage.vars.Harvest.push(
        this.toNumber(this.vars.sy) *
          0.3 *
          Math.sin(this.degToRad(this.toNumber(this.vars.getDirection)))
      );
      this.stage.vars.Harvest.push(
        this.toNumber(this.vars.sy) *
          0.3 *
          Math.cos(this.degToRad(this.toNumber(this.vars.getDirection)))
      );
    }
  }

  *getDirection(dx, dy) {
    if (this.toNumber(dy) === 0) {
      if (this.compare(dx, 0) > 0) {
        this.vars.getDirection = 90;
      } else {
        this.vars.getDirection = -90;
      }
    } else {
      this.vars.getDirection = this.radToDeg(
        Math.atan(this.toNumber(dx) / this.toNumber(dy))
      );
      if (this.compare(dy, 0) < 0) {
        if (this.compare(dx, 0) > 0) {
          this.vars.getDirection += 180;
        } else {
          if (this.compare(dx, 0) < 0) {
            this.vars.getDirection -= 180;
          } else {
            this.vars.getDirection = 180;
          }
        }
      }
    }
  }

  *activateTileIv(idx, mode, force, data) {
    this.vars.refidxIv = this.itemOf(this.stage.vars.Levelref, idx - 1);
    if (this.toString(mode) === "r" && !force) {
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

  *updateCostumePassive(root, walks, speed) {
    if (this.compare(this.vars.hurtingp, this.stage.vars.Timereal) < 0) {
      if (this.toNumber(this.vars.statep) === 0) {
        yield* this.setCostume(root);
      } else {
        if (this.toNumber(this.vars.statep) === 1) {
          yield* this.setCostume(
            this.toNumber(root) + Math.round(this.toNumber(walks) / 2)
          );
        } else {
          if (
            this.compare(
              this.itemOf(
                this.stage.vars.Mob,
                this.toNumber(this.vars.cloneasid) + 10
              ),
              this.stage.vars.Timereal
            ) > 0
          ) {
            yield* this.setCostume(
              this.toNumber(root) +
                1 +
                Math.abs(
                  ((this.toNumber(this.stage.vars.Timereal) *
                    (this.toNumber(speed) * 1.5)) %
                    (this.toNumber(walks) * 2 - 2)) -
                    (this.toNumber(walks) - 1)
                )
            );
          } else {
            yield* this.setCostume(
              this.toNumber(root) +
                1 +
                Math.abs(
                  ((this.toNumber(this.stage.vars.Timereal) *
                    this.toNumber(speed)) %
                    (this.toNumber(walks) * 2 - 2)) -
                    (this.toNumber(walks) - 1)
                )
            );
          }
        }
      }
    } else {
      yield* this.setCostume(this.toNumber(root) + (this.toNumber(walks) + 1));
    }
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

  *deleteMob(modid) {
    if (this.compare(this.itemOf(this.stage.vars.Mob, modid - 1), 0) > 0) {
      if (
        this.toNumber(
          this.itemOf(this.stage.vars.Mob, this.toNumber(modid) + 16)
        ) === 0
      ) {
        if (
          this.compare(this.itemOf(this.stage.vars.Mob, modid - 1), 100) < 0
        ) {
          this.stage.vars.Maxmobs++;
        } else {
          this.stage.vars.Maxmobsbad++;
        }
      }
      this.stage.vars.Mob.splice(modid - 1, 1, -1);
    }
  }

  *getIlluminationPApply(idx, light, apply) {
    if (this.toNumber(this.stage.vars.Xray) === 0 || !apply) {
      this.vars.lightP =
        this.toNumber(this.itemOf(this.stage.vars.Light, idx - 1)) -
        this.toNumber(this.stage.vars.Glight);
      this.vars.lightmodP = this.itemOf(
        this.stage.vars.Light,
        this.toNumber(idx) + this.stage.vars.Level.length - 1
      );
      if (this.compare(this.vars.lightmodP, this.vars.lightP) > 0) {
        this.vars.lightP = this.vars.lightmodP;
      }
    } else {
      this.vars.lightP = 15;
    }
    if (apply) {
      if (this.toNumber(this.stage.vars.Lighting) === 1) {
        if (!(this.compare(this.vars.lightP, light) === 0)) {
          this.effects.brightness = this.toNumber(
            this.itemOf(this.stage.vars.Gamma, this.toNumber(this.vars.lightP))
          );
        }
      } else {
        if (this.toNumber(this.vars.lightP) === 0) {
          this.visible = false;
        }
      }
    }
  }

  *drawMob() {
    if (
      this.compare(
        this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.id) + -1),
        1
      ) < 0
    ) {
      this.stage.vars.Mob.splice(this.toNumber(this.vars.id), 1, 0);
      this.stage.vars.Spritecount--;
      this.deleteThisClone();
    } else {
      if (
        !(
          this.compare(
            this.itemOf(
              this.stage.vars.Mob,
              this.toNumber(this.vars.cloneasid) + -1
            ),
            this.vars.typp
          ) === 0
        )
      ) {
        this.vars.typp = this.itemOf(
          this.stage.vars.Mob,
          this.toNumber(this.vars.cloneasid) + -1
        );
        yield* this.getmobdataoffset(this.vars.typp);
      }
      this.vars.x = Math.floor(
        (this.toNumber(
          this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.id) + 2)
        ) -
          this.toNumber(this.stage.vars.Scrx)) *
          40
      );
      this.vars.y = Math.floor(
        this.toNumber(this.vars.ofyP) +
          (this.toNumber(
            this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.id) + 3)
          ) -
            this.toNumber(this.stage.vars.Scry)) *
            40
      );
      this.vars.inwaterp = this.itemOf(
        this.stage.vars.Mob,
        this.toNumber(this.vars.id) + 12
      );
      if (
        this.toString(this.vars.inwaterp) === "." ||
        this.toString(this.vars.inwaterp) === "D"
      ) {
        this.vars.y += Math.round(
          24 +
            Math.sin(
              this.degToRad(
                this.toNumber(this.stage.vars.Timereal) * 360 +
                  this.toNumber(this.vars.id)
              )
            ) *
              4
        );
      }
      if (
        this.toNumber(this.vars.typp) === 101 &&
        this.compare(
          this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.id) + 13),
          0
        ) > 0
      ) {
        this.vars.y += this.random(-1, 2);
        this.vars.x += this.random(-1, 1);
      }
      if (
        this.compare(Math.abs(this.toNumber(this.vars.x)), 340) > 0 ||
        this.compare(Math.abs(this.toNumber(this.vars.y)), 240) > 0
      ) {
        this.stage.vars.Mob.splice(this.toNumber(this.vars.id), 1, 0);
        if (this.compare(this.vars.typp, 99) > 0) {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.id) + 14,
            1,
            this.toNumber(this.stage.vars.Timereal) + 20
          );
        }
        this.stage.vars.Spritecount--;
        this.deleteThisClone();
      } else {
        this.goto(this.toNumber(this.vars.x), this.toNumber(this.vars.y));
        if (
          this.compare(this.vars.x, this.x) === 0 &&
          this.compare(this.vars.y, this.y) === 0
        ) {
          this.visible = true;
          yield* this.updateCostume();
        } else {
          this.visible = false;
        }
        if (
          this.compare(
            this.random(
              0,
              Math.round(160 / this.toNumber(this.stage.vars.Ticks))
            ),
            1
          ) < 0
        ) {
          yield* this.soundMob(this.vars.typp, 1);
        }
      }
    }
  }

  *updateCostume() {
    if (
      !(
        this.compare(
          this.direction,
          90 *
            this.toNumber(
              this.itemOf(
                this.stage.vars.Mob,
                this.toNumber(this.vars.cloneasid) + 4
              )
            )
        ) === 0
      )
    ) {
      this.direction =
        90 *
        this.toNumber(
          this.itemOf(
            this.stage.vars.Mob,
            this.toNumber(this.vars.cloneasid) + 4
          )
        );
    }
    if (
      !(
        this.compare(
          this.itemOf(
            this.stage.vars.Mob,
            this.toNumber(this.vars.cloneasid) + 9
          ),
          this.vars.healthp
        ) === 0
      )
    ) {
      this.vars.healthp = this.itemOf(
        this.stage.vars.Mob,
        this.toNumber(this.vars.cloneasid) + 9
      );
      this.vars.hurtingp = this.toNumber(this.stage.vars.Timereal) + 0.4;
    }
    this.vars.typp = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + -1
    );
    this.vars.statep = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + 5
    );
    if (
      this.toNumber(
        this.itemOf(
          this.stage.vars.MobData,
          this.toNumber(this.vars.mdoff) + 11
        )
      ) === 0
    ) {
      yield* this.updateCostumePassive(
        this.itemOf(
          this.stage.vars.MobData,
          this.toNumber(this.vars.mdoff) + 5
        ),
        this.itemOf(
          this.stage.vars.MobData,
          this.toNumber(this.vars.mdoff) + 6
        ),
        this.itemOf(this.stage.vars.MobData, this.toNumber(this.vars.mdoff) + 7)
      );
    } else {
      this.vars.choice = this.itemOf(
        this.stage.vars.MobData,
        this.toNumber(this.vars.mdoff) + 5
      );
      this.vars.dist = this.itemOf(
        this.stage.vars.MobData,
        this.toNumber(this.vars.mdoff) + 6
      );
      if (this.compare(this.vars.hurtingp, this.stage.vars.Timereal) > 0) {
        this.vars.choice += this.toNumber(this.vars.dist) + 1;
      }
      if (this.toNumber(this.vars.statep) === 0) {
        yield* this.setCostume(0 + this.toNumber(this.vars.choice));
      } else {
        this.vars.choice++;
        if (this.toNumber(this.vars.statep) === 1) {
          yield* this.setCostume(this.vars.choice);
        } else {
          this.vars.dist--;
          yield* this.setCostume(
            this.toNumber(this.vars.choice) +
              Math.abs(
                ((this.toNumber(this.stage.vars.Timereal) * 6) %
                  (this.toNumber(this.vars.dist) * 2)) -
                  this.toNumber(this.vars.dist)
              )
          );
        }
      }
    }
    yield* this.getIlluminationPApply(
      this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.cloneasid) + 1),
      this.vars.lightP,
      !null
    );
  }

  *attack(typ) {
    if (
      this.compare(typ, 99) > 0 &&
      this.compare(
        this.itemOf(
          this.stage.vars.Mob,
          this.toNumber(this.vars.cloneasid) + 10
        ),
        this.stage.vars.Timereal
      ) > 0
    ) {
      this.vars.time = this.itemOf(
        this.stage.vars.Mob,
        this.toNumber(this.vars.cloneasid) + 13
      );
      if (this.toNumber(typ) === 103) {
        if (this.compare(this.stage.vars.Timereal, this.vars.time) > 0) {
          yield* this.shootAttack(typ);
        }
      } else {
        if (this.toNumber(typ) === 101) {
          if (this.toNumber(this.vars.time) === 0) {
            if (
              this.compare(
                Math.abs(
                  this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.X)
                ),
                1.5
              ) < 0 &&
              this.compare(
                Math.abs(
                  this.toNumber(this.vars.y) - this.toNumber(this.stage.vars.Y)
                ),
                1.8
              ) < 0
            ) {
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 13,
                1,
                this.toNumber(this.stage.vars.Timereal) + 1.5
              );
            }
          } else {
            if (
              this.compare(
                Math.abs(
                  this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.X)
                ),
                5
              ) > 0 ||
              this.compare(
                Math.abs(
                  this.toNumber(this.vars.y) - this.toNumber(this.stage.vars.Y)
                ),
                4
              ) > 0
            ) {
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 13,
                1,
                0
              );
            } else {
              if (this.compare(this.vars.time, this.stage.vars.Timereal) < 0) {
                this.stage.vars.Explode.push(
                  this.itemOf(
                    this.stage.vars.Mob,
                    this.toNumber(this.vars.cloneasid) + 1
                  )
                );
                this.stage.vars.Explode.push(3);
                this.stage.vars.Mob.splice(
                  this.toNumber(this.vars.cloneasid) + 13,
                  1,
                  0
                );
                this.stage.vars.Mob.splice(
                  this.toNumber(this.vars.cloneasid) + 9,
                  1,
                  0
                );
              }
            }
          }
        } else {
          if (this.compare(typ, 99) > 0) {
            if (
              this.toNumber(typ) === 102 &&
              this.compare(
                this.stage.vars.Timereal,
                this.itemOf(
                  this.stage.vars.Mob,
                  this.toNumber(this.vars.cloneasid) + 10
                )
              ) > 0
            ) {
              this.vars.time = 99999999;
            }
            if (this.compare(this.stage.vars.Timereal, this.vars.time) > 0) {
              if (
                this.compare(
                  Math.abs(
                    this.toNumber(this.vars.x) -
                      this.toNumber(this.stage.vars.X)
                  ),
                  1.4
                ) < 0 &&
                this.compare(
                  Math.abs(
                    this.toNumber(this.vars.y) -
                      this.toNumber(this.stage.vars.Y)
                  ),
                  1.8
                ) < 0
              ) {
                this.vars.healthp = this.itemOf(
                  this.stage.vars.Mob,
                  this.toNumber(this.vars.cloneasid) + 9
                );
                this.stage.vars.Mob.splice(
                  this.toNumber(this.vars.cloneasid) + 13,
                  1,
                  this.toNumber(this.stage.vars.Timereal) + 1.5
                );
                this.stage.vars.HealthS += Math.floor(
                  -3 * this.toNumber(this.stage.vars.Defensemul)
                );
                this.stage.vars.Damagearmor++;
                this.vars.dist++;
                this.broadcast("Update Health");
                yield* this.knockSteveBackP(
                  this.compare(this.stage.vars.X, this.vars.x) < 0,
                  0.18
                );
              }
            }
          } else {
            null;
          }
        }
      }
    }
    if (
      this.toNumber(typ) === 100 ||
      this.toNumber(typ) === 103 ||
      this.toNumber(typ) === 102
    ) {
      if (
        this.compare(this.stage.vars.Glight, 6) < 0 &&
        this.compare(
          this.itemOf(
            this.stage.vars.Light,
            this.itemOf(
              this.stage.vars.Mob,
              this.toNumber(this.vars.cloneasid) + 1
            ) - 1
          ),
          13
        ) > 0
      ) {
        if (this.toNumber(typ) === 100 || this.toNumber(typ) === 103) {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 8,
            1,
            1
          );
        }
      } else {
        if (
          this.toNumber(typ) === 102 &&
          this.compare(this.stage.vars.Creative, 1) < 0
        ) {
          if (
            this.compare(
              Math.abs(
                this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.X)
              ),
              11
            ) < 0 &&
            this.compare(
              Math.abs(
                this.toNumber(this.vars.y) - this.toNumber(this.stage.vars.Y)
              ),
              8
            ) < 0
          ) {
            this.stage.vars.Mob.splice(
              this.toNumber(this.vars.cloneasid) + 10,
              1,
              this.toNumber(this.stage.vars.Timereal) + 30
            );
          }
        }
      }
    }
  }

  *getXYP(tileidx) {
    this.vars.y = Math.floor(
      (this.toNumber(tileidx) - 1) / this.toNumber(this.stage.vars.Lsx)
    );
    this.vars.x =
      (this.toNumber(tileidx) - 1) % this.toNumber(this.stage.vars.Lsx);
  }

  *startAsClone() {
    this.stage.vars.Spritecount++;
    this.vars.healthp = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + 9
    );
    this.vars.hurtingp = 0;
    this.vars.typp = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + -1
    );
    this.vars.lightP = -1;
    this.vars.ofyP = 0;
    yield* this.getHalfHeight(this.vars.typp);
    this.size = this.toNumber(
      this.itemOf(this.stage.vars.MobData, this.toNumber(this.vars.mdoff) + 2)
    );
    this.vars.ofyP = this.itemOf(
      this.stage.vars.MobData,
      this.toNumber(this.vars.mdoff) + 4
    );
  }

  *mobDamaged() {
    if (
      this.compare(
        this.itemOf(
          this.stage.vars.Mob,
          this.toNumber(this.vars.cloneasid) + 11
        ),
        this.stage.vars.Timereal
      ) > 0
    ) {
      return;
    }
    this.vars.healthp = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + 9
    );
    if (this.compare(this.vars.healthp, 1) < 0) {
      return;
    }
    this.vars.healthp =
      this.toNumber(this.vars.healthp) -
      this.toNumber(
        this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.cloneasid) + 8)
      );
    this.vars.typp = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + -1
    );
    if (this.compare(this.vars.healthp, 1) < 0) {
      yield* this.deathHarvest(
        this.vars.cloneasid,
        this.compare(this.vars.healthp, -20) < 0
      );
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + 11,
        1,
        this.toNumber(this.stage.vars.Timereal) + 0.3
      );
      this.vars.typp = this.itemOf(
        this.stage.vars.Mob,
        this.toNumber(this.vars.cloneasid) + -1
      );
      yield* this.soundMob(this.vars.typp, 3);
    } else {
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + 11,
        1,
        this.toNumber(this.stage.vars.Timereal) + 0.8
      );
      yield* this.soundMob(this.vars.typp, 2);
    }
    this.stage.vars.Mob.splice(
      this.toNumber(this.vars.cloneasid) + 9,
      1,
      this.vars.healthp
    );
    this.stage.vars.Mob.splice(this.toNumber(this.vars.cloneasid) + 8, 1, 0);
    if (this.toNumber(this.vars.typp) === 5) {
      this.vars.typp = 104;
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + -1,
        1,
        this.vars.typp
      );
    }
    if (this.toNumber(this.vars.typp) === 105) {
      this.vars.typp = 106;
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + -1,
        1,
        this.vars.typp
      );
    }
    if (this.compare(this.vars.typp, 100) < 0) {
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + 10,
        1,
        this.toNumber(this.stage.vars.Timereal) + 5
      );
      this.vars.statep = this.itemOf(
        this.stage.vars.Mob,
        this.toNumber(this.vars.cloneasid) + 5
      );
      if (this.compare(this.vars.statep, 2) < 0) {
        yield* this.decideNextMove(0, 0, 1);
        this.vars.statep = this.itemOf(
          this.stage.vars.Mob,
          this.toNumber(this.vars.cloneasid) + 5
        );
      }
      if (this.toNumber(this.vars.statep) === 2) {
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 7,
          1,
          0.15
        );
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 5,
          1,
          3
        );
      }
    } else {
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + 10,
        1,
        this.toNumber(this.stage.vars.Timereal) + 15
      );
      if (
        this.toNumber(this.vars.typp) === 107 &&
        this.compare(this.vars.healthp, 0) > 0
      ) {
        yield* this.findSpawnZone(0, !null, !null);
        if (this.compare(this.vars.tileidxp, 0) > 0) {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 1,
            1,
            this.vars.tileidxp
          );
        } else {
          this.vars.tileidxp = this.itemOf(
            this.stage.vars.Mob,
            this.toNumber(this.vars.cloneasid) + 1
          );
        }
        yield* this.getXYP(this.vars.tileidxp);
        this.vars.x += 0.5;
        this.vars.y += this.toNumber(this.vars.halfyP);
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 2,
          1,
          this.vars.x
        );
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 3,
          1,
          this.vars.y
        );
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 5,
          1,
          0
        );
      }
    }
  }

  *getHalfHeight(typ) {
    yield* this.getmobdataoffset(typ);
    this.vars.halfyP = this.itemOf(
      this.stage.vars.MobData,
      this.toNumber(this.vars.mdoff) + 3
    );
  }

  *whenIReceiveAnimate() {
    if (this.compare(this.vars.id, 0) > 0) {
      yield* this.drawMob();
    } else {
      if (
        this.compare(this.stage.vars.Timereal, this.stage.vars.Nextspawn) > 0
      ) {
        if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
          this.stage.vars.Nextspawn =
            this.toNumber(this.stage.vars.Timereal) + 1;
          if (this.compare(this.random(1, 10), 7) > 0) {
            if (this.compare(this.random(1, 15), 1) > 0) {
              yield* this.initialSpawn(this.random(1, 4));
            } else {
              yield* this.initialSpawn(5);
            }
          } else {
            if (this.compare(this.stage.vars.Survival, 0) > 0) {
              this.vars.choice = this.random(1, 100);
              if (this.compare(this.vars.choice, 45) < 0) {
                yield* this.initialSpawn(100);
              } else {
                if (this.compare(this.vars.choice, 65) < 0) {
                  yield* this.initialSpawn(103);
                } else {
                  if (this.compare(this.vars.choice, 78) < 0) {
                    yield* this.initialSpawn(101);
                  } else {
                    if (this.compare(this.vars.choice, 92) < 0) {
                      yield* this.initialSpawn(102);
                    } else {
                      yield* this.initialSpawn(107);
                    }
                  }
                }
              }
            }
          }
        } else {
          yield* this.initialSpawn(105);
        }
      }
      yield* this.checkMobSpawers();
      yield* this.processMobs();
    }
  }

  *reset() {
    this.vars.mobpool = [];
    this.stage.vars.Mobspawn = [];
    this.stage.vars.Mob = [];
    this.stage.vars.Nextspawn = 0;
    this.stage.vars.Maxmobs = 10;
    this.stage.vars.Maxmobsbad = 5;
  }

  *whenIReceiveLightingModeChange() {
    if (this.toNumber(this.stage.vars.Lighting) === 1) {
      this.vars.lightP = -1;
    } else {
      this.effects.brightness = 0;
    }
  }

  *whenIReceiveResetAll() {
    if (this.compare(this.vars.id, 0) > 0) {
      this.deleteThisClone();
    } else {
      yield* this.reset();
    }
  }

  *spawnALoadOfMobs() {
    if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
      for (let i = 0; i < 4; i++) {
        yield* this.initialSpawn(this.random(1, 4));
        yield;
      }
    }
  }

  *setCostume(costumeid) {
    if (!(this.compare(costumeid, this.costumeNumber) === 0)) {
      this.costume = costumeid;
    }
  }

  *addNewMob() {
    this.vars.idxP = this.stage.vars.Mob.length + 1;
    for (let i = 0; i < this.toNumber(this.stage.vars.Mobmul); i++) {
      this.stage.vars.Mob.push(0);
      yield;
    }
  }

  *processMob() {
    yield* this.getHalfHeight(this.vars.typp);
    this.vars.x = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + 2
    );
    this.vars.y = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + 3
    );
    this.vars.tact = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + 16
    );
    if (
      this.compare(this.vars.tact, 0) > 0 &&
      this.compare(
        this.itemOf(
          this.stage.vars.MobData,
          this.toNumber(this.vars.mdoff) + 10
        ),
        0
      ) > 0
    ) {
      if (
        this.compare(
          Math.abs(
            this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.X)
          ),
          20
        ) > 0
      ) {
        if (
          this.compare(
            Math.abs(
              this.toNumber(this.vars.y) - this.toNumber(this.stage.vars.Y)
            ),
            15
          ) > 0
        ) {
          return;
        }
      }
    }
    this.vars.healthp = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + 9
    );
    if (
      this.compare(
        this.itemOf(
          this.stage.vars.Mob,
          this.toNumber(this.vars.cloneasid) + 8
        ),
        0
      ) > 0
    ) {
      yield* this.mobDamaged();
    }
    if (this.compare(this.vars.healthp, 1) < 0) {
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + 3,
        1,
        this.toNumber(this.vars.y) - 0.02
      );
      if (
        this.compare(
          this.itemOf(
            this.stage.vars.Mob,
            this.toNumber(this.vars.cloneasid) + 11
          ),
          this.stage.vars.Timereal
        ) < 0
      ) {
        yield* this.deleteMob(this.vars.cloneasid);
        return;
      }
    }
    if (
      this.toNumber(this.vars.tact) === 0 &&
      this.compare(
        Math.abs(this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.X)),
        this.stage.vars.Spawnarea
      ) > 0
    ) {
      if (this.compare(this.vars.typp, 99) > 0) {
        yield* this.deleteMob(this.vars.cloneasid);
      }
    } else {
      if (
        this.toNumber(this.vars.tact) === 0 &&
        this.compare(this.vars.typp, 99) > 0 &&
        this.compare(
          this.itemOf(
            this.stage.vars.Mob,
            this.toNumber(this.vars.cloneasid) + 14
          ),
          this.stage.vars.Timereal
        ) < 0 &&
        this.random(1, 15) === 5
      ) {
        yield* this.deleteMob(this.vars.cloneasid);
      } else {
        if (
          0 ===
          this.toNumber(
            this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.cloneasid))
          )
        ) {
          if (
            this.compare(
              Math.abs(
                this.toNumber(this.stage.vars.Scrx) - this.toNumber(this.vars.x)
              ),
              7
            ) < 0 &&
            this.compare(
              Math.abs(
                this.toNumber(this.stage.vars.Scry) - this.toNumber(this.vars.y)
              ),
              6
            ) < 0
          ) {
            this.stage.vars.Mob.splice(
              this.toNumber(this.vars.cloneasid),
              1,
              1
            );
            this.stage.vars.Mob.splice(
              this.toNumber(this.vars.cloneasid) + 14,
              1,
              999999999
            );
            this.vars.id = this.vars.cloneasid;
            this.createClone();
            this.vars.id = -1;
          }
        }
        if (this.compare(this.vars.healthp, 0) > 0) {
          yield* this.movePig(this.vars.typp);
          if (
            this.compare(
              this.itemOf(
                this.stage.vars.Mob,
                this.toNumber(this.vars.cloneasid) + 8
              ),
              0
            ) > 0
          ) {
            yield* this.mobDamaged();
          } else {
            yield* this.attack(this.vars.typp);
          }
        }
      }
    }
  }

  *isBlockP(tile, or) {
    if (
      this.toString(
        this.itemOf(
          this.vars.undefined,
          this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 2
        )
      ) === "Y"
    ) {
      this.vars.isblockp = 1;
    } else {
      if (!or) {
        this.vars.isblockp = 0;
      }
    }
  }

  *processMobs() {
    this.vars.cloneasid = 1;
    this.stage.vars.mobcount = 0;
    while (
      !(this.compare(this.vars.cloneasid, this.stage.vars.Mob.length) > 0)
    ) {
      this.vars.typp = this.itemOf(
        this.stage.vars.Mob,
        this.toNumber(this.vars.cloneasid) + -1
      );
      if (this.compare(this.vars.typp, 0) > 0) {
        this.stage.vars.mobcount++;
        for (let i = 0; i < this.toNumber(this.stage.vars.Ticks); i++) {
          yield* this.processMob();
          yield;
        }
      } else {
        if (
          this.toNumber(this.vars.typp) === -1 &&
          this.toNumber(
            this.itemOf(this.stage.vars.Mob, this.toNumber(this.vars.cloneasid))
          ) === 0
        ) {
          yield* this.addToMobPool(this.vars.cloneasid);
        }
      }
      this.vars.cloneasid += this.toNumber(this.stage.vars.Mobmul);
      yield;
    }
  }

  *movePig(typ) {
    this.vars.statep = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + 5
    );
    if (this.toNumber(this.vars.statep) === 4) {
      this.vars.sy = this.itemOf(
        this.stage.vars.Mob,
        this.toNumber(this.vars.cloneasid) + 7
      );
      this.vars.time = this.itemOf(
        this.stage.vars.Mob,
        this.toNumber(this.vars.cloneasid) + 6
      );
      this.vars.sy -= 0.02;
      if (this.compare(this.vars.sy, -0.4) < 0) {
        this.vars.sy = -0.4;
      }
      this.vars.y += this.toNumber(this.vars.sy);
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + 3,
        1,
        this.vars.y
      );
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + 7,
        1,
        this.vars.sy
      );
      if (
        this.compare(this.vars.y, this.vars.time) < 0 &&
        !(this.compare(this.vars.sy, 0) > 0)
      ) {
        yield* this.decideNextMove(0, !null, typ);
      }
    } else {
      this.vars.dirp = this.itemOf(
        this.stage.vars.Mob,
        this.toNumber(this.vars.cloneasid) + 4
      );
      this.vars.time = this.itemOf(
        this.stage.vars.Mob,
        this.toNumber(this.vars.cloneasid) + 6
      );
      if (
        this.compare(typ, 99) > 0 &&
        !(
          0 ===
          this.toNumber(
            this.itemOf(
              this.stage.vars.Mob,
              this.toNumber(this.vars.cloneasid) + 17
            )
          )
        )
      ) {
        if (this.compare(this.vars.statep, 2) < 0) {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 5,
            1,
            2
          );
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 6,
            1,
            0
          );
          this.vars.time = 0;
          this.vars.statep = 2;
        }
        if (this.toNumber(this.vars.statep) === 2) {
          if (
            this.compare(
              (this.toNumber(
                this.itemOf(
                  this.stage.vars.Mob,
                  this.toNumber(this.vars.cloneasid) + 3
                )
              ) -
                this.toNumber(this.vars.halfyP) +
                0.0001) %
                1,
              0.0002
            ) < 0
          ) {
            if (
              this.toNumber(
                this.itemOf(
                  this.stage.vars.Mob,
                  this.toNumber(this.vars.cloneasid) + 7
                )
              ) === 0
            ) {
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 7,
                1,
                0.08
              );
            }
          }
          this.vars.x +=
            this.toNumber(
              this.itemOf(
                this.stage.vars.Mob,
                this.toNumber(this.vars.cloneasid) + 17
              )
            ) * 0.041666666666666664;
          if (
            this.compare(
              this.vars.dirp,
              this.itemOf(
                this.stage.vars.Mob,
                this.toNumber(this.vars.cloneasid) + 17
              )
            ) === 0
          ) {
            this.vars.time -= 0.041666666666666664;
          } else {
            this.vars.time += 0.041666666666666664;
          }
          this.vars.statep = 3.5;
        } else {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 17,
            1,
            0
          );
        }
      }
      if (this.compare(this.vars.statep, 2) < 0) {
        this.vars.tileidxp = this.itemOf(
          this.stage.vars.Mob,
          this.toNumber(this.vars.cloneasid) + 1
        );
        yield* this.isBlockP(
          this.itemOf(
            this.stage.vars.Level,
            this.toNumber(this.vars.tileidxp) -
              this.toNumber(this.stage.vars.Lsx) -
              1
          ),
          0
        );
        if (
          this.compare(
            this.itemOf(
              this.stage.vars.Mob,
              this.toNumber(this.vars.cloneasid) + 6
            ),
            this.stage.vars.Timereal
          ) < 0
        ) {
          yield* this.decideNextMove(0, 0, typ);
        } else {
          if (this.toNumber(this.vars.isblockp) === 0) {
            this.vars.inwaterp = this.itemOf(
              this.stage.vars.Mob,
              this.toNumber(this.vars.cloneasid) + 12
            );
            if (
              !(
                this.toString(this.vars.inwaterp) === "." ||
                this.toString(this.vars.inwaterp) === "D"
              )
            ) {
              yield* this.decideNextMove(0, 0, typ);
            }
          }
        }
      } else {
        if (this.compare(typ, 100) < 0) {
          this.vars.x += this.toNumber(this.vars.dirp) * 0.03125;
          this.vars.time -= 0.03125;
          if (
            this.compare(
              this.itemOf(
                this.stage.vars.Mob,
                this.toNumber(this.vars.cloneasid) + 10
              ),
              this.stage.vars.Timereal
            ) > 0
          ) {
            if (this.compare(this.vars.time, 0) > 0) {
              this.vars.x += this.toNumber(this.vars.dirp) * 0.03125;
              this.vars.time -= 0.03125;
            }
          }
        } else {
          if (!(this.toNumber(this.vars.statep) === 3.5)) {
            if (this.toNumber(typ) === 104 || this.toNumber(typ) === 106) {
              this.vars.x += this.toNumber(this.vars.dirp) * 0.0625;
              this.vars.time -= 0.0625;
            } else {
              this.vars.x +=
                this.toNumber(this.vars.dirp) * 0.020833333333333332;
              this.vars.time -= 0.020833333333333332;
            }
          }
        }
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 2,
          1,
          this.vars.x
        );
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 6,
          1,
          this.vars.time
        );
        if (Math.floor(this.toNumber(this.vars.statep)) === 3) {
          this.vars.y = this.itemOf(
            this.stage.vars.Mob,
            this.toNumber(this.vars.cloneasid) + 3
          );
          this.vars.sy = this.itemOf(
            this.stage.vars.Mob,
            this.toNumber(this.vars.cloneasid) + 7
          );
          this.vars.sy -= 0.02;
          this.vars.y += this.toNumber(this.vars.sy);
          if (this.compare(this.vars.sy, 0) < 0) {
            if (
              this.compare(
                (this.toNumber(this.vars.y) - this.toNumber(this.vars.halfyP)) %
                  1,
                0.5
              ) > 0 &&
              this.compare(
                (this.toNumber(this.vars.y) -
                  this.toNumber(this.vars.halfyP) -
                  this.toNumber(this.vars.sy)) %
                  1,
                0.5
              ) < 0
            ) {
              this.vars.y =
                Math.floor(
                  this.toNumber(this.vars.y) - this.toNumber(this.vars.halfyP)
                ) +
                this.toNumber(this.vars.halfyP) +
                1;
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 5,
                1,
                2
              );
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 17,
                1,
                0
              );
              this.vars.sy = 0;
            }
          }
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 3,
            1,
            this.vars.y
          );
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 7,
            1,
            this.vars.sy
          );
        }
        if (!(this.compare(this.vars.time, 0) > 0)) {
          yield* this.decideNextMove(!null, 0, typ);
        }
      }
    }
  }

  *whenIReceiveInit2() {
    if (
      this.compare(this.vars.id, 1) < 0 &&
      0 === this.stage.vars.Mobspawn.length
    ) {
      yield* this.spawnALoadOfMobs();
    }
  }

  *initialSpawn(typ) {
    if (this.compare(typ, 100) < 0) {
      if (this.compare(this.stage.vars.Maxmobs, 1) < 0) {
        return;
      }
    } else {
      if (this.compare(this.stage.vars.Biomeid, 1000) < 0) {
        if (this.compare(this.stage.vars.Maxmobsbad, 1) < 0) {
          return;
        }
      } else {
        if (this.compare(this.stage.vars.Maxmobsbad, -6) < 0) {
          return;
        }
      }
    }
    this.vars.allegiance = 1;
    yield* this.findSpawnZone(
      this.compare(typ, 100) < 0,
      this.compare(typ, 99) > 0,
      0
    );
    yield* this.spawnMobAtUserSpawnHome(typ, this.vars.tileidxp, 0, 0);
  }

  *canSeeSteve(x, y, tileidx) {
    if (this.compare(this.vars.halfyP, 0.5) > 0) {
      this.vars.y += 0.4;
    }
    this.vars.dist =
      (Math.abs(this.toNumber(this.stage.vars.X) - this.toNumber(this.vars.x)) +
        Math.abs(
          this.toNumber(this.stage.vars.Y) + 0.3 - this.toNumber(this.vars.y)
        )) *
      1;
    this.vars.frx =
      (this.toNumber(this.stage.vars.X) - this.toNumber(this.vars.x)) /
      this.toNumber(this.vars.dist);
    this.vars.fry =
      (this.toNumber(this.stage.vars.Y) + 0.3 - this.toNumber(this.vars.y)) /
      this.toNumber(this.vars.dist);
    while (!(this.compare(this.vars.dist, 1) < 0)) {
      this.vars.x += this.toNumber(this.vars.frx);
      this.vars.y += this.toNumber(this.vars.fry);
      this.vars.tileidxp =
        Math.floor(this.toNumber(this.vars.y)) *
          this.toNumber(this.stage.vars.Lsx) +
        Math.floor(this.toNumber(this.vars.x)) +
        1;
      if (
        this.compare(
          this.itemOf(
            this.vars.undefined,
            this.toNumber(
              this.itemOf(this.stage.vars.Level, this.vars.tileidxp - 1)
            ) *
              this.toNumber(this.stage.vars.Dmul) +
              8
          ),
          0
        ) > 0
      ) {
        if (
          this.toString(
            this.itemOf(
              this.vars.undefined,
              this.toNumber(
                this.itemOf(this.stage.vars.Level, this.vars.tileidxp - 1)
              ) *
                this.toNumber(this.stage.vars.Dmul) +
                2
            )
          ) === "Y"
        ) {
          this.vars.tileidxp = tileidx;
          this.vars.dist = -999;
        }
      }
      this.vars.dist--;
      yield;
    }
    if (this.compare(this.vars.dist, -99) > 0) {
      this.vars.tileidxp = tileidx;
      this.vars.choice = 99;
    }
    this.vars.x = x;
    this.vars.y = y;
  }

  *followSteve(typ) {
    if (this.toNumber(this.vars.allegiance) === 0) {
      if (
        this.compare(
          Math.abs(
            this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.X)
          ),
          this.random(4, 8)
        ) > 0
      ) {
        if (
          this.compare(
            Math.abs(
              this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.X)
            ),
            16
          ) > 0 &&
          this.random(1, 3) === 1
        ) {
          yield* this.findSpawnZone(!null, 0, 0);
          if (this.compare(this.vars.tileidxp, 0) > 0) {
            this.stage.vars.Mob.splice(
              this.toNumber(this.vars.cloneasid) + 1,
              1,
              this.vars.tileidxp
            );
          } else {
            this.vars.tileidxp = this.itemOf(
              this.stage.vars.Mob,
              this.toNumber(this.vars.cloneasid) + 1
            );
          }
          yield* this.getXYP(this.vars.tileidxp);
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 2,
            1,
            this.toNumber(this.vars.x) + 0.5
          );
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 3,
            1,
            this.toNumber(this.vars.y) + this.toNumber(this.vars.halfyP)
          );
        }
        this.vars.choice = this.random(2, 20);
        if (this.compare(this.vars.x, this.stage.vars.X) < 0) {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 4,
            1,
            1
          );
        } else {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 4,
            1,
            -1
          );
        }
      }
    } else {
      if (this.toNumber(typ) === 7) {
        this.vars.getDirection =
          this.toNumber(
            this.itemOf(
              this.stage.vars.Mob,
              this.toNumber(this.vars.cloneasid) + 18
            )
          ) - this.toNumber(this.vars.x);
        if (
          this.compare(Math.abs(this.toNumber(this.vars.getDirection)), 14) >
            0 ||
          (this.compare(this.stage.vars.Glight, 5) > 0 &&
            this.compare(Math.abs(this.toNumber(this.vars.getDirection)), 2) >
              0)
        ) {
          this.vars.choice = this.random(2, 20);
          if (this.compare(this.vars.getDirection, 0) < 0) {
            this.stage.vars.Mob.splice(
              this.toNumber(this.vars.cloneasid) + 4,
              1,
              -1
            );
          } else {
            this.stage.vars.Mob.splice(
              this.toNumber(this.vars.cloneasid) + 4,
              1,
              1
            );
          }
        }
      } else {
        if (
          this.compare(
            Math.abs(
              this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.X)
            ),
            5.5
          ) < 0 &&
          this.compare(
            Math.abs(
              this.toNumber(this.vars.y) - this.toNumber(this.stage.vars.Y)
            ),
            4.5
          ) < 0
        ) {
          if (
            this.compare(
              this.stage.vars.Heldc,
              this.itemOf(
                this.stage.vars.MobData,
                this.toNumber(this.vars.mdoff) + 9
              )
            ) === 0
          ) {
            yield* this.canSeeSteve(
              this.vars.x,
              this.vars.y,
              this.vars.tileidxp
            );
            if (this.toNumber(this.vars.choice) === 99) {
              if (
                this.compare(
                  Math.abs(
                    this.toNumber(this.vars.x) -
                      this.toNumber(this.stage.vars.X)
                  ),
                  this.random(0.5, 2)
                ) > 0
              ) {
                this.vars.choice = this.random(2, 20);
                if (this.compare(this.vars.x, this.stage.vars.X) < 0) {
                  this.stage.vars.Mob.splice(
                    this.toNumber(this.vars.cloneasid) + 4,
                    1,
                    1
                  );
                } else {
                  this.stage.vars.Mob.splice(
                    this.toNumber(this.vars.cloneasid) + 4,
                    1,
                    -1
                  );
                }
              } else {
                this.vars.choice = this.random(0, 3);
              }
            } else {
              this.vars.choice = this.random(0, 9);
            }
          }
        }
      }
    }
  }

  *spawnMobAtUserSpawnHome(typ, tileidx, userspawn, homex) {
    if (
      this.toNumber(tileidx) === 0 ||
      (this.compare(typ, 99) > 0 &&
        this.toNumber(this.stage.vars.Survival) === 0 &&
        this.toNumber(this.stage.vars.Creative) === 0)
    ) {
      null;
    } else {
      if (this.compare(this.vars.mobpool.length, 0) > 0) {
        this.vars.idxP = this.itemOf(this.vars.mobpool, 0);
        this.vars.mobpool.splice(0, 1);
      } else {
        yield* this.addNewMob();
      }
      this.stage.vars.Mob.splice(this.toNumber(this.vars.idxP) + -1, 1, typ);
      yield* this.getHalfHeight(typ);
      this.stage.vars.Mob.splice(this.toNumber(this.vars.idxP) + 1, 1, tileidx);
      yield* this.getXYP(tileidx);
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.idxP) + 2,
        1,
        this.toNumber(this.vars.x) + 0.5
      );
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.idxP) + 3,
        1,
        this.toNumber(this.vars.y) + this.toNumber(this.vars.halfyP)
      );
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.idxP) + 4,
        1,
        this.random(0, 1) * 2 - 1
      );
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.idxP) + 6,
        1,
        this.toNumber(this.stage.vars.Timereal) + this.random(0, 3)
      );
      this.stage.vars.Mob.splice(this.toNumber(this.vars.idxP) + 8, 1, 0);
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.idxP) + 9,
        1,
        this.itemOf(this.stage.vars.MobData, this.toNumber(this.vars.mdoff) + 8)
      );
      this.stage.vars.Mob.splice(this.toNumber(this.vars.idxP) + 10, 1, 0);
      this.stage.vars.Mob.splice(this.toNumber(this.vars.idxP) + 11, 1, 0);
      if (this.toNumber(typ) === 103) {
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.idxP) + 13,
          1,
          this.toNumber(this.stage.vars.Timereal) + this.random(2, 3)
        );
      } else {
        this.stage.vars.Mob.splice(this.toNumber(this.vars.idxP) + 13, 1, 0);
      }
      if (this.compare(typ, 100) < 0) {
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.idxP) + 14,
          1,
          999999999
        );
      } else {
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.idxP) + 14,
          1,
          this.toNumber(this.stage.vars.Timereal) + 30
        );
      }
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.idxP) + 16,
        1,
        userspawn
      );
      this.stage.vars.Mob.splice(this.toNumber(this.vars.idxP) + 17, 1, 0);
      if (this.toNumber(userspawn) === 0) {
        if (this.compare(typ, 100) < 0) {
          this.stage.vars.Maxmobs--;
        } else {
          this.stage.vars.Maxmobsbad--;
        }
      } else {
        null;
      }
      if (this.toNumber(homex) === 0 && this.toNumber(typ) === 7) {
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.idxP) + 18,
          1,
          this.toNumber(this.vars.x) + 0.5
        );
      } else {
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.idxP) + 18,
          1,
          homex
        );
      }
    }
  }

  *checkMobSpawers() {
    while (!(0 === this.stage.vars.Mobspawn.length)) {
      yield* this.spawnMobAtUserSpawnHome(
        this.itemOf(this.stage.vars.Mobspawn, 0),
        this.itemOf(this.stage.vars.Mobspawn, 1),
        this.itemOf(this.stage.vars.Mobspawn, 2),
        this.itemOf(this.stage.vars.Mobspawn, 3)
      );
      this.stage.vars.Mobspawn.splice(0, 1);
      this.stage.vars.Mobspawn.splice(0, 1);
      this.stage.vars.Mobspawn.splice(0, 1);
      this.stage.vars.Mobspawn.splice(0, 1);
      yield;
    }
  }

  *deathHarvest(id, didexplode) {
    this.vars.typp = this.itemOf(this.stage.vars.Mob, this.toNumber(id) + -1);
    if (this.toNumber(this.vars.typp) === 1) {
      this.vars.typp = 113;
      this.vars.isblockp = this.random(1, 3);
    } else {
      if (this.toNumber(this.vars.typp) === 2) {
        this.vars.typp = 122;
        this.vars.isblockp = this.random(1, 3);
      } else {
        if (this.toNumber(this.vars.typp) === 3) {
          for (let i = 0; i < this.random(0, 2); i++) {
            yield* this.dropItem(id, 163, 1);
            yield;
          }
          this.vars.typp = 171;
          this.vars.isblockp = this.random(1, 3);
        } else {
          if (this.toNumber(this.vars.typp) === 4) {
            yield* this.dropItem(id, 164, 1);
            this.vars.typp = 167;
            this.vars.isblockp = this.random(0, 2);
          } else {
            if (this.toNumber(this.vars.typp) === 100) {
              this.vars.typp = 119;
              this.vars.isblockp = this.random(0, 2);
            } else {
              if (this.toNumber(this.vars.typp) === 101 && !didexplode) {
                this.vars.typp = 125;
                this.vars.isblockp = this.random(0, 2);
              } else {
                if (this.toNumber(this.vars.typp) === 102) {
                  this.vars.typp = 170;
                  this.vars.isblockp = this.random(0, 2);
                } else {
                  if (this.toNumber(this.vars.typp) === 103) {
                    for (let i = 0; i < this.random(0, 2); i++) {
                      yield* this.dropItem(id, 194, 1);
                      yield;
                    }
                    this.vars.typp = 131;
                    this.vars.isblockp = this.random(0, 2);
                  } else {
                    if (
                      this.toNumber(this.vars.typp) === 105 ||
                      this.toNumber(this.vars.typp) === 106
                    ) {
                      if (this.random(0, 10) === 1) {
                        yield* this.dropItem(id, 84, 1);
                      }
                      this.vars.typp = 119;
                      this.vars.isblockp = this.random(0, 1);
                    } else {
                      this.vars.isblockp = 0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (this.compare(this.vars.isblockp, 0) > 0) {
      for (let i = 0; i < this.toNumber(this.vars.isblockp); i++) {
        yield* this.dropItem(id, this.vars.typp, 1);
        yield;
      }
    }
  }

  *decideNextMove(waswalking, wasfalling, typ) {
    if (
      this.compare(this.vars.x, 0) < 0 ||
      !(this.compare(this.vars.x, this.stage.vars.Lsx) < 0) ||
      this.compare(this.vars.y, 0) < 0
    ) {
      yield* this.deleteMob(this.vars.cloneasid);
      return;
    }
    yield* this.getmobdataoffset(typ);
    this.vars.allegiance = this.itemOf(
      this.stage.vars.MobData,
      this.toNumber(this.vars.mdoff) + 10
    );
    this.vars.tileidxp = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + 1
    );
    this.vars.tilep = this.itemOf(
      this.stage.vars.Level,
      this.vars.tileidxp - 1
    );
    this.vars.inwaterp = this.itemOf(
      this.vars.undefined,
      this.toNumber(this.vars.tilep) * this.toNumber(this.stage.vars.Dmul) + 6
    );
    this.vars.hurtingp = this.itemOf(
      this.vars.undefined,
      this.toNumber(this.vars.tilep) * this.toNumber(this.stage.vars.Dmul) + 13
    );
    if (this.compare(this.vars.hurtingp, 0) > 0) {
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + 8,
        1,
        Math.ceil(this.toNumber(this.vars.hurtingp) / 2)
      );
    }
    this.stage.vars.Mob.splice(
      this.toNumber(this.vars.cloneasid) + 12,
      1,
      this.vars.inwaterp
    );
    this.vars.choice = this.itemOf(
      this.stage.vars.Level,
      this.toNumber(this.vars.tileidxp) - this.toNumber(this.stage.vars.Lsx) - 1
    );
    yield* this.isBlockP(this.vars.choice, 0);
    if (this.toNumber(this.vars.isblockp) === 0 && this.toNumber(typ) === 102) {
      yield* this.isBlockP(
        this.itemOf(
          this.stage.vars.Level,
          this.toNumber(this.vars.tileidxp) +
            this.toNumber(
              this.itemOf(
                this.stage.vars.Mob,
                this.toNumber(this.vars.cloneasid) + 4
              )
            ) -
            1
        ),
        0
      );
    }
    if (
      this.toNumber(this.vars.isblockp) === 0 &&
      !(
        this.toString(this.vars.inwaterp) === "." ||
        this.toString(this.vars.inwaterp) === "D"
      )
    ) {
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + 1,
        1,
        this.toNumber(this.vars.tileidxp) - this.toNumber(this.stage.vars.Lsx)
      );
      if (wasfalling) {
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 6,
          1,
          this.toNumber(
            this.itemOf(
              this.stage.vars.Mob,
              this.toNumber(this.vars.cloneasid) + 6
            )
          ) - 1
        );
      } else {
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 5,
          1,
          4
        );
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 6,
          1,
          this.toNumber(
            this.itemOf(
              this.stage.vars.Mob,
              this.toNumber(this.vars.cloneasid) + 3
            )
          ) - 1
        );
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 7,
          1,
          0
        );
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 15,
          1,
          this.vars.y
        );
      }
    } else {
      if (wasfalling) {
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 7,
          1,
          0
        );
        this.vars.y =
          this.toNumber(
            this.itemOf(
              this.stage.vars.Mob,
              this.toNumber(this.vars.cloneasid) + 15
            )
          ) - this.toNumber(this.vars.y);
        if (this.compare(this.vars.y, 2.8) > 0) {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 8,
            1,
            Math.floor(this.toNumber(this.vars.y) - 2)
          );
        }
        this.vars.y =
          Math.floor(
            (this.toNumber(this.vars.tileidxp) - 1) /
              this.toNumber(this.stage.vars.Lsx)
          ) + this.toNumber(this.vars.halfyP);
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 3,
          1,
          this.vars.y
        );
      }
      this.stage.vars.Mob.splice(
        this.toNumber(this.vars.cloneasid) + 15,
        1,
        this.vars.y
      );
      if (this.compare(typ, 99) > 0) {
        this.vars.choice = this.random(0, 22);
        if (
          this.toNumber(this.stage.vars.Survival) === 0 &&
          this.toNumber(this.stage.vars.Creative) === 0
        ) {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 9,
            1,
            0
          );
        }
        if (this.compare(this.vars.allegiance, 1) > 0) {
          if (
            this.compare(this.stage.vars.Creative, 1) < 0 &&
            this.compare(
              this.itemOf(
                this.stage.vars.Mob,
                this.toNumber(this.vars.cloneasid) + 10
              ),
              this.toNumber(this.stage.vars.Timereal) + 10
            ) < 0
          ) {
            if (!(this.toNumber(typ) === 102)) {
              if (
                this.compare(
                  Math.abs(
                    this.toNumber(this.vars.x) -
                      this.toNumber(this.stage.vars.X)
                  ),
                  20
                ) < 0 &&
                this.compare(
                  Math.abs(
                    this.toNumber(this.vars.y) -
                      this.toNumber(this.stage.vars.Y)
                  ),
                  12
                ) < 0
              ) {
                yield* this.canSeeSteve(
                  this.vars.x,
                  this.vars.y,
                  this.vars.tileidxp
                );
                if (this.toNumber(this.vars.choice) === 99) {
                  this.stage.vars.Mob.splice(
                    this.toNumber(this.vars.cloneasid) + 10,
                    1,
                    this.toNumber(this.stage.vars.Timereal) + 15
                  );
                }
              }
            }
          }
          if (
            this.compare(
              this.itemOf(
                this.stage.vars.Mob,
                this.toNumber(this.vars.cloneasid) + 10
              ),
              this.stage.vars.Timereal
            ) > 0
          ) {
            if (this.compare(this.vars.x, this.stage.vars.X) < 0) {
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 4,
                1,
                1
              );
            } else {
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 4,
                1,
                -1
              );
            }
            if (
              this.toNumber(typ) === 103 &&
              this.compare(
                this.toNumber(this.stage.vars.X) - this.toNumber(this.vars.x),
                this.random(5, 7)
              ) < 0
            ) {
              this.vars.choice = this.random(0, 2);
            } else {
              this.vars.choice = 99;
            }
          } else {
            if (this.toNumber(typ) === 102) {
              this.vars.choice = this.random(0, 5);
            }
          }
        }
      } else {
        this.vars.choice = this.random(0, 9);
        yield* this.followSteve(typ);
        if (this.toNumber(typ) === 7) {
          this.vars.tilep = this.itemOf(
            this.stage.vars.Level,
            this.vars.tileidxp - 1
          );
          if (this.toNumber(this.vars.tilep) === 57) {
            yield* this.activateTileIv(this.vars.tileidxp, "o", !null, 0);
            this.stage.vars.Refdata.splice(
              this.toNumber(this.vars.refidxIv) + 3,
              1,
              this.timer + 0.5
            );
            this.vars.choice = 6;
          }
        }
        if (
          this.compare(
            this.itemOf(
              this.stage.vars.Mob,
              this.toNumber(this.vars.cloneasid) + 10
            ),
            this.stage.vars.Timereal
          ) > 0
        ) {
          this.vars.choice = 99;
          if (this.compare(this.vars.x, this.stage.vars.X) < 0) {
            this.stage.vars.Mob.splice(
              this.toNumber(this.vars.cloneasid) + 4,
              1,
              -1
            );
          } else {
            this.stage.vars.Mob.splice(
              this.toNumber(this.vars.cloneasid) + 4,
              1,
              1
            );
          }
        }
      }
      if (this.compare(this.vars.choice, 3) < 0) {
        if (this.compare(this.vars.statep, 2) < 0) {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 5,
            1,
            Math.round(1 - this.toNumber(this.vars.statep))
          );
        } else {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 5,
            1,
            this.random(0, 1)
          );
        }
        this.stage.vars.Mob.splice(
          this.toNumber(this.vars.cloneasid) + 6,
          1,
          this.toNumber(this.stage.vars.Timereal) +
            this.random(2, 4.000000000232831)
        );
      } else {
        this.vars.dirp = this.itemOf(
          this.stage.vars.Mob,
          this.toNumber(this.vars.cloneasid) + 4
        );
        if (this.compare(this.vars.choice, 5) < 0) {
          if (waswalking || wasfalling) {
            this.stage.vars.Mob.splice(
              this.toNumber(this.vars.cloneasid) + 5,
              1,
              this.random(0, 1)
            );
          } else {
            this.stage.vars.Mob.splice(
              this.toNumber(this.vars.cloneasid) + 4,
              1,
              Math.floor(0 - this.toNumber(this.vars.dirp))
            );
          }
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 6,
            1,
            this.toNumber(this.stage.vars.Timereal) +
              this.random(1, 5.000000000232831)
          );
        } else {
          this.vars.tileidxp = this.itemOf(
            this.stage.vars.Mob,
            this.toNumber(this.vars.cloneasid) + 1
          );
          yield* this.isBlockP(
            this.itemOf(
              this.stage.vars.Level,
              this.toNumber(this.vars.tileidxp) +
                this.toNumber(this.vars.dirp) -
                1
            ),
            0
          );
          if (this.compare(this.vars.halfyP, 0.5) > 0) {
            this.vars.tilep = this.itemOf(
              this.stage.vars.Level,
              this.toNumber(this.vars.tileidxp) +
                this.toNumber(this.vars.dirp) +
                this.toNumber(this.stage.vars.Lsx) -
                1
            );
            yield* this.isBlockP(this.vars.tilep, !null);
            if (this.toNumber(typ) === 7) {
              if (this.toNumber(this.vars.tilep) === 120) {
                yield* this.activateTileIv(
                  this.toNumber(this.vars.tileidxp) +
                    this.toNumber(this.vars.dirp),
                  "t",
                  !null,
                  0
                );
                this.vars.isblockp = 0;
              } else {
                if (this.toNumber(this.vars.tilep) === 121) {
                  yield* this.activateTileIv(
                    this.toNumber(this.vars.tileidxp) +
                      this.toNumber(this.vars.dirp) +
                      this.toNumber(this.stage.vars.Lsx),
                    "t",
                    !null,
                    0
                  );
                  this.vars.isblockp = 99;
                }
              }
            }
          }
          if (this.toNumber(this.vars.isblockp) === 0) {
            if (this.compare(this.vars.choice, 99) < 0) {
              yield* this.isBlockP(
                this.itemOf(
                  this.stage.vars.Level,
                  this.toNumber(this.vars.tileidxp) -
                    this.toNumber(this.stage.vars.Lsx) +
                    this.toNumber(this.stage.vars.Lsx) -
                    1
                ),
                !null
              );
              yield* this.isBlockP(
                this.itemOf(
                  this.stage.vars.Level,
                  this.toNumber(this.vars.tileidxp) -
                    this.toNumber(this.stage.vars.Lsx) -
                    this.toNumber(this.stage.vars.Lsx) +
                    this.toNumber(this.vars.dirp) -
                    1
                ),
                !null
              );
              if (
                this.toNumber(this.vars.isblockp) === 0 &&
                this.compare(this.vars.choice, 99) < 0
              ) {
                yield* this.isBlockP(
                  this.itemOf(
                    this.stage.vars.Level,
                    this.toNumber(this.vars.tileidxp) -
                      this.toNumber(this.stage.vars.Lsx) * 3 +
                      this.toNumber(this.vars.dirp) -
                      1
                  ),
                  !null
                );
                if (
                  this.compare(this.vars.isblockp, 0) > 0 &&
                  this.compare(
                    this.random(2.3283064365386963e-10, 15.00000000023283),
                    1
                  ) > 0
                ) {
                  this.vars.isblockp = 1;
                }
              }
            } else {
              this.vars.isblockp = 1;
            }
            if (this.toNumber(this.vars.isblockp) === 0) {
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 5,
                1,
                this.random(0, 1)
              );
            } else {
              if (
                !(
                  3 ===
                  this.toNumber(
                    this.itemOf(
                      this.stage.vars.Mob,
                      this.toNumber(this.vars.cloneasid) + 5
                    )
                  )
                )
              ) {
                this.stage.vars.Mob.splice(
                  this.toNumber(this.vars.cloneasid) + 5,
                  1,
                  2
                );
              }
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 1,
                1,
                this.toNumber(this.vars.tileidxp) +
                  this.toNumber(this.vars.dirp)
              );
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 6,
                1,
                1
              );
            }
          } else {
            if (this.toNumber(this.vars.isblockp) === 99) {
              this.vars.isblockp = 0;
            } else {
              yield* this.isBlockP(
                this.itemOf(
                  this.stage.vars.Level,
                  this.toNumber(this.vars.tileidxp) +
                    this.toNumber(this.stage.vars.Lsx) -
                    1
                ),
                0
              );
              yield* this.isBlockP(
                this.itemOf(
                  this.stage.vars.Level,
                  this.toNumber(this.vars.tileidxp) +
                    this.toNumber(this.stage.vars.Lsx) +
                    this.toNumber(this.vars.dirp) -
                    1
                ),
                !null
              );
              if (this.compare(this.vars.halfyP, 0.5) > 0) {
                yield* this.isBlockP(
                  this.itemOf(
                    this.stage.vars.Level,
                    this.toNumber(this.vars.tileidxp) +
                      this.toNumber(this.stage.vars.Lsx) +
                      this.toNumber(this.stage.vars.Lsx) -
                      1
                  ),
                  !null
                );
                yield* this.isBlockP(
                  this.itemOf(
                    this.stage.vars.Level,
                    this.toNumber(this.vars.tileidxp) +
                      this.toNumber(this.stage.vars.Lsx) +
                      this.toNumber(this.stage.vars.Lsx) +
                      this.toNumber(this.vars.dirp) -
                      1
                  ),
                  !null
                );
              }
            }
            if (this.toNumber(this.vars.isblockp) === 0) {
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 5,
                1,
                3
              );
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 1,
                1,
                this.toNumber(this.vars.tileidxp) +
                  this.toNumber(this.stage.vars.Lsx) +
                  this.toNumber(this.vars.dirp)
              );
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 6,
                1,
                1
              );
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 7,
                1,
                0.22
              );
              this.stage.vars.Mob.splice(
                this.toNumber(this.vars.cloneasid) + 12,
                1,
                ""
              );
            } else {
              if (wasfalling) {
                this.stage.vars.Mob.splice(
                  this.toNumber(this.vars.cloneasid) + 5,
                  1,
                  this.random(0, 1)
                );
                this.stage.vars.Mob.splice(
                  this.toNumber(this.vars.cloneasid) + 6,
                  1,
                  this.toNumber(this.stage.vars.Timereal) + this.random(1, 2)
                );
                this.stage.vars.Mob.splice(
                  this.toNumber(this.vars.cloneasid) + 7,
                  1,
                  0
                );
              } else {
                this.stage.vars.Mob.splice(
                  this.toNumber(this.vars.cloneasid) + 5,
                  1,
                  4
                );
                this.stage.vars.Mob.splice(
                  this.toNumber(this.vars.cloneasid) + 7,
                  1,
                  0.22
                );
                if (this.toNumber(typ) === 102) {
                  yield* this.isBlockP(
                    this.itemOf(
                      this.stage.vars.Level,
                      this.toNumber(this.vars.tileidxp) +
                        this.toNumber(this.stage.vars.Lsx) -
                        1
                    ),
                    0
                  );
                  if (this.toNumber(this.vars.isblockp) === 0) {
                    this.stage.vars.Mob.splice(
                      this.toNumber(this.vars.cloneasid) + 1,
                      1,
                      this.toNumber(this.vars.tileidxp) +
                        this.toNumber(this.stage.vars.Lsx)
                    );
                    this.stage.vars.Mob.splice(
                      this.toNumber(this.vars.cloneasid) + 6,
                      1,
                      this.toNumber(
                        this.itemOf(
                          this.stage.vars.Mob,
                          this.toNumber(this.vars.cloneasid) + 3
                        )
                      ) + 1
                    );
                    this.stage.vars.Mob.splice(
                      this.toNumber(this.vars.cloneasid) + 12,
                      1,
                      ""
                    );
                  } else {
                    this.stage.vars.Mob.splice(
                      this.toNumber(this.vars.cloneasid) + 5,
                      1,
                      1
                    );
                    this.stage.vars.Mob.splice(
                      this.toNumber(this.vars.cloneasid) + 4,
                      1,
                      Math.floor(0 - this.toNumber(this.vars.dirp))
                    );
                    this.stage.vars.Mob.splice(
                      this.toNumber(this.vars.cloneasid) + 6,
                      1,
                      this.toNumber(this.stage.vars.Timereal) +
                        this.random(1, 5.000000000232831)
                    );
                  }
                } else {
                  this.stage.vars.Mob.splice(
                    this.toNumber(this.vars.cloneasid) + 6,
                    1,
                    this.itemOf(
                      this.stage.vars.Mob,
                      this.toNumber(this.vars.cloneasid) + 3
                    )
                  );
                  if (this.random(1, 3) === 1) {
                    this.stage.vars.Mob.splice(
                      this.toNumber(this.vars.cloneasid) + 5,
                      1,
                      1
                    );
                    this.stage.vars.Mob.splice(
                      this.toNumber(this.vars.cloneasid) + 4,
                      1,
                      Math.floor(0 - this.toNumber(this.vars.dirp))
                    );
                    this.stage.vars.Mob.splice(
                      this.toNumber(this.vars.cloneasid) + 6,
                      1,
                      this.toNumber(this.stage.vars.Timereal) +
                        this.random(1, 3.00000000023283)
                    );
                  }
                }
              }
            }
          }
        }
      }
    }
    if (this.toNumber(typ) === 4) {
      this.vars.dist = this.itemOf(
        this.stage.vars.Mob,
        this.toNumber(this.vars.cloneasid) + 13
      );
      if (
        this.toNumber(this.vars.dist) === 0 ||
        this.compare(this.stage.vars.Timereal, this.vars.dist) > 0
      ) {
        if (this.toNumber(this.vars.dist) === 0) {
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 13,
            1,
            this.toNumber(this.stage.vars.Timereal) + this.random(200, 400)
          );
        } else {
          yield* this.dropItem(this.vars.cloneasid, 166, 1);
          this.stage.vars.Mob.splice(
            this.toNumber(this.vars.cloneasid) + 13,
            1,
            this.toNumber(this.stage.vars.Timereal) + this.random(300, 600)
          );
        }
      }
    }
    this.vars.tileidxp = this.itemOf(
      this.stage.vars.Mob,
      this.toNumber(this.vars.cloneasid) + 1
    );
    this.vars.tilep = this.itemOf(
      this.stage.vars.Level,
      this.toNumber(this.vars.tileidxp) - this.toNumber(this.stage.vars.Lsx) - 1
    );
    if (this.toNumber(this.vars.tilep) === 233) {
      yield* this.activateTileIv(
        this.toNumber(this.vars.tileidxp) - this.toNumber(this.stage.vars.Lsx),
        "r",
        0,
        0
      );
    }
  }

  *dropItem(mobid, blockid, quantity) {
    this.stage.vars.Harvest.push(
      this.itemOf(this.stage.vars.Mob, this.toNumber(mobid) + 2)
    );
    this.stage.vars.Harvest.push(
      this.itemOf(this.stage.vars.Mob, this.toNumber(mobid) + 3)
    );
    this.stage.vars.Harvest.push(blockid);
    this.stage.vars.Harvest.push(quantity);
    this.stage.vars.Harvest.push(this.random(-0.1, 0.1));
    this.stage.vars.Harvest.push(-999);
  }

  *whenIReceiveInit1b() {
    this.moveAhead();
  }

  *findSpawnZone(islight, tall, teleport) {
    this.vars.spwnIdxs = [];
    if (teleport) {
      this.vars.tileidxp = Math.round(
        this.toNumber(this.stage.vars.X) +
          this.random(2, 10) * (this.random(0, 1) * 2 - 1)
      );
    } else {
      if (islight || !(this.toString(this.stage.vars.Mode) === "S")) {
        if (islight) {
          if (this.compare(this.vars.allegiance, 0) > 0) {
            this.vars.tileidxp =
              Math.round(
                this.toNumber(this.stage.vars.X) +
                  this.random(1, this.toNumber(this.stage.vars.Lsx))
              ) % this.toNumber(this.stage.vars.Lsx);
          } else {
            this.vars.tileidxp = Math.round(
              this.toNumber(this.stage.vars.X) +
                this.random(7, 10) * (this.random(0, 1) * 2 - 1)
            );
          }
        } else {
          this.vars.tileidxp = Math.round(
            this.toNumber(this.stage.vars.X) +
              this.random(
                0 - this.toNumber(this.stage.vars.Spawnarea),
                this.toNumber(this.stage.vars.Spawnarea)
              )
          );
        }
      } else {
        this.vars.tileidxp = Math.round(
          this.toNumber(this.stage.vars.X) + this.random(-30, 30)
        );
      }
    }
    this.vars.tileidxp =
      Math.floor(this.toNumber(this.vars.tileidxp)) +
      this.toNumber(this.stage.vars.Lsx) *
        (this.toNumber(this.stage.vars.Lsy) - 3);
    this.vars.choice = 0;
    while (!(this.compare(this.vars.tileidxp, 1) < 0)) {
      this.vars.tilep = this.itemOf(
        this.stage.vars.Level,
        this.vars.tileidxp - 1
      );
      this.vars.inwaterp = this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.tilep) * this.toNumber(this.stage.vars.Dmul) + 6
      );
      yield* this.isBlockP(this.vars.tilep, 0);
      if (
        this.compare(this.vars.isblockp, 0) > 0 ||
        this.toString(this.vars.inwaterp) === "." ||
        this.toString(this.vars.inwaterp) === "D"
      ) {
        if (
          this.compare(this.vars.choice, 1) > 0 ||
          (!tall && this.compare(this.vars.choice, 0) > 0)
        ) {
          if (this.compare(this.vars.isblockp, 0) > 0) {
            this.vars.tileidxp += this.toNumber(this.stage.vars.Lsx);
          }
          yield* this.getIlluminationPApply(this.vars.tileidxp, 0, 0);
          if (teleport) {
            yield* this.getXYP(this.vars.tileidxp);
            if (
              this.compare(
                Math.abs(
                  this.toNumber(this.stage.vars.Y) - this.toNumber(this.vars.y)
                ),
                9
              ) < 0
            ) {
              this.vars.spwnIdxs.push(this.vars.tileidxp);
            }
          } else {
            if (
              (islight &&
                this.compare(this.vars.lightP, 7) > 0 &&
                this.toNumber(this.vars.tilep) === 2) ||
              (!islight && this.compare(this.vars.lightP, 7) < 0)
            ) {
              yield* this.getXYP(this.vars.tileidxp);
              if (
                this.toString(this.stage.vars.Mode) === "S" ||
                this.compare(
                  Math.abs(
                    this.toNumber(this.stage.vars.X) -
                      this.toNumber(this.vars.x)
                  ),
                  12
                ) > 0 ||
                this.compare(
                  Math.abs(
                    this.toNumber(this.stage.vars.Y) -
                      this.toNumber(this.vars.y)
                  ),
                  7
                ) > 0
              ) {
                this.vars.spwnIdxs.push(this.vars.tileidxp);
              } else {
                if (this.toNumber(this.vars.allegiance) === 0) {
                  this.vars.spwnIdxs.push(this.vars.tileidxp);
                }
              }
            }
          }
          this.vars.tileidxp += this.toNumber(this.stage.vars.Lsxneg);
        } else {
          null;
        }
        this.vars.choice = 0;
      } else {
        this.vars.choice++;
      }
      this.vars.tileidxp += this.toNumber(this.stage.vars.Lsxneg);
      yield;
    }
    if (this.compare(this.vars.spwnIdxs.length, 0) > 0) {
      this.vars.tileidxp = this.itemOf(
        this.vars.spwnIdxs,
        this.random(1, this.vars.spwnIdxs.length) - 1
      );
    } else {
      this.vars.tileidxp = 0;
    }
  }
}
