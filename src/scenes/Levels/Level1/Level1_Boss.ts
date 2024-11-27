import { BossType } from "../../../enums/BossType";
import { SceneNames } from "../../../enums/Constants";
import BossSceneBase from "../../bases/BossSceneBase";

export default class Level1Boss extends BossSceneBase {
    protected readonly bossType: BossType = BossType.Green;


    constructor() {
        super(SceneNames.Level1Boss);
    }
}