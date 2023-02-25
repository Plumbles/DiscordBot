const { Client, GatewayIntentBits } = require("discord.js");
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token} = require('./config.json');
const fs = require('node:fs');

const client = new Client({
    intents:[GatewayIntentBits.Guilds]
});

client.commands = new Collection();


//slashCommands

//slashCommands End