import Lifebar from "../components/LifebarAndStopwatch";
import Player from "../components/Player";
import { TextButton } from "../components/TextButton";
import { Assets, GameplaySettings, SceneNames } from "../enums/Constants"
import Soundmanager, { SoundGroupKey } from "../utils/Soundmanager";
import SceneBase from "./bases/SceneBase"

export default class MainMenu extends SceneBase {
    protected menuContainer: Phaser.GameObjects.Container;

    protected static firstTimeVisit = true;

    constructor() {
        super(SceneNames.MainMenu);
    }

    create() {
        super.create();

        this.add.sprite(0, 0, Assets.Sprite.GradientBackground).setOrigin(0);

        Soundmanager.loopAudioClips(SoundGroupKey.Music);

        const menuWidth = this.width / 3
        const menuHeight = this.height * 0.85

        const menuBackground = this.createDialogBackground(menuWidth, menuHeight);

        const headline = this.add.text(0, menuHeight / -2 + 20, "Secret Weak Spot", { fontSize: 48, color: "#000000", fontStyle: "bold" });
        headline.setOrigin(0.5, 0);

        const btnContainerMaxHeight = menuHeight * 0.6;
        const level1Btn = this.createTextBtn("Level 1", SceneNames.Level1Maze1);
        const level2Btn = this.createTextBtn("Level 2", SceneNames.Level2Maze1);
        const level3Btn = this.createTextBtn("Level 3", SceneNames.Level3Maze1);

        const infoBtn = new TextButton(this, 0, 0, "Info", { fontSize: 48, color: "#000000", fontStyle: "bold" });
        infoBtn.setOrigin(0.5, 0);

        const empty = this.add.text(0, 0, "");
        const selectInfo = this.add.text(0, 0, "Character", { fontSize: 40, color: "#000000", fontStyle: "bold" });
        selectInfo.setOrigin(0.5, 0.5);

        const characterSelect = this.createCharacterSelect(menuWidth * 0.7);

        const empty2 = this.add.text(0, 0, "");
        const dagmageSelectInfo = this.add.text(0, 0, "Maze Damage (Difficulty)", { fontSize: 38, color: "#000000", fontStyle: "bold" });
        dagmageSelectInfo.setOrigin(0.5, 0.5);
        const difficultySelection = this.createDifficultyDialog(menuWidth * 0.7);


        const btnContainer = this.createBtnContainer(btnContainerMaxHeight,
            [level1Btn, level2Btn, level3Btn, infoBtn, empty, selectInfo, characterSelect, empty2, dagmageSelectInfo, difficultySelection]);

        const creditTextMusic = this.add.text(-this.center_width + 20, this.center_height - 80, "Music by Steven Melin", { fontSize: 36, fontStyle: "bold", color: "#000000" })
        creditTextMusic.setOrigin(0, 1);
        const creditTextSfx = this.add.text(-this.center_width + 20, this.center_height - 60, "SFX from pixabay.com | imphenzia | myself :)", { fontSize: 36, fontStyle: "bold", color: "#000000" })
        creditTextMusic.setOrigin(0, 1);

        const infoDialog = this.createInfoDialog();
        infoDialog.setVisible(false);
        infoBtn.on("pointerup", () => infoDialog.setVisible(true));


        if (MainMenu.firstTimeVisit) {
            // this.createWelcomeDialog();
            MainMenu.firstTimeVisit = false;
        }

        this.menuContainer = this.add.container(this.center_width, this.center_height, [menuBackground, headline, btnContainer, characterSelect, creditTextMusic, creditTextSfx]);
    }

    protected createInfoDialog() {
        const menuWidth = this.width / 2
        const menuHeight = this.height * 0.8

        const menuBackground = this.createDialogBackground(menuWidth, menuHeight);

        const headline = this.add.text(0, menuHeight / -2 + 20, "Info", { fontSize: 48, color: "#000000", fontStyle: "bold" });
        headline.setOrigin(0.5, 0);

        const infoText = this.add.text(0, 0, "Move with WASD or arrow keys.\n\nFind your way through the different mazes.\n\nCollect different types of weapons.\nEach type is always in the same place.\n\nCollect question marks to reveal\nthe weaknesses (random) of the upcoming boss.\n\nFind the boss portal and defeat it.\n\nBe quick :)",
            { fontSize: 38, fontStyle: "bold", color: "#000000", wordWrap: { width: menuWidth * 0.8 } })
        infoText.setOrigin(0.5, 0.5);

        const closeMenuBtn = this.createTextBtn("Close").setPosition(0, menuHeight / 2 - 100);

        const menuContainer = this.add.container(this.center_width, this.center_height, [menuBackground, headline, infoText, closeMenuBtn]);

        closeMenuBtn.on("pointerup", () => menuContainer.setVisible(false));

        menuContainer.setDepth(100);
        return menuContainer;
    }

