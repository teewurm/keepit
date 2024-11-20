import Backpack from "../../components/Backpack";
import Player from "../../components/Player";
import { GameLayout, SceneNames } from "../../enums/Constants";
import { ItemType } from "../../enums/ItemType";
import GameSquare from "../../components/GameSquare";
import IndexUtil from "../../utils/IndexUtil";
import { ItemConfig } from "../../utils/ItemSlot";
import SceneBase from "./SceneBase";

export default class MazeSceneBase extends SceneBase {
    protected readonly squareStartingMatrix = [
        [1, 1, 2, 2, 2, 2,],
        [2, 1, 1, 1, 1, 2,],
        [2, 1, 1, 1, 1, 2,],
        [2, 1, 2, 2, 2, 2,],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(1, 1);

    protected readonly items: { index: IndexUtil, item: ItemConfig }[] = [
        { index: { x: 1, y: 0 }, item: { text: "Bra", type: ItemType.WEAPON } }
    ];

    protected squareMatrix: GameSquare[][];

    protected mainContainer: Phaser.GameObjects.Container;

    protected player: Player;

    constructor(name: string) {
        super(name ? name : SceneNames.Mazebase);
    }

    init(_placeHolder?: Object | undefined): void {
        super.init();

        this.squareMatrix = [];
    }

    create() {
        this.cameras.main.setBackgroundColor(0x52AD9C);

        this.spawnFullScreenButton();
        this.spawnSquares();
        this.spawnPlayer();
        this.addItems();

        this.mainContainer.add(new Backpack(this, (this.squareMatrix[0].length / 2 + 1.5) * GameLayout.SquareEdgeLength, 0, 200, 600));

        this.addInputMapping();
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

    protected spawnPlayer() {
        const square = this.squareMatrix[this.playerSpawn.y][this.playerSpawn.x];

        this.player = new Player(this, square.x, square.y, GameLayout.SquareEdgeLength * 0.8, GameLayout.SquareEdgeLength * 0.8, this.playerSpawn, this.squareMatrix);

        this.mainContainer.add(this.player);
    }

    protected addItems() {

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
}