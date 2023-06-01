const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder , PermissionFlagsBits} = require("discord.js")
const { useQueue } = require("discord-player");

module.exports = {
	data:new SlashCommandBuilder()
        .setName("normalize")
        .setDescription("Normalizes the queue")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	execute: async ({ interaction }) => {
        // Get the queue for the server
		const queue = useQueue(interaction.guildId);

        // If there is no queue, return
		if (!queue) {
            await interaction.reply("There are no songs in the queue");
            return;
        } else {
            await queue.filters.ffmpeg.toggle(['normalizer']);

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`The queue has been normalized!`)
                ]
            })
        }
	},
}