    protected createWelcomeDialog() {
        const menuWidth = this.width * 0.4
        const menuHeight = this.height * 0.5

        const menuBackground = this.createDialogBackground(menuWidth, menuHeight);

        const headline = this.add.text(0, menuHeight / -2 + 20, "Hi everyone :)", { fontSize: 48, color: "#000000", fontStyle: "bold" });
        headline.setOrigin(0.5, 0);

        const infoText = this.add.text(0, 0, "Welcome to\nSecret Weak Spot",
            { fontSize: 38, fontStyle: "bold", color: "#000000", wordWrap: { width: menuWidth * 0.8 }, align: 'center' })
        infoText.setOrigin(0.5, 0.5);

        const closeMenuBtn = this.createTextBtn("Let's go").setPosition(0, menuHeight / 4);

        const menuContainer = this.add.container(this.center_width, this.center_height, [menuBackground, headline, infoText, closeMenuBtn]);

        closeMenuBtn.on("pointerup", () => menuContainer.setVisible(false));
        menuContainer.setDepth(50);
    }

    protected createCharacterSelect(width: number) {
        const fontSize = 44;

        const leftClick = new TextButton(this, width / -2, 0, "<", { fontStyle: "bold", fontSize: fontSize, color: "#000000" });
        leftClick.setOrigin(0.5, 0.5)

        const rightClick = new TextButton(this, width / 2, 0, ">", { fontStyle: "bold", fontSize: fontSize, color: "#000000" });
        rightClick.setOrigin(0.5, 0.5);


        const playerSprite = this.add.sprite(0, 0, Player.activePlayerSprite);

        const changeCharacter = () => {
            const newActiveSprite = Player.activePlayerSprite == Assets.Sprite.MainCharacter ? Assets.Sprite.MainCharacter2 : Assets.Sprite.MainCharacter;

            Player.activePlayerSprite = newActiveSprite;
            playerSprite.setTexture(newActiveSprite);
        }

        leftClick.on("pointerup", changeCharacter.bind(this));
        rightClick.on("pointerup", changeCharacter.bind(this));

        return this.add.container(0, 0, [playerSprite, leftClick, rightClick]);
    }

    //todo refactor selection of difficulty and character so it has a base selection component and you can swap more than two items (but now I'm in time pressure)
    //Don't do it like this kids :(
    protected createDifficultyDialog(width: number) {
        const fontSize = 44;

        const leftClick = new TextButton(this, width / -2, 0, "<", { fontStyle: "bold", fontSize: fontSize, color: "#000000" });
        leftClick.setOrigin(0.5, 0.5)

        const rightClick = new TextButton(this, width / 2, 0, ">", { fontStyle: "bold", fontSize: fontSize, color: "#000000" });
        rightClick.setOrigin(0.5, 0.5);


        const hardText = "Hard";
        const normalText = "Normal";

        const difficultyText = this.add.text(0, 0, Lifebar.mazeDamage == GameplaySettings.MazeDamage ? hardText : normalText,
            { fontSize: 34, color: "#000000", fontStyle: "bold" }
        );
        difficultyText.setOrigin(0.5, 0.5);

        const changeDifficulty = () => {
            let newText = "";

            if (Lifebar.mazeDamage == GameplaySettings.MazeDamage) {
                newText = normalText;
                Lifebar.mazeDamage = GameplaySettings.MazeDamageEz;
            } else {
                newText = hardText;
                Lifebar.mazeDamage = GameplaySettings.MazeDamage;
            }

            difficultyText.setText(newText);
        }

        leftClick.on("pointerup", changeDifficulty.bind(this));
        rightClick.on("pointerup", changeDifficulty.bind(this));

        return this.add.container(0, 0, [difficultyText, leftClick, rightClick]);
    }
}