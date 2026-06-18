import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { UpgradeKey } from "../types/upgrade-key";
import { upgradeDataKeys } from "../data/upgrade.data";

@Injectable()
export class ParseUpgradeKeyPipe implements PipeTransform<string, UpgradeKey> {
    transform(value:string, _metadata:ArgumentMetadata):UpgradeKey {
        if(!upgradeDataKeys.includes(value as UpgradeKey)) {
            throw new BadRequestException(`해당 업그레이드는 존재하지 않습니다: ${value}`);
        }

        return value as UpgradeKey;
    }
}