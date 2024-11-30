import { SceneNames } from "../../../enums/Constants";
import { DamageType } from "../../../enums/DamageType";
import { ItemType } from "../../../enums/ItemType";
import IndexUtil from "../../../utils/IndexUtil";
import { ItemWithIndex, PortalWithIndex } from "../../../utils/SceneData";
import MazeSceneBase from "../../bases/MazeSceneBase";

export default class Level1Maze1 extends MazeSceneBase {
    protected readonly squareStartingMatrix = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 3, 2, 2],
        [2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 1, 2, 2],
        [2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2],
        [2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 3, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2],
        [2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(1, 1);

    protected readonly startPortals: PortalWithIndex[] = [
        { index: { x: 12, y: 1 }, toPortalName: SceneNames.Level1Maze2 },
        { index: { x: 13, y: 6 }, toPortalName: SceneNames.Level1Maze3 },
    ]

    protected readonly startItems: ItemWithIndex[] = [
        { index: { x: 7, y: 2 }, item: { damageType: DamageType.Electricity, type: ItemType.WEAPON } },
        { index: { x: 11, y: 6 }, item: { damageType: DamageType.Water, type: ItemType.WEAPON } },
        { index: { x: 5, y: 1 }, item: { type: ItemType.INFO_CARD } },
        { index: { x: 9, y: 8 }, item: { type: ItemType.INFO_CARD } },
    ];

    constructor() {
        super(SceneNames.Level1Maze1);
    }
}