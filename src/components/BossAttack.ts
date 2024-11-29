import { BossType } from "../enums/BossType";
import { Assets, GameplaySettings } from "../enums/Constants";
import SceneBase from "../scenes/bases/SceneBase";
import CustomContainerBase from "./bases/CustomContainerBase"

export default class BossAttack extends CustomContainerBase {
    protected bosstype: BossType;

    protected attackSprite: Phaser.GameObjects.Sprite;

    protected spriteStartPos: { x: number, y: number };
    protected spriteEndPos: { x: number, y: number };

    protected isAttacking = false;

    constructor(scene: SceneBase, x: number, y: number, width: number, height: number, bossType: BossType) {
        super(scene, x, y, width, height);

        this.bosstype = bossType;

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
        this.attackSprite = this.scene.add.sprite(0, 0, Assets.Sprite.BossAttack);
        this.attackSprite.play({ key: this.bosstype + "_Bossattack" });
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
            duration: GameplaySettings.BossAttackDelay,
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