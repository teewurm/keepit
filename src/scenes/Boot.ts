import { Scene } from 'phaser';
import { SceneNames } from '../enums/Constants';

export class Boot extends Scene {
    constructor() {
        super(SceneNames.Boot);
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        // this.load.setPath(Assets.DefaultImagePath);

        // this.load.image(Assets.Images.DefaulBackground, Assets.ImageFileNames.DefaulBackground);
    }

    create() {
        this.scene.start(SceneNames.MainMenu);
    }
}
