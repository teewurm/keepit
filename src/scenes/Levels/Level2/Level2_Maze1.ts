import { SceneNames } from "../../../enums/Constants";
import { DamageType } from "../../../enums/DamageType";
import { ItemType } from "../../../enums/ItemType";
import IndexUtil from "../../../utils/IndexUtil";
import { ItemWithIndex, PortalWithIndex } from "../../../utils/SceneData";
import MazeSceneBase from "../../bases/MazeSceneBase";

export default class Level2Maze1 extends MazeSceneBase {
    protected readonly squareStartingMatrix = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2],
        [2, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2],
        [2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1, 2],
        [2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2],
        [2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 3, 1, 1, 3, 2],
        [2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2],
        [2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2],
        [2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(5, 5);

    protected readonly startPortals: PortalWithIndex[] = [
        { index: { x: 10, y: 5 }, toPortalName: SceneNames.Level2Maze2 },
        { index: { x: 13, y: 5 }, toPortalName: SceneNames.Level2Maze3 },
    ]

    protected readonly startItems: ItemWithIndex[] = [
        { index: { x: 1, y: 1 }, item: { damageType: DamageType.Water, type: ItemType.WEAPON } },
        { index: { x: 12, y: 8 }, item: { damageType: DamageType.Fire, type: ItemType.WEAPON } },
        { index: { x: 11, y: 3 }, item: { type: ItemType.INFO_CARD } },
        { index: { x: 2, y: 8 }, item: { type: ItemType.INFO_CARD } },
    ];

    constructor() {
        super(SceneNames.Level2Maze1);
    }
}