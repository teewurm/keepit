import { SceneNames } from "../../../enums/Constants";
import { DamageType } from "../../../enums/DamageType";
import { ItemType } from "../../../enums/ItemType";
import IndexUtil from "../../../utils/IndexUtil";
import { ItemWithIndex, PortalWithIndex } from "../../../utils/SceneData";
import MazeSceneBase from "../../bases/MazeSceneBase";

export default class Level2Maze3 extends MazeSceneBase {
    protected readonly squareStartingMatrix = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 3, 2],
        [2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 2],
        [2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2],
        [2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2],
        [2, 1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 1, 2],
        [2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2],
        [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2],
        [2, 2, 2, 1, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(2, 2);

    protected readonly startItems: ItemWithIndex[] = [
    ];

    protected readonly startPortals: PortalWithIndex[] = [
        { index: { x: 6, y: 8 }, toPortalName: SceneNames.Level2Maze2 },
        { index: { x: 13, y: 1 }, toPortalName: SceneNames.Level2Maze1 },
    ]

    constructor() {
        super(SceneNames.Level2Maze3);
    }
}