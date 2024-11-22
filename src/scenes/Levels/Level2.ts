import { SceneNames } from "../../enums/Constants";
import { ItemType } from "../../enums/ItemType";
import IndexUtil from "../../utils/IndexUtil";
import { ItemConfig } from "../../utils/ItemSlot";
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

    protected readonly startItems: { index: IndexUtil, item: ItemConfig }[] = [
        { index: { x: 5, y: 1 }, item: { text: "Fire", type: ItemType.WEAPON } },
        { index: { x: 12, y: 2 }, item: { text: "?", type: ItemType.INFO_CARD } },
        { index: { x: 9, y: 3 }, item: { text: "?", type: ItemType.INFO_CARD } },
    ];

    protected readonly startPortals: { index: IndexUtil, portalName: string }[] = [
        { index: { x: 12, y: 1 }, portalName: SceneNames.Level1}
    ]

    constructor() {
        super(SceneNames.Level2);
    }
}