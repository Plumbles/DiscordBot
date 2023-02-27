const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data:new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears the current queue"),

	execute: async ({ client, interaction }) => {
        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // If there is no queue, return
		if (!queue) {
            await interaction.reply("There are no songs in the queue");
            return;
        }

        const currentSong = queue.current

        // Clears the queue
		queue.clear()

        // Return a reply
        await interaction.reply(`The queue has been cleared`)
	},
}
