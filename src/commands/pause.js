const {SlashCommandBuilder} = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses current song."),
    async execute(client, interaction){
        const queue = client.player.getQueue(interaction.guild);

        if(!queue) {
            await interaction.reply("There are no songs currently playing.");
            return;
        }

        const currentSong = queue.current;

        queue.setPaused(true);

        await interaction.reply("The current song has been paused")
    }
}