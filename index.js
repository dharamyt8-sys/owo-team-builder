require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

if (!TOKEN) {
  console.error("❌ TOKEN is missing!");
  process.exit(1);
}

if (!CLIENT_ID) {
  console.error("❌ CLIENT_ID is missing!");
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("teambuild")
    .setDescription("Build an OwO Battle team from your available data.")
].map(command => command.toJSON());

async function registerCommands() {
  try {
    console.log("🔄 Registering slash commands...");

    const rest = new REST({ version: "10" });
    rest.setToken(TOKEN);

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("✅ Slash commands registered!");
  } catch (error) {
    console.error("❌ Command registration error:", error);
  }
}

client.once("ready", async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  console.log("🐾 OWO Team Builder is online!");

  await registerCommands();
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "teambuild") {
    await interaction.reply({
      content:
        "🐾 **OWO Team Builder**\n\n" +
        "⚔️ Team Builder system is ready!\n" +
        "📊 Animal & battle-data analyzer coming next.",
      ephemeral: true
    });
  }
});

client.login(TOKEN);
