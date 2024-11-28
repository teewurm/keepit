import { Scene } from "phaser";
import SceneData from "../../utils/SceneData";
import { ColorPalette } from "../../enums/Constants";
import { TextButton } from "../../components/TextButton";
import Slider from "../../components/Slider";
import Soundmanager, { SoundGroupKey } from "../../utils/Soundmanager";
import Lifebar, { GameStopWatch } from "../../components/LifebarAndStopwatch";

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
        this.cameras.main.setBackgroundColor('#47624F');

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

    create(_obj?: Object) {
        const menuContainer = this.createSoundMenu();
        menuContainer.setVisible(false);

        const openMenuBtn = new TextButton(this, this.width - 130, 20, "Soundmenu", { fontSize: 38, color: "#000000", fontStyle: "bold" });
        openMenuBtn.setOrigin(0.5, 0);

        openMenuBtn.setDepth(50);
        openMenuBtn.setStroke("#FFFFFF", 4);

        openMenuBtn.on("pointerup", () => menuContainer.setVisible(!menuContainer.visible))
    }

    protected createSoundMenu() {
        const menuWidth = this.width / 2
        const menuHeight = this.height * 0.8

        const menuBackground = this.add.rectangle(0, 0, menuWidth, menuHeight, ColorPalette.PORTAL);
        menuBackground.setStrokeStyle(8, 0x000000);
        menuBackground.setInteractive();

        const headline = this.add.text(0, menuHeight / -2 + 20, "Sounds", { fontSize: 48, color: "#000000", fontStyle: "bold" });
        headline.setOrigin(0.5, 0);

        const mainSoundSlider = this.createSoundSlider(menuWidth / 3, "Main");
        const musicSlider = this.createSoundSlider(menuWidth / 3, "Music", SoundGroupKey.Music);
        const sfxSlider = this.createSoundSlider(menuWidth / 3, "SFX", SoundGroupKey.SFX);


        const btnContainerMaxHeight = menuHeight * 0.6;
        const closeMenuBtn = this.createTextBtn("Close");
        const btnContainer = this.createBtnContainer(btnContainerMaxHeight, [mainSoundSlider, musicSlider, sfxSlider, closeMenuBtn]);

        const menuContainer = this.add.container(this.center_width, this.center_height, [menuBackground, headline, btnContainer]);

        closeMenuBtn.on("pointerup", () => menuContainer.setVisible(false));

        menuContainer.setDepth(100);
        return menuContainer;
    }

    protected createBtnContainer(height: number, btns: Phaser.GameObjects.GameObject[]): Phaser.GameObjects.Container {
        const btnContainer = this.add.container(0, 0, btns);

        const heightPerBtn = height / btnContainer.getAll().length;

        let currentYPos = height / - 2;
        btnContainer.getAll().forEach(element => {
            (element as Phaser.GameObjects.GameObject & { y: number }).y = currentYPos;

            currentYPos += heightPerBtn
        });

        return btnContainer;
    }

    protected createTextBtn(text: string, sceneToLoad?: string) {
        const newBtn = new TextButton(this, 0, 0, text, { fontSize: 48, color: "#000000", fontStyle: "bold" });
        newBtn.setOrigin(0.5, 0);

        if (sceneToLoad != undefined) {
            newBtn.on("pointerup", () => {
                GameStopWatch.currentTimeInMillis = 0;
                Lifebar.lastTimeWatchTookLife = 0;
                const data: SceneData = new SceneData();
                data.firstSceneOfLevel = true;
                this.scene.start(sceneToLoad, data)
            });
        }

        return newBtn;
    }

    protected createSoundSlider(width: number, titel: string, soundKey?: SoundGroupKey) {
        const newSlider = new Slider(this, 0, 0, width, 10, 20, titel);
        newSlider.on('valueChanged', (newVolume: number) => {
            if (soundKey == undefined)
                this.sound.volume = newVolume;
            else
                Soundmanager.adjustVolume(soundKey, newVolume);
        });
        newSlider.setValue(soundKey != undefined ? Soundmanager.getVolume(soundKey) : this.sound.volume);
        return newSlider;
    }

    loadNextScene(nextSceneName: string) {
        this.scene.pause();

        const sceneData = new SceneData();
        this.setSceneDataBeforeTransition(sceneData);

        if (this.scene.isPaused(nextSceneName)) {
            this.scene.resume(nextSceneName, sceneData)
            this.scene.moveAbove(this.scene.key, nextSceneName);
        } else {
            this.scene.launch(nextSceneName, sceneData);
        }

        this.scene.get(nextSceneName).scene.bringToTop();
        console.log(nextSceneName)
    }

    protected setSceneDataBeforeTransition(_sceneData: SceneData): void { }
}