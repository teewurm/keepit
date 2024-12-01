import { Assets, ColorPalette, GameplaySettings } from "../enums/Constants";
import SceneBase from "../scenes/bases/SceneBase";
import CustomContainerBase from "./bases/CustomContainerBase";

export default class Lifebar extends CustomContainerBase {
    protected maxLife: number;
    protected currentLife: number;


    protected stopWatch?: GameStopWatch;
    protected redLifeBar: Phaser.GameObjects.Rectangle;
    static lastTimeWatchTookLife: number = 0;

    static mazeDamage = GameplaySettings.MazeDamage;

    // :(
    readonly onDeath: (() => void)[] = [];

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number, maxLife: number) {
        super(scene, x, y, width, height);

        this.maxLife = maxLife;
        this.currentLife = maxLife;

        this.createBar();
        this.updateLifeBar();
    }

    static resetData() {
        Lifebar.lastTimeWatchTookLife = 0;
    }

    getCurrentLife() {
        return this.currentLife;
    }

    setCurrentLife(newLife: number) {
        let flooredLife = Math.floor(newLife);

        if (flooredLife < 0)
            flooredLife = 0;

        //Only if the player wasn't dead before it can die ( ﾟoﾟ)
        if (this.currentLife != 0 && flooredLife == 0) {
            this.onDeath.forEach(func => func());
        }


        this.currentLife = flooredLife;

        this.updateLifeBar();
    }

    //This will determine if the life will be reduced based on the time
    setStopWatch(stopWatch: GameStopWatch) {
        this.stopWatch = stopWatch;

        stopWatch.onTimeUpdated.push(this.onTimeUpated.bind(this));
    }

    reduceLife(damageToTake: number) {
        this.setCurrentLife(this.currentLife - damageToTake);
    }

    protected createBar() {
        const outline = this.scene.add.rectangle(0, 0, this.targetWidth, this.targetHeight);
        outline.setStrokeStyle(2, 0x000000);

        this.redLifeBar = this.scene.add.rectangle(this.targetWidth / -2, 0, this.targetWidth, this.targetHeight, ColorPalette.LIFEBAR);
        this.redLifeBar.setOrigin(0, 0.5);

        this.add([this.redLifeBar, outline]);
    }

    protected updateLifeBar() {
        this.redLifeBar.setScale(this.currentLife / this.maxLife, 1);
    }

    protected onTimeUpated(currentTime: number) {
        if (this.currentLife == 0)
            return;

        const timePassedSinceLastDamage = currentTime - Lifebar.lastTimeWatchTookLife;

        const timesDamageToTake = Math.floor(timePassedSinceLastDamage / GameplaySettings.MazeDamageIntervalInMillis);

        if (timesDamageToTake > 0) {
            const damageToTake = timesDamageToTake * Lifebar.mazeDamage;

            this.scene.sound.get(Assets.Audio.SoulSteal).play();
            this.reduceLife(damageToTake);

            Lifebar.lastTimeWatchTookLife = currentTime;

            if (this.currentLife == 0) {
                this.stopWatch?.setTime(Math.ceil(GameplaySettings.MaxLife / Lifebar.mazeDamage) * GameplaySettings.MazeDamageIntervalInMillis);
            }
        }
    }
}

export class GameStopWatch extends CustomContainerBase {
    protected timerText: Phaser.GameObjects.Text;

    protected static timeIsRunning = false;
    protected static startDateInMillis: number;
    protected static currentTimeInMillis: number = 0;

    readonly onTimeUpdated: ((currentTime: number) => void)[] = [];

    constructor(scene: SceneBase, x: number, y: number, fontSize: number) {
        super(scene, x, y, 0, 0);

        this.createTimer(fontSize);

        this.timerText.setText(this.formatMilliseconds(GameStopWatch.currentTimeInMillis));
    }

    static resetData() {
        GameStopWatch.currentTimeInMillis = 0;
        GameStopWatch.timeIsRunning = false;
        GameStopWatch.startDateInMillis = 0;
    }

    protected createTimer(fontSize: number) {
        this.timerText = this.scene.add.text(0, 0, "00:00:000", { fontSize: fontSize, color: "#FFFFFF", fontStyle: "bold" });
        this.timerText.setOrigin(0.5, 0.5);

        this.add(this.timerText);
    }

    static startStopWatch() {
        if (!GameStopWatch.timeIsRunning) {
            GameStopWatch.startDateInMillis = Date.now();
            GameStopWatch.timeIsRunning = true;
        }
    }

    static stopStopWatch() {
        GameStopWatch.timeIsRunning = false;
    }

    updateTime() {
        if (GameStopWatch.timeIsRunning)
            this.setTime(Date.now() - GameStopWatch.startDateInMillis);
    }

    updateTimeVisuals() {
        this.timerText.setText(this.formatMilliseconds(GameStopWatch.currentTimeInMillis));
    }

    setTime(millis: number) {
        this.timerText.setText(this.formatMilliseconds(millis));
        GameStopWatch.currentTimeInMillis = millis;

        this.onTimeUpdated.forEach(func => {
            func(millis);
        });
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