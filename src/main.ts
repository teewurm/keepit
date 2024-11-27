import { Game, Types } from "phaser";
import { Preloader } from "./scenes/Preloader";
import MainMenu from "./scenes/MainMenu";
import { Boot } from "./scenes/Boot";
import GameOverScene from "./scenes/GameOverScene";
import Level1Maze1 from "./scenes/Levels/Level1/Level1_Maze1";
import Level1Maze2 from "./scenes/Levels/Level1/Level1_Maze2";
import Level1Boss from "./scenes/Levels/Level1/Level1_Boss";
import Level1Maze3 from "./scenes/Levels/Level1/Level1_Maze3";
import Level2Boss from "./scenes/Levels/Level2/Level2_Boss";
import Level2Maze1 from "./scenes/Levels/Level2/Level2_Maze1";
import Level2Maze2 from "./scenes/Levels/Level2/Level2_Maze2";
import Level2Maze3 from "./scenes/Levels/Level2/Level2_Maze3";


const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    disableContextMenu: true,
    parent: 'game-container',
    backgroundColor: '#47624F',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        GameOverScene,
        Level1Boss,
        Level1Maze1,
        Level1Maze2,
        Level1Maze3,
        Level2Boss,
        Level2Maze1,
        Level2Maze2,
        Level2Maze3,
    ]
};

export default new Game(config);