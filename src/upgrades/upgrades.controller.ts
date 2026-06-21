import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UpgradesService } from './upgrades.service';
import { UpgradeDTO } from './dto/upgrade.dto';
import type { UpgradeKey } from './types/upgrade-key';
import { ParseUpgradeKeyPipe } from './pipes/parse-upgrade-key.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';
import { GuestBuyUpgradeDTO } from './dto/guest-buy-upgrade.dto';
import { GuestUpgradeDataDTO } from './dto/guest-upgrade-data.dto';

@Controller('upgrades')
export class UpgradesController {
    constructor(private readonly service: UpgradesService) {}

    @UseGuards(AuthGuard("jwt"))
    @Get()
    async getAll(@GetUser("sub") userId:number) {
        return this.service.getAll(userId);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/:upgradeKey")
    async getOne(
        @GetUser("sub") userId:number,
        @Param("upgradeKey", ParseUpgradeKeyPipe) upgradeKey:UpgradeKey
    ) {
        return this.service.getOne(userId, upgradeKey);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async buyUpgrade(
        @GetUser("sub") userId:number,
        @Body() upgradeType:UpgradeDTO
    ) {
        return this.service.buyUpgrade(userId, upgradeType);
    }

    @Get("/guest")
    async getGuestInfos(@Body() guestUpgradeData:GuestUpgradeDataDTO) {
        return this.service.getGuestInfos(guestUpgradeData);
    }

    @Post("/guest")
    async buyGuestUpgrade(@Body() calcUpgradeData:GuestBuyUpgradeDTO) {
        return this.service.buyGuestUpgrade(calcUpgradeData);
    }
}