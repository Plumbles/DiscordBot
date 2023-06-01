require('dotenv').config();

const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require("discord-player");
const path = require('node:path');
const fs = require('node:fs');


const client = new Client({
    intents: [GatewayIntentBits.Guilds,
         GatewayIntentBits.GuildVoiceStates,
         GatewayIntentBits.GuildMessages]
});


// List of all commands
const commands = [];
client.commands = new Collection();


const foldersPath = path.join(__dirname, 'commands'); // commandpaths
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}



// Add the player on the client
client.player = new Player(client, {
    ytdlOptions: {
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
})

client.on("ready", () => {
    // Get all ids of the servers
    const guild_ids = client.guilds.cache.map(guild => guild.id);


    const rest = new REST({version: '9'}).setToken(process.env.TOKEN);
    for (const guildId of guild_ids)
    {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), 
            {body: commands})
        .then(() => console.log('Successfully updated commands for guild ' + guildId))
        .catch(console.error);
    }
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try
    {
        await command.execute({client, interaction});
    }
    catch(error)
    {
        console.error(error);
        await interaction.reply({content: "There was an error executing this command"});
    }
});

client.login(process.env.TOKEN);