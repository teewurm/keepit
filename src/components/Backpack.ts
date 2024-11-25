import { ColorPalette, ItemConstants } from "../enums/Constants";
import { ItemType } from "../enums/ItemType";
import SceneBase from "../scenes/bases/SceneBase";
import ItemSlot, { ItemConfig } from "../utils/ItemSlot";
import CustomContainerBase from "./bases/CustomContainerBase";


export default class Backpack extends CustomContainerBase {
    protected infoCardSlots: ItemSlot[] = [];
    protected weaponsSlots: ItemSlot[] = [];

    constructor(scene: SceneBase, x: number, y: number, elementWidth: number, elementHeight: number) {
        super(scene, x, y, elementWidth * 2, elementHeight * 6);

        this.createVisuals();
    }

    protected createVisuals() {
        if (this.targetHeight % 6 != 0 || this.targetWidth % 2 != 0)
            throw "The height mus be divisible by 6 and the widht by 2";

        const height = this.targetHeight / 6;
        const width = this.targetWidth / 2;

        let nextX = width * -0.5;
        for (let i = 0; i < 2; i++) {
            let nextY = height * -2.5;

            for (let y = 0; y < 6; y++) {
                const itemContainer = this.scene.add.container(nextX, nextY);
                const newRect = this.scene.add.rectangle(0, 0, width, height, ColorPalette.PORTAL);
                newRect.setStrokeStyle(2, 0x000000);


                itemContainer.add(newRect);

                if (i == 1) {
                    this.infoCardSlots.push(new ItemSlot(itemContainer, undefined));
                } else {
                    this.weaponsSlots.push(new ItemSlot(itemContainer, undefined));
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

    addItem(item: ItemConfig): boolean {
        switch (item.type) {
            case ItemType.INFO_CARD:
                return this.addItemToList(item, this.infoCardSlots);
            case ItemType.WEAPON:
                return this.addItemToList(item, this.weaponsSlots);
        }
    }

    destroyAllItmes() {
        this.infoCardSlots.forEach(it => it.destroyItem());
        this.weaponsSlots.forEach(it => it.destroyItem());
    }

    getAllItems() {
        let allItems: ItemConfig[] = [];
        allItems = allItems.concat(this.infoCardSlots.map(it => it.getItem()).filter(it => it != undefined));
        allItems = allItems.concat(this.weaponsSlots.map(it => it.getItem()).filter(it => it != undefined));
        return allItems;
    }

    setBackpackItems(itemsToSet: ItemConfig[]) {
        if (itemsToSet == undefined)
            return;

        this.destroyAllItmes();
        itemsToSet.forEach(itemConfig => {
            this.addItem(itemConfig);
        });
    }

    protected addItemToList(item: ItemConfig, list: ItemSlot[]): boolean {
        if (list.filter(slot => !slot.isEmpty()).length == ItemConstants.MAX_ITMES_PER_TYPE)
            return false;

        for (let i = 0; i < list.length; i++) {
            if (!list[i].isEmpty())
                continue;

            list[i].setItem(item);
            return true;
        }

        return false;
    }
}