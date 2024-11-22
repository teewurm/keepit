import { ColorPalette } from "../enums/Constants";
import SceneBase from "../scenes/bases/SceneBase";
import CustomContainerBase from "./bases/CustomContainerBase";

export default class Boss extends CustomContainerBase {

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height);

        this.createBoss();
    }

    protected createBoss() {
        const body = this.scene.add.rectangle(0, 0, this.targetWidth, this.targetHeight, ColorPalette.BOSS_PORTAL);

        const eyeWidth = this.targetWidth * 0.2;
        const eyeHeight = this.targetHeight * 0.1;
        const eyeX = this.targetWidth / 4;
        const eyey = -this.targetHeight / 4;

        const leftEye = this.scene.add.rectangle(-eyeX, eyey, eyeWidth, eyeHeight, 0x000000);
        const rightEye = this.scene.add.rectangle(eyeX, eyey, eyeWidth, eyeHeight, 0x000000);

        const nose = this.scene.add.rectangle(0, this.targetHeight / 5, this.targetWidth * 0.1, this.targetHeight * 0.1, 0x000000);

        this.add([body, leftEye, rightEye, nose]);
    }
}