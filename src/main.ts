import { Game, Types } from "phaser";
import Level1 from "./scenes/Level1";


const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    disableContextMenu: true,
    parent: 'game-container',
    backgroundColor: '#52AD9C',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Level1
    ]
};

export default new Game(config);