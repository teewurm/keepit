import { Assets, GameplaySettings } from "../enums/Constants";
import { DamageType } from "../enums/DamageType";
import SceneBase from "../scenes/bases/SceneBase";
import BaseAttack from "./bases/BaseAttack";

export default class FireballAttack extends BaseAttack {
    protected readonly attackSpeed: number = GameplaySettings.FireballAttackDuration;

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height, Assets.Sprite.Fireball, "empty");
    }

    setDamageType(damageTyp: DamageType) {
        this.setAnimationKey(damageTyp + "_Fireball");
    }
}