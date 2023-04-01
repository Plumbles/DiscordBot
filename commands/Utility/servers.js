const { SlashCommandBuilder } = require("@discordjs/builders")

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



