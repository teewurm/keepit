import Boss from "../components/Boss";
import { TextButton } from "../components/TextButton";
import { Assets, ColorPalette, SceneNames } from "../enums/Constants"
import { DamageType } from "../enums/DamageType";
import { ItemType } from "../enums/ItemType";
import SceneData from "../utils/SceneData";
import SceneBase from "./bases/SceneBase"

export default class MainMenu extends SceneBase {
    protected menuContainer: Phaser.GameObjects.Container;

    constructor() {
        super(SceneNames.MainMenu);
    }

    create() {
        super.create();

        //todo remove
        this.sound.get(Assets.Audio.PianoMusic).play();
        Boss.generateRandomWeaknesses(3);
        Boss.currentWeaknesses = [DamageType.Void, DamageType.Electricity, DamageType.Poison]
        console.log(Boss.currentWeaknesses)
        const testData = new SceneData();
        testData.backpackItems = [
            { type: ItemType.WEAPON, damageType: DamageType.Fire },
            { type: ItemType.WEAPON, damageType: DamageType.Water },
            { type: ItemType.WEAPON, damageType: DamageType.Void },
            { type: ItemType.WEAPON, damageType: DamageType.Electricity },
            { type: ItemType.WEAPON, damageType: DamageType.Poison },
            { type: ItemType.WEAPON, damageType: DamageType.Yellow },
            { type: ItemType.INFO_CARD, damageType: DamageType.Fire },
            { type: ItemType.INFO_CARD, damageType: DamageType.Water },
            { type: ItemType.INFO_CARD, damageType: DamageType.Void },
            { type: ItemType.INFO_CARD, damageType: DamageType.Electricity },
            { type: ItemType.INFO_CARD, damageType: DamageType.Poison },
            { type: ItemType.INFO_CARD, damageType: DamageType.Yellow },
        ]

        this.scene.start(SceneNames.Level2Boss, testData);

        return;

        const backgroundMusic = this.sound.get(Assets.Audio.PianoMusic);
        if (!backgroundMusic.isPlaying) {
            backgroundMusic.play();
        }

        const menuWidth = this.width / 3
        const menuHeight = this.height * 0.85

        const menuBackground = this.add.rectangle(0, 0, menuWidth, menuHeight, ColorPalette.PORTAL);
        menuBackground.setStrokeStyle(8, 0x000000);

        const headline = this.add.text(0, menuHeight / -2 + 20, "Secret Weakspot", { fontSize: 48, color: "#000000", fontStyle: "bold" });
        headline.setOrigin(0.5, 0);

        const btnContainerMaxHeight = menuHeight * 0.4;
        const level1Btn = this.createTextBtn("Level 1", SceneNames.Level1Maze1);
        const level2Btn = this.createTextBtn("Level 2", SceneNames.Level2Maze1);
        const level3Btn = this.createTextBtn("Level 3", SceneNames.Level3Maze1);
        const infoBtn = new TextButton(this, 0, 0, "Info", { fontSize: 48, color: "#000000", fontStyle: "bold" });
        infoBtn.setOrigin(0.5, 0);
        const btnContainer = this.createBtnContainer(btnContainerMaxHeight, [level1Btn, level2Btn, level3Btn, infoBtn]);

        const creditTextMusic = this.add.text(-this.center_width + 20, this.center_height - 80, "Music by Steven Melin", { fontSize: 36, fontStyle: "bold", color: "#000000" })
        creditTextMusic.setOrigin(0, 1);
        const creditTextSfx = this.add.text(-this.center_width + 20, this.center_height - 60, "SFX from pixabay.com | imphenzia | myself :)", { fontSize: 36, fontStyle: "bold", color: "#000000" })
        creditTextMusic.setOrigin(0, 1);

        const infoDialog = this.createInfoDialog();
        infoDialog.setVisible(false);
        infoBtn.on("pointerup", () => infoDialog.setVisible(true));

        this.menuContainer = this.add.container(this.center_width, this.center_height, [menuBackground, headline, btnContainer, creditTextMusic, creditTextSfx]);
    }

    protected createInfoDialog() {
        const menuWidth = this.width / 2
        const menuHeight = this.height * 0.8

        const menuBackground = this.add.rectangle(0, 0, menuWidth, menuHeight, ColorPalette.PORTAL);
        menuBackground.setStrokeStyle(8, 0x000000);
        menuBackground.setInteractive();

        const headline = this.add.text(0, menuHeight / -2 + 20, "Info", { fontSize: 48, color: "#000000", fontStyle: "bold" });
        headline.setOrigin(0.5, 0);

        const infoText = this.add.text(0, 0, "Find your way to the diffrent mazes.\n\nCollect diffrent types of weapons.\n\nCollect question marks to reveal\nweaknesses of the upcoming boss.\n\nFind the boss portal and defeat it.\n\nBe fast :)",
            { fontSize: 38, fontStyle: "bold", color: "#000000", wordWrap: { width: menuWidth * 0.8 } })
        infoText.setOrigin(0.5, 0.5);

        const closeMenuBtn = this.createTextBtn("Close").setPosition(0, menuHeight / 2 - 100);

        const menuContainer = this.add.container(this.center_width, this.center_height, [menuBackground, headline, infoText, closeMenuBtn]);

        closeMenuBtn.on("pointerup", () => menuContainer.setVisible(false));

        menuContainer.setDepth(100);
        return menuContainer;
    }
}