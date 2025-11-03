import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Blank from "./Blank/Blank.js";
import Generator from "./Generator/Generator.js";
import Processor from "./Processor/Processor.js";
import SteveArm from "./SteveArm/SteveArm.js";
import Steve from "./Steve/Steve.js";
import SteveLegs2 from "./SteveLegs2/SteveLegs2.js";
import StevesHead from "./StevesHead/StevesHead.js";
import Tiles from "./Tiles/Tiles.js";
import Cursor from "./Cursor/Cursor.js";
import GuiInvrow from "./GuiInvrow/GuiInvrow.js";
import GuiInvsel from "./GuiInvsel/GuiInvsel.js";
import Counts from "./Counts/Counts.js";
import ArrowProgress from "./ArrowProgress/ArrowProgress.js";
import SmeltProgress from "./SmeltProgress/SmeltProgress.js";
import Mob from "./Mob/Mob.js";
import Health from "./Health/Health.js";
import Oxygen from "./Oxygen/Oxygen.js";
import Armor from "./Armor/Armor.js";
import Hunger from "./Hunger/Hunger.js";
import Selected from "./Selected/Selected.js";
import Creativeoverlay from "./Creativeoverlay/Creativeoverlay.js";
import Menu1 from "./Menu1/Menu1.js";
import SplashSelect from "./SplashSelect/SplashSelect.js";
import Menu2 from "./Menu2/Menu2.js";
import SaveGame from "./SaveGame/SaveGame.js";
import Commands from "./Commands/Commands.js";
import PseudorandomCycle from "./PseudorandomCycle/PseudorandomCycle.js";
import StageSprite from "./StageSprite/StageSprite.js";
import Snow from "./Snow/Snow.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Blank: new Blank({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 5,
  }),
  Generator: new Generator({
    x: -69,
    y: 6,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2,
  }),
  Processor: new Processor({
    x: 76,
    y: -36,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.LEFT_RIGHT,
    costumeNumber: 1,
    size: 55.00000000000001,
    visible: false,
    layerOrder: 3,
  }),
  SteveArm: new SteveArm({
    x: 85,
    y: -57,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 210,
    visible: false,
    layerOrder: 27,
  }),
  Steve: new Steve({
    x: 85,
    y: -72,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.LEFT_RIGHT,
    costumeNumber: 1,
    size: 220.00000000000003,
    visible: false,
    layerOrder: 16,
  }),
  SteveLegs2: new SteveLegs2({
    x: 85,
    y: -77,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 210,
    visible: false,
    layerOrder: 17,
  }),
  StevesHead: new StevesHead({
    x: 85,
    y: -54,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 200,
    visible: false,
    layerOrder: 18,
  }),
  Tiles: new Tiles({
    x: 67.98848481499999,
    y: -73.4792878105,
    direction: 22.5,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 40,
    visible: false,
    layerOrder: 26,
  }),
  Cursor: new Cursor({
    x: -5,
    y: 34,
    direction: 119.6784899251352,
    rotationStyle: Sprite.RotationStyle.DONT_ROTATE,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 28,
  }),
  GuiInvrow: new GuiInvrow({
    x: 0,
    y: -158,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 11,
  }),
  GuiInvsel: new GuiInvsel({
    x: -160,
    y: -158,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 12,
  }),
  Counts: new Counts({
    x: -75,
    y: -173,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 24,
  }),
  ArrowProgress: new ArrowProgress({
    x: 40,
    y: 64,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 130,
    visible: false,
    layerOrder: 13,
  }),
  SmeltProgress: new SmeltProgress({
    x: -40,
    y: 64,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 172,
    visible: false,
    layerOrder: 14,
  }),
  Mob: new Mob({
    x: 7,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.LEFT_RIGHT,
    costumeNumber: 101,
    size: 27.77777777777778,
    visible: false,
    layerOrder: 10,
  }),
  Health: new Health({
    x: -101,
    y: -124,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.DONT_ROTATE,
    costumeNumber: 21,
    size: 100,
    visible: false,
    layerOrder: 19,
  }),
  Oxygen: new Oxygen({
    x: 100,
    y: -103,
    direction: -90,
    rotationStyle: Sprite.RotationStyle.LEFT_RIGHT,
    costumeNumber: 21,
    size: 200,
    visible: false,
    layerOrder: 15,
  }),
  Armor: new Armor({
    x: -101,
    y: -104,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.DONT_ROTATE,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 25,
  }),
  Hunger: new Hunger({
    x: 101,
    y: -123,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.DONT_ROTATE,
    costumeNumber: 17,
    size: 200,
    visible: false,
    layerOrder: 20,
  }),
  Selected: new Selected({
    x: 0,
    y: -21,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 21,
  }),
  Creativeoverlay: new Creativeoverlay({
    x: 0,
    y: -22,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 22,
  }),
  Menu1: new Menu1({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.DONT_ROTATE,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 7,
  }),
  SplashSelect: new SplashSelect({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 8,
  }),
  Menu2: new Menu2({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.DONT_ROTATE,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 9,
  }),
  SaveGame: new SaveGame({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 34,
    size: 100,
    visible: false,
    layerOrder: 6,
  }),
  Commands: new Commands({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 23,
  }),
  PseudorandomCycle: new PseudorandomCycle({
    x: 71,
    y: -19,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.DONT_ROTATE,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 4,
  }),
  StageSprite: new StageSprite({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.DONT_ROTATE,
    costumeNumber: 3,
    size: 100,
    visible: true,
    layerOrder: 1,
  }),
  Snow: new Snow({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 400,
    visible: false,
    layerOrder: 29,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
