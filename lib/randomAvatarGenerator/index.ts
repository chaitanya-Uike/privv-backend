import { AssetList } from "./assetList";

export function generateAvatar(): string {
    const index = Math.floor(Math.random() * AssetList.length)
    return AssetList[index];
}