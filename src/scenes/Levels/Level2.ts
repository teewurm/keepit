import { SceneNames } from "../../enums/Constants";
import { DamageType } from "../../enums/DamageType";
import { ItemType } from "../../enums/ItemType";
import IndexUtil from "../../utils/IndexUtil";
import { ItemWithIndex, PortalWithIndex } from "../../utils/SceneData";
import MazeSceneBase from "../bases/MazeSceneBase";

export default class Level2 extends MazeSceneBase {
    protected readonly squareStartingMatrix = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 2],
        [2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2],
        [2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(2, 1);

    protected readonly startItems: ItemWithIndex[] = [
        { index: { x: 5, y: 1 }, item: { damageType: DamageType.Fire, type: ItemType.WEAPON } },
        { index: { x: 12, y: 2 }, item: { damageType: DamageType.Void, type: ItemType.INFO_CARD } },
        { index: { x: 9, y: 3 }, item: { damageType: DamageType.Void, type: ItemType.INFO_CARD } },
    ];

    protected readonly startPortals: PortalWithIndex[] = [
        { index: { x: 12, y: 1 }, toPortalName: SceneNames.Level1 },
        { index: { x: 11, y: 4 }, toPortalName: SceneNames.BossBase },
    ]

    constructor() {
        super(SceneNames.Level2);
    }
}