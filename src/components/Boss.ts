import { ColorPalette } from "../enums/Constants";
import SceneBase from "../scenes/bases/SceneBase";
import CustomContainerBase from "./bases/CustomContainerBase";

export default class Boss extends CustomContainerBase {

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height);

        this.createBoss();
    }

    protected createBoss() {
        const mainBody = this.scene.add.rectangle(0, 0, this.targetWidth, this.targetHeight, ColorPalette.BOSS_PORTAL);

        this.add(mainBody);
    }
}