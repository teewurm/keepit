import Backpack from "../../components/Backpack";
import Boss from "../../components/Boss";
import BossAttack from "../../components/BossAttack";
import FireballAttack from "../../components/FireballAttack";
import Lifebar, { GameStopWatch } from "../../components/LifebarAndStopwatch";
import Player from "../../components/Player";
import { TextButton } from "../../components/TextButton";
import Weakspot from "../../components/Weakspot";
import { BossType } from "../../enums/BossType";
import { Assets, ColorPalette, GameLayout, GameplaySettings, SceneNames } from "../../enums/Constants";
import { ItemType } from "../../enums/ItemType";
import AnimatoinHelper from "../../utils/AnimationHelper";
import ItemSlot from "../../utils/ItemSlot";
import SceneData from "../../utils/SceneData";
import SceneBase from "./SceneBase";

export default class BossSceneBase extends SceneBase {
    protected readonly bossType: BossType = BossType.Blue;

    protected mainContainer: Phaser.GameObjects.Container;

    protected player: Player;
    protected boss: Boss;

    protected fieldWidth: number;
    protected fieldHeight: number;

    protected playerLifeBar: Lifebar;
    protected gameTimer: GameStopWatch;

    protected attackButton: TextButton;

    protected isPlayerTurn = false;

    protected bossAttack: BossAttack;
    protected fireballAttack: FireballAttack;

    constructor(name: string) {
        super(name ? name : SceneNames.BossBase);
    }

