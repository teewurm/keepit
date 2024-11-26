import { TextButton } from "../components/TextButton";
import { SceneNames } from "../enums/Constants";
import SceneBase from "./bases/SceneBase";

export default class GameOverScene extends SceneBase {
    constructor() {
        super(SceneNames.GameOver);
    }

    init(_placeHolder?: Object | undefined): void {
        super.init();

        this.scene.bringToTop();

        this.scene.manager.scenes.forEach(element => {
            if (element.scene.isPaused())
                element.scene.stop();
        })
    }

    create(gameData: { won: boolean }): void {
        const btnText = gameData.won ? "Yeah you won" : "Dead :("

        const gameOverBtn = new TextButton(this, this.center_width, this.center_height, btnText, {
            fontSize: 62,
            color: "#c83726"
        });

        this.add.existing(gameOverBtn)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .addListener("pointerup", () => {
                this.scene.start(SceneNames.MainMenu);
            });
    }
}