import { SceneNames } from "../../../enums/Constants";
import { DamageType } from "../../../enums/DamageType";
import { ItemType } from "../../../enums/ItemType";
import IndexUtil from "../../../utils/IndexUtil";
import { ItemWithIndex, PortalWithIndex } from "../../../utils/SceneData";
import MazeSceneBase from "../../bases/MazeSceneBase";

export default class Level2Maze2 extends MazeSceneBase {
    protected readonly squareStartingMatrix = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2],
        [2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 3, 2, 2],
        [2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
        [2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2],
        [2, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2],
        [2, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 2],
        [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2],
        [2, 2, 2, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(1, 5);

    protected readonly startItems: ItemWithIndex[] = [
        { index: { x: 5, y: 1 }, item: { damageType: DamageType.Poison, type: ItemType.WEAPON } },
        { index: { x: 9, y: 1 }, item: { damageType: DamageType.Electricity, type: ItemType.WEAPON } },
        { index: { x: 13, y: 6 }, item: { type: ItemType.INFO_CARD } },
        { index: { x: 13, y: 4 }, item: { type: ItemType.INFO_CARD } },
    ];

    protected readonly startPortals: PortalWithIndex[] = [
        { index: { x: 12, y: 2 }, toPortalName: SceneNames.Level2Maze1 },
        { index: { x: 13, y: 8 }, toPortalName: SceneNames.Level2Maze3 },
        { index: { x: 3, y: 8 }, toPortalName: SceneNames.Level2Boss },
    ]

    constructor() {
        super(SceneNames.Level2Maze2);
    }
}