import { ItemType } from "../enums/ItemType";

export default class ItemSlot {
    protected container: Phaser.GameObjects.Container;
    protected item?: ItemConfig;

    protected itemText?: Phaser.GameObjects.Text

    constructor(container: Phaser.GameObjects.Container, item?: ItemConfig) {
        this.container = container;
        this.item = item;

        if (this.item) {
            const scene = this.container.scene;
            this.itemText = scene.add.text(0, 0, this.item.text, { fontSize: 24, color: '#000000' });
            this.itemText.setOrigin(0.5, 0.5)
            this.container.add(this.itemText);
        }
    }

    isFull(): boolean {
        return this.item != undefined;
    }
}

export class ItemConfig {
    type: ItemType
    text: string
}