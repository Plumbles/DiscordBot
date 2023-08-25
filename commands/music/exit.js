const { SlashCommandBuilder } = require("@discordjs/builders")
const { useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Kick the bot from the channel."),
	execute: async ({ interaction }) => {

        // Get the current queue
		const queue = useQueue(interaction.guildId);

		if (!queue)
		{
			await interaction.reply("There are no songs currently playing")
			return;
		}

        // Deletes all the songs from the queue and exits the channel
		queue.delete();

        await interaction.reply("Leaving the voice-channel")
	},
}
