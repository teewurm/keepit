import { SceneNames } from "../enums/Constants";
import { ItemType } from "../enums/ItemType";
import IndexUtil from "../utils/IndexUtil";
import { ItemConfig } from "../utils/ItemSlot";
import MazeSceneBase from "./bases/MazeSceneBase";

export default class Level1 extends MazeSceneBase {
    protected readonly squareStartingMatrix = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 4, 2, 2],
        [2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2],
        [2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2],
        [2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2],
        [2, 1, 1, 1, 2, 1, 1, 1, 2, 3, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    protected readonly playerSpawn: IndexUtil = new IndexUtil(1, 1);

    protected readonly startItems: { index: IndexUtil, item: ItemConfig }[] = [
        { index: { x: 5, y: 1 }, item: { text: "Fire", type: ItemType.WEAPON } },
        { index: { x: 9, y: 7 }, item: { text: "Water", type: ItemType.WEAPON } },
        { index: { x: 12, y: 2 }, item: { text: "?", type: ItemType.INFO_CARD } },
        { index: { x: 12, y: 3 }, item: { text: "?", type: ItemType.INFO_CARD } },
        { index: { x: 11, y: 3 }, item: { text: "?", type: ItemType.INFO_CARD } },
        { index: { x: 10, y: 3 }, item: { text: "?", type: ItemType.INFO_CARD } },
        { index: { x: 9, y: 3 }, item: { text: "?", type: ItemType.INFO_CARD } },
        { index: { x: 9, y: 2 }, item: { text: "?", type: ItemType.INFO_CARD } },
        { index: { x: 3, y: 1 }, item: { text: "?", type: ItemType.INFO_CARD } }
    ];

    constructor() {
        super(SceneNames.Level1);
    }
}