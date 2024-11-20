import { ItemType } from "../enums/ItemType";

export default class ItemSlot {
    protected container: Phaser.GameObjects.Container;
    protected item?: ItemConfig = undefined;

    protected itemText?: Phaser.GameObjects.Text

    constructor(container: Phaser.GameObjects.Container, item?: ItemConfig) {
        this.container = container;

        if (item) {
            this.setItem(item);
        }
    }

    isEmpty(): boolean {
        return this.item == undefined;
    }

    destroy() {
        if (this.itemText) {
            this.container.remove(this.itemText);
            this.itemText.destroy();
        }


        this.itemText = undefined;
        this.item = undefined;
    }

    setItem(item: ItemConfig) {
        this.item = item;
        const scene = this.container.scene;
        this.itemText = scene.add.text(0, 0, this.item.text, { fontSize: 26, color: '#000000', fontStyle: "bold" });
        this.itemText.setOrigin(0.5, 0.5)
        this.container.add(this.itemText);
    }

    getItem() {
        return this.item;
    }
}

export class ItemConfig {
    type: ItemType
    text: string
}