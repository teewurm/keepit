export default class CustomContainerBase extends Phaser.GameObjects.Container {
    protected containerWidth: number;
    protected containerHeight: number;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene, x, y);

        this.containerWidth = width;
        this.containerHeight = height;
    }

}