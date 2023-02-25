const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data:new SlashCommandBuilder()
    .setName("ping")
    .setDescription("The Bot pings"),

    async execute(client, interaction){
        interaction.reply(`Ping: ${client.ws.ping}`)
    }
}