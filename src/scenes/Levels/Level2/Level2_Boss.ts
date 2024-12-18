import { BossType } from "../../../enums/BossType";
import { SceneNames } from "../../../enums/Constants";
import BossSceneBase from "../../bases/BossSceneBase";

export default class Level2Boss extends BossSceneBase {
    protected readonly bossType: BossType = BossType.Blue;


    constructor() {
        super(SceneNames.Level2Boss);
    }
}