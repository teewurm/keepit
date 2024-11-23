import Backpack from "../../components/Backpack";
import Player from "../../components/Player";
import { Assets, AudioConig, GameLayout, GameplaySettings, SceneNames } from "../../enums/Constants";
import { ItemType } from "../../enums/ItemType";
import GameSquare from "../../components/GameSquare";
import IndexUtil from "../../utils/IndexUtil";
import SceneBase from "./SceneBase";
import SceneData, { ItemWithIndex, PortalWithIndex } from "../../utils/SceneData";
import Lifebar, { GameStopWatch } from "../../components/LifebarAndStopwatch";

export default class MazeSceneBase extends SceneBase {
    protected readonly squareStartingMatrix = [
        [1, 1, 2, 2, 2, 2,],
        [2, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 2,],
        [2, 1, 2, 2, 2, 2,],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(1, 1);

    protected readonly startItems: ItemWithIndex[] = [
        { index: { x: 1, y: 0 }, item: { text: "Fire", type: ItemType.WEAPON } }
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
        const backgroundMusic = this.sound.get(Assets.Audio.PianoMusic);
        if (!backgroundMusic.isPlaying) {
            backgroundMusic.play();
        }

        this.cameras.main.setBackgroundColor(0x52AD9C);

        this.spawnFullScreenButton();
        this.spawnSquares();
        this.spawnPlayerWithBackpack();
        this.addItems();
        this.setPortals();
        this.createLifeBarAndStopwatch();

        this.addInputMapping();

        this.randomBirdSound(true);

        this.events.on("resume", (_scene: Phaser.Scene, data: SceneData) => this.setDataAfterTransition(data))
        this.setDataAfterTransition(newData);

        GameStopWatch.startStopWatch();
    }

    update(): void {
        super.update();
        this.gameTimer.updateTime();
    }

    protected randomBirdSound(playInstant = false) {
        if (playInstant) {
            this.sound.play(Assets.Audio.Bird, { volume: AudioConig.defaultVolumeAnimal });
            this.randomBirdSound();
        } else {
            const delay = (10000 * Math.random()) + 15000;

            this.time.delayedCall(delay, () => { this.sound.play(Assets.Audio.Bird, { volume: AudioConig.defaultVolumeAnimal }); this.randomBirdSound(); });
        }
    }

    protected spawnFullScreenButton(): void {
        let fullScreenText = this.add.text(20, 20, "Fullscreen", { color: this.scale.isFullscreen ? "#00ff00" : "#ff0000", fontSize: 52 });
        fullScreenText.setInteractive();
        fullScreenText.addListener("pointerup", () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });

        this.scale.addListener("enterfullscreen", () => fullScreenText.setColor("#00ff00"));
        this.scale.addListener("leavefullscreen", () => fullScreenText.setColor("#ff0000"));
    }

    protected spawnSquares() {
        const getWithOffset = (base: number): number => {
            return base * GameLayout.SquareEdgeLength * -0.5 + GameLayout.SquareEdgeLength / 2;
        }

        let x = 0;
        let y = getWithOffset(this.squareStartingMatrix.length);
        const allSquareObjects: Phaser.GameObjects.GameObject[] = [];

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
    }

    protected spawnPlayerWithBackpack() {
        const backpack = new Backpack(this, (this.squareMatrix[0].length / 2 + 1.5) * GameLayout.SquareEdgeLength, 0, 200, 600);
        const square = this.squareMatrix[this.playerSpawn.y][this.playerSpawn.x];

        this.player = new Player(this, square.x, square.y, GameLayout.SquareEdgeLength * 0.8, GameLayout.SquareEdgeLength * 0.8, this.squareMatrix, backpack);

        this.mainContainer.add([this.player, backpack]);
    }

    protected addItems() {
        this.startItems.forEach((itemAndIndex) => {
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

        this.lifeBar.onDeath.push(() => { console.log("dead"); GameStopWatch.stopStopWatch(); });

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