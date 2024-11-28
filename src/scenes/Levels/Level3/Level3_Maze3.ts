import { SceneNames } from "../../../enums/Constants";
import { DamageType } from "../../../enums/DamageType";
import { ItemType } from "../../../enums/ItemType";
import IndexUtil from "../../../utils/IndexUtil";
import { ItemWithIndex, PortalWithIndex } from "../../../utils/SceneData";
import MazeSceneBase from "../../bases/MazeSceneBase";

export default class Level3Maze3 extends MazeSceneBase {
    protected readonly squareStartingMatrix = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(11, 4);

    protected readonly startItems: ItemWithIndex[] = [
        { index: { x: 1, y: 1 }, item: { damageType: DamageType.Electricity, type: ItemType.WEAPON } },
        { index: { x: 3, y: 8 }, item: { damageType: DamageType.Fire, type: ItemType.WEAPON } },
        { index: { x: 11, y: 8 }, item: { type: ItemType.INFO_CARD } },
        { index: { x: 7, y: 1 }, item: { type: ItemType.INFO_CARD } },
    ];

    protected readonly startPortals: PortalWithIndex[] = [
        { index: { x: 13, y: 4 }, toPortalName: SceneNames.Level3Maze2 },
        { index: { x: 13, y: 6 }, toPortalName: SceneNames.Level3Maze1 },
    ]

    constructor() {
        super(SceneNames.Level3Maze3);
    }
}