export enum SquareType {
    EMPTY = 0,
    PATH = 1,
    WALL = 2,
    PORTAL = 3,
    BOSS_PORTAL = 4,
}

export const blockingTypes = [SquareType.WALL];