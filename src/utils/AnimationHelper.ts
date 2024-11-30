
export default class AnimatoinHelper {

    static getLocalTransformPoint(targetPosition: Phaser.GameObjects.Container, sourceObject: Phaser.GameObjects.Sprite): Phaser.Types.Math.Vector2Like {

        const targetWorldMatrix = targetPosition.getWorldTransformMatrix();
        const targetWorldX = targetWorldMatrix.tx;
        const targetWorldY = targetWorldMatrix.ty;

        const parentContainer = sourceObject.parentContainer;

        const parentWorldMatrix = new Phaser.GameObjects.Components.TransformMatrix();
        parentContainer.getWorldTransformMatrix(parentWorldMatrix);

        const invMatrix = parentWorldMatrix.invert();
        const localPosition = invMatrix.transformPoint(targetWorldX, targetWorldY);

        return localPosition;
    }
}