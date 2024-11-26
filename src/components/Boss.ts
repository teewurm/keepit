import { BossType } from "../enums/BossType";
import { Assets, GameplaySettings } from "../enums/Constants";
import { DamageType } from "../enums/DamageType";
import SceneBase from "../scenes/bases/SceneBase";
import CustomContainerBase from "./bases/CustomContainerBase";
import Lifebar from "./LifebarAndStopwatch";

export default class Boss extends CustomContainerBase {
    protected static currentWeaknesses: DamageType[] = [];
    protected static currentWeaknessIndex = 0;

    protected bossType: BossType;
    protected lifeBar: Lifebar;

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number, bossType: BossType) {
        super(scene, x, y, width, height);
        this.bossType = bossType;

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
        this.lifeBar = new Lifebar(this.scene, 0, -this.targetHeight / 2, this.targetWidth * 0.8, this.targetHeight * 0.1, 100)

        const sprite = this.scene.add.sprite(0, 0, Assets.Sprite.Boss);
        sprite.setDisplaySize(this.targetWidth, this.targetHeight);

        sprite.play(this.bossType + "_Boss")

        this.add([sprite, this.lifeBar]);
    }
}