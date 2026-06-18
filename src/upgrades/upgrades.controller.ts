import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UpgradesService } from './upgrades.service';
import { UpgradeDTO } from './dto/upgrade.dto';
import type { UpgradeKey } from './types/upgrade-key';
import { ParseUpgradeKeyPipe } from './pipes/parse-upgrade-key.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';

@UseGuards(AuthGuard("jwt"))
@Controller('upgrades')
export class UpgradesController {
    constructor(private readonly upgradesService: UpgradesService) {}

    @Get()
    async getUpgrades(@GetUser("sub") userId:number) {
        return this.upgradesService.getUpgrades(userId);
    }

    @Get("/:upgradeKey")
    async getUpgrade(
        @GetUser("sub") userId:number,
        @Param("upgradeKey", ParseUpgradeKeyPipe) upgradeKey:UpgradeKey
    ) {
        return this.upgradesService.getUpgrade(userId, upgradeKey);
    }

    @Post()
    async buyUpgrade(
        @GetUser("sub") userId:number,
        @Body() upgradeData:UpgradeDTO
    ) {
        return this.upgradesService.buyUpgrade(userId, upgradeData);
    }
}