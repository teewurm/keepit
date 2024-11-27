import SceneBase from "../scenes/bases/SceneBase";
import CustomContainerBase from "./bases/CustomContainerBase";

export default class Slider extends CustomContainerBase {
    protected track: Phaser.GameObjects.Rectangle;
    protected handle: Phaser.GameObjects.Rectangle;
    protected value: number = 0;


    constructor(scene: SceneBase, x: number, y: number, width: number, height: number, handleSize: number, titel: string) {
        super(scene, x, y, width, height);

        const titelText = this.scene.add.text(0, -handleSize, titel, { fontSize: 38, color: "#000000", fontStyle: "bold" });
        titelText.setOrigin(0.5, 1);

        this.track = scene.add.rectangle(0, 0, width, height, 0xaaaaaa);
        this.handle = scene.add.rectangle(-width / 2, 0, handleSize, handleSize, 0xff0000).setInteractive();

        scene.input.setDraggable(this.handle);

        scene.input.on('drag', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dragX: number) => {
            if (gameObject == this.handle) {
                this.updateHandlePosition(dragX);
            }
        });

        this.add([titelText, this.track, this.handle]);
        scene.add.existing(this);
    }

    getValue(): number {
        return this.value;
    }

    setValue(newValue: number): void {
        const clampedValue = Phaser.Math.Clamp(newValue, 0, 1);

        const minX = -this.targetWidth / 2;
        const maxX = this.targetWidth / 2;
        this.handle.x = Phaser.Math.Interpolation.Linear([minX, maxX], clampedValue);

        this.value = clampedValue;

        this.emit('valueChanged', this.value);
    }

    protected updateHandlePosition(dragX: number): void {
        const minX = -this.targetWidth / 2;
        const maxX = this.targetWidth / 2;
        const clampedX = Phaser.Math.Clamp(dragX, minX, maxX);

        this.handle.x = clampedX;

        const newValue = (clampedX - minX) / (maxX - minX);

        if (this.value != newValue) {
            this.value = newValue;
            this.emit('valueChanged', this.value);
        }
    }
}