import Backpack from "../../components/Backpack";
import Player from "../../components/Player";
import { Assets, GameLayout, GameplaySettings, SceneNames } from "../../enums/Constants";
import { ItemType } from "../../enums/ItemType";
import GameSquare from "../../components/GameSquare";
import IndexUtil from "../../utils/IndexUtil";
import SceneBase from "./SceneBase";
import SceneData, { ItemWithIndex, PortalWithIndex } from "../../utils/SceneData";
import Lifebar, { GameStopWatch } from "../../components/LifebarAndStopwatch";
import { DamageType } from "../../enums/DamageType";
import Boss from "../../components/Boss";

export default class MazeSceneBase extends SceneBase {
    protected readonly squareStartingMatrix = [
        [1, 1, 2, 2, 2, 2,],
        [2, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 2,],
        [2, 1, 2, 2, 2, 2,],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(1, 1);

    protected readonly startItems: ItemWithIndex[] = [
        { index: { x: 1, y: 0 }, item: { damageType: DamageType.Fire, type: ItemType.WEAPON } }
    ];

    protected readonly startPortals: PortalWithIndex[] = [
        { index: { x: 5, y: 1 }, toPortalName: SceneNames.Mazebase }
    ]

    protected squareMatrix: GameSquare[][];
    protected mainContainer: Phaser.GameObjects.Container;
    protected player: Player;
    protected lifeBar: Lifebar;
    protected gameTimer: GameStopWatch;

    constructor(name: string) {
        super(name ? name : SceneNames.Mazebase);
    }

    init(): void {
        super.init();
        this.squareMatrix = [];
    }

    create(newData: SceneData) {
        super.create();

        const background = this.add.sprite(this.center_width, this.center_height, Assets.Sprite.DefaultBackground);
        background.setScale(this.width / background.width, this.height / background.height);

        const backgroundMusic = this.sound.get(Assets.Audio.PianoMusic);
        if (!backgroundMusic.isPlaying) {
            backgroundMusic.play();
        }


        if (newData.firstSceneOfLevel) {
            Boss.generateRandomWeaknesses(GameplaySettings.BossWeaknessCount);
        }

        this.spawnSquares();
        this.spawnPlayerWithBackpack();
        this.addItems();
        this.setPortals();
        this.createLifeBarAndStopwatch();

        this.addInputMapping();

        this.randomBirdSound(true);

        this.events.on("resume", (_scene: Phaser.Scene, data: SceneData) => this.setDataAfterTransition(data));

        this.setDataAfterTransition(newData);

        if (newData.firstSceneOfLevel) {
            GameStopWatch.startStopWatch();
        }
    }

    update(): void {
        super.update();
        this.gameTimer.updateTime();
    }

    protected randomBirdSound(playInstant = false) {
        if (playInstant) {
            this.sound.get(Assets.Audio.Bird).play();
            this.randomBirdSound();
        } else {
            const delay = (10000 * Math.random()) + 15000;

            this.time.delayedCall(delay, () => { this.sound.get(Assets.Audio.Bird).play(); this.randomBirdSound(); });
        }
    }

    protected spawnSquares() {
        const getWithOffset = (base: number): number => {
            return base * GameLayout.SquareEdgeLength * -0.5 + GameLayout.SquareEdgeLength / 2;
        }

        let x = 0;
        let y = getWithOffset(this.squareStartingMatrix.length);
        const allSquareObjects: GameSquare[] = [];

        this.squareStartingMatrix.forEach((row) => {
            let newRow: GameSquare[] = [];

            x = getWithOffset(this.squareStartingMatrix[0].length);

            row.forEach((squareType) => {
                const newGameSquare = new GameSquare(this, x, y, GameLayout.SquareEdgeLength, GameLayout.SquareEdgeLength, squareType);
                
                allSquareObjects.push(newGameSquare);

                newRow.push(newGameSquare);
                x += GameLayout.SquareEdgeLength;
            });

            this.squareMatrix.push(newRow);
            y += GameLayout.SquareEdgeLength;
        });

        this.mainContainer = this.add.container(this.center_width, this.center_height, allSquareObjects);
        this.createGrid();
        allSquareObjects.forEach(cont => cont.setFogToParentContainer());
    }

    protected createGrid() {
        const fieldWidth = this.squareMatrix[0].length * GameLayout.SquareEdgeLength
        const fieldHeight = this.squareMatrix.length * GameLayout.SquareEdgeLength;

        const grid = this.add.grid(0, 0, fieldWidth, fieldHeight,
            GameLayout.SquareEdgeLength, GameLayout.SquareEdgeLength, undefined, undefined, 0x000000);

        const outline = this.add.rectangle(0, 0, fieldWidth, fieldHeight).setStrokeStyle(1, 0x000000);
        this.mainContainer.add([grid, outline]);
    }

    protected spawnPlayerWithBackpack() {
        const backpack = new Backpack(this, ((this.squareMatrix[0].length + 1) / 2) * GameLayout.SquareEdgeLength + GameLayout.BackpackElementSize, 0, GameLayout.BackpackElementSize, GameLayout.BackpackElementSize);
        const square = this.squareMatrix[this.playerSpawn.y][this.playerSpawn.x];

        this.player = new Player(this, square.x, square.y, GameLayout.SquareEdgeLength, GameLayout.SquareEdgeLength, this.squareMatrix, backpack);

        this.mainContainer.add([this.player, backpack]);
    }

    protected addItems() {
        this.startItems.forEach((itemAndIndex) => {
            if (itemAndIndex.item.type == ItemType.INFO_CARD) {
                itemAndIndex.item.damageType = Boss.getNextWeakness();
            }

            this.squareMatrix[itemAndIndex.index.y][itemAndIndex.index.x].addItem(itemAndIndex.item);
        });
    }

    protected setPortals() {
        this.startPortals.forEach((portalAndIndex) => {
            this.squareMatrix[portalAndIndex.index.y][portalAndIndex.index.x].setPortalToName(portalAndIndex.toPortalName);
        });
    }

    protected createLifeBarAndStopwatch() {
        const lifebarWidth = 400;
        this.lifeBar = new Lifebar(this, lifebarWidth / 2 - (GameLayout.SquareEdgeLength * this.squareMatrix[0].length) / 2, 0, lifebarWidth, 40, GameplaySettings.MaxLife);

        this.gameTimer = new GameStopWatch(this, 0, 0, 42);

        this.lifeBar.setStopWatch(this.gameTimer);

        this.lifeBar.onDeath.push(() => { GameStopWatch.stopStopWatch(); this.scene.start(SceneNames.GameOver, { won: false }) });

        this.add.container(this.center_width, + GameLayout.SquareEdgeLength / -2 + this.center_height + (GameLayout.SquareEdgeLength * this.squareMatrix.length) / -2,
            [this.lifeBar, this.gameTimer]);
    }

    protected addInputMapping() {
        this.assignListenerToDirectionKeyboardEvents(["W", "UP"], () => { this.player.movePlayerUp(); });
        this.assignListenerToDirectionKeyboardEvents(["S", "DOWN"], () => { this.player.movePlayerDown(); });
        this.assignListenerToDirectionKeyboardEvents(["D", "RIGHT"], () => { this.player.movePlayerRight(); });
        this.assignListenerToDirectionKeyboardEvents(["A", "LEFT"], () => { this.player.movePlayerLeft(); });
    }

    protected assignListenerToDirectionKeyboardEvents(eventNames: string[], listener: () => void, keyUp = false) {
        const keyDirection = keyUp ? "keyup-" : "keydown-";

        for (let name of eventNames) {
            this.input.keyboard?.on(keyDirection + name, listener);
        }
    }

    protected setSceneDataBeforeTransition(sceneData: SceneData): void {
        sceneData.backpackItems = this.player.backpack.getAllItems();
        sceneData.fromScene = this.scene.key;
        sceneData.currentLife = this.lifeBar.getCurrentLife();
    }

    protected setDataAfterTransition(newData: SceneData) {
        if (newData.backpackItems != undefined)
            this.player.backpack.setBackpackItems(newData.backpackItems);

        this.setPlayerPosition(newData.fromScene);

        if (newData.currentLife != undefined)
            this.lifeBar.setCurrentLife(newData.currentLife);

        this.gameTimer.updateTimeVisuals();
    }

    protected setPlayerPosition(fromScene: string | undefined) {
        if (fromScene != undefined) {
            for (let portalWithIndex of this.startPortals) {
                if (portalWithIndex.toPortalName == fromScene) {
                    this.player.setPlayerPosition(portalWithIndex.index);
                    return;
                }
            }
        }

        this.player.setPlayerPosition(this.playerSpawn);
    }
}