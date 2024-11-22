import IndexUtil from "./IndexUtil";
import { ItemConfig } from "./ItemSlot";

export default class SceneData{
    backpackItems: ItemConfig[] = [];
}

export class ItemWithIndex{
    index: IndexUtil;
    item: ItemConfig;
}

export class PortalWithIndex{
    index: IndexUtil;
    portalName: string;
}