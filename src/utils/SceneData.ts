import IndexUtil from "./IndexUtil";
import { ItemConfig } from "./ItemSlot";

export default class SceneData{
    backpackItems?: ItemConfig[] = [];
    fromScene?: string;
    currentLife?: number;
    firstSceneOfLevel = false;
}

export class ItemWithIndex{
    index: IndexUtil;
    item: ItemConfig;
}

export class PortalWithIndex{
    index: IndexUtil;
    toPortalName: string;
}