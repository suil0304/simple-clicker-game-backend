import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello():string {
        return [
            "<h1>A Simple Clicker Game API</h1>",
            "<p>This is API of very simple clicker game.</p>",
            "<p>You can call http method in this endpoints.</p>",
            "<h2>Auth</h2>",
            "<ul>",
            "   <li>POST /auth/register</li>",
            "   <li>POST /auth/login</li>",
            "</ul>",
            "<h2>Users</h2>",
            "<p>Log in required.</p>",
            "<ul>",
            "   <li>GET /users</li>",
            "   <li>PATCH /users</li>",
            "   <li>DELETE /users</li>",
            "</ul>",
            "<h2>Upgrades</h2>",
            "<p>Log in required.</p>",
            "<ul>",
            "   <li>GET /upgrades</li>",
            "   <li>GET /upgrades/:upgradeKey</li>",
            "   <li>POST /upgrades</li>",
            "</ul>",
            "<h2>Stats</h2>",
            "<p>Log in required.</p>",
            "<ul>",
            "   <li>GET /stats</li>",
            "   <li>POST /stats/sync</li>",
            "</ul>",
            "<h2>Settings</h2>",
            "<p>Log in required.</p>",
            "<ul>",
            "   <li>GET /settings</li>",
            "   <li>GET /settings/:settingKey</li>",
            "   <li>POST /settings</li>",
            "</ul>"
        ].join("\n");
    }
}
