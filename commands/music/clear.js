const { SlashCommandBuilder } = require("@discordjs/builders")
const { useQueue } = require("discord-player");

module.exports = {
	data:new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears the current queue"),

	execute: async ({ client, interaction }) => {
        // Get the queue for the server
		const queue = useQueue(interaction.guildId);

        // If there is no queue, return
		if (!queue) {
            await interaction.reply("There are no songs in the queue");
            return;
        }

        // Clears the queue
		queue.tracks.clear()

        // Return a reply
        await interaction.reply(`The queue has been cleared`)
	},
}
