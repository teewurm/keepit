import SceneBase from "../../scenes/bases/SceneBase";

export default class CustomContainerBase extends Phaser.GameObjects.Container {
    protected targetWidth: number;
    protected targetHeight: number;

    declare scene: SceneBase;

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number) {
        super(scene, x, y);

        this.targetWidth = width;
        this.targetHeight = height;
    }

}