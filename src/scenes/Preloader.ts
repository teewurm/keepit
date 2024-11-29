import { Assets, AudioConfig, SceneNames } from "../enums/Constants";
import Soundmanager, { SoundGroupKey } from "../utils/Soundmanager";
import SceneBase from "./bases/SceneBase";

export class Preloader extends SceneBase {

    constructor() {
        super(SceneNames.Preloader);
    }

    init() {
        super.init();

        this.cameras.main.setBackgroundColor({ a: 0 });

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
        this.load.audio(Assets.Audio.Teleport1, Assets.AudioFileNames.Teleport1);
        this.load.audio(Assets.Audio.Collect1, Assets.AudioFileNames.Collect1);
        this.load.audio(Assets.Audio.Bird, Assets.AudioFileNames.Bird);
        this.load.audio(Assets.Audio.Weapon1, Assets.AudioFileNames.Weapon1);
        this.load.audio(Assets.Audio.Weapon2, Assets.AudioFileNames.Weapon2);
        this.load.audio(Assets.Audio.Weapon3, Assets.AudioFileNames.Weapon3);
        this.load.audio(Assets.Audio.MonsterAttack, Assets.AudioFileNames.MonsterAttack);

        this.load.setPath(Assets.SpriteDirectory);

        this.load.aseprite(Assets.Sprite.MainCharacter, Assets.SpriteFileNames.MainCharacter, Assets.JsonFileNames.MainCharacter);
        this.load.aseprite(Assets.Sprite.Weapons, Assets.SpriteFileNames.Weapons, Assets.JsonFileNames.Weapons);
        this.load.aseprite(Assets.Sprite.InfoCards, Assets.SpriteFileNames.InfoCards, Assets.JsonFileNames.InfoCards);
        this.load.aseprite(Assets.Sprite.Boss, Assets.SpriteFileNames.Boss, Assets.JsonFileNames.Boss);

        this.load.image(Assets.Sprite.Path1, Assets.SpriteFileNames.Path1);
        this.load.image(Assets.Sprite.Wall1, Assets.SpriteFileNames.Wall1);
        this.load.image(Assets.Sprite.DefaultBackground, Assets.SpriteFileNames.DefaultBackground);
    }

    create() {
        //#region sound config
        this.sound.pauseOnBlur = false;
        this.sound.volume = AudioConfig.defaulMain;

        Soundmanager.addSound(this.sound.add(Assets.Audio.PianoMusic, { loop: true }), SoundGroupKey.Music);
        Soundmanager.addSound(this.sound.add(Assets.Audio.Move1), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.Move2), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.Move3), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.Move4), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.Teleport1), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.Bird), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.Collect1), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.Weapon1), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.Weapon2), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.Weapon3), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.MonsterAttack), SoundGroupKey.SFX);

        Soundmanager.adjustVolume(SoundGroupKey.SFX, AudioConfig.defaultVolumeSFX);
        Soundmanager.adjustVolume(SoundGroupKey.Music, AudioConfig.defaultVolumeMusic);

        //#endregion

        //#region animation config
        this.anims.createFromAseprite(Assets.Sprite.MainCharacter);
        this.anims.createFromAseprite(Assets.Sprite.Weapons);
        this.anims.createFromAseprite(Assets.Sprite.InfoCards);
        this.anims.createFromAseprite(Assets.Sprite.Boss);
        //#endregions

        this.scene.transition({
            target: SceneNames.MainMenu,
            duration: 500,
            moveBelow: true,
            onUpdate: (progress: number) => {
                this.cameras.main.setAlpha(1 - progress);
            }
        });
    }
}