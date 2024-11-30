import { Assets } from "../enums/Constants";

export class TextButton extends Phaser.GameObjects.Text {

    protected defaultFillColor: string;

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, style: Phaser.Types.GameObjects.Text.TextStyle) {
        super(scene, x, y, text, style);

        this.defaultFillColor = style.color ? style.color.toString() : "#000000";

        this.setInteractive({ useHandCursor: true })
            .on("pointerup", () => this.scene.sound.get(Assets.Audio.BtnClick).play())
            .on('pointerover', () => this.setStyle({ fill: '#e5b01d' }))
            .on('pointerout', () => this.setStyle({ fill: this.defaultFillColor }));

        this.scene.add.existing(this);
    }

    setDefaultColor(newDefault: string){
        this.defaultFillColor = newDefault;
        this.setColor(newDefault)
    }
}
