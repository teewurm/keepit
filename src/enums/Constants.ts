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
    FogHalfDensityWall = 0.85,
    FogFullDensity = 1,
    FogNoDensity = 0,
    MaxLife = 100,
    MazeDamageIntervalInMillis = 5000,
    MazeDamage = 10,
    WeaponDamage = 10,
    WeaknessMultiplier = 4,
    BossWeaknessCount = 2,
    BossMaxLife = 150,
    BossDamage = 10,
    BossAttackDelay = 250,
    BossAttackDuration = 250,
    FireballAttackDuration = 250,
    QuestionMarkMovementDuration = 500,
    QuestionMarkStayDuration = 350,
    DelayAfterPlayerMove = 200
}

export enum SceneNames {
    Boot = "Boot",
    MainMenu = "MainMenu",
    GameOver = "GameOver",
    Preloader = "Preloader",
    Mazebase = "MazeBase",
    BossBase = "BossBase",
    Level1Boss = "Level1Boss",
    Level1Maze1 = "Level1Maze1",
    Level1Maze2 = "Level1Maze2",
    Level1Maze3 = "Level1Maze3",
    Level2Boss = "Level2Boss",
    Level2Maze1 = "Level2Maze1",
    Level2Maze2 = "Level2Maze2",
    Level2Maze3 = "Level2Maze3",
    Level3Boss = "Level3Boss",
    Level3Maze1 = "Level3Maze1",
    Level3Maze2 = "Level3Maze2",
    Level3Maze3 = "Level3Maze3",
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
    HIGHLIGHT = 0xb8bf55,

    FIRE = 0xe11010,
    WATER = 0x0000ff,
    VOID = 0xff00ff,
    ELEC = 0x00ffff,
    POISON = 0x00fd00,
    YELLOW = 0xfffd00
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
    defaultMain = 0.5,
    defaultVolumeSFX = 0.15,
    defaultVolumeMusic = 0.2,
}

export namespace Assets {
    export const AudioDirectory = "assets/sound";
    export const SpriteDirectory = "assets/sprites";

    export enum SpriteFileNames {
        MainCharacter = "player/MainCharacter.png",
        Path1 = "maze/Path1.png",
        Wall1 = "maze/Wall1.png",
        Weapons = "weapons/BaseWeapon.png",
        InfoCards = "infoCards/BaseInfoCard.png",
        Boss = "boss/BaseBoss.png",
        QuestionBackPack = "backpack/InfoBackPack.png",
        WeaponBackPack = "backpack/WeaponBackPack.png",
        BossAttack = "bossattack/Bossattack.png",
        Fireball = "fireballs/Fireball.png",
    }

    export enum Sprite {
        GradientBackground = "GradientBackground",
        MainCharacter = "MainCharacter",
        Path1 = "Path1",
        Wall1 = "Wall1",
        Weapons = "Weapons",
        InfoCards = "InfoCards",
        Boss = "Boss",
        QuestionBackPack = "QuestionBackpack",
        WeaponBackPack = "WeaponBackPack",
        BossAttack = "Bossattack",
        Fireball = "Fireball",
    }

    export enum JsonFileNames {
        MainCharacter = "player/MainCharacter.json",
        Weapons = "weapons/BaseWeapon.json",
        InfoCards = "infoCards/BaseInfoCard.json",
        Boss = "boss/BaseBoss.json",
        BossAttack = "bossattack/Bossattack.json",
        Fireball = "fireballs/Fireball.json",
    }

    export enum Animation {
        MainCharacterIdle = "Idle"
    }

    export enum AudioFileNames {
        MazeMusic1 = "licensed/MazeMusic1.wav",
        MazeMusic2 = "licensed/MazeMusic2.wav",
        MazeMusic3 = "licensed/MazeMusic3.wav",
        Move1 = "Move1.wav",
        Move2 = "Move2.wav",
        Move3 = "Move3.wav",
        Move4 = "Move4.wav",
        Teleport1 = "Teleport1.wav",
        Collect1 = "Collect1.wav",
        Bird = "licensed/Bird1.wav",
        Weapon1 = "weapon/Weapon1.wav",
        Weapon2 = "weapon/Weapon2.wav",
        Weapon3 = "weapon/Weapon3.wav",
        MonsterAttack = "weapon/MonsterAttack.wav",
        MonsterAttack2 = "weapon/MonsterAttack2.wav",
        WeaponSwap = "WeaponSwap.wav",
        Zap = "Zap.wav",
        SoulSteal = "SoulSteal.wav",
    }

    export enum Audio {
        MazeMusic1 = "MazeMusic1",
        MazeMusic2 = "MazeMusic2",
        MazeMusic3 = "MazeMusic3",
        Move1 = "Move1",
        Move2 = "Move2",
        Move3 = "Move3",
        Move4 = "Move4",
        Teleport1 = "Teleport1",
        Collect1 = "Collect1",
        Bird = "Bird1",
        Weapon1 = "Weapon1",
        Weapon2 = "Weapon2",
        Weapon3 = "Weapon3",
        MonsterAttack = "MonsterAttack",
        MonsterAttack2 = "MonsterAttack2",
        WeaponSwap = "WeaponSwap",
        Zap = "Zap",
        SoulSteal = "SoulSteal",
    }
}