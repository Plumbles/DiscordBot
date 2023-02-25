const {SlashCommandBuilder} = require("@discordjs/builders");
const { EmbedBuilder, Embed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Shows current queue."),
    async execute(client, interaction){
        const queue = client.player.getQueue(interaction.guild);

        if (!queue || !queue.playing) {
            await interaction.reply("There are no songs currenctly playing.");
            return;
        }

        const queueString = queue.tracks.slice(0, 5).map((song, i) => {
            return `${i +1})  [${song.duration}]\` ${song.title} - <@${song.requestedBy.id}>`;
        }).join("\n")

        const currentSong = queue.current;

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**Currently Playing:**\n\`${currentSong.title} - <@${currentSong.requestedBy.id}>\n\n**Queue:**\n${queueString}`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}