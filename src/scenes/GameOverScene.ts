import { TextButton } from "../components/TextButton";
import { Assets, SceneNames } from "../enums/Constants";
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
        let btnText;

        if (gameData.won) {
            btnText = "Yeah you won";
            this.sound.get(Assets.Audio.Victorysound).play();
        } else {
            btnText = "Dead :(";
            this.sound.get(Assets.Audio.Deathsound).play();
        }

        const gameOverBtn = new TextButton(this, this.center_width, this.center_height, btnText, {
            fontSize: 62,
            color: "#c83726"
        });

        gameOverBtn
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .addListener("pointerup", () => {
                this.scene.start(SceneNames.MainMenu);
            });
    }
}