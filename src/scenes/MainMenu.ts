import { TextButton } from "../components/TextButton";
import { ColorPalette, SceneNames } from "../enums/Constants"
import SceneBase from "./bases/SceneBase"

export default class MainMenu extends SceneBase {
    protected menuContainer: Phaser.GameObjects.Container;

    constructor() {
        super(SceneNames.MainMenu);
    }

    create() {
        const menuWidth = this.width / 3
        const menuHeight = this.height * 0.85

        const menuBackground = this.add.rectangle(0, 0, menuWidth, menuHeight, ColorPalette.PORTAL);
        menuBackground.setStrokeStyle(8, 0x000000);

        const headline = this.add.text(0, menuHeight / -2 + 20, "Keep It", { fontSize: 48, color: "#000000", fontStyle: "bold" });
        headline.setOrigin(0.5, 0);



        const btnContainerMaxHeight = menuHeight * 0.6;
        const level1Btn = this.createTextBtn("Level 1 Maze 1", SceneNames.Level1);
        const level2Btn = this.createTextBtn("Level 1 Maze 2", SceneNames.Level2);
        const level3Btn = this.createTextBtn("Boss", SceneNames.BossBase);

        const btnContainer = this.add.container(0, 0, [level1Btn, level2Btn, level3Btn]);

        const heightPerBtn = btnContainerMaxHeight / btnContainer.getAll().length;

        let currentYPos = btnContainerMaxHeight / - 2;
        btnContainer.getAll().forEach(element => {
            (element as Phaser.GameObjects.Text).y = currentYPos;

            currentYPos += heightPerBtn
        });


        this.menuContainer = this.add.container(this.center_width, this.center_height, [menuBackground, headline, btnContainer]);
    }

    protected createTextBtn(text: string, sceneToLoad: string) {
        const newBtn = new TextButton(this, 0, 0, text, { fontSize: 48, color: "#000000", fontStyle: "bold" });
        newBtn.setOrigin(0.5, 0);

        newBtn.on("pointerup", () => {
            this.scene.start(SceneNames.Preloader, { name: sceneToLoad })
        });

        return newBtn;
    }
}