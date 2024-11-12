import SceneBase from "./bases/SceneBase";

export default class TestScene extends SceneBase {

    create() {
        this.add.text(this.center_width, this.center_height, "404", {fontSize: 46, fontStyle: "bold"});
    }

}