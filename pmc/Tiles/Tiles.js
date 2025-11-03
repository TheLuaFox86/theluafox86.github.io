/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Tiles extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("#", "./Tiles/costumes/#.png", { x: 40, y: 40 }),
      new Costume("grass", "./Tiles/costumes/grass.png", { x: 40, y: 40 }),
      new Costume("soil", "./Tiles/costumes/soil.png", { x: 40, y: 40 }),
      new Costume("rock", "./Tiles/costumes/rock.png", { x: 40, y: 40 }),
      new Costume("gravel", "./Tiles/costumes/gravel.png", { x: 40, y: 40 }),
      new Costume("bedrock", "./Tiles/costumes/bedrock.png", { x: 40, y: 40 }),
      new Costume("sand", "./Tiles/costumes/sand.png", { x: 40, y: 40 }),
      new Costume("wood", "./Tiles/costumes/wood.png", { x: 40, y: 40 }),
      new Costume("leaves", "./Tiles/costumes/leaves.png", { x: 40, y: 40 }),
      new Costume("leaves2", "./Tiles/costumes/leaves2.png", { x: 40, y: 40 }),
      new Costume("cactus", "./Tiles/costumes/cactus.png", { x: 40, y: 40 }),
      new Costume("chest", "./Tiles/costumes/chest.png", { x: 40, y: 40 }),
      new Costume("coal ore", "./Tiles/costumes/coal ore.png", {
        x: 40,
        y: 40,
      }),
      new Costume("diamond ore", "./Tiles/costumes/diamond ore.png", {
        x: 40,
        y: 40,
      }),
      new Costume("gold ore", "./Tiles/costumes/gold ore.png", {
        x: 40,
        y: 40,
      }),
      new Costume("iron ore", "./Tiles/costumes/iron ore.png", {
        x: 40,
        y: 40,
      }),
      new Costume("brick", "./Tiles/costumes/brick.png", { x: 40, y: 40 }),
      new Costume("tnt", "./Tiles/costumes/tnt.png", { x: 40, y: 40 }),
      new Costume("ladder", "./Tiles/costumes/ladder.png", { x: 36, y: 40 }),
      new Costume("wtr", "./Tiles/costumes/wtr.png", { x: 40, y: 40 }),
      new Costume("sapling spruce", "./Tiles/costumes/sapling spruce.png", {
        x: 35,
        y: 30,
      }),
      new Costume("Sky0", "./Tiles/costumes/Sky0.png", { x: 40, y: 40 }),
      new Costume("Cobblestone", "./Tiles/costumes/Cobblestone.png", {
        x: 40,
        y: 40,
      }),
      new Costume("craftingTable", "./Tiles/costumes/craftingTable.png", {
        x: 40,
        y: 40,
      }),
      new Costume("furnace", "./Tiles/costumes/furnace.png", { x: 40, y: 40 }),
      new Costume("furnaceLit", "./Tiles/costumes/furnaceLit.png", {
        x: 40,
        y: 40,
      }),
      new Costume("bedLeft", "./Tiles/costumes/bedLeft.png", { x: 40, y: 40 }),
      new Costume("bedRight", "./Tiles/costumes/bedRight.png", {
        x: 40,
        y: 40,
      }),
      new Costume("obsidian", "./Tiles/costumes/obsidian.png", {
        x: 40,
        y: 40,
      }),
      new Costume("clay", "./Tiles/costumes/clay.png", { x: 40, y: 40 }),
      new Costume("pumpkin", "./Tiles/costumes/pumpkin.png", { x: 40, y: 40 }),
      new Costume("door_top", "./Tiles/costumes/door_top.png", {
        x: 40,
        y: 40,
      }),
      new Costume("doorBottom", "./Tiles/costumes/doorBottom.png", {
        x: 40,
        y: 40,
      }),
      new Costume("sandstone", "./Tiles/costumes/sandstone.png", {
        x: 40,
        y: 40,
      }),
      new Costume("woodenplanks", "./Tiles/costumes/woodenplanks.png", {
        x: 40,
        y: 40,
      }),
      new Costume("stoneBricks", "./Tiles/costumes/stoneBricks.png", {
        x: 40,
        y: 40,
      }),
      new Costume("sapling birch", "./Tiles/costumes/sapling birch.png", {
        x: 36,
        y: 35,
      }),
      new Costume("sapling jungle", "./Tiles/costumes/sapling jungle.png", {
        x: 26,
        y: 41,
      }),
      new Costume("lava", "./Tiles/costumes/lava.png", { x: 40, y: 40 }),
      new Costume("Bucket Lava", "./Tiles/costumes/Bucket Lava.png", {
        x: 30,
        y: 30,
      }),
      new Costume("Wood Spruce", "./Tiles/costumes/Wood Spruce.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Gold Ingot", "./Tiles/costumes/Gold Ingot.png", {
        x: 40,
        y: 30,
      }),
      new Costume("tall grass i", "./Tiles/costumes/tall grass i.png", {
        x: 36,
        y: 25,
      }),
      new Costume("Wood Birch", "./Tiles/costumes/Wood Birch.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Wood Jungle", "./Tiles/costumes/Wood Jungle.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Diamond", "./Tiles/costumes/Diamond.png", { x: 24, y: 30 }),
      new Costume("Coal", "./Tiles/costumes/Coal.png", { x: 24, y: 34 }),
      new Costume("Iron Ingot", "./Tiles/costumes/Iron Ingot.png", {
        x: 40,
        y: 30,
      }),
      new Costume("Bucket", "./Tiles/costumes/Bucket.png", { x: 30, y: 30 }),
      new Costume("Charcoal", "./Tiles/costumes/Charcoal.png", {
        x: 33,
        y: 35,
      }),
      new Costume("Bucket Water", "./Tiles/costumes/Bucket Water.png", {
        x: 30,
        y: 30,
      }),
      new Costume("Stick", "./Tiles/costumes/Stick.png", { x: 30, y: 30 }),
      new Costume("Leaves Birch", "./Tiles/costumes/Leaves Birch.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Leaves Birch 2", "./Tiles/costumes/Leaves Birch 2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Leaves Spruce", "./Tiles/costumes/Leaves Spruce.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Leaves Spruce 2", "./Tiles/costumes/Leaves Spruce 2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Flint", "./Tiles/costumes/Flint.png", { x: 24, y: 34 }),
      new Costume("Leaves Jungle", "./Tiles/costumes/Leaves Jungle.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Leaves Jungle 2", "./Tiles/costumes/Leaves Jungle 2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("_flintNSteel", "./Tiles/costumes/_flintNSteel.png", {
        x: 36,
        y: 41,
      }),
      new Costume("cake3", "./Tiles/costumes/cake3.png", { x: 40, y: 40 }),
      new Costume("apple", "./Tiles/costumes/apple.png", { x: 28, y: 35 }),
      new Costume("pork", "./Tiles/costumes/pork.png", { x: 37, y: 39 }),
      new Costume("pork-cooked", "./Tiles/costumes/pork-cooked.png", {
        x: 37,
        y: 39,
      }),
      new Costume("Apple in tree", "./Tiles/costumes/Apple in tree.png", {
        x: 40,
        y: 40,
      }),
      new Costume("tnt2", "./Tiles/costumes/tnt2.png", { x: 40, y: 40 }),
      new Costume("door", "./Tiles/costumes/door.png", { x: 25, y: 30 }),
      new Costume("Rotten-Flesh", "./Tiles/costumes/Rotten-Flesh.png", {
        x: 33,
        y: 37,
      }),
      new Costume("door_top_closed", "./Tiles/costumes/door_top_closed.png", {
        x: 40,
        y: 40,
      }),
      new Costume(
        "door_bottom_closed",
        "./Tiles/costumes/door_bottom_closed.png",
        { x: 40, y: 40 }
      ),
      new Costume("Wool", "./Tiles/costumes/Wool.png", { x: 40, y: 40 }),
      new Costume("JackLant", "./Tiles/costumes/JackLant.png", {
        x: 40,
        y: 40,
      }),
      new Costume("bed", "./Tiles/costumes/bed.png", { x: 35, y: 37 }),
      new Costume("gun-powder", "./Tiles/costumes/gun-powder.png", {
        x: 30,
        y: 32,
      }),
      new Costume("Pickaxe Wood2", "./Tiles/costumes/Pickaxe Wood2.png", {
        x: 34,
        y: 30,
      }),
      new Costume("Stone-Pickaxe", "./Tiles/costumes/Stone-Pickaxe.png", {
        x: 33,
        y: 32,
      }),
      new Costume("Pickaxe Iron2", "./Tiles/costumes/Pickaxe Iron2.png", {
        x: 30,
        y: 30,
      }),
      new Costume("_pick2", "./Tiles/costumes/_pick2.png", { x: 42, y: 35 }),
      new Costume("_pick3", "./Tiles/costumes/_pick3.png", { x: 33, y: 36 }),
      new Costume("Shovel Wood2", "./Tiles/costumes/Shovel Wood2.png", {
        x: 34,
        y: 30,
      }),
      new Costume("Shovel Stone2", "./Tiles/costumes/Shovel Stone2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Shovel Iron2", "./Tiles/costumes/Shovel Iron2.png", {
        x: 30,
        y: 30,
      }),
      new Costume("_shovel2", "./Tiles/costumes/_shovel2.png", {
        x: 28,
        y: 30,
      }),
      new Costume("_shovel3", "./Tiles/costumes/_shovel3.png", {
        x: 34,
        y: 34,
      }),
      new Costume("Axe Wood2", "./Tiles/costumes/Axe Wood2.png", {
        x: 34,
        y: 34,
      }),
      new Costume("Axe Stone2", "./Tiles/costumes/Axe Stone2.png", {
        x: 30,
        y: 34,
      }),
      new Costume("Axe Iron2", "./Tiles/costumes/Axe Iron2.png", {
        x: 30,
        y: 34,
      }),
      new Costume("_axe2", "./Tiles/costumes/_axe2.png", { x: 33, y: 38 }),
      new Costume("_axe3", "./Tiles/costumes/_axe3.png", { x: 29, y: 33 }),
      new Costume("_sword6", "./Tiles/costumes/_sword6.png", { x: 40, y: 40 }),
      new Costume("_sword7", "./Tiles/costumes/_sword7.png", { x: 42, y: 42 }),
      new Costume("_sword8", "./Tiles/costumes/_sword8.png", { x: 44, y: 44 }),
      new Costume("_sword9", "./Tiles/costumes/_sword9.png", { x: 44, y: 44 }),
      new Costume("_sword10", "./Tiles/costumes/_sword10.png", {
        x: 44,
        y: 44,
      }),
      new Costume("torch2", "./Tiles/costumes/torch2.png", { x: 40, y: 48 }),
      new Costume("cake2", "./Tiles/costumes/cake2.png", { x: 43, y: 38 }),
      new Costume("sign", "./Tiles/costumes/sign.png", { x: 32, y: 30 }),
      new Costume("cactas", "./Tiles/costumes/cactas.png", { x: 39, y: 40 }),
      new Costume("glass2", "./Tiles/costumes/glass2.png", { x: 40, y: 40 }),
      new Costume("rose2", "./Tiles/costumes/rose2.png", { x: 16, y: 12 }),
      new Costume("mushroom-brown", "./Tiles/costumes/mushroom-brown.png", {
        x: 15,
        y: -11,
      }),
      new Costume("flower2", "./Tiles/costumes/flower2.png", { x: 14, y: -2 }),
      new Costume("mushroom1", "./Tiles/costumes/mushroom1.png", {
        x: 19,
        y: -11,
      }),
      new Costume("sugarcane2", "./Tiles/costumes/sugarcane2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("sapling2", "./Tiles/costumes/sapling2.png", {
        x: 51,
        y: 49,
      }),
      new Costume("Egg Sheep", "./Tiles/costumes/Egg Sheep.png", {
        x: 35,
        y: 40,
      }),
      new Costume("Egg Pig", "./Tiles/costumes/Egg Pig.png", { x: 33, y: 40 }),
      new Costume("Egg Zombie", "./Tiles/costumes/Egg Zombie.png", {
        x: 35,
        y: 40,
      }),
      new Costume("Egg Creeper", "./Tiles/costumes/Egg Creeper.png", {
        x: 35,
        y: 41,
      }),
      new Costume("bow", "./Tiles/costumes/bow.svg", { x: 18, y: 18 }),
      new Costume("bow2", "./Tiles/costumes/bow2.png", { x: 36, y: 40 }),
      new Costume("bow3", "./Tiles/costumes/bow3.png", { x: 36, y: 35 }),
      new Costume("bow4", "./Tiles/costumes/bow4.png", { x: 31, y: 30 }),
      new Costume("arrow", "./Tiles/costumes/arrow.png", { x: 32, y: 32 }),
      new Costume("wheat1", "./Tiles/costumes/wheat1.png", { x: 40, y: 40 }),
      new Costume("wheat2", "./Tiles/costumes/wheat2.png", { x: 40, y: 40 }),
      new Costume("wheat3", "./Tiles/costumes/wheat3.png", { x: 40, y: 40 }),
      new Costume("wheat4", "./Tiles/costumes/wheat4.png", { x: 40, y: 40 }),
      new Costume("wheat5", "./Tiles/costumes/wheat5.png", { x: 40, y: 40 }),
      new Costume("wheat6", "./Tiles/costumes/wheat6.png", { x: 40, y: 40 }),
      new Costume("wheat7", "./Tiles/costumes/wheat7.png", { x: 40, y: 40 }),
      new Costume("wheat8", "./Tiles/costumes/wheat8.png", { x: 40, y: 40 }),
      new Costume("Wheat-seeds", "./Tiles/costumes/Wheat-seeds.png", {
        x: 27,
        y: 22,
      }),
      new Costume("wheat", "./Tiles/costumes/wheat.png", { x: 36, y: 39 }),
      new Costume("farmland", "./Tiles/costumes/farmland.png", {
        x: 40,
        y: 40,
      }),
      new Costume("_hoe1", "./Tiles/costumes/_hoe1.png", { x: 30, y: 35 }),
      new Costume("_hoe2", "./Tiles/costumes/_hoe2.png", { x: 30, y: 35 }),
      new Costume("_hoe3", "./Tiles/costumes/_hoe3.png", { x: 30, y: 35 }),
      new Costume("_hoe4", "./Tiles/costumes/_hoe4.png", { x: 30, y: 35 }),
      new Costume("_hoe5", "./Tiles/costumes/_hoe5.png", { x: 30, y: 35 }),
      new Costume("Helmet2", "./Tiles/costumes/Helmet2.png", { x: 26, y: 23 }),
      new Costume("Helmet3", "./Tiles/costumes/Helmet3.svg", { x: 13, y: 12 }),
      new Costume("Helmet4", "./Tiles/costumes/Helmet4.svg", { x: 13, y: 12 }),
      new Costume("ChestPlate2", "./Tiles/costumes/ChestPlate2.svg", {
        x: 18,
        y: 17,
      }),
      new Costume("ChestPlate3", "./Tiles/costumes/ChestPlate3.svg", {
        x: 18,
        y: 17,
      }),
      new Costume("ChestPlate4", "./Tiles/costumes/ChestPlate4.png", {
        x: 35,
        y: 33,
      }),
      new Costume("Leggings2", "./Tiles/costumes/Leggings2.svg", {
        x: 13,
        y: 16,
      }),
      new Costume("Leggings3", "./Tiles/costumes/Leggings3.svg", {
        x: 12,
        y: 16,
      }),
      new Costume("Leggings4", "./Tiles/costumes/Leggings4.svg", {
        x: 13,
        y: 16,
      }),
      new Costume("bread", "./Tiles/costumes/bread.png", { x: 37, y: 36 }),
      new Costume("Leather", "./Tiles/costumes/Leather.svg", { x: 16, y: 18 }),
      new Costume("chicken", "./Tiles/costumes/chicken.svg", { x: 18, y: 21 }),
      new Costume("chicken-cooked", "./Tiles/costumes/chicken-cooked.png", {
        x: 36,
        y: 40,
      }),
      new Costume("egg", "./Tiles/costumes/egg.svg", { x: 15, y: 17 }),
      new Costume("feather", "./Tiles/costumes/feather.png", { x: 26, y: 29 }),
      new Costume("Bucket-Milk", "./Tiles/costumes/Bucket-Milk.png", {
        x: 31,
        y: 30,
      }),
      new Costume("sugar", "./Tiles/costumes/sugar.png", { x: 31, y: 26 }),
      new Costume("string", "./Tiles/costumes/string.png", { x: 34, y: 35 }),
      new Costume("raw beef", "./Tiles/costumes/raw beef.png", {
        x: 33,
        y: 34,
      }),
      new Costume("steak", "./Tiles/costumes/steak.png", { x: 34, y: 34 }),
      new Costume("Spawn_Chicken", "./Tiles/costumes/Spawn_Chicken.png", {
        x: 35,
        y: 42,
      }),
      new Costume("Spawn_Cow", "./Tiles/costumes/Spawn_Cow.png", {
        x: 35,
        y: 40,
      }),
      new Costume("PistonN", "./Tiles/costumes/PistonN.png", { x: 40, y: 40 }),
      new Costume("PistonN2", "./Tiles/costumes/PistonN2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("PistonN3", "./Tiles/costumes/PistonN3.png", {
        x: 40,
        y: 40,
      }),
      new Costume("pressure plate", "./Tiles/costumes/pressure plate.png", {
        x: 36,
        y: -30,
      }),
      new Costume("bone", "./Tiles/costumes/bone.png", { x: 35, y: 35 }),
      new Costume("bonemeal", "./Tiles/costumes/bonemeal.png", {
        x: 35,
        y: 35,
      }),
      new Costume("Spawn_Spider", "./Tiles/costumes/Spawn_Spider.png", {
        x: 36,
        y: 40,
      }),
      new Costume("Spawn_Skeleton", "./Tiles/costumes/Spawn_Skeleton.png", {
        x: 35,
        y: 41,
      }),
      new Costume("repeater", "./Tiles/costumes/repeater.png", {
        x: 32,
        y: -12,
      }),
      new Costume("repeaterOn2", "./Tiles/costumes/repeaterOn2.png", {
        x: 32,
        y: -8,
      }),
      new Costume("repeater2", "./Tiles/costumes/repeater2.png", {
        x: 32,
        y: -12,
      }),
      new Costume("repeaterOn", "./Tiles/costumes/repeaterOn.png", {
        x: 32,
        y: -8,
      }),
      new Costume("repeater3", "./Tiles/costumes/repeater3.png", {
        x: 32,
        y: -12,
      }),
      new Costume("repeaterOn3", "./Tiles/costumes/repeaterOn3.png", {
        x: 32,
        y: -8,
      }),
      new Costume("repeater4", "./Tiles/costumes/repeater4.png", {
        x: 32,
        y: -12,
      }),
      new Costume("repeaterOn4", "./Tiles/costumes/repeaterOn4.png", {
        x: 32,
        y: -8,
      }),
      new Costume("PistonS", "./Tiles/costumes/PistonS.png", { x: 40, y: 40 }),
      new Costume("PistonS2", "./Tiles/costumes/PistonS2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("PistonS3", "./Tiles/costumes/PistonS3.png", {
        x: 40,
        y: 40,
      }),
      new Costume("repeater11", "./Tiles/costumes/repeater11.png", {
        x: 32,
        y: 8,
      }),
      new Costume("repeater12", "./Tiles/costumes/repeater12.png", {
        x: 32,
        y: 8,
      }),
      new Costume("repeater5", "./Tiles/costumes/repeater5.png", {
        x: 32,
        y: 0,
      }),
      new Costume("repeater6", "./Tiles/costumes/repeater6.png", {
        x: 32,
        y: 0,
      }),
      new Costume("repeater7", "./Tiles/costumes/repeater7.png", {
        x: 32,
        y: 0,
      }),
      new Costume("repeater9", "./Tiles/costumes/repeater9.png", {
        x: 32,
        y: 0,
      }),
      new Costume("repeater8", "./Tiles/costumes/repeater8.png", {
        x: 32,
        y: 0,
      }),
      new Costume("repeater10", "./Tiles/costumes/repeater10.png", {
        x: 32,
        y: 0,
      }),
      new Costume("redstone ore", "./Tiles/costumes/redstone ore.png", {
        x: 40,
        y: 40,
      }),
      new Costume("redstone", "./Tiles/costumes/redstone.png", {
        x: 30,
        y: 25,
      }),
      new Costume("irondoor", "./Tiles/costumes/irondoor.svg", {
        x: 13,
        y: 18,
      }),
      new Costume("irondoor_top", "./Tiles/costumes/irondoor_top.png", {
        x: 40,
        y: 40,
      }),
      new Costume("irondoorBottom", "./Tiles/costumes/irondoorBottom.png", {
        x: 40,
        y: 40,
      }),
      new Costume(
        "irondoor_top_closed",
        "./Tiles/costumes/irondoor_top_closed.png",
        { x: 30, y: 40 }
      ),
      new Costume(
        "irondoor_bottom_closed",
        "./Tiles/costumes/irondoor_bottom_closed.png",
        { x: 30, y: 40 }
      ),
      new Costume("Grid_Fire-0", "./Tiles/costumes/Grid_Fire-0.png", {
        x: 36,
        y: 26,
      }),
      new Costume("Grid_Fire-12", "./Tiles/costumes/Grid_Fire-12.png", {
        x: 40,
        y: 35,
      }),
      new Costume("Grid_Fire-28", "./Tiles/costumes/Grid_Fire-28.png", {
        x: 40,
        y: 25,
      }),
      new Costume("PistonE", "./Tiles/costumes/PistonE.png", { x: 40, y: 40 }),
      new Costume("PistonE2", "./Tiles/costumes/PistonE2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("PistonE3", "./Tiles/costumes/PistonE3.png", {
        x: 40,
        y: 40,
      }),
      new Costume("PistonW", "./Tiles/costumes/PistonW.png", { x: 40, y: 40 }),
      new Costume("PistonW2", "./Tiles/costumes/PistonW2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("PistonW3", "./Tiles/costumes/PistonW3.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Pressure-Block", "./Tiles/costumes/Pressure-Block.png", {
        x: 40,
        y: 40,
      }),
      new Costume("wtr_l9", "./Tiles/costumes/wtr_l9.png", { x: 40, y: 40 }),
      new Costume("wtr_l10", "./Tiles/costumes/wtr_l10.png", { x: 40, y: 40 }),
      new Costume("wtr_l11", "./Tiles/costumes/wtr_l11.png", { x: 40, y: 40 }),
      new Costume("wtr_l12", "./Tiles/costumes/wtr_l12.png", { x: 40, y: 40 }),
      new Costume("wtr_l13", "./Tiles/costumes/wtr_l13.png", { x: 40, y: 40 }),
      new Costume("wtr_l14", "./Tiles/costumes/wtr_l14.png", { x: 40, y: 40 }),
      new Costume("wtr_l16", "./Tiles/costumes/wtr_l16.png", { x: 40, y: 40 }),
      new Costume("wtr_l15", "./Tiles/costumes/wtr_l15.png", { x: 40, y: 40 }),
      new Costume("wtr_r10", "./Tiles/costumes/wtr_r10.png", { x: 40, y: 40 }),
      new Costume("wtr_r9", "./Tiles/costumes/wtr_r9.png", { x: 40, y: 40 }),
      new Costume("wtr_r11", "./Tiles/costumes/wtr_r11.png", { x: 40, y: 40 }),
      new Costume("wtr_r12", "./Tiles/costumes/wtr_r12.png", { x: 40, y: 40 }),
      new Costume("wtr_r13", "./Tiles/costumes/wtr_r13.png", { x: 40, y: 40 }),
      new Costume("wtr_r14", "./Tiles/costumes/wtr_r14.png", { x: 40, y: 40 }),
      new Costume("wtr_r15", "./Tiles/costumes/wtr_r15.png", { x: 40, y: 40 }),
      new Costume("wtr_r16", "./Tiles/costumes/wtr_r16.png", { x: 40, y: 40 }),
      new Costume("lava_l9", "./Tiles/costumes/lava_l9.png", { x: 40, y: -30 }),
      new Costume("lava_l12", "./Tiles/costumes/lava_l12.png", {
        x: 40,
        y: -20,
      }),
      new Costume("lava_l11", "./Tiles/costumes/lava_l11.png", {
        x: 40,
        y: -10,
      }),
      new Costume("lava_l10", "./Tiles/costumes/lava_l10.png", { x: 40, y: 0 }),
      new Costume("lava_l14", "./Tiles/costumes/lava_l14.png", {
        x: 40,
        y: 10,
      }),
      new Costume("lava_l15", "./Tiles/costumes/lava_l15.png", {
        x: 40,
        y: 20,
      }),
      new Costume("lava_l13", "./Tiles/costumes/lava_l13.png", {
        x: 40,
        y: 30,
      }),
      new Costume("lava_l16", "./Tiles/costumes/lava_l16.png", {
        x: 40,
        y: 40,
      }),
      new Costume("lava_r10", "./Tiles/costumes/lava_r10.png", {
        x: 40,
        y: -30,
      }),
      new Costume("lava_r12", "./Tiles/costumes/lava_r12.png", {
        x: 40,
        y: -20,
      }),
      new Costume("lava_r9", "./Tiles/costumes/lava_r9.png", { x: 40, y: -10 }),
      new Costume("lava_r11", "./Tiles/costumes/lava_r11.png", { x: 40, y: 0 }),
      new Costume("lava_r15", "./Tiles/costumes/lava_r15.png", {
        x: 40,
        y: 10,
      }),
      new Costume("lava_r14", "./Tiles/costumes/lava_r14.png", {
        x: 40,
        y: 20,
      }),
      new Costume("lava_r16", "./Tiles/costumes/lava_r16.png", {
        x: 40,
        y: 30,
      }),
      new Costume("lava_r13", "./Tiles/costumes/lava_r13.png", {
        x: 40,
        y: 40,
      }),
      new Costume(
        "woodenplanks_spruce",
        "./Tiles/costumes/woodenplanks_spruce.png",
        { x: 40, y: 40 }
      ),
      new Costume(
        "woodenplanks_jungle",
        "./Tiles/costumes/woodenplanks_jungle.png",
        { x: 40, y: 40 }
      ),
      new Costume(
        "woodenplanks_birch",
        "./Tiles/costumes/woodenplanks_birch.png",
        { x: 40, y: 40 }
      ),
      new Costume("stair_l_cobble", "./Tiles/costumes/stair_l_cobble.png", {
        x: 40,
        y: 40,
      }),
      new Costume("stair_r_cobble", "./Tiles/costumes/stair_r_cobble.png", {
        x: 40,
        y: 40,
      }),
      new Costume("stair_l_wood", "./Tiles/costumes/stair_l_wood.png", {
        x: 40,
        y: 40,
      }),
      new Costume("stair_r_wood", "./Tiles/costumes/stair_r_wood.png", {
        x: 40,
        y: 40,
      }),
      new Costume("stair_l_stone", "./Tiles/costumes/stair_l_stone.png", {
        x: 40,
        y: 40,
      }),
      new Costume("stair_r_stone", "./Tiles/costumes/stair_r_stone.png", {
        x: 40,
        y: 40,
      }),
      new Costume("fence", "./Tiles/costumes/fence.png", { x: 40, y: 40 }),
      new Costume("torch_l", "./Tiles/costumes/torch_l.png", { x: 40, y: 26 }),
      new Costume("torch_r", "./Tiles/costumes/torch_r.png", { x: -8, y: 26 }),
      new Costume("web", "./Tiles/costumes/web.png", { x: 40, y: 40 }),
      new Costume("iron-block", "./Tiles/costumes/iron-block.png", {
        x: 40,
        y: 40,
      }),
      new Costume("gold-block", "./Tiles/costumes/gold-block.png", {
        x: 40,
        y: 40,
      }),
      new Costume("diamond-block", "./Tiles/costumes/diamond-block.png", {
        x: 40,
        y: 40,
      }),
      new Costume("redstone-block", "./Tiles/costumes/redstone-block.png", {
        x: 40,
        y: 40,
      }),
      new Costume(
        "redstone-block-active",
        "./Tiles/costumes/redstone-block-active.png",
        { x: 40, y: 40 }
      ),
      new Costume("Mushroom-Red", "./Tiles/costumes/Mushroom-Red.png", {
        x: 40,
        y: 40,
      }),
      new Costume(
        "Mushroom-Red_Stalk",
        "./Tiles/costumes/Mushroom-Red_Stalk.png",
        { x: 40, y: 40 }
      ),
      new Costume("Mushroom-Brown2", "./Tiles/costumes/Mushroom-Brown2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("glowstone", "./Tiles/costumes/glowstone.png", {
        x: 40,
        y: 40,
      }),
      new Costume("netherrack", "./Tiles/costumes/netherrack.png", {
        x: 40,
        y: 40,
      }),
      new Costume("soulsand", "./Tiles/costumes/soulsand.png", {
        x: 40,
        y: 40,
      }),
      new Costume("levelOffS", "./Tiles/costumes/levelOffS.png", {
        x: 35,
        y: 8,
      }),
      new Costume("levelOnS", "./Tiles/costumes/levelOnS.png", { x: 20, y: 8 }),
      new Costume("levelOffW", "./Tiles/costumes/levelOffW.png", {
        x: 40,
        y: 36,
      }),
      new Costume("levelOnW", "./Tiles/costumes/levelOnW.png", {
        x: 40,
        y: 20,
      }),
      new Costume("levelOffE", "./Tiles/costumes/levelOffE.png", {
        x: 7,
        y: 36,
      }),
      new Costume("levelOnE", "./Tiles/costumes/levelOnE.png", { x: 7, y: 20 }),
      new Costume("trapdoor", "./Tiles/costumes/trapdoor.png", {
        x: 40,
        y: 40,
      }),
      new Costume("trapdoorClosed", "./Tiles/costumes/trapdoorClosed.png", {
        x: 40,
        y: 40,
      }),
      new Costume("trapdoorOpen", "./Tiles/costumes/trapdoorOpen.png", {
        x: 40,
        y: 40,
      }),
      new Costume("NetherPortal", "./Tiles/costumes/NetherPortal.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Crown-Gold", "./Tiles/costumes/Crown-Gold.png", {
        x: 35,
        y: 17,
      }),
      new Costume("moss_stone", "./Tiles/costumes/moss_stone.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Emerald_Ore", "./Tiles/costumes/Emerald_Ore.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Emerald", "./Tiles/costumes/Emerald.png", { x: 27, y: 34 }),
      new Costume("Emerald_block", "./Tiles/costumes/Emerald_block.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Grid_Spawn_Wolf", "./Tiles/costumes/Grid_Spawn_Wolf.png", {
        x: 35,
        y: 44,
      }),
      new Costume("leaves3", "./Tiles/costumes/leaves3.png", { x: 40, y: 40 }),
      new Costume("ladder2", "./Tiles/costumes/ladder2.png", { x: 40, y: 40 }),
      new Costume("sapling3", "./Tiles/costumes/sapling3.png", {
        x: 40,
        y: 40,
      }),
      new Costume("sapling spruce2", "./Tiles/costumes/sapling spruce2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("sapling birch2", "./Tiles/costumes/sapling birch2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("sapling jungle2", "./Tiles/costumes/sapling jungle2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("tall grass i2", "./Tiles/costumes/tall grass i2.png", {
        x: 44,
        y: 40,
      }),
      new Costume("Leaves Birch 3", "./Tiles/costumes/Leaves Birch 3.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Leaves Spruce 3", "./Tiles/costumes/Leaves Spruce 3.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Leaves Jungle 3", "./Tiles/costumes/Leaves Jungle 3.png", {
        x: 41,
        y: 40,
      }),
      new Costume("sign2", "./Tiles/costumes/sign2.png", { x: 40, y: 40 }),
      new Costume("cactas2", "./Tiles/costumes/cactas2.png", { x: 40, y: 40 }),
      new Costume("glass3", "./Tiles/costumes/glass3.png", { x: 40, y: 40 }),
      new Costume("rose3", "./Tiles/costumes/rose3.png", { x: 40, y: 40 }),
      new Costume("mushroom-brown3", "./Tiles/costumes/mushroom-brown3.png", {
        x: 40,
        y: 40,
      }),
      new Costume("flower3", "./Tiles/costumes/flower3.png", { x: 40, y: 40 }),
      new Costume("mushroom2", "./Tiles/costumes/mushroom2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("sugarcane3", "./Tiles/costumes/sugarcane3.png", {
        x: 40,
        y: 40,
      }),
      new Costume("Axe Wood3", "./Tiles/costumes/Axe Wood3.png", {
        x: 30,
        y: 24,
      }),
      new Costume("Axe Stone3", "./Tiles/costumes/Axe Stone3.png", {
        x: 30,
        y: 24,
      }),
      new Costume("Axe Iron3", "./Tiles/costumes/Axe Iron3.png", {
        x: 30,
        y: 25,
      }),
      new Costume("_axe4", "./Tiles/costumes/_axe4.png", { x: 34, y: 27 }),
      new Costume("_axe5", "./Tiles/costumes/_axe5.png", { x: 29, y: 23 }),
      new Costume("houseling", "./Tiles/costumes/houseling.png", {
        x: 32,
        y: 8,
      }),
      new Costume("fence post", "./Tiles/costumes/fence post.png", {
        x: 10,
        y: 40,
      }),
      new Costume(
        "Spawn Zombie Pigman",
        "./Tiles/costumes/Spawn Zombie Pigman.png",
        { x: 35, y: 40 }
      ),
      new Costume("Spawn Villager", "./Tiles/costumes/Spawn Villager.png", {
        x: 35,
        y: 40,
      }),
      new Costume("Spawn Enderman", "./Tiles/costumes/Spawn Enderman.png", {
        x: 35,
        y: 40,
      }),
      new Costume("snow_layer", "./Tiles/costumes/snow_layer.png", {
        x: 40,
        y: 40,
      }),
      new Costume("grass-snow", "./Tiles/costumes/grass-snow.png", {
        x: 40,
        y: 40,
      }),
      new Costume("snow", "./Tiles/costumes/snow.png", { x: 40, y: 40 }),
      new Costume("snow layer", "./Tiles/costumes/snow layer.png", {
        x: 40,
        y: -30,
      }),
      new Costume("snowball", "./Tiles/costumes/snowball.png", {
        x: 30,
        y: 30,
      }),
      new Costume("ice", "./Tiles/costumes/ice.png", { x: 40, y: 40 }),
      new Costume("stair_l_cobble_p", "./Tiles/costumes/stair_l_cobble_p.png", {
        x: 40,
        y: 40,
      }),
      new Costume("costume1", "./Tiles/costumes/costume1.png", {
        x: 40,
        y: 40,
      }),
      new Costume("costume2", "./Tiles/costumes/costume2.png", {
        x: 40,
        y: 40,
      }),
      new Costume("costume3", "./Tiles/costumes/costume3.png", {
        x: 40,
        y: 40,
      }),
      new Costume("BIG", "./Tiles/costumes/BIG.png", { x: 80, y: 80 }),
    ];

    this.sounds = [new Sound("meow", "./Tiles/sounds/meow.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animate" },
        this.whenIReceiveAnimate
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "switch mode" },
        this.whenIReceiveSwitchMode
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "rearrange gui" },
        this.whenIReceiveRearrangeGui
      ),
      new Trigger(Trigger.BROADCAST, { name: "go" }, this.whenIReceiveGo),
      new Trigger(
        Trigger.BROADCAST,
        { name: "post chunk load" },
        this.whenIReceivePostChunkLoad
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "init1b" },
        this.whenIReceiveInit1b
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "lighting mode change" },
        this.whenIReceiveLightingModeChange
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "green flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.ix = -337.5;
    this.vars.iy = -337.5;
    this.vars.x = -17.011515185;
    this.vars.y = -1.4792878105000007;
    this.vars.c = 289;
    this.vars.light = 16;
    this.vars.cloneasid = -5;
    this.vars.sx = -0.04244020793633281;
    this.vars.sy = 0.0677983107016592;
    this.vars.lightmod = 0;
    this.vars.count = 1;
    this.vars.wait = 285.353;
    this.vars.maxstack = 0;
    this.vars.iT = -1;
    this.vars.refidxT = 656;
    this.vars.iIi = 0;
    this.vars.stuckin = 0;
    this.vars.tTileidx = 0;
    this.vars.tIlumtmp = 0;
    this.vars.offsetIi = 196;
    this.vars.show = 1;
  }

  *startAsClone() {
    this.stage.vars.Spritecount++;
    if (this.compare(this.vars.iIi, 0) > 0) {
      yield* this.setInvPosition(this.x, this.y, !null, 1);
    } else {
      if (this.toNumber(this.vars.cloneasid) === 0) {
        yield* this.translate(0, 0);
      } else {
        this.vars.iT = this.vars.cloneasid;
        yield* this.initHarvested();
      }
    }
  }

  *whenIReceiveAnimate() {
    if (this.compare(this.vars.iIi, 0) > 0) {
      yield* this.updateInvBlocks();
    } else {
      if (this.compare(this.vars.iT, -1) > 0) {
        yield* this.draw();
      } else {
        if (this.compare(this.vars.iT, -1) < 0) {
          yield* this.processAndDrawItem();
        } else {
          yield* this.processHarvestList();
          if (this.toNumber(this.stage.vars.Nextselid) === 0) {
            yield* this.drawHeld(".");
          } else {
            if (!(this.letterOf(this.stage.vars.Mode, 0) === "x")) {
              yield* this.changeSelection(this.stage.vars.Nextselid, 0);
              this.stage.vars.Nextselid = 0;
            }
          }
        }
      }
    }
  }

  *doSuck(x, y) {
    if (
      this.toNumber(this.vars.wait) === 0 ||
      (this.compare(this.timer, this.vars.wait) > 0 &&
        !(this.toNumber(this.sprites["Steve"].vars.Sx) === 0))
    ) {
      this.vars.wait = 0;
      this.warp(this.getInvidForTile)(this.vars.c, this.vars.count);
      if (this.compare(this.vars.ix, 0) > 0) {
        this.vars.refidxT =
          Math.abs(this.toNumber(x)) + Math.abs(this.toNumber(y));
        if (this.compare(this.vars.refidxT, 2) < 0) {
          if (
            this.compare(Math.abs(this.toNumber(x)), 0.25) < 0 &&
            this.compare(Math.abs(this.toNumber(y)), 0.9) < 0
          ) {
            if (
              !(
                this.compare(
                  this.itemOf(
                    this.stage.vars.Inv,
                    this.toNumber(this.vars.ix) * 2 - 2
                  ),
                  this.vars.c
                ) === 0
              )
            ) {
              this.stage.vars.Inv.splice(
                this.toNumber(this.vars.ix) * 2 - 2,
                1,
                this.vars.c
              );
              if (this.compare(this.vars.ix, this.stage.vars.Heldinvid) === 0) {
                this.stage.vars.Nextselid = this.vars.ix;
              }
            }
            this.stage.vars.Inv.splice(
              this.toNumber(this.vars.ix) * 2 - 1,
              1,
              this.toNumber(this.vars.count) +
                this.toNumber(
                  this.itemOf(
                    this.stage.vars.Inv,
                    this.toNumber(this.vars.ix) * 2 - 1
                  )
                )
            );
            if (
              !(
                this.compare(
                  this.itemOf(
                    this.stage.vars.Inv,
                    this.toNumber(this.vars.ix) * 2 - 1
                  ),
                  this.vars.maxstack
                ) > 0
              ) ||
              this.compare(this.vars.maxstack, 0) < 0
            ) {
              this.broadcast("update inventory");
              this.stage.vars.Spritecount--;
              this.deleteThisClone();
            } else {
              this.vars.count =
                this.toNumber(
                  this.itemOf(
                    this.stage.vars.Inv,
                    this.toNumber(this.vars.ix) * 2 - 1
                  )
                ) - this.toNumber(this.vars.maxstack);
              this.stage.vars.Inv.splice(
                this.toNumber(this.vars.ix) * 2 - 1,
                1,
                this.vars.maxstack
              );
            }
          }
          if (this.toNumber(this.vars.stuckin) === 0) {
            this.vars.sx =
              (this.toNumber(x) / this.toNumber(this.vars.refidxT)) * 0.2;
            this.vars.sy =
              (this.toNumber(y) / this.toNumber(this.vars.refidxT)) * 0.2;
            this.vars.sy += 0.04;
          }
        }
      }
    }
  }

  *processAndDrawItem() {
    if (
      this.toNumber(this.stage.vars.Mode) === 0 ||
      this.toString(this.stage.vars.Mode) === "S"
    ) {
      this.vars.tIlumtmp =
        (this.toNumber(this.vars.y) - this.toNumber(this.stage.vars.Scry)) * 40;
      if (
        this.toNumber(this.vars.stuckin) === 0 &&
        !(this.toNumber(this.vars.c) === 132)
      ) {
        this.vars.tIlumtmp +=
          4 *
          Math.sin(
            this.degToRad(
              200 *
                (this.toNumber(this.vars.cloneasid) +
                  this.toNumber(this.stage.vars.Timereal))
            )
          );
      }
      this.warp(this.draworhide)(
        Math.floor(
          (this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.Scrx)) *
            40
        ),
        Math.floor(this.toNumber(this.vars.tIlumtmp))
      );
    } else {
      if (this.toNumber(this.vars.show) === 1) {
        this.visible = false;
        this.vars.show = 0;
      }
    }
    for (let i = 0; i < this.toNumber(this.stage.vars.Ticks); i++) {
      if (
        this.compare(this.stage.vars.Maxharvest, this.vars.cloneasid) < 0 ||
        this.compare(this.vars.stuckin, 0) < 0
      ) {
        this.stage.vars.Spritecount--;
        this.deleteThisClone();
      }
      if (this.toNumber(this.vars.c) === 132) {
        this.warp(this.doArrowInFlight)();
      } else {
        if (this.toNumber(this.vars.stuckin) === 0) {
          this.vars.x += this.toNumber(this.vars.sx);
          this.warp(this.isblockT)(
            this.vars.x,
            this.toNumber(this.vars.y) - 0.4
          );
          if (this.compare(this.vars.refidxT, 0) > 0) {
            this.vars.sx = 0 - this.toNumber(this.vars.sx);
            this.vars.x += this.toNumber(this.vars.sx);
          }
          this.vars.refidxT = this.itemOf(
            this.stage.vars.Level,
            this.vars.tTileidx - 1
          );
          if (
            this.compare(
              this.itemOf(
                this.stage.vars.BlockData,
                this.toNumber(this.vars.refidxT) *
                  this.toNumber(this.stage.vars.Dmul) +
                  13
              ),
              0
            ) > 0
          ) {
            this.stage.vars.Spritecount--;
            this.deleteThisClone();
          }
          this.vars.refidxT = this.itemOf(
            this.stage.vars.BlockData,
            this.toNumber(this.vars.refidxT) *
              this.toNumber(this.stage.vars.Dmul) +
              6
          );
          if (
            this.toString(this.vars.refidxT) === "D" ||
            this.toString(this.vars.refidxT) === "."
          ) {
            this.vars.refidxT = this.itemOf(
              this.stage.vars.Level,
              this.toNumber(this.vars.tTileidx) - 2
            );
            this.vars.refidxT = this.itemOf(
              this.stage.vars.BlockData,
              this.toNumber(this.vars.refidxT) *
                this.toNumber(this.stage.vars.Dmul) +
                6
            );
            if (!(this.toString(this.vars.refidxT) === "L")) {
              this.vars.refidxT = this.itemOf(
                this.stage.vars.Level,
                this.toNumber(this.vars.tTileidx)
              );
              this.vars.refidxT = this.itemOf(
                this.stage.vars.BlockData,
                this.toNumber(this.vars.refidxT) *
                  this.toNumber(this.stage.vars.Dmul) +
                  6
              );
              if (!(this.toString(this.vars.refidxT) === "R")) {
                this.vars.refidxT = "N";
              }
            }
          }
          if (this.toString(this.vars.refidxT) === "L") {
            this.vars.sx = -0.1;
          } else {
            if (this.toString(this.vars.refidxT) === "R") {
              this.vars.sx = 0.1;
            }
          }
          this.vars.sy -= 0.03;
          if (this.compare(this.vars.sy, -0.6) < 0) {
            this.vars.sy = -0.6;
          }
          this.vars.y += this.toNumber(this.vars.sy);
          this.warp(this.isblockT)(
            this.vars.x,
            this.toNumber(this.vars.y) - 0.4
          );
          if (this.compare(this.vars.refidxT, 0) > 0) {
            if (this.compare(this.vars.sy, 0) < 0) {
              this.vars.y = Math.floor(this.toNumber(this.vars.y) - 0.4) + 1.41;
              this.vars.sy = 0;
              this.vars.sx = this.toNumber(this.vars.sx) * 0.5;
            } else {
              this.vars.sx = this.toNumber(this.vars.sx) * 0.5;
            }
            this.warp(this.isblockT)(
              this.vars.x,
              this.toNumber(this.vars.y) - 0.4
            );
            if (this.compare(this.vars.refidxT, 0) > 0) {
              this.vars.y++;
            }
          }
        } else {
          this.vars.refidxT = this.itemOf(
            this.stage.vars.Level,
            this.vars.stuckin - 1
          );
          if (
            !(
              this.toString(
                this.itemOf(
                  this.stage.vars.BlockData,
                  this.toNumber(this.vars.refidxT) *
                    this.toNumber(this.stage.vars.Dmul) +
                    2
                )
              ) === "Y"
            )
          ) {
            this.vars.stuckin = 0;
          }
        }
        if (this.compare(this.stage.vars.HealthS, 0) > 0) {
          this.warp(this.doSuck)(
            this.toNumber(this.stage.vars.X) - this.toNumber(this.vars.x),
            this.toNumber(this.stage.vars.Y) - this.toNumber(this.vars.y)
          );
        }
      }
    }
    this.warp(this.getIllumination)(
      Math.floor(this.toNumber(this.vars.y)) *
        this.toNumber(this.stage.vars.Lsx) +
        Math.floor(this.toNumber(this.vars.x)) +
        1
    );
    if (this.toNumber(this.stage.vars.Lighting) === 1) {
      if (!(this.compare(this.vars.light, this.vars.lightmod) === 0)) {
        this.vars.light = this.vars.lightmod;
        this.effects.brightness = this.toNumber(
          this.itemOf(this.stage.vars.Gamma, this.toNumber(this.vars.light))
        );
      }
    } else {
      this.vars.light = this.vars.lightmod;
      if (this.toNumber(this.vars.light) === 0) {
        if (this.toNumber(this.vars.show) === 1) {
          this.visible = false;
          this.vars.show = 0;
        }
      }
    }
  }

  *doActiveBlock() {
    this.vars.ix = 20;
    this.vars.iy = 20;
    this.vars.refidxT = this.itemOf(this.stage.vars.Levelref, this.vars.iT - 1);
    if (this.toNumber(this.vars.refidxT) === 0) {
      return;
    }
    if (
      "f" ===
      this.toString(
        this.itemOf(this.stage.vars.Refdata, this.toNumber(this.vars.refidxT))
      )
    ) {
      this.vars.iy +=
        40 *
        this.toNumber(
          this.itemOf(
            this.stage.vars.Refdata,
            this.toNumber(this.vars.refidxT) + 1
          )
        );
    }
  }

  *getInvidForTile(tile, count) {
    this.vars.ix = 1;
    this.warp(this.getStackLimit)(tile);
    for (let i = 0; i < 36; i++) {
      if (
        this.compare(
          tile,
          this.itemOf(this.stage.vars.Inv, this.toNumber(this.vars.ix) * 2 - 2)
        ) === 0
      ) {
        if (this.compare(this.vars.maxstack, 0) < 0) {
          if (
            this.toNumber(
              this.itemOf(
                this.stage.vars.Inv,
                this.toNumber(this.vars.ix) * 2 - 1
              )
            ) === 0
          ) {
            return;
          }
        } else {
          if (
            this.compare(
              this.itemOf(
                this.stage.vars.Inv,
                this.toNumber(this.vars.ix) * 2 - 1
              ),
              this.vars.maxstack
            ) < 0
          ) {
            return;
          }
        }
      }
      this.vars.ix++;
    }
    this.vars.ix = 1;
    for (let i = 0; i < 36; i++) {
      if (
        0 ===
        this.toNumber(
          this.itemOf(this.stage.vars.Inv, this.toNumber(this.vars.ix) * 2 - 1)
        )
      ) {
        return;
      }
      this.vars.ix++;
    }
    this.vars.ix = 0;
  }

  *updateInvBlocks() {
    if (
      this.toNumber(this.vars.stuckin) === 0 ||
      ((this.toNumber(this.stage.vars.Mode) === 0 ||
        this.toString(this.stage.vars.Mode) === "S") &&
        this.compare(this.vars.stuckin, 9) > 0)
    ) {
      if (this.compare(this.stage.vars.Tooltipid, this.vars.iIi) === 0) {
        this.stage.vars.Tooltipid = 0;
        this.think("");
      }
      if (this.toNumber(this.vars.show) === 1) {
        this.visible = false;
        this.vars.show = 0;
      }
      this.vars.c = "#";
    } else {
      if (
        this.toNumber(this.vars.iIi) === 64 &&
        this.compare(
          this.itemOf(
            this.stage.vars.Inv,
            this.toNumber(this.vars.stuckin) * 2 - 1
          ),
          0
        ) > 0
      ) {
        this.warp(this.setInvPosition)(this.mouse.x, this.mouse.y, 0, 86);
      }
      if (
        !(
          this.compare(
            this.vars.c,
            this.itemOf(
              this.stage.vars.Inv,
              this.toNumber(this.vars.stuckin) * 2 - 2
            )
          ) === 0
        )
      ) {
        this.vars.c = this.itemOf(
          this.stage.vars.Inv,
          this.toNumber(this.vars.stuckin) * 2 - 2
        );
        if (this.toString(this.vars.c) === "#") {
          if (this.toNumber(this.vars.show) === 1) {
            this.visible = false;
            this.vars.show = 0;
          }
        } else {
          this.costume = this.itemOf(
            this.stage.vars.BlockData,
            this.toNumber(this.vars.c) * this.toNumber(this.stage.vars.Dmul) +
              16
          );
          if (this.toNumber(this.vars.show) === 0) {
            this.visible = true;
            this.vars.show = 1;
          }
        }
      }
      if (this.compare(this.vars.iIi, 64) < 0) {
        if (
          !(this.toString(this.vars.c) === "#") &&
          !this.mouse.down &&
          this.compare(Math.abs(this.mouse.x - this.x), 18) < 0 &&
          this.compare(Math.abs(this.mouse.y - this.y), 18) < 0
        ) {
          if (this.compare(this.stage.vars.Tooltipid, this.vars.iIi) === 0) {
            if (this.compare(this.stage.vars.Tooltipwait, 15) < 0) {
              this.stage.vars.Tooltipwait += this.toNumber(
                this.stage.vars.Ticks
              );
            } else {
              if (this.compare(this.stage.vars.Tooltipwait, 100) < 0) {
                this.think(
                  this.itemOf(
                    this.stage.vars.BlockData,
                    this.toNumber(this.vars.c) *
                      this.toNumber(this.stage.vars.Dmul) +
                      1
                  )
                );
                this.stage.vars.Tooltipwait = 100;
              }
            }
          } else {
            if (this.toNumber(this.stage.vars.Tooltipid) === 0) {
              this.stage.vars.Tooltipid = this.vars.iIi;
              this.stage.vars.Tooltipwait = 0;
            }
          }
        } else {
          if (this.compare(this.stage.vars.Tooltipid, this.vars.iIi) === 0) {
            this.stage.vars.Tooltipid = 0;
            this.think("");
          }
        }
      }
    }
  }

  *whenIReceiveSwitchMode() {
    if (this.compare(this.vars.iIi, 0) > 0) {
      this.moveAhead();
    }
  }

  *drawHeld(changeto) {
    if (this.toNumber(this.vars.iT) === -1) {
      if (!(this.toString(changeto) === ".")) {
        this.stage.vars.Heldc = changeto;
        this.vars.iy = 99999;
        if (
          this.toNumber(
            this.itemOf(
              this.stage.vars.BlockData,
              this.toNumber(this.stage.vars.Heldc) *
                this.toNumber(this.stage.vars.Dmul) +
                9
            )
          ) === 1
        ) {
          if (this.toNumber(this.stage.vars.Lastdir) === -90) {
            this.costume = this.itemOf(
              this.stage.vars.BlockData,
              this.toNumber(this.stage.vars.Heldc) *
                this.toNumber(this.stage.vars.Dmul) +
                15
            );
          } else {
            this.costume = this.itemOf(
              this.stage.vars.BlockData,
              this.toNumber(this.stage.vars.Heldc) *
                this.toNumber(this.stage.vars.Dmul) +
                16
            );
          }
          this.size = 65;
        } else {
          this.costume = this.itemOf(
            this.stage.vars.BlockData,
            this.toNumber(this.stage.vars.Heldc) *
              this.toNumber(this.stage.vars.Dmul) +
              16
          );
          this.size = 40;
        }
        this.vars.light = -1;
        this.moveAhead();
        this.broadcast("arm to front");
      }
      if (
        this.toString(this.stage.vars.Heldc) === "#" ||
        !(this.toNumber(this.stage.vars.Mode) === 0)
      ) {
        if (this.toNumber(this.vars.show) === 1) {
          this.visible = false;
          this.vars.show = 0;
        }
      } else {
        if (this.toNumber(this.vars.show) === 0) {
          this.visible = true;
          this.vars.show = 1;
        }
        if (this.toNumber(this.stage.vars.Heldc) === 130) {
          this.vars.refidxT = this.toNumber(this.stage.vars.Armframe) * 4;
          this.vars.ix = this.sprites["SteveArm"].direction;
          this.vars.x =
            0 + 18 * Math.sin(this.degToRad(this.toNumber(this.vars.ix)));
          this.vars.y =
            14 + 18 * Math.cos(this.degToRad(this.toNumber(this.vars.ix)));
          this.vars.ix += 180;
          this.costume =
            Math.ceil(this.toNumber(this.sprites["Cursor"].vars.bowpull)) +
            this.toNumber(
              this.itemOf(
                this.stage.vars.BlockData,
                this.toNumber(this.stage.vars.Heldc) *
                  this.toNumber(this.stage.vars.Dmul) +
                  16
              )
            );
        } else {
          this.vars.refidxT = this.toNumber(this.stage.vars.Armframe) * 4;
          this.vars.ix = this.sprites["SteveArm"].direction;
          this.vars.x =
            0 +
            23 *
              Math.sin(
                this.degToRad(
                  this.toNumber(this.vars.ix) -
                    this.toNumber(this.stage.vars.Lastdir) * 0.28
                )
              );
          this.vars.y =
            14 +
            23 *
              Math.cos(
                this.degToRad(
                  this.toNumber(this.vars.ix) -
                    this.toNumber(this.stage.vars.Lastdir) * 0.28
                )
              );
          this.vars.ix += this.toNumber(this.stage.vars.Lastdir) - 90;
          if (
            this.toNumber(
              this.itemOf(
                this.stage.vars.BlockData,
                this.toNumber(this.stage.vars.Heldc) *
                  this.toNumber(this.stage.vars.Dmul) +
                  9
              )
            ) === 1
          ) {
            if (this.toNumber(this.stage.vars.Lastdir) === -90) {
              this.warp(this.setCostumeTo)(
                this.itemOf(
                  this.stage.vars.BlockData,
                  this.toNumber(this.stage.vars.Heldc) *
                    this.toNumber(this.stage.vars.Dmul) +
                    16
                )
              );
            } else {
              this.warp(this.setCostumeTo)(
                this.itemOf(
                  this.stage.vars.BlockData,
                  this.toNumber(this.stage.vars.Heldc) *
                    this.toNumber(this.stage.vars.Dmul) +
                    15
                )
              );
            }
          }
        }
        this.goto(
          Math.floor(
            (this.toNumber(this.stage.vars.X) -
              this.toNumber(this.stage.vars.Scrx)) *
              40
          ) + this.toNumber(this.vars.x),
          Math.floor(
            (this.toNumber(this.stage.vars.Y) -
              this.toNumber(this.stage.vars.Scry)) *
              40
          ) + this.toNumber(this.vars.y)
        );
        if (!(this.compare(this.vars.ix, this.vars.iy) === 0)) {
          this.vars.iy = this.vars.ix;
          if (
            this.toNumber(
              this.itemOf(
                this.stage.vars.BlockData,
                this.toNumber(this.stage.vars.Heldc) *
                  this.toNumber(this.stage.vars.Dmul) +
                  9
              )
            ) === 1
          ) {
            this.vars.ix -= 45;
          }
          this.direction = this.toNumber(this.vars.ix);
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
    }
  }

  *initInventoryItems() {
    this.vars.c = "#";
    this.vars.count = 0;
    this.goto(-160, -158);
    this.direction = 90;
    this.effects.clear();
    this.size = 65;
    this.vars.show = 0;
    this.visible = false;
    this.moveAhead();
    this.vars.iIi = 64;
    this.vars.stuckin = 0;
    for (let i = 0; i < 64; i++) {
      this.createClone();
      this.vars.iIi--;
    }
    this.vars.iIi = 0;
  }

  *getStackLimit(tile) {
    this.vars.maxstack = this.itemOf(
      this.stage.vars.BlockData,
      this.toNumber(tile) * this.toNumber(this.stage.vars.Dmul) + 17
    );
    if (this.compare(this.vars.maxstack, 0) > 0) {
      this.vars.maxstack = 0 - this.toNumber(this.vars.maxstack);
    } else {
      this.vars.maxstack = this.itemOf(
        this.stage.vars.BlockData,
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

  *doArrowInFlight() {
    this.vars.x += this.toNumber(this.vars.sx);
    this.vars.sy -= 0.04;
    if (this.compare(this.vars.sy, -0.4) < 0) {
      this.vars.sy = -0.4;
    }
    this.vars.y += this.toNumber(this.vars.sy);
    this.warp(this.angleArrow)();
    this.vars.maxstack = this.direction - 45;
    this.warp(this.isblockT)(
      this.toNumber(this.vars.x) +
        0.1 * Math.sin(this.degToRad(this.toNumber(this.vars.maxstack))),
      this.toNumber(this.vars.y) +
        0.1 * Math.cos(this.degToRad(this.toNumber(this.vars.maxstack)))
    );
    if (this.compare(this.vars.refidxT, 0) > 0) {
      this.vars.sx =
        0.1 * Math.sin(this.degToRad(this.toNumber(this.vars.maxstack)));
      this.vars.sy =
        0.1 * Math.cos(this.degToRad(this.toNumber(this.vars.maxstack)));
      this.vars.stuckin = this.vars.tTileidx;
      while (!(this.toNumber(this.vars.refidxT) === 0)) {
        this.vars.x += this.toNumber(this.vars.sx) * -0.5;
        this.vars.y += this.toNumber(this.vars.sy) * -0.5;
        this.warp(this.isblockT)(
          this.toNumber(this.vars.x) + this.toNumber(this.vars.sx),
          this.toNumber(this.vars.y) + this.toNumber(this.vars.sy)
        );
      }
      this.vars.c = 131;
      this.vars.sx = 0;
      this.vars.sy = 0;
    } else {
      this.vars.maxstack = 1;
      while (
        !(this.compare(this.vars.maxstack, this.stage.vars.Mob.length) > 0)
      ) {
        this.vars.stuckin = this.itemOf(
          this.stage.vars.Mob,
          this.vars.maxstack - 1
        );
        if (this.compare(this.vars.stuckin, 0) > 0) {
          if (
            this.compare(
              this.itemOf(
                this.stage.vars.Mob,
                this.toNumber(this.vars.maxstack) + 1
              ),
              this.vars.tTileidx
            ) === 0 ||
            (this.compare(this.vars.stuckin, 99) > 0 &&
              !(this.toNumber(this.vars.stuckin) === 102) &&
              this.compare(
                this.toNumber(
                  this.itemOf(
                    this.stage.vars.Mob,
                    this.toNumber(this.vars.maxstack) + 1
                  )
                ) + this.toNumber(this.stage.vars.Lsx),
                this.vars.tTileidx
              ) === 0)
          ) {
            this.stage.vars.Mob.splice(
              this.toNumber(this.vars.maxstack) + 8,
              1,
              Math.ceil(
                9 *
                  Math.sqrt(
                    this.toNumber(this.vars.sx) * this.toNumber(this.vars.sx) +
                      this.toNumber(this.vars.sy) * this.toNumber(this.vars.sy)
                  )
              )
            );
            this.stage.vars.Spritecount--;
            this.vars.stuckin = -1;
            return;
          }
        }
        this.vars.maxstack += this.toNumber(this.stage.vars.Mobmul);
      }
      this.vars.stuckin = 0;
      if (
        this.compare(
          Math.abs(
            this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.X)
          ),
          0.5
        ) < 0 &&
        this.compare(
          Math.abs(
            this.toNumber(this.vars.y) - this.toNumber(this.stage.vars.Y)
          ),
          0.9
        ) < 0
      ) {
        this.stage.vars.HealthS += Math.floor(
          Math.ceil(
            -9 *
              Math.sqrt(
                this.toNumber(this.vars.sx) * this.toNumber(this.vars.sx) +
                  this.toNumber(this.vars.sy) * this.toNumber(this.vars.sy)
              )
          ) * this.toNumber(this.stage.vars.Defensemul)
        );
        this.broadcast("update health");
        this.stage.vars.Spritecount--;
        this.vars.stuckin = -1;
        return;
      }
    }
  }

  *angleArrow() {
    if (this.toNumber(this.vars.sx) === 0) {
      if (this.compare(this.vars.sy, 0) > 0) {
        this.vars.maxstack = 90;
      } else {
        this.vars.maxstack = -90;
      }
    } else {
      this.vars.maxstack = this.radToDeg(
        Math.atan(this.toNumber(this.vars.sy) / this.toNumber(this.vars.sx))
      );
      if (this.compare(this.vars.sx, 0) < 0) {
        if (this.compare(this.vars.sy, 0) > 0) {
          this.vars.maxstack += 180;
        } else {
          if (this.compare(this.vars.sy, 0) < 0) {
            this.vars.maxstack -= 180;
          } else {
            this.vars.maxstack = 90;
          }
        }
      }
    }
    this.direction = 135 - this.toNumber(this.vars.maxstack);
  }

  *processHarvestList() {
    for (let i = 0; i < 2; i++) {
      if (
        this.compare(
          this.toNumber(this.stage.vars.Clearharvestidx) + 5,
          this.stage.vars.Harvest.length
        ) < 0
      ) {
        this.vars.x = this.itemOf(
          this.stage.vars.Harvest,
          this.toNumber(this.stage.vars.Clearharvestidx)
        );
        this.vars.y = this.itemOf(
          this.stage.vars.Harvest,
          this.toNumber(this.stage.vars.Clearharvestidx) + 1
        );
        if (this.toNumber(this.vars.y) === 0) {
          this.vars.y =
            Math.floor(
              (this.toNumber(this.vars.x) - 1) /
                this.toNumber(this.stage.vars.Lsx)
            ) + 0.5;
          this.vars.x =
            ((this.toNumber(this.vars.x) - 1) %
              this.toNumber(this.stage.vars.Lsx)) +
            0.5;
        }
        this.vars.c = this.itemOf(
          this.stage.vars.Harvest,
          this.toNumber(this.stage.vars.Clearharvestidx) + 2
        );
        this.vars.count = this.itemOf(
          this.stage.vars.Harvest,
          this.toNumber(this.stage.vars.Clearharvestidx) + 3
        );
        this.vars.sx = this.itemOf(
          this.stage.vars.Harvest,
          this.toNumber(this.stage.vars.Clearharvestidx) + 4
        );
        if (this.compare(Math.abs(this.toNumber(this.vars.sx)), 0.15) > 0) {
          this.vars.wait = this.timer + 2;
        } else {
          this.vars.wait = this.timer + 0.2;
        }
        this.vars.sy = this.itemOf(
          this.stage.vars.Harvest,
          this.toNumber(this.stage.vars.Clearharvestidx) + 5
        );
        if (this.toNumber(this.vars.sy) === -999) {
          this.vars.sy = this.random(0.05, 0.1);
        }
        this.vars.cloneasid--;
        this.stage.vars.Maxharvest--;
        this.vars.light += 15;
        if (this.toNumber(this.vars.show) === 1) {
          this.visible = false;
          this.vars.show = 0;
        }
        this.createClone();
        this.warp(this.drawHeld)(".");
        this.stage.vars.Clearharvestidx += 6;
      }
    }
  }

  *whenIReceiveRearrangeGui() {
    if (this.toNumber(this.vars.iIi) === 0) {
      return;
    }
    if (this.toString(this.stage.vars.Mode) === "c") {
      this.vars.offsetIi = 259;
    } else {
      if (this.toString(this.stage.vars.Mode) === "f") {
        this.vars.offsetIi = 517;
      } else {
        if (this.toString(this.stage.vars.Mode) === "ch") {
          this.vars.offsetIi = 775;
        } else {
          if (this.toString(this.stage.vars.Mode) === "x") {
            this.vars.offsetIi = 1033;
          } else {
            if (this.toString(this.stage.vars.Mode) === "xi") {
              this.vars.offsetIi = 1291;
            } else {
              this.vars.offsetIi = 1;
            }
          }
        }
      }
    }
    yield* this.setInvPosition(
      this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.offsetIi) +
          (this.toNumber(this.vars.iIi) * 4 - 1) -
          1
      ),
      this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.offsetIi) +
          (this.toNumber(this.vars.iIi) * 4 - 0) -
          1
      ),
      !null,
      this.itemOf(
        this.vars.undefined,
        this.toNumber(this.vars.offsetIi) +
          (this.toNumber(this.vars.iIi) * 4 - 2) -
          1
      )
    );
  }

  *isblockT(x, y) {
    this.vars.tTileidx =
      Math.floor(this.toNumber(y)) * this.toNumber(this.stage.vars.Lsx) +
      Math.floor(this.toNumber(x)) +
      1;
    this.vars.refidxT = this.itemOf(
      this.stage.vars.Level,
      this.vars.tTileidx - 1
    );
    if (
      this.toString(
        this.itemOf(
          this.stage.vars.BlockData,
          this.toNumber(this.vars.refidxT) *
            this.toNumber(this.stage.vars.Dmul) +
            2
        )
      ) === "Y"
    ) {
      this.vars.refidxT = 1;
    } else {
      this.vars.refidxT = 0;
    }
  }

  *whenIReceiveGo() {
    if (this.toNumber(this.vars.iT) === -1) {
      yield* this.wait(0.5);
      this.moveAhead();
    }
  }

  *draw() {
    if (
      this.compare(
        this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.Scrx),
        -7
      ) < 0
    ) {
      this.warp(this.translate)(
        Math.floor(
          (this.toNumber(this.stage.vars.Scrx) -
            this.toNumber(this.vars.x) +
            6) /
            13
        ) * 13,
        0
      );
    } else {
      if (
        !(
          this.compare(
            this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.Scrx),
            6
          ) < 0
        )
      ) {
        this.warp(this.translate)(
          Math.floor(
            (this.toNumber(this.vars.x) -
              this.toNumber(this.stage.vars.Scrx) +
              7) /
              13
          ) * -13,
          0
        );
      }
    }
    if (
      this.compare(
        this.toNumber(this.vars.y) - this.toNumber(this.stage.vars.Scry),
        -5.5
      ) < 0
    ) {
      this.warp(this.translate)(
        0,
        Math.floor(
          (this.toNumber(this.stage.vars.Scry) -
            this.toNumber(this.vars.y) +
            4.5) /
            10
        ) * 10
      );
    } else {
      if (
        !(
          this.compare(
            this.toNumber(this.vars.y) - this.toNumber(this.stage.vars.Scry),
            4.5
          ) < 0
        )
      ) {
        this.warp(this.translate)(
          0,
          Math.floor(
            (this.toNumber(this.vars.y) -
              this.toNumber(this.stage.vars.Scry) +
              5.5) /
              10
          ) * -10
        );
      }
    }
    this.warp(this.doActiveBlock)();
    this.warp(this.switchCostume)(0);
    this.warp(this.draworhidetile)(
      Math.floor(
        (this.toNumber(this.vars.x) - this.toNumber(this.stage.vars.Scrx)) *
          40 +
          this.toNumber(this.vars.ix)
      ),
      Math.floor(
        (this.toNumber(this.vars.y) - this.toNumber(this.stage.vars.Scry)) *
          40 +
          this.toNumber(this.vars.iy)
      ),
      this.costumeNumber
    );
  }

  *whenIReceivePostChunkLoad() {
    if (this.compare(this.vars.iIi, 1) < 0) {
      if (this.compare(this.vars.iT, -1) < 0) {
        this.deleteThisClone();
      }
    }
  }

  *whenIReceiveInit1b() {
    this.visible = false;
    this.vars.show = 0;
    this.stage.vars.Tooltipid = 0;
    yield* this.initInventoryItems();
    yield* this.broadcastAndWait("rearrange gui");
    yield* this.init();
    this.vars.iIi = 0;
    this.stage.vars.Heldinvid = 1;
    this.stage.vars.Clearharvestidx = 0;
    this.vars.stuckin = 0;
    yield* this.drawHeld("#");
    this.stage.vars.Nextselid = -1;
  }

  *changeSelection(groupid, initonly) {
    this.stage.vars.Heldinvid = Math.abs(this.toNumber(groupid));
    if (!initonly) {
      this.warp(this.drawHeld)(
        this.itemOf(
          this.stage.vars.Inv,
          2 * this.toNumber(this.stage.vars.Heldinvid) - 2
        )
      );
      this.broadcast("change of tool");
    }
  }

  *getIllumination(idx) {
    if (this.toNumber(this.stage.vars.Xray) === 0) {
      this.vars.tIlumtmp =
        this.toNumber(this.itemOf(this.stage.vars.Light, idx - 1)) -
        this.toNumber(this.stage.vars.Glight);
      this.vars.lightmod = this.itemOf(
        this.stage.vars.Light,
        this.toNumber(idx) + this.stage.vars.Level.length - 1
      );
      if (this.compare(this.vars.lightmod, this.vars.tIlumtmp) < 0) {
        this.vars.lightmod = this.vars.tIlumtmp;
      }
    } else {
      this.vars.lightmod = 15;
    }
  }

  *whenIReceiveLightingModeChange() {
    this.vars.light = -1;
    if (this.toNumber(this.stage.vars.Lighting) === 1) {
      null;
    } else {
      this.effects.clear();
    }
  }

  *RegisterTileDeletionBetweenAnd(fromid, toid) {
    this.vars.iT = this.stage.vars.Dmul;
    while (
      !(this.compare(this.vars.iT, this.stage.vars.BlockData.length) > 0)
    ) {
      this.vars.offsetIi = this.itemOf(
        this.stage.vars.BlockData,
        this.toNumber(this.vars.iT) + 15
      );
      if (this.compare(this.vars.offsetIi, toid) > 0) {
        this.vars.offsetIi += this.toNumber(fromid) - this.toNumber(toid) - 1;
        this.stage.vars.BlockData.splice(
          this.toNumber(this.vars.iT) + 15,
          1,
          this.vars.offsetIi
        );
      } else {
        if (!(this.compare(this.vars.offsetIi, fromid) < 0)) {
          this.stage.vars.BlockData.splice(
            this.toNumber(this.vars.iT) + 15,
            1,
            -99999
          );
        }
      }
      this.vars.offsetIi = this.itemOf(
        this.stage.vars.BlockData,
        this.toNumber(this.vars.iT) + 16
      );
      if (this.compare(this.vars.offsetIi, toid) > 0) {
        this.vars.offsetIi += this.toNumber(fromid) - this.toNumber(toid) - 1;
        this.stage.vars.BlockData.splice(
          this.toNumber(this.vars.iT) + 16,
          1,
          this.vars.offsetIi
        );
      } else {
        if (!(this.compare(this.vars.offsetIi, fromid) < 0)) {
          this.stage.vars.BlockData.splice(
            this.toNumber(this.vars.iT) + 16,
            1,
            -99999
          );
        }
      }
      this.vars.iT += this.toNumber(this.stage.vars.Dmul);
    }
  }

  *draworhidetile(px, py, costume) {
    if (this.compare(this.vars.c, -1) > 0) {
      this.costume = "BIG";
      this.goto(this.toNumber(px), this.toNumber(py));
      this.costume = costume;
      if (this.toNumber(this.vars.stuckin) === 0) {
        if (this.toNumber(this.vars.show) === 0) {
          this.visible = true;
          this.vars.show = 1;
        }
      } else {
        if (this.toNumber(this.vars.show) === 1) {
          this.visible = false;
          this.vars.show = 0;
        }
      }
    }
  }

  *translate(tx, ty) {
    this.vars.show = 0;
    this.visible = false;
    this.vars.x += this.toNumber(tx);
    this.vars.x = Math.round(this.toNumber(this.vars.x));
    this.vars.y += this.toNumber(ty);
    if (this.compare(this.vars.y, 0) < 0) {
      this.vars.iT = 1;
    } else {
      if (
        !(this.compare(this.vars.y, this.stage.vars.Lsy) < 0) ||
        this.compare(this.vars.x, 0) < 0 ||
        !(this.compare(this.vars.x, this.stage.vars.Lsx) < 0)
      ) {
        this.vars.iT = this.stage.vars.Level.length;
      } else {
        this.vars.iT =
          this.toNumber(this.vars.y) * this.toNumber(this.stage.vars.Lsx) +
          this.toNumber(this.vars.x) +
          1;
      }
    }
    this.vars.count = this.itemOf(this.stage.vars.Level, this.vars.iT - 1);
    if (!(this.compare(this.vars.count, this.vars.c) === 0)) {
      this.vars.c = -1;
    }
  }

  *switchCostume(forcelight) {
    if (this.compare(this.stage.vars.throttle, 0) > 0) {
      this.warp(this.getIllumination)(this.vars.iT);
      this.vars.stuckin = 0;
      if (this.toNumber(this.vars.lightmod) === 0) {
        this.vars.count = 40;
        this.vars.lightmod = this.vars.light;
      } else {
        this.vars.count = this.itemOf(this.stage.vars.Level, this.vars.iT - 1);
        if (
          this.toNumber(this.vars.count) === 1 &&
          (this.compare(this.vars.lightmod, 14) > 0 ||
            this.toNumber(this.stage.vars.Lighting) === 0)
        ) {
          this.vars.lightmod = this.vars.light;
          this.vars.count = this.vars.c;
          this.vars.stuckin = 1;
        }
      }
      if (
        !(this.compare(this.vars.lightmod, this.vars.light) === 0) &&
        (!(this.compare(this.vars.count, this.vars.c) === 0) ||
          forcelight ||
          1 === this.random(1, this.toNumber(this.stage.vars.Lightprob)))
      ) {
        this.stage.vars.Lightprob++;
        this.vars.light = this.vars.lightmod;
        if (this.toNumber(this.stage.vars.Lighting) === 1) {
          this.effects.brightness = this.toNumber(
            this.itemOf(this.stage.vars.Gamma, this.toNumber(this.vars.light))
          );
        } else {
          this.vars.c = -1;
        }
      }
      if (
        this.toNumber(this.vars.stuckin) === 0 &&
        !(this.compare(this.vars.count, this.vars.c) === 0)
      ) {
        this.vars.c = this.vars.count;
        this.vars.count = this.itemOf(
          this.stage.vars.BlockData,
          this.toNumber(this.vars.c) * this.toNumber(this.stage.vars.Dmul) + 15
        );
        if (!(this.compare(this.vars.count, this.costumeNumber) === 0)) {
          this.costume = this.vars.count;
          if (this.toNumber(this.vars.c) === 1) {
            this.moveBehind(1000);
          }
          this.stage.vars.throttle--;
        }
      }
    }
  }

  *initHarvested() {
    this.vars.iT = -2;
    this.direction = 90;
    this.costume = this.itemOf(
      this.stage.vars.BlockData,
      this.toNumber(this.vars.c) * this.toNumber(this.stage.vars.Dmul) + 16
    );
    this.effects.clear();
    this.size = 40;
  }

  *setInvPosition(x, y, internal, invid) {
    if (internal) {
      this.vars.x = x;
      this.vars.y = y;
    }
    this.vars.stuckin = invid;
    this.stage.vars.Invpos.splice(
      this.toNumber(this.vars.iIi) * 3 - 3,
      1,
      invid
    );
    this.stage.vars.Invpos.splice(this.toNumber(this.vars.iIi) * 3 - 2, 1, x);
    this.stage.vars.Invpos.splice(this.toNumber(this.vars.iIi) * 3 - 1, 1, y);
    if (this.compare(x, -999) > 0) {
      this.goto(this.toNumber(x), this.toNumber(y));
      if (this.toString(this.vars.c) === "#") {
        if (this.toNumber(this.vars.show) === 1) {
          this.visible = false;
          this.vars.show = 0;
        }
      } else {
        if (this.toNumber(this.vars.show) === 0) {
          this.visible = true;
          this.vars.show = 1;
        }
      }
    } else {
      this.vars.c = "#";
      if (this.toNumber(this.vars.show) === 1) {
        this.visible = false;
        this.vars.show = 0;
      }
    }
  }

  *setCostumeTo(cotume) {
    if (!(this.compare(this.costumeNumber, cotume) === 0)) {
      this.costume = cotume;
    }
  }

  *whenIReceiveGreenFlag() {
    this.effects.clear();
    this.costume = "grass";
    this.visible = false;
  }

  *init() {
    this.effects.clear();
    this.size = 103;
    this.direction = 90;
    this.moveBehind(1000);
    this.vars.x = Math.floor(this.toNumber(this.stage.vars.Scrx)) - 7;
    this.vars.y = Math.floor(this.toNumber(this.stage.vars.Scry)) - 5;
    this.vars.iT =
      this.toNumber(this.vars.x) +
      this.toNumber(this.vars.y) * this.toNumber(this.stage.vars.Lsx) +
      1;
    this.vars.c = -1;
    this.vars.light = 16;
    this.vars.cloneasid = 0;
    for (let i = 0; i < 10; i++) {
      for (let i = 0; i < 13; i++) {
        this.createClone();
        this.vars.x++;
        this.vars.iT++;
      }
      this.vars.x -= 13;
      this.vars.iT += this.toNumber(this.stage.vars.Lsx) - 13;
      this.vars.y++;
    }
    this.stage.vars.Heldc = "#";
    this.vars.iT = -1;
    this.vars.cloneasid = -1;
    this.moveAhead();
  }

  *draworhide(px, py) {
    this.goto(this.toNumber(px), this.toNumber(py));
    if (this.compare(px, this.x) === 0 && this.compare(py, this.y) === 0) {
      if (this.toNumber(this.vars.show) === 0) {
        this.visible = true;
        this.vars.show = 1;
      }
    } else {
      if (this.toNumber(this.vars.show) === 1) {
        this.visible = false;
        this.vars.show = 0;
      }
    }
  }
}
