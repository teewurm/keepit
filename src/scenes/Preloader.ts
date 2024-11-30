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

        this.load.audio(Assets.Audio.MazeMusic1, Assets.AudioFileNames.MazeMusic1);
        this.load.audio(Assets.Audio.MazeMusic2, Assets.AudioFileNames.MazeMusic2);
        this.load.audio(Assets.Audio.MazeMusic3, Assets.AudioFileNames.MazeMusic3);
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
        this.load.audio(Assets.Audio.MonsterAttack2, Assets.AudioFileNames.MonsterAttack2);
        this.load.audio(Assets.Audio.WeaponSwap, Assets.AudioFileNames.WeaponSwap);
        this.load.audio(Assets.Audio.Zap, Assets.AudioFileNames.Zap);
        this.load.audio(Assets.Audio.SoulSteal, Assets.AudioFileNames.SoulSteal);
        this.load.audio(Assets.Audio.BtnClick, Assets.AudioFileNames.BtnClick);

        this.load.setPath(Assets.SpriteDirectory);

        this.load.aseprite(Assets.Sprite.MainCharacter, Assets.SpriteFileNames.MainCharacter, Assets.JsonFileNames.MainCharacter);
        this.load.aseprite(Assets.Sprite.Weapons, Assets.SpriteFileNames.Weapons, Assets.JsonFileNames.Weapons);
        this.load.aseprite(Assets.Sprite.InfoCards, Assets.SpriteFileNames.InfoCards, Assets.JsonFileNames.InfoCards);
        this.load.aseprite(Assets.Sprite.Boss, Assets.SpriteFileNames.Boss, Assets.JsonFileNames.Boss);
        this.load.aseprite(Assets.Sprite.BossAttack, Assets.SpriteFileNames.BossAttack, Assets.JsonFileNames.BossAttack);
        this.load.aseprite(Assets.Sprite.Fireball, Assets.SpriteFileNames.Fireball, Assets.JsonFileNames.Fireball);

        this.load.image(Assets.Sprite.Path1, Assets.SpriteFileNames.Path1);
        this.load.image(Assets.Sprite.Wall1, Assets.SpriteFileNames.Wall1);
        this.load.image(Assets.Sprite.QuestionBackPack, Assets.SpriteFileNames.QuestionBackPack);
        this.load.image(Assets.Sprite.WeaponBackPack, Assets.SpriteFileNames.WeaponBackPack);
        this.load.image(Assets.Sprite.MenuBackground, Assets.SpriteFileNames.MenuBackground);
    }

    create() {
        //#region sound config
        this.sound.pauseOnBlur = false;
        this.sound.volume = AudioConfig.defaultMain;

        Soundmanager.addSound(this.sound.add(Assets.Audio.MazeMusic1), SoundGroupKey.Music);
        Soundmanager.addSound(this.sound.add(Assets.Audio.MazeMusic2), SoundGroupKey.Music);
        Soundmanager.addSound(this.sound.add(Assets.Audio.MazeMusic3), SoundGroupKey.Music);
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
        Soundmanager.addSound(this.sound.add(Assets.Audio.MonsterAttack2), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.WeaponSwap), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.Zap), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.SoulSteal), SoundGroupKey.SFX);
        Soundmanager.addSound(this.sound.add(Assets.Audio.BtnClick), SoundGroupKey.SFX);

        Soundmanager.adjustVolume(SoundGroupKey.SFX, AudioConfig.defaultVolumeSFX);
        Soundmanager.adjustVolume(SoundGroupKey.Music, AudioConfig.defaultVolumeMusic);

        //#endregion

        //#region animation config
        this.anims.createFromAseprite(Assets.Sprite.MainCharacter);
        this.anims.createFromAseprite(Assets.Sprite.Weapons);
        this.anims.createFromAseprite(Assets.Sprite.InfoCards);
        this.anims.createFromAseprite(Assets.Sprite.Boss);
        this.anims.createFromAseprite(Assets.Sprite.BossAttack);
        this.anims.createFromAseprite(Assets.Sprite.Fireball);
        //#endregions

        this.createGradientBackground();

        this.scene.transition({
            target: SceneNames.MainMenu,
            duration: 500,
            moveBelow: true,
            onUpdate: (progress: number) => {
                this.cameras.main.setAlpha(1 - progress);
            }
        });
    }

    protected createGradientBackground() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        // Create a CanvasTexture
        const gradientTexture = this.textures.createCanvas(Assets.Sprite.GradientBackground, width, height);
        const context = gradientTexture!.context;
        // Create a linear gradient
        const gradient = context.createLinearGradient(0, 0, 0, height); // Vertical gradient
        gradient.addColorStop(0, '#232526');
        gradient.addColorStop(1, '#414345');
        // Apply gradient to the canvas
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
        // Refresh the texture
        gradientTexture!.refresh();
    }
}