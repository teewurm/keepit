import Backpack from "../../components/Backpack";
import Boss from "../../components/Boss";
import Lifebar, { GameStopWatch } from "../../components/LifebarAndStopwatch";
import Player from "../../components/Player";
import { ColorPalette, GameLayout, SceneNames } from "../../enums/Constants";
import SceneData from "../../utils/SceneData";
import SceneBase from "./SceneBase";

export default class BossSceneBase extends SceneBase {
    protected mainContainer: Phaser.GameObjects.Container;

    protected player: Player;
    protected boss: Boss;

    protected fieldWidth: number;
    protected fieldHeight: number;

    protected playerLifeBar: Lifebar;
    protected gameTimer: GameStopWatch;

    protected attackButton: Phaser.GameObjects.Rectangle;

    protected isPlayerTurn = false;


    constructor(name: string) {
        super(name ? name : SceneNames.BossBase);
    }

    create(newData: SceneData) {
        this.cameras.main.setBackgroundColor(ColorPalette.FOG);

        this.fieldWidth = GameLayout.BossSquareCountWidth * GameLayout.SquareEdgeLength;
        this.fieldHeight = GameLayout.BossSquareCountHeight * GameLayout.SquareEdgeLength;

        this.createBaseField();
        this.createPlayerWithBackpack();
        this.createBaseField();
        this.createLifeBarAndStopwatch();
        this.spawnAttackButton();
        this.addAttackListener();

        if (newData.currentLife != undefined)
            this.playerLifeBar.setCurrentLife(newData.currentLife);

        this.createBoss();

        if (newData.backpackItems != undefined)
            this.player.backpack.setBackpackItems(newData.backpackItems);

        this.boss.getLifeBar().onDeath.push(() => console.log("Boss dead"));
        this.playerLifeBar.onDeath.push(() => console.log("Player dead"));

        this.player.backpack.activateFirstItem();
        this.isPlayerTurn = true;
    }

    protected createBaseField() {
        const lineWidth = 4;
        const lineColor = ColorPalette.Wall;

        const outline = this.add.rectangle(0, 0,
            this.fieldWidth,
            this.fieldHeight,
            undefined, 0);

        const middleLine = this.add.line(0, 0, 0, 0, this.fieldWidth, 0, lineColor);
        middleLine.setLineWidth(lineWidth);

        outline.setStrokeStyle(lineWidth, lineColor);

        this.mainContainer = this.add.container(this.center_width, this.center_height, [outline, middleLine]);
    }

    protected createPlayerWithBackpack() {
        const backpack = new Backpack(this, ((GameLayout.SquareEdgeLength + this.fieldWidth) / 2) + GameLayout.BackpackElementSize, 0, GameLayout.BackpackElementSize, GameLayout.BackpackElementSize);
        this.player = new Player(this, 0, this.fieldHeight / 4, GameLayout.SquareEdgeLength * 0.8, GameLayout.SquareEdgeLength * 0.8, [], backpack);

        this.mainContainer.add([backpack, this.player]);
    }

    protected createBoss() {
        this.boss = new Boss(this, 0, this.fieldHeight / -4, this.fieldWidth * 0.8, this.fieldHeight * 0.4);

        this.mainContainer.add(this.boss);
    }

    protected createLifeBarAndStopwatch() {
        const lifebarWidth = 400;
        this.playerLifeBar = new Lifebar(this, lifebarWidth / 2 - this.fieldWidth / 2, 0, lifebarWidth, 40, 100);

        this.gameTimer = new GameStopWatch(this, 0, 0, 42);

        this.add.container(this.center_width, + GameLayout.SquareEdgeLength / -2 + this.center_height + this.fieldHeight / -2,
            [this.playerLifeBar, this.gameTimer]);
    }

    protected spawnAttackButton() {
        this.attackButton = this.add.rectangle(0, 0, 200, 50, 0xffffff).setStrokeStyle(2, 0x000000);
        const btnText = this.add.text(0, 0, "Attack !!!", { fontSize: 28, fontStyle: "bold", color: "#000000" }).setOrigin(0.5, 0.5);

        const btnCont = this.add.container(0, 0, [this.attackButton, btnText]);

        this.mainContainer.add(btnCont)
    }

    protected addAttackListener() {
        this.attackButton.setInteractive();

        this.attackButton.on("pointerup", this.attackBoss.bind(this))
    }

    protected attackBoss() {
        if (!this.isPlayerTurn)
            return;

        const activeWeaponType = this.player.backpack.getActiveWeapon();
        if (activeWeaponType != undefined)
            this.boss.attackBoss(activeWeaponType);

        this.isPlayerTurn = false;
    }

    update(): void {
        super.update();
        this.gameTimer.updateTime();
    }
}