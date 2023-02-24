const {SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the queue."),
    execute: async ({client, interaction}) => {

        const queue = client.player.getQueue(interaction.guild);

        if (!queue){
            await interaction.reply("There are no songs currently playing.");
            return;
        }

        queue.setPaused(true);

        await interaction.reply("Current song has been paused.")
    }
}