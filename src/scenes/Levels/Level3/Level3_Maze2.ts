import { SceneNames } from "../../../enums/Constants";
import { DamageType } from "../../../enums/DamageType";
import { ItemType } from "../../../enums/ItemType";
import IndexUtil from "../../../utils/IndexUtil";
import { ItemWithIndex, PortalWithIndex } from "../../../utils/SceneData";
import MazeSceneBase from "../../bases/MazeSceneBase";

export default class Level3Maze2 extends MazeSceneBase {
    protected readonly squareStartingMatrix = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 3, 2, 2],
        [2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 2],
        [2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 2],
        [2, 4, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 2],
        [2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2],
        [2, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2],
        [2, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2],
        [2, 2, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 3, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(2, 1);

    protected readonly startItems: ItemWithIndex[] = [
        { index: { x: 4, y: 1 }, item: { damageType: DamageType.Void, type: ItemType.WEAPON } },
        { index: { x: 6, y: 8 }, item: { damageType: DamageType.Water, type: ItemType.WEAPON } },
        { index: { x: 8, y: 1 }, item: { type: ItemType.INFO_CARD } },
        { index: { x: 6, y: 1 }, item: { type: ItemType.INFO_CARD } },
    ];

    protected readonly startPortals: PortalWithIndex[] = [
        { index: { x: 12, y: 1 }, toPortalName: SceneNames.Level3Maze1 },
        { index: { x: 12, y: 8 }, toPortalName: SceneNames.Level3Maze3 },
        { index: { x: 1, y: 4 }, toPortalName: SceneNames.Level3Boss },
    ]

    constructor() {
        super(SceneNames.Level3Maze2);
    }
}