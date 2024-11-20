import { SquareType } from "./SquareType";

export enum GameLayout {
    SquareEdgeLength = 90
}

export enum SceneNames {
    Mazebase = "base",
    Level1 = "Level1"
}

export enum ColorPalette {
    Path = 0x6CC551,
    Wall = 0x447604,
    PORTAL = 0x9FFCDF,
    BOSS_PORTAL = 0x47624F,
    PLAYER = 0x440044,
    DEBUG = 0xFF00FF
}

export enum PlayerDefaultData {
    MaxHealth = 100,
    MoveDuration = 130
}

export enum AnimationEase {
    DefaultMove = "Power3",
    WallCollide = "Bounce"
}

export enum ItemConstants {
    MAX_ITMES_PER_TYPE = 6
}

export const ColorSquareMap = new Map([
    [SquareType.EMPTY, 0x000000],
    [SquareType.PATH, ColorPalette.Path],
    [SquareType.PORTAL, ColorPalette.PORTAL],
    [SquareType.BOSS_PORTAL, ColorPalette.BOSS_PORTAL],
    [SquareType.WALL, ColorPalette.Wall],
]);