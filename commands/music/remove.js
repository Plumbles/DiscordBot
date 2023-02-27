const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove")
        .setDescription("removes a song in the queue")
        .addNumberOption(option =>
            option.setName("position").setDescription("Position of song").setRequired(false)
        ),

    execute: async ({ client, interaction }) => {
        let position = (await interaction.options.getNumber("position", true));

        const queue = client.player.getQueue(interaction.guildId)
        
        queue.remove(queue.seek(position))

    }
}