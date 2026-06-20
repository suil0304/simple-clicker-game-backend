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
    async getAll(@GetUser("sub") userId:number) {
        return this.upgradesService.getAll(userId);
    }

    @Get("/:upgradeKey")
    async getOne(
        @GetUser("sub") userId:number,
        @Param("upgradeKey", ParseUpgradeKeyPipe) upgradeKey:UpgradeKey
    ) {
        return this.upgradesService.getOne(userId, upgradeKey);
    }

    @Post()
    async buyUpgrade(
        @GetUser("sub") userId:number,
        @Body() upgradeType:UpgradeDTO
    ) {
        return this.upgradesService.buyUpgrade(userId, upgradeType);
    }
}