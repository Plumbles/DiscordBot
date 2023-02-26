const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")
const { execute } = require("./play")

module.exports = {
    data:new SlashCommandBuilder()
        .setName("servers")
        .setDescription("Prints server cache in console"),
    execute: async({ client, interaction }) => {
        client.guilds.cache.forEach((guild) => {
            console.log(guild)
        })
    }
}



