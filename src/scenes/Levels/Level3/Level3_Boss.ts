import { BossType } from "../../../enums/BossType";
import { SceneNames } from "../../../enums/Constants";
import BossSceneBase from "../../bases/BossSceneBase";

export default class Level3Boss extends BossSceneBase {
    protected readonly bossType: BossType = BossType.Blue;


    constructor() {
        super(SceneNames.Level3Boss);
    }
}