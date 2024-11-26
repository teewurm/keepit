import { Game, Types } from "phaser";
import Level1 from "./scenes/Levels/Level1";
import Level2 from "./scenes/Levels/Level2";
import { Preloader } from "./scenes/Preloader";
import BossSceneBase from "./scenes/bases/BossSceneBase";
import MainMenu from "./scenes/MainMenu";
import { Boot } from "./scenes/Boot";


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
        MainMenu,
        Preloader,
        Level1,
        Level2,
        BossSceneBase
    ]
};

export default new Game(config);