const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { useQueue } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("np")
        .setDescription("Shows which song is currently playing"),

        execute: async({ client, interaction }) => {
            const queue = useQueue(interaction.guildId);

            if(!queue.node.isPlaying) {
                await interaction.reply("There are no songs currently playing");
                return;
            }

            // Get the current song
            const currentSong = queue.currentTrack;


             // Embed
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`**Now Playing**\n` + 
                        (currentSong ?  `[${currentSong.title}](${currentSong.url}) \`[${currentSong.duration}]\` ~ <@${currentSong.requestedBy.id}>` : "None") +
                        `\n\n${queue.node.createProgressBar()}`
                    )
                ]
            })
        }
}