import { ColorPalette, GameplaySettings } from "../enums/Constants";
import { DamageType } from "../enums/DamageType";
import SceneBase from "../scenes/bases/SceneBase";
import CustomContainerBase from "./bases/CustomContainerBase";
import Lifebar from "./LifebarAndStopwatch";

export default class Boss extends CustomContainerBase {
    protected static currentWeaknesses: DamageType[] = [];
    protected static currentWeaknessIndex = 0;

    protected lifeBar: Lifebar;

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height);

        this.createBoss();
    }

    static generateRandomWeaknesses(count: number) {
        const allTypes = Object.keys(DamageType)
        const maxTypeCount = allTypes.length;

        if (maxTypeCount < count)
            count = maxTypeCount

        for (let i = allTypes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allTypes[i], allTypes[j]] = [allTypes[j], allTypes[i]]; // Swap elements
        }

        Boss.currentWeaknesses = allTypes.slice(0, count) as DamageType[];
    }

    static getNextWeakness() {
        const nextWeakness = Boss.currentWeaknesses[Boss.currentWeaknessIndex];

        Boss.currentWeaknessIndex = (Boss.currentWeaknessIndex + 1) % Boss.currentWeaknesses.length;

        return nextWeakness;
    }

    getLifeBar() {
        return this.lifeBar;
    }

    attackBoss(damageType: DamageType) {
        const damageFactor = Boss.currentWeaknesses.includes(damageType) ? GameplaySettings.WeaknessMultiplier : 1;

        this.lifeBar.reduceLife(GameplaySettings.WeaponDamage * damageFactor);
    }

    protected createBoss() {
        const body = this.scene.add.rectangle(0, 0, this.targetWidth, this.targetHeight, ColorPalette.BOSS_PORTAL);

        const eyeWidth = this.targetWidth * 0.2;
        const eyeHeight = this.targetHeight * 0.1;
        const eyeX = this.targetWidth / 4;
        const eyey = -this.targetHeight / 4;

        const leftEye = this.scene.add.rectangle(-eyeX, eyey, eyeWidth, eyeHeight, 0x000000);
        const rightEye = this.scene.add.rectangle(eyeX, eyey, eyeWidth, eyeHeight, 0x000000);

        const nose = this.scene.add.rectangle(0, this.targetHeight / 5, this.targetWidth * 0.1, this.targetHeight * 0.1, 0x000000);

        this.lifeBar = new Lifebar(this.scene, 0, -this.targetHeight / 2, this.targetWidth * 0.9, this.targetHeight * 0.1, 100)

        this.add([body, leftEye, rightEye, nose, this.lifeBar]);
    }
}