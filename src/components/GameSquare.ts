import { blockingTypes, SquareType } from "../enums/SquareType";
import ItemSlot, { ItemConfig } from "../utils/ItemSlot";
import CustomContainerBase from "./bases/CustomContainerBase";
import { Assets, ColorPalette, ColorSquareMap, GameplaySettings } from "../enums/Constants";
import Backpack from "./Backpack";
import SceneBase from "../scenes/bases/SceneBase";

export default class GameSquare extends CustomContainerBase {
    squareType: SquareType;

    protected backgroundObject?: Phaser.GameObjects.GameObject;
    protected fogObject: Phaser.GameObjects.Rectangle;
    protected fogDensity = GameplaySettings.FogFullDensity;

    protected portalToName?: string;

    protected itemSlot: ItemSlot;

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number, type: SquareType) {
        super(scene, x, y, width, height);

        this.squareType = type;

        this.itemSlot = new ItemSlot(this, undefined, 24);

        if (this.squareType != SquareType.EMPTY) {
            const outlineThickness = 2;

            if (SquareType.PATH == this.squareType || this.squareType == SquareType.WALL) {
                const myImage = this.scene.add.sprite(0, 0, SquareType.WALL == this.squareType ? Assets.Sprite.Wall1 : Assets.Sprite.Path1)

                myImage.setScale(this.targetWidth / myImage.width, this.targetHeight / myImage.height);

                const outline = this.scene.add.rectangle(0, 0, this.targetWidth - outlineThickness, this.targetHeight - outlineThickness);

                this.backgroundObject = this.scene.add.container(0, 0, [myImage, outline]);
            } else {
                this.backgroundObject = this.scene.add.rectangle(0, 0, this.targetWidth - outlineThickness, this.targetHeight - outlineThickness, ColorSquareMap.get(this.squareType));
            }

            this.add(this.backgroundObject);
        }

        if (NO_FOG) {
            this.fogDensity = 0;
        }


        this.fogObject = this.scene.add.rectangle(0, 0, this.targetWidth, this.targetHeight, ColorPalette.FOG, this.fogDensity);
        this.add(this.fogObject);

        this.fogObject.setDepth(30);

        if (DEBUG) {
            this.add(this.scene.add.rectangle(0, 0, 10, 10, ColorPalette.DEBUG))
        }
    }

    setFogDensityToHalf() {
        if (this.fogDensity == GameplaySettings.FogFullDensity) {
            this.fogDensity = GameplaySettings.FogHalfDensity;
            this.fogObject.setAlpha(this.fogDensity);
        }

        if (this.fogDensity > GameplaySettings.FogNoDensity) {
            if (this.squareType == SquareType.BOSS_PORTAL || this.squareType == SquareType.PORTAL) {
                this.setFogDensityToZero();
            } else if (this.squareType == SquareType.WALL) {
                this.scene.time.delayedCall(GameplaySettings.FogdisappearDuration, this.setFogDensityToZero.bind(this));
            }

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
        this.itemSlot.destroyItem();

        this.itemSlot.setItem(item);

        this.bringToTop(this.fogObject);
    }

    collectItem(backpack: Backpack) {
        if (this.itemSlot.isEmpty())
            return;

        if (backpack.addItem(this.itemSlot.getItem()!)) {
            this.itemSlot.destroyItem();
            this.scene.sound.get(Assets.Audio.Collect1).play();
        }
    }

    getItemConfig() {
        return this.itemSlot.getItem();
    }

    setPortalToName(name: string) {
        this.portalToName = name;
    }

    getPortalToName() {
        return this.portalToName;
    }

    isPortal() {
        return [SquareType.BOSS_PORTAL, SquareType.PORTAL].includes(this.squareType) && this.portalToName != undefined;
    }
}