    create(newData: SceneData) {
        super.create();

        this.cameras.main.setBackgroundColor(ColorPalette.FOG);

        this.fieldWidth = GameLayout.BossSquareCountWidth * GameLayout.SquareEdgeLength;
        this.fieldHeight = GameLayout.BossSquareCountHeight * GameLayout.SquareEdgeLength;

        this.createBaseField();
        this.createBoss();
        this.createPlayerWithBackpack();
        this.createBaseField();
        this.createLifeBarAndStopwatch();
        this.spawnAttackButton();
        this.spawnAttackObjects();
        this.addAttackListener();

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

    protected spawnAttackObjects() {
        this.bossAttack = new BossAttack(this, this.player.x, this.player.y, this.fieldWidth / 4, this.fieldHeight / 4, this.boss.getBossType());
        this.fireballAttack = new FireballAttack(this, 0, 0, this.fieldWidth / 7, this.fieldHeight / 7,);
        this.fireballAttack.setStartPos({ x: this.player.x, y: this.player.y })

        this.mainContainer.add([this.bossAttack, this.fireballAttack]);
    }

    protected createBoss() {
        this.boss = new Boss(this, 0, this.fieldHeight / -4, this.fieldWidth * 0.8, this.fieldHeight * 0.4, this.bossType);

        this.mainContainer.add([this.boss]);
    }

    protected createLifeBarAndStopwatch() {
        const lifebarWidth = 400;
        const lifebarHeight = 100;
        this.playerLifeBar = new Lifebar(this, 0, this.fieldHeight / 2 - lifebarHeight / 2, lifebarWidth, 40, lifebarHeight);

        this.gameTimer = new GameStopWatch(this, 0, 0, 42);

        this.add.container(this.center_width, + GameLayout.SquareEdgeLength / -2 + this.center_height + this.fieldHeight / -2,
            [this.gameTimer]);

        this.mainContainer.add(this.playerLifeBar);
    }

    protected spawnAttackButton() {
        const btnBackground = this.add.rectangle(0, 0, 200, 50, 0xffffff).setStrokeStyle(2, 0x000000);
        this.attackButton = new TextButton(this, 0, 0, "Attack !!!", { fontSize: 28, fontStyle: "bold", color: "#000000" }).setOrigin(0.5, 0.5);

        const btnCont = this.add.container(0, 0, [btnBackground, this.attackButton]);

        this.mainContainer.add(btnCont);
    }

    protected addAttackListener() {
        this.attackButton.setInteractive();

        this.attackButton.on("pointerup", this.attackBoss.bind(this))
    }

    protected setIsPlayerTurn(val: boolean) {
        this.isPlayerTurn = false;
        this.checkWeakspot(() => {
            this.isPlayerTurn = val;
            this.player.backpack.isSwapWeaponBlocked = !val;

            if (this.playerLifeBar.getCurrentLife() <= 0 || this.boss.getLifeBar().getCurrentLife() <= 0) {
                GameStopWatch.stopStopWatch();
                return;
            }

            if (!this.isPlayerTurn) {
                this.attackPlayer();
            }
        });
    }

    protected attackBoss() {
        if (this.isPlayerTurn == false)
            return;

        const activeWeaponType = this.player.backpack.getActiveWeapon();
        if (activeWeaponType != undefined) {
            const weakSpotToDestroy = this.boss.getFirstWeakspot(activeWeaponType);

            if (weakSpotToDestroy) {
                const newToPos = AnimatoinHelper.getLocalTransformPoint(weakSpotToDestroy, this.fireballAttack.getSprite());
                this.fireballAttack.setEndPos(newToPos);
            } else {
                this.fireballAttack.setEndPos({ x: this.boss.x, y: this.boss.y });
            }

            this.fireballAttack.setDamageType(activeWeaponType);
            this.fireballAttack.attack(undefined, () => this.boss.attackBoss(activeWeaponType), true, "Power2");

            this.playRandomAudio([Assets.Audio.Weapon1, Assets.Audio.Weapon2, Assets.Audio.Weapon3]);
        }

        this.setIsPlayerTurn(false);
    }

    protected attackPlayer() {
        this.time.delayedCall(GameplaySettings.BossAttackDelay, () => {
            this.bossAttack.attack(() => {
                this.playerLifeBar.reduceLife(GameplaySettings.BossDamage);
                this.playRandomAudio([Assets.Audio.MonsterAttack, Assets.Audio.MonsterAttack2]);
            }, this.setIsPlayerTurn.bind(this, true));
        });
    }

    protected playRandomAudio(audioArray: string[]) {
        const randomSoundIndex = Math.floor(Math.random() * audioArray.length);
        this.sound.get(audioArray[randomSoundIndex]).play();
    }

    protected checkWeakspot(callback: () => void) {
        const activeWeapon = this.player.backpack.getActiveWeapon();
        const infoCardsOfActiveWeaponDamageType = this.player.backpack
            .getCardSlots()
            .filter(element => element.getItem()?.type == ItemType.INFO_CARD && element.getItem()?.damageType == activeWeapon);

        const slots = infoCardsOfActiveWeaponDamageType.filter(element => element.getItem()?.damageType == activeWeapon);

        const questionMarksToMove: { slot: ItemSlot, spot: Weakspot, done: boolean }[] = [];

        this.boss.weakSpots.forEach(spot => {
            if (!spot.isDestroyed && !spot.isActive && spot.getDamageType() == activeWeapon) {
                const slot = slots.pop();
                if (slot != undefined) {
                    questionMarksToMove.push({ slot: slot, spot: spot, done: false });;
                }
            }
        });

        if (questionMarksToMove.length == 0) {
            this.time.delayedCall(GameplaySettings.DelayAfterPlayerMove, callback.bind(this))
            return;
        }

        questionMarksToMove.forEach(element => {
            this.moveItemToWeakspot(element.slot, element.spot, () => {
                element.done = true;
                if (questionMarksToMove.find(it => !it.done) == undefined) {
                    callback();
                }
            })
        })
    }

    protected moveItemToWeakspot(slot: ItemSlot, spot: Weakspot, callback: () => void) {
        const spriteToMove = slot.getSprite();

        if (spriteToMove == undefined)
            return;

        const localPosition = AnimatoinHelper.getLocalTransformPoint(spot, spriteToMove);

        const config: Phaser.Types.Tweens.TweenBuilderConfig = {
            targets: spriteToMove,
            ease: "Expo.In",
            duration: GameplaySettings.QuestionMarkMovementDuration,
            x: localPosition.x,
            y: localPosition.y,
        };

        config.onComplete = () => {
            this.time.delayedCall(GameplaySettings.QuestionMarkStayDuration, () => {
                spot.removeCover();
                slot.destroyItem();
                this.time.delayedCall(GameplaySettings.DelayAfterPlayerMove, callback.bind(this))
            });
        }

        this.tweens.add(config);

        this.time.delayedCall(250, () => this.sound.get(Assets.Audio.Zap).play())
    }

    update(): void {
        super.update();
        this.gameTimer.updateTime();
    }
}