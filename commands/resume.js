const {SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the queue."),
    execute: async ({client, interaction}) => {

        const queue = client.player.getQueue(interaction.guild);

        if (!queue){
            await interaction.reply("There are no songs currently playing.");
            return;
        }

        queue.setPaused(false);

        await interaction.reply("Songs have resumed playing.")
    }
}