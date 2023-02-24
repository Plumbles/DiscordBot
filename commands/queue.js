const {SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Shows current queue."),
    execute: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild);

        if(!queue || !queue.playing) {
            await interaction.reply("There are no songs playing.");
            return;
        }

        const queueString = queue.tracks.slice(0, 10).map((song, i) =>{
            return `${i + 1}) [${song.duration}]\` ${song.title} - <@${song.requestBy.id}>`;
        }).join("\n");

        const currentSong = queue.current;

        await interaction.reply({
        ds: [
            new MessageEmbed()
                .setDescription(`**Currently Playing:**\n\` ${currentSong.title} - <@${currentSong.requestBy.id}>\n\n**Queue:**\n${queueString}`)
                .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}