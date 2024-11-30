import { BossType } from "../enums/BossType";
import { Assets, GameplaySettings } from "../enums/Constants";
import SceneBase from "../scenes/bases/SceneBase";
import BaseAttack from "./bases/BaseAttack";

export default class BossAttack extends BaseAttack {
    protected readonly attackSpeed: number = GameplaySettings.BossAttackDuration;

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number, bossType: BossType) {
        super(scene, x, y, width, height, Assets.Sprite.BossAttack, bossType + "_Bossattack");
    }
}