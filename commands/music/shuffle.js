const { SlashCommandBuilder } = require("@discordjs/builders");
const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data:new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("shuffles the queue order"),

    execute: async ({ client, interaction }) => {
        // Get the queue for the server
        const queue = useQueue(interaction.guildId);

        // Check if the queue is empty, else shuffle
        if (!queue) {
            await interaction.reply("There are no songs to be shuffled")
			return;
        }
        
        // Shuffles the queue
        queue.tracks.shuffle()

        // Embed
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Queue has been shuffled`)
            ]
        })
        
    }
}
