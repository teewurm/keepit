import { Assets, ColorPalette, SceneNames } from "../enums/Constants"
import SceneBase from "./bases/SceneBase"

export default class MainMenu extends SceneBase {
    protected menuContainer: Phaser.GameObjects.Container;

    constructor() {
        super(SceneNames.MainMenu);
    }

    create() {
        super.create();

        const backgroundMusic = this.sound.get(Assets.Audio.PianoMusic);
        if (!backgroundMusic.isPlaying) {
            backgroundMusic.play();
        }

        const menuWidth = this.width / 3
        const menuHeight = this.height * 0.85

        const menuBackground = this.add.rectangle(0, 0, menuWidth, menuHeight, ColorPalette.PORTAL);
        menuBackground.setStrokeStyle(8, 0x000000);

        const headline = this.add.text(0, menuHeight / -2 + 20, "Keep It", { fontSize: 48, color: "#000000", fontStyle: "bold" });
        headline.setOrigin(0.5, 0);

        const btnContainerMaxHeight = menuHeight * 0.6;
        const level1Btn = this.createTextBtn("Level 1", SceneNames.Level1);
        const btnContainer = this.createBtnContainer(btnContainerMaxHeight, [level1Btn]);

        this.menuContainer = this.add.container(this.center_width, this.center_height, [menuBackground, headline, btnContainer]);
    }
}