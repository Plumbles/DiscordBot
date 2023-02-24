const {SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Makes bot exit voice-channel."),
    execute: async ({client, interaction}) => {

        const queue = client.player.getQueue(interaction.guild);

        queue.destroy();

        await interaction.reply("Exiting voice-channel.")
    }
}
