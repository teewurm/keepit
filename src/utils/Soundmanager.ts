export default class Soundmanager {
    protected static groups: SoundGroup[] = [];


    static addSound(sound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound, groupKey: SoundGroupKey) {
        let groupToAddSound = Soundmanager.groups.find(element => element.key == groupKey);

        if (groupToAddSound == undefined) {
            groupToAddSound = new SoundGroup(groupKey, 0.5, [sound]);
            Soundmanager.groups.push(groupToAddSound);
        }

        groupToAddSound.sounds.push(sound);
    }

    static adjustVolume(groupKey: SoundGroupKey, newVolume: number) {
        const group = Soundmanager.groups.find(element => element.key == groupKey);

        if (group == undefined)
            return;

        group.setVolume(newVolume)
    }

    static getVolume(groupKey: SoundGroupKey): number {
        const group = Soundmanager.groups.find(element => element.key == groupKey);

        if (group == undefined)
            return -1;

        return group.volume;
    }

    static loopAudioClips(groupKey: SoundGroupKey, random = true) {
        const group = Soundmanager.groups.find(element => element.key == groupKey);

        if (!group || group.sounds.length == 0 || group.isLooping)
            return;

        group.sounds.forEach((sound) => {
            if (sound.isPlaying || sound.isPaused)
                sound.stop();
        });

        let sounds: (Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound)[];

        if (random)
            sounds = this.shuffleArray(group.sounds);
        else
            sounds = group.sounds;

        let currentIndex = 0;
        const playNextAudio = () => {
            if (!group.isLooping)
                return;

            const currentAudio = sounds[currentIndex];

            currentAudio.play();

            currentAudio.once('complete', () => {
                currentIndex = (currentIndex + 1) % sounds.length;

                playNextAudio();
            });
        }

        group.isLooping = true;
        playNextAudio();
    }

    protected static shuffleArray<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

class SoundGroup {
    key: SoundGroupKey;
    volume: number;
    sounds: (Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound)[] = [];
    isLooping: boolean = false;

    constructor(key: SoundGroupKey, volume: number, sounds: (Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound)[]) {
        this.key = key;
        this.sounds = sounds;

        this.setVolume(volume);
    }

    setVolume(newVolume: number): void {
        this.volume = newVolume;

        this.sounds.forEach(sound => sound.setVolume(this.volume));
    }
}

export enum SoundGroupKey {
    Music, SFX
}