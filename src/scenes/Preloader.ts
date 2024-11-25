import { Assets, AudioConig, SceneNames } from "../enums/Constants";
import SceneData from "../utils/SceneData";
import SceneBase from "./bases/SceneBase";

export class Preloader extends SceneBase {

    constructor() {
        super(SceneNames.Preloader);
    }

    init() {
        super.init();

        // this.add.image(this.center_width, this.center_height, Assets.Images.DefaulBackground).setScale(2, 2);
        this.add.rectangle(this.center_width, this.center_height, this.width, this.height, 0x000000)

        this.add.rectangle(this.center_width, this.center_height, 468, 32).setStrokeStyle(1, 0xffffff);

        const bar = this.add.rectangle(this.center_width - 230, this.center_height, 4, 28, 0xffffff);

        this.load.on('progress', (progress: number) => {
            bar.width = 4 + (460 * progress);
        });
    }

    preload() {
        this.load.setPath(Assets.AudioDirectory);

        this.load.audio(Assets.Audio.PianoMusic, Assets.AudioFileNames.PianoMusic);
        this.load.audio(Assets.Audio.Move1, Assets.AudioFileNames.Move1);
        this.load.audio(Assets.Audio.Move2, Assets.AudioFileNames.Move2);
        this.load.audio(Assets.Audio.Move3, Assets.AudioFileNames.Move3);
        this.load.audio(Assets.Audio.Move4, Assets.AudioFileNames.Move4);
        this.load.audio(Assets.Audio.Collect1, Assets.AudioFileNames.Collect1);
        this.load.audio(Assets.Audio.Bird, Assets.AudioFileNames.Bird);

        this.load.setPath(Assets.SpriteDirectory);

        this.load.aseprite(Assets.Sprite.MainCharacter, Assets.SpriteFileNames.MainCharacter, Assets.JsonFileNames.MainCharacter);
        this.load.image(Assets.Sprite.Path1, Assets.SpriteFileNames.Path1);
        this.load.image(Assets.Sprite.Wall1, Assets.SpriteFileNames.Wall1);
        this.load.image(Assets.Sprite.DefaultBackground, Assets.SpriteFileNames.DefaultBackground);
    }

    create() {
        //#region sound config
        this.sound.pauseOnBlur = false;

        this.sound.add(Assets.Audio.PianoMusic, { volume: AudioConig.defaultVolumeMusic, loop: true });
        this.sound.add(Assets.Audio.Move1, { volume: AudioConig.defaultVolumeSFX });
        this.sound.add(Assets.Audio.Move2, { volume: AudioConig.defaultVolumeSFX });
        this.sound.add(Assets.Audio.Move3, { volume: AudioConig.defaultVolumeSFX });
        this.sound.add(Assets.Audio.Move4, { volume: AudioConig.defaultVolumeSFX });
        this.sound.add(Assets.Audio.Collect1, { volume: AudioConig.defaultVolumeCollect });
        //#endregion

        //#region animation config
        this.anims.createFromAseprite(Assets.Sprite.MainCharacter);
        //#endregions

        const data: SceneData = new SceneData();
        data.startStopWatch = true;


        this.scene.transition({
            target: SceneNames.Level1,
            duration: 500,
            moveBelow: true,
            onUpdate: (progress: number) => {
                this.cameras.main.setAlpha(1 - progress);
            },
            data: data
        });
    }
}