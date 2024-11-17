import { SceneNames } from "../enums/Constants";
import IndexUtil from "../utils/IndexUtil";
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

    constructor(){
        super(SceneNames.Level1);
    }
}