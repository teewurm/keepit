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
}

class SoundGroup {
    key: SoundGroupKey;
    volume: number;
    sounds: (Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound)[] = [];

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