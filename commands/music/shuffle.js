const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data:new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("shuffles the queue order"),

    execute: async ({ client, interaction }) => {
        // Get the queue for the server
        const queue = client.player.getQueue(interaction.guildId)

        // Check if the queue is empty, else shuffle
        if (!queue || !queue.playing) {
            await interaction.reply("There are no songs to be shuffled")
			return;
        }
        
        // Shuffles the queue
        queue.shuffle()

        // Embed
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Queue has been shuffled`)
            ]
        })
        
    }
}
