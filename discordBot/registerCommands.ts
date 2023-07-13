import { ApplicationCommandsAPI } from "@discordjs/core";
import { REST } from "@discordjs/rest";

const token =
  "MTEyOTA3NDY1NzU5Nzg3MDIwMg.GbSQdh.XJbKdQBWNUTkwkCmtlqotJ7ZotfVSGWpKh16Kk";

const applicationId = "1129074657597870202";

const registerCommands = async () => {
  // Create REST and WebSocket managers directly
  console.log("registering commands...");
  const rest = new REST({ version: "10" }).setToken(token);
  const commandsAPI: ApplicationCommandsAPI = new ApplicationCommandsAPI(rest);

  const result = await commandsAPI.createGlobalCommand(applicationId, {
    name: "ping",
    description: "reply with pong",
  });

  console.log("commands registered!");
};

registerCommands();
