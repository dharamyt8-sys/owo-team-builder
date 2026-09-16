require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("teambuild")
    .setDescription("Build an OwO Battle team from your available data.")
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

async function registerCommands() {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("Slash commands registered.");
  } catch (error) {
    console.error(error);
  }
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log("OWO Team Builder is online!");
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

registerCommands();
client.login(process.env.TOKEN);
