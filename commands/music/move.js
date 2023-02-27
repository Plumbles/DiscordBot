const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
/*
module.exports = {
    data: new SlashCommandBuilder()
        .setName("move")
        .setDescription("moves a song to a set position in queue")
        .addNumberOption(option =>
            option
                .setName("fromPosition")
                .setDescription("first queue position")
                .setRequired(true)
                .addNumberOption(option =>
                    option
                        .setName("toPosition")
                        .setDescription("second queue position")
                        .setRequired(true)
                )
        ),
    execute: async ({ client, interaction }) => {
        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // Check if the queue is empty
		if (!queue) {
			await interaction.reply("There are no songs to be looped")
			return;
		}

    }
}

*/