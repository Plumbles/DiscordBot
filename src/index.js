const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { REST, Routes } = require('discord.js');
const config = require('./Data/config.json');
const fs = require('node:fs');
const path = require('node:path');
const { Player } = require("discord-player");


const client = new Client({
    intents:[GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages]
});

client.commands = new Collection();


//slashCommands
const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command)
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(config.token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(config.clientId, config.guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
//slashCommands End

//client events
client.once("ready", () => {
	console.log("4Head Bot is now online")
})

client.on("interactionCreate", (interaction) => {
	//runs the commands

	if(!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName)
	if (!command) return;

	try {
		command.execute(client, interaction)
	}	catch (error) {
		interaction.reply({content:"There was an error executing that command", ephemeral:true})
	}

})
//client events ends


//music manager
client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25
	}
});


//music manager ends


client.login(config.token)