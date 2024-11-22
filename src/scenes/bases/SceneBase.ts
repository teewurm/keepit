import { Scene } from "phaser";
import SceneData from "../../utils/SceneData";

export default abstract class SceneBase extends Scene {
    width: number;
    height: number;
    center_width: number;
    center_height: number;
    fpsText: Phaser.GameObjects.Text

    constructor(name: string | Phaser.Types.Scenes.SettingsConfig | undefined) {
        super(name);
    }

    init(_placeHolder: Object | undefined = undefined) {
        this.width = Number(this.sys.game.config.width);
        this.height = Number(this.sys.game.config.height);
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        if (DEBUG) {
            // Create text object to show FPS in top-right corner
            this.fpsText = this.add.text(0, 0, '', {
                font: '16px Arial',
                fontSize: "fill: '#ffffff'",
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(1, 0);

            this.fpsText.setPosition(this.cameras.main.width - 10, 10);
        }
    }

    update() {
        if (DEBUG) {
            this.fpsText.setText('FPS: ' + Math.round(this.game.loop.actualFps));
        }
    }

    loadNextScene(nextSceneName: string) {
        const sceneData = new SceneData();
        this.setSceneDataBeforeTransition(sceneData);

        if (this.scene.isPaused(nextSceneName)) {
            this.scene.resume(nextSceneName, sceneData)
            this.scene.moveAbove(this.scene.key, nextSceneName);
        } else {
            this.scene.launch(nextSceneName, sceneData);
        }

        this.scene.pause();
    }

    protected setSceneDataBeforeTransition(_sceneData: SceneData): void { }
}