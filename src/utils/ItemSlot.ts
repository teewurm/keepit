import { Assets } from "../enums/Constants";
import { DamageType } from "../enums/DamageType";
import { ItemType } from "../enums/ItemType";

export default class ItemSlot {
    protected container: Phaser.GameObjects.Container;
    protected item?: ItemConfig = undefined;

    protected sprite?: Phaser.GameObjects.Sprite;

    constructor(container: Phaser.GameObjects.Container, item: ItemConfig | undefined) {
        this.container = container;

        if (item) {
            this.setItem(item);
        }
    }

    isEmpty(): boolean {
        return this.item == undefined;
    }

    destroyItem() {
        if (this.sprite) {
            this.container.remove(this.sprite);
            this.sprite.destroy();
        }


        this.sprite = undefined;
        this.item = undefined;
    }

    setItem(item: ItemConfig) {
        this.item = item;
        const scene = this.container.scene;

        this.sprite = scene.add.sprite(0, 0, Assets.Sprite.Weapons);
        this.sprite.play({ key: item.damageType });

        this.container.add(this.sprite);
    }

    getItem() {
        return this.item;
    }
}

export class ItemConfig {
    type: ItemType
    damageType: DamageType
}