import Backpack from "../../components/Backpack";
import Boss from "../../components/Boss";
import Lifebar, { GameStopWatch } from "../../components/LifebarAndStopwatch";
import Player from "../../components/Player";
import RedArrow from "../../components/RedArrow";
import { BossType } from "../../enums/BossType";
import { Assets, ColorPalette, GameLayout, GameplaySettings, SceneNames } from "../../enums/Constants";
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

    protected redArrow: RedArrow;

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
        this.createBoss();
        this.spawnRedArrow();

        if (newData.currentLife != undefined)
            this.playerLifeBar.setCurrentLife(newData.currentLife);
        if (newData.backpackItems != undefined)
            this.player.backpack.setBackpackItems(newData.backpackItems);

        this.boss.getLifeBar().onDeath.push(() => this.scene.start(SceneNames.GameOver, { won: true }));
        this.playerLifeBar.onDeath.push(() => this.scene.start(SceneNames.GameOver, { won: false }));

        this.player.backpack.activateFirstItem();
        this.player.backpack.onWeaponSwap.push(this.setIsPlayerTurn.bind(this, false));
        this.setIsPlayerTurn(true);
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
        this.player = new Player(this, 0, this.fieldHeight / 4, GameLayout.SquareEdgeLength * 2, GameLayout.SquareEdgeLength * 2, [], backpack);

        this.mainContainer.add([backpack, this.player]);
    }

    protected createBoss() {
        this.boss = new Boss(this, 0, this.fieldHeight / -4, this.fieldWidth * 0.8, this.fieldHeight * 0.4, BossType.Red);

        this.mainContainer.add(this.boss);
    }

    protected spawnRedArrow() {
        const arrowWidth = this.fieldWidth * 0.2;
        this.redArrow = new RedArrow(this, this.fieldWidth / -2 + arrowWidth / 2, 0, arrowWidth, this.fieldHeight * 0.05);

        this.mainContainer.add(this.redArrow);
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

    protected setIsPlayerTurn(val: boolean) {
        this.isPlayerTurn = val;
        this.player.backpack.isSwapWeaponBlocked = !val;

        if (this.playerLifeBar.getCurrentLife() <= 0 || this.boss.getLifeBar().getCurrentLife() <= 0) {
            GameStopWatch.stopStopWatch();
            return;
        }

        if (!this.isPlayerTurn) {
            this.redArrow.setAngle(-30)
            this.attackPlayer();
        } else {
            this.redArrow.setAngle(30)
        }
    }

    protected attackBoss() {
        if (!this.isPlayerTurn)
            return;

        const activeWeaponType = this.player.backpack.getActiveWeapon();
        if (activeWeaponType != undefined) {
            this.boss.attackBoss(activeWeaponType);
            //Plays a random movement audio clip
            const weaponAudioSamples = [Assets.Audio.Weapon1, Assets.Audio.Weapon2, Assets.Audio.Weapon3];
            const randomSoundIndex = Math.floor(Math.random() * weaponAudioSamples.length);
            this.sound.get(weaponAudioSamples[randomSoundIndex]).play();
        }

        this.setIsPlayerTurn(false);
    }

    protected attackPlayer() {
        this.time.delayedCall(GameplaySettings.BossAttackDelayMillis, () => {
            this.playerLifeBar.reduceLife(GameplaySettings.BossDamage);
            this.sound.get(Assets.Audio.MonsterAttack).play();
            this.setIsPlayerTurn(true);
        });
    }

    update(): void {
        super.update();
        this.gameTimer.updateTime();
    }
}