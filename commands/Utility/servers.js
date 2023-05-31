const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data:new SlashCommandBuilder()
        .setName("servers")
        .setDescription("Prints server cache in console"),
        
    execute: async({ client, interaction }) => {

        i = 1;

        console.log(`\nList of servers currently connected: \n`);

        client.guilds.cache.forEach((guild) => {
            console.log(`${i}. ${guild.name}`)
            i++;
        })
        
        console.log(`\n`);

        // Embed
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`List of servers sent to console`)
            ]
        })
    }
}



