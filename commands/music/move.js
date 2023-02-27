const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("move")
        .setDescription("moves a song to a set position in queue")
        .addIntegerOption(option =>
            option
                .setName("from")
                .setDescription("first queue position")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("to")
                .setDescription("second queue position")
                .setRequired(true)
        ),
    execute: async ({ client, interaction }) => {
        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // Check if the queue is empty
		if (!queue) {
			await interaction.reply("There are no songs to be moved")
			return;
		}

        const input1 = await interaction.options.getInteger("from", true) + 1;
        const input2 = await interaction.options.getInteger("to", true) + 1;

        


        await interaction.reply(`Song moved`)

    }
}
