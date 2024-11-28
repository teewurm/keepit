import { BossType } from "../enums/BossType";
import { Assets, GameplaySettings } from "../enums/Constants";
import { DamageType } from "../enums/DamageType";
import SceneBase from "../scenes/bases/SceneBase";
import CustomContainerBase from "./bases/CustomContainerBase";
import Lifebar from "./LifebarAndStopwatch";
import Weakspot from "./Weakspot";

export default class Boss extends CustomContainerBase {
    protected static currentWeaknesses: DamageType[] = [];
    protected static currentWeaknessIndex = 0;

    protected bossType: BossType;
    protected lifeBar: Lifebar;

    readonly weakSpots: Weakspot[] = [];

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
        const activeSpotWithType = this.weakSpots.find(spot => spot.isActive && !spot.isDestroyed && spot.getDamageType() == damageType);

        const damageFactor = activeSpotWithType != undefined ? GameplaySettings.WeaknessMultiplier : 1;

        this.lifeBar.reduceLife(GameplaySettings.WeaponDamage * damageFactor);

        activeSpotWithType?.destroyWeakspot();
    }

    protected createBoss() {
        this.lifeBar = new Lifebar(this.scene, 0, -this.targetHeight / 2, this.targetWidth * 0.8, this.targetHeight * 0.1, 100)

        const sprite = this.scene.add.sprite(0, 0, Assets.Sprite.Boss);

        sprite.setDisplaySize(this.targetWidth + 100, this.targetHeight);

        sprite.play(this.bossType + "_Boss")


        const containerWidth = this.targetWidth * 0.8
        const containerHeight = this.targetHeight * 0.8

        const weakContainer = this.scene.add.container(0, 0);

        let xCor = containerWidth / -2;
        for (let x = 0; x < 3; x++) {
            let yCor = containerHeight / -2;
            for (let y = 0; y < 2; y++) {
                const newWeakspot = new Weakspot(this.scene, xCor, yCor, 50, 50, Boss.getNextWeakness());
                weakContainer.add(newWeakspot);
                this.weakSpots.push(newWeakspot);
                yCor += containerHeight;
            }

            xCor += containerWidth / 2;
        }

        const outline = this.scene.add.rectangle(0, 0, this.targetWidth, this.targetHeight);
        outline.setStrokeStyle(3, 0x000000);

        this.add([sprite, this.lifeBar, outline]);
        this.add(weakContainer);
    }
}