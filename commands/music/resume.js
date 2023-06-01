const { SlashCommandBuilder } = require("@discordjs/builders");
const { useQueue } = require("discord-player");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the current song"),
        
	execute: async ({ interaction }) => {
        // Get the queue for the server
		const queue = useQueue(interaction.guildId);

        // Check if the queue is empty
		if (!queue)
        {
            await interaction.reply("No songs in the queue");
            return;
        }

        // Pause the current song
		queue.node.resume();

        await interaction.reply("Player has been resumed.")
	},
}
