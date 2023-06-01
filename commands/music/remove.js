const { SlashCommandBuilder } = require("@discordjs/builders");
const { useQueue } = require("discord-player");

module.exports = {
	data:new SlashCommandBuilder()
        .setName("remove")
        .setDescription("Removes selected song")
        .addIntegerOption(option =>
            option
                .setName("position")
                .setDescription("position of song")
                .setRequired(true)
            ),

	execute: async ({ interaction }) => {
        let position = await interaction.options.getInteger("position", true);

        const queue = useQueue(interaction.guildId);

        if (!queue) {
            await interaction.reply("There are no songs currently playing")
            return;
        }
        position = position - 1;

        // Removes the song from queue
		queue.removeTrack(position)

        // Return a reply
        await interaction.reply(`The song was removed`)
	}
}
