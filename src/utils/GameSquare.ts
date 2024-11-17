import { SquareType } from "../enums/SquareType";

export default class GameSquare {
    squareType: SquareType;
    xCoordinate: number;
    yCoordinate: number;
    backgroundObject: Phaser.GameObjects.GameObject | undefined;

    constructor(type: SquareType, x: number, y: number, background: Phaser.GameObjects.GameObject | undefined = undefined) {
        this.squareType = type;
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.backgroundObject = background;
    }
}