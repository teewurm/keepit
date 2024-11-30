import SceneBase from "../../scenes/bases/SceneBase";
import CustomContainerBase from "./CustomContainerBase";

export default class BaseAttack extends CustomContainerBase {
    protected readonly attackSpeed: number = 1000;

    protected spriteName: string
    protected animationKey: string

    protected attackSprite: Phaser.GameObjects.Sprite;

    protected spriteStartPos: { x: number, y: number };
    protected spriteEndPos: { x: number, y: number };

    protected isAttacking = false;

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number, spriteName: string, animationKey: string) {
        super(scene, x, y, width, height);

        this.spriteName = spriteName;
        this.animationKey = animationKey;

        this.createShapes();

        this.spriteStartPos = {
            x: this.targetWidth,
            y: -this.targetHeight
        }

        this.spriteEndPos = {
            x: -this.targetWidth,
            y: this.targetHeight
        }

        this.scene.add.existing(this);
    }

    protected createShapes() {
        this.attackSprite = this.scene.add.sprite(0, 0, this.spriteName);
        this.attackSprite.play({ key: this.animationKey });
        this.attackSprite.setDisplaySize(this.targetWidth, this.targetHeight);

        this.attackSprite.setVisible(false);
        this.add(this.attackSprite);
    }

    attack(onCenterHit?: () => void, onComplete?: () => void) {
        if (this.isAttacking)
            return;

        this.isAttacking = true;

        this.attackSprite.setVisible(true);

        this.attackSprite.setPosition(this.spriteStartPos.x, this.spriteStartPos.y);

        const config: Phaser.Types.Tweens.TweenBuilderConfig = {
            targets: this.attackSprite,
            ease: "Expo.In",
            duration: this.attackSpeed,
            x: this.spriteEndPos.x,
            y: this.spriteEndPos.y
        };

        config.onUpdate = (tween) => {
            if (onCenterHit != undefined && tween.progress > 0.7) {
                onCenterHit();
                onCenterHit = undefined;
            }
        }

        config.onComplete = () => {
            this.scene.time.delayedCall(150, () => {
                this.attackSprite.setVisible(false);
                this.isAttacking = false;

                if (onComplete)
                    onComplete();
            });
        }

        this.scene.tweens.add(config);
    }
}