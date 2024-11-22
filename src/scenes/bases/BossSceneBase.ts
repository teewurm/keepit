import Backpack from "../../components/Backpack";
import Boss from "../../components/Boss";
import Player from "../../components/Player";
import { ColorPalette, GameLayout, SceneNames } from "../../enums/Constants";
import SceneData from "../../utils/SceneData";
import SceneBase from "./SceneBase";

export default class BossSceneBase extends SceneBase {
    protected mainContainer: Phaser.GameObjects.Container;

    protected player: Player;
    protected boss: Boss;

    protected fieldWidth: number;
    protected fieldHeight: number;

    constructor(name: string) {
        super(name ? name : SceneNames.BossBase);
    }

    create(newData: SceneData) {
        this.cameras.main.setBackgroundColor(ColorPalette.FOG);

        this.fieldWidth = GameLayout.BossSquareCountWidth * GameLayout.SquareEdgeLength;
        this.fieldHeight = GameLayout.BossSquareCountHeight * GameLayout.SquareEdgeLength;

        this.createBaseField();
        this.createPlayerWithBackpack();

        this.createBoss();

        this.player.backpack.setBackpackItems(newData.backpackItems);
    }

    protected createBaseField() {
        const lineWidth = 4;
        const lineColor = ColorPalette.Wall;

        const outline = this.add.rectangle(0, 0,
            this.fieldWidth,
            this.fieldHeight,
            undefined, 0);

        const middleLine = this.add.line(0, 0, 0, 0, this.fieldWidth, 0, lineColor);
        middleLine.setLineWidth(lineWidth);

        outline.setStrokeStyle(lineWidth, lineColor);

        this.mainContainer = this.add.container(this.center_width, this.center_height, [outline, middleLine]);
    }

    protected createPlayerWithBackpack() {
        const backpack = new Backpack(this, (this.fieldWidth / 2) + GameLayout.SquareEdgeLength * 1.5, 0, 200, 600);
        this.player = new Player(this, 0, this.fieldHeight / 4, GameLayout.SquareEdgeLength * 0.8, GameLayout.SquareEdgeLength * 0.8, [], backpack);

        this.mainContainer.add([backpack, this.player]);
    }

    protected createBoss() {
        this.boss = new Boss(this, 0, this.fieldHeight / -4, this.fieldWidth * 0.8, this.fieldHeight * 0.4);

        this.mainContainer.add(this.boss);
    }
}