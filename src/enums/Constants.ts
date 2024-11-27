import { SquareType } from "./SquareType";

export enum GameLayout {
    SquareEdgeLength = 80,
    BossSquareCountWidth = 15,
    BossSquareCountHeight = 10,
    BackpackElementSize = 150
}

export enum GameplaySettings {
    FogdisappearDuration = 1000,
    FogHalfDensity = 0.5,
    FogFullDensity = 1,
    FogNoDensity = 0,
    MaxLife = 100,
    MazeDamageIntervalInMillis = 5000,
    MazeDamage = 10,
    WeaponDamage = 10,
    WeaknessMultiplier = 4,
    BossWeaknessCount = 2,
    BossDamage = 10,
    BossAttackDelayMillis = 800
}

export enum SceneNames {
    Boot = "Boot",
    MainMenu = "MainMenu",
    GameOver = "GameOver",
    Preloader = "preloader",
    Mazebase = "Base",
    BossBase = "BossBase",
    Level1 = "Level1",
    Level2 = "Level2",
}

export enum ColorPalette {
    Path = 0x6CC551,
    Wall = 0x447604,
    PORTAL = 0x9FFCDF,
    BOSS_PORTAL = 0x47624F,
    PLAYER = 0x440044,
    FOG = 0x999999,
    DEBUG = 0xFF00FF,
    LIFEBAR = 0xFF0000,
    HIGHLIGHT = 0xb8bf55
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

export enum AudioConfig {
    defaulMain = 0.5,
    defaultVolumeSFX = 0.15,
    defaultVolumeMusic = 0.3,
}

export namespace Assets {
    export const AudioDirectory = "assets/sound";
    export const SpriteDirectory = "assets/sprites";

    export enum SpriteFileNames {
        DefaultBackground = "Background.png",
        MainCharacter = "player/MainCharacter.png",
        Path1 = "maze/Path1.png",
        Wall1 = "maze/Wall1.png",
        Weapons = "weapons/BaseWeapon.png",
        InfoCards = "infoCards/BaseInfoCard.png",
        Boss = "boss/BaseBoss.png"
    }

    export enum Sprite {
        DefaultBackground = "DefaultBackground",
        MainCharacter = "MainCharacter",
        Path1 = "Path1",
        Wall1 = "Wall1",
        Weapons = "Weapons",
        InfoCards = "InfoCards",
        Boss = "Boss"
    }

    export enum JsonFileNames {
        MainCharacter = "player/MainCharacter.json",
        Weapons = "weapons/BaseWeapon.json",
        InfoCards = "infoCards/BaseInfoCard.json",
        Boss = "boss/BaseBoss.json"
    }

    export enum Animation {
        MainCharacterIdle = "Idle"
    }

    export enum AudioFileNames {
        PianoMusic = "licensed/MazeMusic1.wav",
        Move1 = "Move1.wav",
        Move2 = "Move2.wav",
        Move3 = "Move3.wav",
        Move4 = "Move4.wav",
        Collect1 = "Collect1.wav",
        Bird = "licensed/Bird1.wav",
        Weapon1 = "weapon/Weapon1.wav",
        Weapon2 = "weapon/Weapon2.wav",
        Weapon3 = "weapon/Weapon3.wav",
        MonsterAttack = "weapon/MonsterAttack.wav",
    }

    export enum Audio {
        PianoMusic = "MazeMusic1",
        Move1 = "Move1",
        Move2 = "Move2",
        Move3 = "Move3",
        Move4 = "Move4",
        Collect1 = "Collect1",
        Bird = "Bird1",
        Weapon1 = "Weapon1",
        Weapon2 = "Weapon2",
        Weapon3 = "Weapon3",
        MonsterAttack = "MonsterAttack",
    }
}