import { AnimationEase, Assets, ColorPalette, PlayerDefaultData } from "../enums/Constants";
import GameSquare from "./GameSquare";
import IndexUtil from "../utils/IndexUtil";
import CustomContainerBase from "./bases/CustomContainerBase";
import Backpack from "./Backpack";

export default class Player extends CustomContainerBase {
    squareMatrix: GameSquare[][];
    currentIndex: IndexUtil;
    backpack: Backpack;

    moving = false;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, index: IndexUtil, gameMatrix: GameSquare[][], backpack: Backpack) {
        super(scene, x, y, width, height);

        this.squareMatrix = gameMatrix;
        this.currentIndex = index;
        this.backpack = backpack;

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

        //Plays a random movement audio clip
        const moveAudioSamples = [Assets.Audio.Move1, Assets.Audio.Move2, Assets.Audio.Move3, Assets.Audio.Move4];
        const randomSoundIndex = Math.floor(Math.random() * moveAudioSamples.length);
        this.scene.sound.get(moveAudioSamples[randomSoundIndex]).play();

        this.moving = true;

        const nextSquare = this.squareMatrix[targetYIndex][targetXIndex];

        const config: Phaser.Types.Tweens.TweenBuilderConfig = {
            targets: this,
            ease: AnimationEase.DefaultMove,
            duration: PlayerDefaultData.MoveDuration,
            x: nextSquare.x,
            y: nextSquare.y
        };

        config.onComplete = () => {
            this.currentIndex.x = targetXIndex;
            this.currentIndex.y = targetYIndex;

            this.squareMatrix[this.currentIndex.y][this.currentIndex.x].collectItem(this.backpack);

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