import { ColorPalette } from "../enums/Constants";
import SceneBase from "../scenes/bases/SceneBase";
import CustomContainerBase from "./bases/CustomContainerBase";

export default class RedArrow extends CustomContainerBase {


    constructor(scene: SceneBase, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height);

        this.createShapes();
    }

    protected createShapes() {
        const tipWidth = this.targetWidth * 0.2;

        const body = this.scene.add.rectangle(-tipWidth / 2, 0, this.targetWidth - tipWidth, this.targetHeight * 0.5, ColorPalette.LIFEBAR);
        const tip = this.scene.add.triangle(this.targetWidth / 2 - tipWidth / 2, this.targetHeight / 2, -this.targetHeight / 2, tipWidth / 2, 0, -tipWidth / 2, this.targetHeight / 2, tipWidth / 2, ColorPalette.LIFEBAR);
        tip.setOrigin(0.5, 0)
        tip.setRotation(Math.PI / 2);

        body.setStrokeStyle(3, 0x000000)
        tip.setStrokeStyle(3, 0x000000)

        this.add([body, tip]);
    }
}