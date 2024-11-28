import { SceneNames } from "../../../enums/Constants";
import { DamageType } from "../../../enums/DamageType";
import { ItemType } from "../../../enums/ItemType";
import IndexUtil from "../../../utils/IndexUtil";
import { ItemWithIndex, PortalWithIndex } from "../../../utils/SceneData";
import MazeSceneBase from "../../bases/MazeSceneBase";

export default class Level3Maze1 extends MazeSceneBase {
    protected readonly squareStartingMatrix = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2],
        [2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 2],
        [2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 3, 2, 2],
        [2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1, 1, 2, 2],
        [2, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2],
        [2, 1, 2, 3, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2],
        [2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 1, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(12, 8);

    protected readonly startPortals: PortalWithIndex[] = [
        { index: { x: 12, y: 3 }, toPortalName: SceneNames.Level3Maze2 },
        { index: { x: 3, y: 6 }, toPortalName: SceneNames.Level3Maze3 },
    ]

    protected readonly startItems: ItemWithIndex[] = [
        { index: { x: 3, y: 1 }, item: { damageType: DamageType.Yellow, type: ItemType.WEAPON } },
        { index: { x: 8, y: 7 }, item: { damageType: DamageType.Poison, type: ItemType.WEAPON } },
        { index: { x: 11, y: 1 }, item: { type: ItemType.INFO_CARD } },
        { index: { x: 6, y: 2 }, item: { type: ItemType.INFO_CARD } },
    ];

    constructor() {
        super(SceneNames.Level3Maze1);
    }
}