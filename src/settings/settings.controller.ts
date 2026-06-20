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
    async getAll(@GetUser("sub") userId:number) {
        return this.service.getAll(userId);
    }

    @Get("/:upgradeKey")
    async getOne(
        @GetUser("sub") userId:number,
        @Param("upgradeKey", ParseSettingKeyPipe) settingKey:SettingKey
    ) {
        return this.service.getOne(userId, settingKey);
    }

    @Post()
    async applySetting(
        @GetUser("sub") userId:number,
        @Body() applySettingData:ApplySettingDTO
    ) {
        return this.service.applySetting(userId, applySettingData);
    }
}
