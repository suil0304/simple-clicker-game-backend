import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';
import { ParseSettingKeyPipe } from './pipes/parse-setting-key.pipe';
import type { SettingKey } from './types/setting-key';
import { ApplySettingDTO } from './dto/apply-setting.dto';

@UseGuards(AuthGuard("jwt"))
@Controller('settings')
export class SettingsController {
    constructor(private readonly service:SettingsService) {}

    @Get()
    async getSettings(@GetUser("sub") userId:number) {
        return this.service.getSettings(userId);
    }

    @Get("/:upgradeKey")
    async getSetting(
        @GetUser("sub") userId:number,
        @Param("upgradeKey", ParseSettingKeyPipe) settingKey:SettingKey
    ) {
        return this.service.getSetting(userId, settingKey);
    }

    @Post()
    async applySetting(
        @GetUser("sub") userId:number,
        @Body() applySettingData:ApplySettingDTO
    ) {
        return this.service.applySetting(userId, applySettingData);
    }
}
