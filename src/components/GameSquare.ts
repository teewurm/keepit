import Player from "./Player";
import { blockingTypes, SquareType } from "../enums/SquareType";
import { ItemConfig } from "../utils/ItemSlot";
import CustomContainerBase from "./bases/CustomContainerBase";
import { ColorPalette, ColorSquareMap } from "../enums/Constants";

export default class GameSquare extends CustomContainerBase {
    squareType: SquareType;

    protected backgroundObject: Phaser.GameObjects.Rectangle | undefined;

    protected item?: ItemConfig;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, type: SquareType) {
        super(scene, x, y, width, height);

        this.squareType = type;


        if (this.squareType != SquareType.EMPTY) {
            this.backgroundObject = this.scene.add.rectangle(0, 0, this.containerWidth, this.containerHeight, ColorSquareMap.get(this.squareType));
            this.backgroundObject.setStrokeStyle(2, 0x000000);

            this.add(this.backgroundObject);
        }

        if (DEBUG) {
            this.add(this.scene.add.rectangle(0, 0, 10, 10, ColorPalette.DEBUG))
        }
    }

    isBlocking() {
        return blockingTypes.includes(this.squareType);
    }

    collectItem(player: Player) {
        if (this.item == undefined)
            return;



        this.item = undefined;
    }
}