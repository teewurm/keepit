import { ColorPalette } from "../enums/Constants";
import { DamageType } from "../enums/DamageType";
import SceneBase from "../scenes/bases/SceneBase";
import CustomContainerBase from "./bases/CustomContainerBase";

export default class Weakspot extends CustomContainerBase {
    protected damageType: DamageType;

    protected baseShape: Phaser.GameObjects.Rectangle;
    protected coverContainer: Phaser.GameObjects.Container;

    isActive = false;
    isDestroyed = false;

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number, damageType: DamageType) {
        super(scene, x, y, width, height);

        this.damageType = damageType;

        this.createShapes();

        this.scene.add.existing(this);
    }

    getDamageType() {
        return this.damageType;
    }

    removeCover() {
        if (this.isActive || this.isDestroyed)
            return;

        this.coverContainer.setVisible(false);
        this.isActive = true;
    }

    destroyWeakspot() {
        if (this.isDestroyed)
            return;

        this.isDestroyed = true;
        this.baseShape.setVisible(false);
    }

    protected createShapes() {
        this.baseShape = this.scene.add.rectangle(0, 0, this.targetWidth, this.targetHeight, this.getColor(this.damageType), 0.7);

        const outline = this.scene.add.rectangle(0, 0, this.targetWidth, this.targetHeight);
        outline.setStrokeStyle(5, 0x000000);

        const coverBackground = this.scene.add.rectangle(0, 0, this.targetWidth, this.targetHeight, 0xFFFFFF);
        const questionMark = this.scene.add.text(0, 0, "?", { fontSize: 32, color: "#000000", fontStyle: "bold" });
        questionMark.setOrigin(0.5, 0.5);

        this.coverContainer = this.scene.add.container(0, 0, [coverBackground, questionMark])

        this.add([this.baseShape, this.coverContainer, outline]);
    }

    protected getColor(type: DamageType) {
        switch (type) {
            case DamageType.Electricity:
                return ColorPalette.ELEC;
            case DamageType.Fire:
                return ColorPalette.FIRE;
            case DamageType.Water:
                return ColorPalette.WATER;
            case DamageType.Poison:
                return ColorPalette.POISON;
            case DamageType.Void:
                return ColorPalette.VOID;
            case DamageType.Yellow:
                return ColorPalette.YELLOW;
        }
    }
}