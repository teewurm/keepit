import { Assets, ColorPalette, ItemConstants } from "../enums/Constants";
import { ItemType } from "../enums/ItemType";
import SceneBase from "../scenes/bases/SceneBase";
import ItemSlot, { ItemConfig } from "../utils/ItemSlot";
import CustomContainerBase from "./bases/CustomContainerBase";


export default class Backpack extends CustomContainerBase {
    protected infoCardSlots: ItemSlot[] = [];
    protected weaponsSlots: ItemSlot[] = [];

    protected activeWeaponSlot?: ItemSlot;

    isSwapWeaponBlocked = true;

    readonly onWeaponSwap: (() => void)[] = [];

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
                const outline = this.scene.add.rectangle(0, 0, width, height);
                outline.setStrokeStyle(10, 0x000000);

                let background: Phaser.GameObjects.Sprite;
                if (i == 1) {
                    background = this.scene.add.sprite(0, 0, Assets.Sprite.QuestionBackPack);
                } else {
                    background = this.scene.add.sprite(0, 0, Assets.Sprite.WeaponBackPack);
                }

                background.setDisplaySize(width, height);

                const highlightRec = this.scene.add.rectangle(0, 0, width, height, ColorPalette.HIGHLIGHT)

                itemContainer.add([outline, background, highlightRec]);

                if (i == 1) {
                    this.infoCardSlots.push(new ItemSlot(itemContainer, undefined, highlightRec));
                } else {
                    const newSlot = new ItemSlot(itemContainer, undefined, highlightRec)
                    newSlot.onClick.push(this.newWeaponClicked.bind(this));
                    this.weaponsSlots.push(newSlot);
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

    getCardSlots() {
        return this.infoCardSlots;
    }

    setBackpackItems(itemsToSet: ItemConfig[]) {
        if (itemsToSet == undefined)
            return;

        this.destroyAllItmes();
        itemsToSet.forEach(itemConfig => {
            if (itemConfig.type == ItemType.WEAPON)
                itemConfig.isInteractable = true;

            this.addItem(itemConfig);
        });
    }

    activateFirstItem() {
        const firstItem = this.weaponsSlots[0];
        if (firstItem.getItem() != undefined) {
            this.activeWeaponSlot = firstItem;
            this.activeWeaponSlot.select();
        }
    }

    getActiveWeapon() {
        return this.activeWeaponSlot?.getItem()?.damageType;
    }

    newWeaponClicked(slot: ItemSlot) {
        if (this.isSwapWeaponBlocked)
            return;

        if (this.activeWeaponSlot)
            this.activeWeaponSlot.deselect();

        slot.select();
        this.activeWeaponSlot = slot;

        this.scene.sound.get(Assets.Audio.WeaponSwap).play();
        this.onWeaponSwap.forEach(func => func());
    }

    protected addItemToList(item: ItemConfig, list: ItemSlot[]): boolean {
        if (list.filter(slot => !slot.isEmpty()).length == ItemConstants.MAX_ITMES_PER_TYPE)
            return false;

        for (let i = 0; i < list.length; i++) {
            if (!list[i].isEmpty())
                continue;

            list[i].setItem(item, { width: this.targetWidth / 2 - 5, height: this.targetHeight / 6 - 5 });
            return true;
        }

        return false;
    }
}