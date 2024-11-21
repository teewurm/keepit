import { blockingTypes, SquareType } from "../enums/SquareType";
import ItemSlot, { ItemConfig } from "../utils/ItemSlot";
import CustomContainerBase from "./bases/CustomContainerBase";
import { Assets, ColorPalette, ColorSquareMap, GameplaySettings } from "../enums/Constants";
import Backpack from "./Backpack";

export default class GameSquare extends CustomContainerBase {
    squareType: SquareType;

    protected backgroundObject?: Phaser.GameObjects.Rectangle;
    protected fogObject: Phaser.GameObjects.Rectangle;
    protected fogDensity = GameplaySettings.FogFullDensity;

    protected itemSlot: ItemSlot;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, type: SquareType) {
        super(scene, x, y, width, height);

        this.squareType = type;

        this.itemSlot = new ItemSlot(this);

        if (this.squareType != SquareType.EMPTY) {
            this.backgroundObject = this.scene.add.rectangle(0, 0, this.containerWidth, this.containerHeight, ColorSquareMap.get(this.squareType));
            this.backgroundObject.setStrokeStyle(2, 0x000000);

            this.add(this.backgroundObject);
        }



        this.fogObject = this.scene.add.rectangle(0, 0, this.containerWidth, this.containerHeight, ColorPalette.FOG, this.fogDensity);
        this.add(this.fogObject);

        if (DEBUG) {
            this.add(this.scene.add.rectangle(0, 0, 10, 10, ColorPalette.DEBUG))
        }
    }

    setFogDensityToHalf() {
        if (this.fogDensity == 1) {
            this.fogDensity = GameplaySettings.FogHalfDensity;
            this.fogObject.setAlpha(this.fogDensity);
        }

        if (this.fogDensity > 0 && this.squareType == SquareType.WALL) {
            this.scene.time.delayedCall(GameplaySettings.FogdisappearDuration, this.setFogDensityToZero.bind(this));
        }
    }

    setFogDensityToZero() {
        this.fogDensity = GameplaySettings.FogNoDensity;
        this.fogObject.setAlpha(this.fogDensity);
    }

    isBlocking() {
        return blockingTypes.includes(this.squareType);
    }

    addItem(item: ItemConfig) {
        this.itemSlot.destroy();

        this.itemSlot.setItem(item);

        this.bringToTop(this.fogObject);
    }

    collectItem(backpack: Backpack) {
        if (this.itemSlot.isEmpty())
            return;

        if (backpack.addItem(this.itemSlot.getItem()!)) {
            this.itemSlot.destroy();
            this.scene.sound.get(Assets.Audio.Collect1).play();
        }
    }
}