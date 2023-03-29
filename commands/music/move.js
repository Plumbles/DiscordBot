const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("move")
        .setDescription("moves songs in the queue")
        .addNumberOption(option =>
            option.setName("from").setDescription("Song to move").setRequired(true))
        .addNumberOption(option =>
            option.setName("to").setDescription("position to move the song").setRequired(true)),
        
    execute: async ({ client, interaction }) => {
        let fromPos = (await interaction.options.getNumber("from", true));
        let toPos = (await interaction.options.getNumber("to", true));

        const queue = useQueue(interaction.guildId);
        const song = queue.tracks.at(fromPos)

        queue.moveTrack(fromPos, toPos)

        // Embed
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`Moved ${queue.tracks[toPos]} to position ${toPos}`)
            ]
        })

    }
        
}