import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import type { SettingKey } from "../types/setting-key";
import { settingDataKeys } from "../data/setting.data";

@Injectable()
export class ParseSettingKeyPipe implements PipeTransform<string, SettingKey> {
    transform(value:string, metadata:ArgumentMetadata):SettingKey {
        if(!(value in settingDataKeys)) {
            throw new BadRequestException(`해당 설정은 존재하지 않습니다: ${value}`);
        }

        return value as SettingKey;
    }
}