import { ColorPalette } from "../enums/Constants";
import { ItemType } from "../enums/ItemType";
import ItemSlot from "../utils/ItemSlot";
import CustomContainerBase from "./bases/CustomContainerBase";


export default class Backpack extends CustomContainerBase {
    protected infoCardSlots: ItemSlot[] = [];
    protected weaponsSlots: ItemSlot[] = [];

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height);

        this.createVisuals();
    }

    protected createVisuals() {
        if (this.containerHeight % 6 != 0 || this.containerWidth % 2 != 0)
            throw "The height mus be divisible by 6 and the widht by 2";

        const height = this.containerHeight / 6;
        const width = this.containerWidth / 2;

        let nextX = width * -0.5;
        for (let i = 0; i < 2; i++) {
            let nextY = height * -2.5;

            for (let y = 0; y < 6; y++) {
                const itemContainer = this.scene.add.container(nextX, nextY);
                const newRect = this.scene.add.rectangle(0, 0, width, height, ColorPalette.PORTAL);
                newRect.setStrokeStyle(2, 0x000000);


                itemContainer.add(newRect);

                if (i == 0) {
                    this.infoCardSlots.push(new ItemSlot(itemContainer, { text: "Info?", type: ItemType.INFO_CARD }));
                } else {
                    this.weaponsSlots.push(new ItemSlot(itemContainer, { text: "Weapon", type: ItemType.WEAPON }));
                }

                this.add(itemContainer);

                nextY += height;
            }

            nextX += width;
        }

        if (DEBUG) {
            this.add(this.scene.add.rectangle(0, 0, 10, 10, ColorPalette.DEBUG))
        }
    }
}