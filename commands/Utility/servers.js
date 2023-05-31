const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data:new SlashCommandBuilder()
        .setName("servers")
        .setDescription("Prints server cache to console"),
        
    execute: async({ client, interaction }) => {

        if (interaction.channel.guildId == '581942750438752266') {

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
        } else {

            // Embed
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`This is not an administrative server`)
                ]
            })
        }


        
    }
}



