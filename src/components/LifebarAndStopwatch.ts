import { ColorPalette } from "../enums/Constants";
import SceneBase from "../scenes/bases/SceneBase";
import CustomContainerBase from "./bases/CustomContainerBase";

export default class Lifebar extends CustomContainerBase {
    protected maxLife: number;
    protected redLifeBar: Phaser.GameObjects.Rectangle;

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number, maxLife: number) {
        super(scene, x, y, width, height);

        this.maxLife = maxLife;

        this.createBar();
    }


    protected createBar() {
        const outline = this.scene.add.rectangle(0, 0, this.targetWidth, this.targetHeight);
        outline.setStrokeStyle(2, 0x000000);

        this.redLifeBar = this.scene.add.rectangle(this.targetWidth / 2, 0, this.targetWidth, this.targetHeight, ColorPalette.LIFEBAR);
        this.redLifeBar.setOrigin(1, 0.5);

        this.add([this.redLifeBar, outline]);
    }
}

export class GameStopWatch extends CustomContainerBase {
    protected timerText: Phaser.GameObjects.Text;

    protected static timeIsRunning = false;
    protected static startDateInMillis: number;
    protected static currentTimeInMillis: number = 0;

    constructor(scene: SceneBase, x: number, y: number, fontSize: number) {
        super(scene, x, y, 0, 0);

        this.createTimer(fontSize);
    }

    protected createTimer(fontSize: number) {
        this.timerText = this.scene.add.text(0, 0, "00:00:000", { fontSize: fontSize, color: "#000000", fontStyle: "bold" });
        this.timerText.setOrigin(0.5, 0.5);

        this.add(this.timerText);
    }

    static startStopWatch() {
        if (!GameStopWatch.timeIsRunning) {
            GameStopWatch.startDateInMillis = Date.now();
            GameStopWatch.timeIsRunning = true;
        }
    }

    updateTime() {
        if (!GameStopWatch.timeIsRunning) {
            this.timerText.setText(this.formatMilliseconds(GameStopWatch.currentTimeInMillis));
            return;
        }

        const millis = Date.now() - GameStopWatch.startDateInMillis;

        this.timerText.setText(this.formatMilliseconds(millis));
        GameStopWatch.currentTimeInMillis = millis;
    }

    protected formatMilliseconds(millis: number) {
        let minutes = Math.floor(millis / 60000);
        let seconds = Math.floor((millis % 60000) / 1000);
        let milliseconds = millis % 1000;

        let formattedMinutes = String(minutes).padStart(2, '0');
        let formattedSeconds = String(seconds).padStart(2, '0');
        let formattedMilliseconds = String(milliseconds).padStart(3, '0');

        return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
    }
}