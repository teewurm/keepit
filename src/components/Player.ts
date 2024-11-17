import { AnimationEase, ColorPalette, PlayerDefaultData } from "../enums/Constants";
import GameSquare from "../utils/GameSquare";
import IndexUtil from "../utils/IndexUtil";

export default class Player extends Phaser.GameObjects.Container {
    squareMatrix: GameSquare[][];
    currentIndex: IndexUtil;

    containerWidth: number;
    containerHeight: number;

    moving = false;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, index: IndexUtil, gameMatrix: GameSquare[][]) {
        super(scene, x, y);

        this.containerWidth = width;
        this.containerHeight = height;

        this.squareMatrix = gameMatrix;
        this.currentIndex = index;

        this.createPlayer();
    }

    movePlayerUp() {
        this.moveToNextSquare(this.currentIndex.x, this.currentIndex.y - 1);
    }

    movePlayerDown() {
        this.moveToNextSquare(this.currentIndex.x, this.currentIndex.y + 1);
    }

    movePlayerRight() {
        this.moveToNextSquare(this.currentIndex.x + 1, this.currentIndex.y);
    }

    movePlayerLeft() {
        this.moveToNextSquare(this.currentIndex.x - 1, this.currentIndex.y);
    }

    protected createPlayer() {
        const player = this.scene.add.rectangle(0, 0, this.containerWidth, this.containerWidth, ColorPalette.PLAYER);
        player.setStrokeStyle(2, 0x000000);

        this.add(player);
    }

    protected moveToNextSquare(targetXIndex: number, targetYIndex: number) {
        if (this.moving || !this.isNextMovePossible(targetXIndex, targetYIndex))
            return;

        this.moving = true;

        const nextSquare = this.squareMatrix[targetYIndex][targetXIndex];

        const config: Phaser.Types.Tweens.TweenBuilderConfig = {
            targets: this,
            ease: AnimationEase.DefaultMove,
            duration: PlayerDefaultData.MoveDuration,
            x: nextSquare.xCoordinate,
            y: nextSquare.yCoordinate
        };

        config.onComplete = () => {
            this.currentIndex.x = targetXIndex;
            this.currentIndex.y = targetYIndex;

            this.moving = false;
        }

        this.scene.tweens.add(config);
    }

    protected isNextMovePossible(nextX: number, nextY: number): boolean {
        return nextX >= 0 && nextY >= 0
            && nextX < this.squareMatrix[0].length && nextY < this.squareMatrix.length
            && !this.squareMatrix[nextY][nextX].isBlocking()
    }
}